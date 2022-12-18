import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppUserDocument = HydratedDocument<AppUser>;

@Schema()
export class AppUser {
  @Prop({ unique: true, required: true, trim: true })
  username: string;

  @Prop({ required: true, trim: true })
  hash: string;
}

export const AppUserSchema = SchemaFactory.createForClass(AppUser);
