import { User } from '@interfaces/users.interface';
import { VACCINE_TYPE } from '@models/vaccine.model';

export enum SCHEDULE_STATUS {
  'ACTIVE' = 'active',
  'CANCELED' = 'canceled',
}

enum SCHEDULE_TYPE {
  'VACCINE' = 'vaccine',
  'EXAM' = 'exam',
}

export interface Schedule {
  _id: string;
  datetime: Date;
  user_id: User['_id'];
  status: SCHEDULE_STATUS;
  vaccine_type?: VACCINE_TYPE;
  type: SCHEDULE_TYPE;
}
