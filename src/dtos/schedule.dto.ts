import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { VACCINE_TYPE } from '@models/vaccine.model';

enum SCHEDULE_TYPE {
  'VACCINE' = 'vaccine',
  'EXAM' = 'exam',
}

export class CreateScheduleDto {
  @IsString()
  public user_id: string;

  @IsDateString()
  public datetime: string;

  @IsEnum(VACCINE_TYPE)
  @IsOptional()
  public vaccine_type: VACCINE_TYPE;

  @IsEnum(SCHEDULE_TYPE)
  public type: SCHEDULE_TYPE;
}
