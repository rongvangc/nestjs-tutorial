import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppUser, AppUserSchema } from './User.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AppUser.name, schema: AppUserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
