import { UsersService } from '@modules/users/services';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const id = context.switchToHttp().getRequest().user?.sub;

    return this.usersService.isAdmin(id);
  }
}
