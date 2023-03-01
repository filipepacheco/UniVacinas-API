import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Schedule } from '@interfaces/schedule.interface';
import scheduleModel from '@models/schedule.model';
import { CreateScheduleDto } from '@dtos/schedule.dto';
import vaccineModel from '@models/vaccine.model';

class ScheduleRepository {
  public async findAllSchedule(): Promise<Schedule[]> {
    return await scheduleModel.find();
  }

  public async getDates(): Promise<String[]> {
    const findAllSchedulesData: Schedule[] = await this.findAllSchedule();
    const unavailableSchedules = [];
    findAllSchedulesData.forEach(schedule => {
      unavailableSchedules.push(schedule.datetime.toISOString());
    });

    return unavailableSchedules;
  }

  public async findScheduleByUserId(user_id): Promise<Schedule[]> {
    return await scheduleModel.find({ user_id });
  }

  public async createSchedule(scheduleData: CreateScheduleDto): Promise<Schedule> {
    if (isEmpty(scheduleData)) throw new HttpException(400, 'scheduleData is empty');
    const createScheduleData: Schedule = await scheduleModel.create(scheduleData);

    const { vaccine_type } = scheduleData;
    if (vaccine_type) {
      await vaccineModel.updateOne({ type: vaccine_type }, { $inc: { quantity: -1 } });
    }

    return createScheduleData;
  }

  public async updateSchedule(scheduleId: string, scheduleData: CreateScheduleDto): Promise<Schedule> {
    if (isEmpty(scheduleData)) throw new HttpException(400, 'scheduleData is empty');

    const updateScheduleById: Schedule = await scheduleModel.findByIdAndUpdate(scheduleId, { scheduleData });
    if (!updateScheduleById) throw new HttpException(409, "Schedule doesn't exist");

    return updateScheduleById;
  }

  public async deleteSchedule(scheduleId: string): Promise<Schedule> {
    const deleteScheduleById: Schedule = await scheduleModel.findByIdAndDelete(scheduleId);
    if (!deleteScheduleById) throw new HttpException(409, "Schedule doesn't exist");

    return deleteScheduleById;
  }
}

export default ScheduleRepository;
