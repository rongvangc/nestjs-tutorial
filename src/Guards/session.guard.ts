import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { AppUser, AppUserDocument } from 'src/User/User.model';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @InjectModel(AppUser.name) private userModel: Model<AppUserDocument>,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { jwt } = request.session;
    if (!jwt) throw new UnauthorizedException();

    const { username } = this.jwtService.verify(jwt);

    const user = this.userModel.findOne({ username }).exec();

    if (!user) throw new UnauthorizedException();

    return true;
  }
}
