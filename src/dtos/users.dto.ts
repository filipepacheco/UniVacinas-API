import { IsDate, IsEmail, IsNotEmpty, IsString, MaxDate } from 'class-validator';
import { Transform } from 'class-transformer';

const underAge = new Date();
underAge.setFullYear(underAge.getFullYear() - 18);

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public document: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(underAge, { message: 'Must not be underage' })
  public birthdate: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public document: string;
}
