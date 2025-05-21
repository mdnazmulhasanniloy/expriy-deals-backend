import { Model, Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  status: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth: string;
  stripeAccountId: string;
  profile: string;
  document: string;
  role: string;
  balance: number;
  loginWth: 'google' | 'apple' | 'facebook' | 'credentials';
  expireAt: Date;
  address?: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  isDeleted: boolean;
  verification: {
    otp: string | number;
    expiresAt: Date;
    status: boolean;
  };
}

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  IsUserExistId(id: string): Promise<IUser>;
  IsUserExistUserName(userName: string): Promise<IUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
