import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import VaccineController from '@controllers/vaccine.controller';

class VaccinesRoute implements Routes {
  public path = '/vaccine';
  public router = Router();
  public vaccineController = new VaccineController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/type`, this.vaccineController.getVaccinesByType);
    this.router.get(`${this.path}`, this.vaccineController.getVaccines);
    this.router.post(`${this.path}`, this.vaccineController.createVaccine);
  }
}

export default VaccinesRoute;
