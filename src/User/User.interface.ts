import { IsString, IsStrongPassword } from 'class-validator';

export class AppUserCreateDto {
  @IsString()
  username: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}

export class AppUserLoginDto {
  @IsString()
  username: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}
