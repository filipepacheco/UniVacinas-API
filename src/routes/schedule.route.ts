import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateScheduleDto } from '@dtos/schedule.dto';
import authMiddleware from '@middlewares/auth.middleware';
import ScheduleController from '@controllers/schedule.controller';

class ScheduleRoute implements Routes {
  public path = '/schedule';
  public router = Router();
  public schedulerController = new ScheduleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.schedulerController.getSchedules);
    this.router.get(`${this.path}/free`, this.schedulerController.getFreeSchedules);
    this.router.get(`${this.path}/:user_id`, authMiddleware, this.schedulerController.getSchedulesByUserId);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateScheduleDto, 'body'), this.schedulerController.createSchedule);
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreateScheduleDto, 'body', true),
      this.schedulerController.updateSchedule,
    );
  }
}

export default ScheduleRoute;
