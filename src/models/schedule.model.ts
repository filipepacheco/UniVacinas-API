import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import UserModel from '@models/user.model';

enum VACCINE_TYPE {
  COVID = 'covid',
  H1N1 = 'h1n1',
}

enum SCHEDULE_TYPE {
  'VACCINE' = 'vaccine',
  'EXAM' = 'exam',
}

enum SCHEDULE_STATUS {
  'ACTIVE' = 'active',
  'CANCELED' = 'canceled',
}

@modelOptions({ schemaOptions: { collection: 'schedule', timestamps: true } })
class Schedule {
  @prop({ ref: UserModel, required: true })
  public user_id: string;

  @prop({ type: Date, required: true })
  public datetime: Date;

  @prop({ enum: VACCINE_TYPE, required: false })
  public vaccine_type: VACCINE_TYPE;

  @prop({ enum: SCHEDULE_STATUS })
  public status: SCHEDULE_STATUS;

  @prop({ enum: SCHEDULE_TYPE })
  public type: SCHEDULE_TYPE;

  public createdAt?: Date;

  public updatedAt?: Date;
}

const ScheduleModel = getModelForClass(Schedule);

export default ScheduleModel;
