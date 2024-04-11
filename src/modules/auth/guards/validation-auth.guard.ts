import { UsersService } from '@modules/users/services';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationAuthGuard {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const id = context.switchToHttp().getRequest().user?.sub;

    if (id) {
      await this.usersService.isValidatedOrThrow(id);
    }

    return true;
  }
}
