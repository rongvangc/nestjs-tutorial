import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { AppUserCreateDto, AppUserLoginDto } from './User.interface';
import { encodePassword, comparePassword } from 'src/utils/bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { AppUser, AppUserDocument } from './User.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AppUser.name) private userModel: Model<AppUserDocument>,
  ) {}

  async create({ username, password }: AppUserCreateDto): Promise<AppUser> {
    const hash = encodePassword(password);
    const createUser = new this.userModel({ username, hash });
    return createUser.save();
  }

  async login(
    { username, password }: AppUserLoginDto,
    @Res() res,
  ): Promise<boolean> {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) throw new HttpException("Can't find user", HttpStatus.NOT_FOUND);

    const isMathPassword = comparePassword(password, user.hash);

    if (!isMathPassword)
      throw new HttpException(
        'Wrong username or password, could you checking again',
        HttpStatus.UNAUTHORIZED,
      );

    return isMathPassword;
  }
}
