import { IsDate, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateWorkerDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
}
