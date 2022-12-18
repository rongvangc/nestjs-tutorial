import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { AppUserCreateDto, AppUserLoginDto } from './User.interface';
import { AppUser } from './User.model';
import { UserService } from './User.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  createSession(@Session() session: Record<string, string>): any {
    console.log(session, session.id);
    return session;
  }

  @Post('/create')
  create(@Body() userData: AppUserCreateDto): Promise<AppUser> {
    return this.userService.create(userData);
  }

  @Post('/login')
  login(
    @Body() userData: AppUserLoginDto,
    @Res({ passthrough: true }) res,
  ): Promise<boolean> {
    return this.userService.login(userData, res);
  }
}
