import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Session,
} from '@nestjs/common';
import { AppUserCreateDto, AppUserLoginDto } from './User.interface';
import { encodePassword, comparePassword } from 'src/utils/bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { AppUser, AppUserDocument } from './User.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

declare module 'express-session' {
  interface SessionData {
    jwt: string;
  }
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AppUser.name) private userModel: Model<AppUserDocument>,
    private jwtService: JwtService,
  ) {}

  async create({ username, password }: AppUserCreateDto): Promise<AppUser> {
    const hash = encodePassword(password);
    const createUser = new this.userModel({ username, hash });
    return createUser.save();
  }

  async login(
    { username, password }: AppUserLoginDto,
    req: Request,
  ): Promise<string> {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) throw new HttpException("Can't find user", HttpStatus.NOT_FOUND);

    const isMathPassword = comparePassword(password, user.hash);

    if (!isMathPassword) throw new UnauthorizedException();

    const jwt = this.jwtService.sign({ username: user.username });
    req.session.jwt = jwt;

    return jwt;
  }
}
