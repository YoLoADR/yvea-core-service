import { PageOptionsDto } from '@libs/dto';
import { JWTPayload } from '@libs/interfaces';
import { SignUpDto } from '@modules/auth/dto';
import { CompaniesService } from '@modules/companies/services';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { randomBytes } from 'crypto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  DataSource,
  FindOptionsWhere,
  IsNull,
  Not,
  UpdateResult,
} from 'typeorm';
import { UpdateUserDto } from '../dto';
import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly companiesService: CompaniesService,
    private readonly i18n: I18nService,
  ) { }

  async updateLastLang(id: number): Promise<UpdateResult> {
    return User.update({ id }, { lastLang: I18nContext.current().lang });
  }

  private generateToken(): string {
    return randomBytes(64).toString('hex');
  }

  async updatePassword({ id }: User, password: string): Promise<UpdateResult> {
    return User.update(
      { id },
      { forgotPasswordToken: null, password: await hash(password) },
    );
  }

  async createForgotPasswordToken({ id }: User): Promise<string> {
    const forgotPasswordToken = this.generateToken();

    await User.update({ id }, { forgotPasswordToken });

    return forgotPasswordToken;
  }

  async update({ sub: id }: JWTPayload, dto: UpdateUserDto): Promise<User> {
    const user = await User.findOne({
      where: { id },
      relations: { company: true },
    });

    user.email = dto.email || user.email;

    if (dto.company) {
      user.company.name = dto.company.name || user.company.name;
      user.company.fiscalNumber =
        dto.company.fiscalNumber || user.company.fiscalNumber;
      user.company.typeId = dto.company.type || user.company.typeId;

      await user.company.save();
    }

    return user.save();
  }

  async findAll({ skip, take }: PageOptionsDto): Promise<[User[], number]> {
    return User.findAndCount({
      where: { roleId: Not('ADMIN') },
      relations: {
        company: true,
      },
      order: { id: 'DESC' },
      skip,
      take,
    });
  }

  async findOne({ sub: id }: JWTPayload): Promise<User> {
    return this.dataSource.manager.findOneOrFail(User, {
      where: { id },
      relations: ['company', 'subscriptions'], // Ajoutez 'subscriptions' ici
    });
  }
  async findOrCreateByEmail(dto: any): Promise<User> {
    let user = await this.dataSource.manager.findOne(User, {
      where: { email: dto.email },
      relations: ['company', 'subscriptions'],
    });
    if (user) {
      return user;
    }

    // Crée un nouvel utilisateur si non trouvé, sans gérer de mot de passe
    const newUserDetails = {
      ...dto,
      password: null // Assurez-vous que votre DTO n'exige pas de mot de passe
    };
    user = this.dataSource.manager.create(User, newUserDetails);
    return this.dataSource.manager.save(User, user);
  }

  async findOneBy(user: FindOptionsWhere<User>): Promise<User> {
    return User.findOneBy(user);
  }

  async create(dto: SignUpDto): Promise<User> {
    const { company, ...userData } = dto;

    userData.password = await hash(userData.password);
    const validationToken = this.generateToken();

    return this.dataSource.transaction(async (manager) => {
      const user = await manager.save(User, {
        ...userData,
        validationToken,
      });
      await this.companiesService.create(company, user, manager);

      return user;
    });
  }

  async validateEmail(user: User) {
    user.validationToken = null;
    user.validatedAt = new Date();

    return user.save();
  }

  async isAdmin(id: number): Promise<boolean> {
    return !!(await User.countBy({ id, roleId: 'ADMIN' }));
  }

  async isValidatedOrThrow(id: number) {
    if (!(await User.countBy({ id, validatedAt: Not(IsNull()) }))) {
      throw new ForbiddenException(this.i18n.t('EMAIL_NOT_VALIDATED'));
    }
  }
}
