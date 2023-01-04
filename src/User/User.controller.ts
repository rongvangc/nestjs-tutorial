import {
  Body,
  Catch,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppUserCreateDto, AppUserLoginDto } from './User.interface';
import { AppUser } from './User.model';
import { UserService } from './User.service';
import { SessionGuard } from 'src/Guards/session.guard';
import { MongoExceptionFilter } from 'src/Exceptions/Mongo.exception';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(SessionGuard)
  createSession(@Session() session: Record<string, string>): any {
    return session;
  }

  @Post('/create')
  @UseFilters(MongoExceptionFilter)
  create(@Body() userData: AppUserCreateDto): Promise<AppUser | any> {
    return this.userService.create(userData);
  }

  @Post('/login')
  login(@Body() userData: AppUserLoginDto, @Req() req): Promise<string> {
    return this.userService.login(userData, req);
  }
}
