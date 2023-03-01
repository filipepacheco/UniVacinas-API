import { NextFunction, Request, Response } from 'express';
import { Schedule } from '@interfaces/schedule.interface';
import { CreateScheduleDto } from '@dtos/schedule.dto';
import ScheduleRepository from '@/repository/schedule';

class ScheduleController {
  public scheduleService = new ScheduleRepository();

  public getSchedules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSchedulesData: Schedule[] = await this.scheduleService.findAllSchedule();

      res.status(200).json({ data: findAllSchedulesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getFreeSchedules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unavailableSchedules = await this.scheduleService.getDates();
      const forAhead = 3;
      const freeSchedules = [];
      const initialTime = new Date();
      initialTime.setMinutes(0);
      initialTime.setSeconds(0);
      initialTime.setMilliseconds(0);

      for (let days = 0; days < forAhead; days++) {
        initialTime.setDate(new Date().getDate() + days);
        for (let hours = 6; hours < 15; hours++) {
          initialTime.setHours(hours);
          if (!unavailableSchedules.includes(initialTime.toISOString())) {
            freeSchedules.push(JSON.parse(JSON.stringify(initialTime)));
          }
        }
      }

      res.status(200).json({ data: freeSchedules, message: 'findFreeSchedules' });
    } catch (error) {
      next(error);
    }
  };

  public getSchedulesByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSchedulesData: Schedule[] = await this.scheduleService.findScheduleByUserId(req.params.user_id);

      res.status(200).json({ data: findAllSchedulesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateScheduleDto = req.body;

      const unavailableSchedules = await this.scheduleService.getDates();

      const { datetime } = req.body;
      const datetimeIso = new Date(datetime).toISOString();
      if (unavailableSchedules.includes(datetimeIso)) {
        res.status(400).json({ message: 'error, date and time already scheduled' });
        return;
      }

      const createUserData: Schedule = await this.scheduleService.createSchedule(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateScheduleDto = req.body;
      const updateUserData: Schedule = await this.scheduleService.updateSchedule(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default ScheduleController;
