import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateWorkerDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  dateOfBirth: Date;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;
}
