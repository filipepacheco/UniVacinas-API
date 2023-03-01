import { NextFunction, Request, Response } from 'express';
import { Vaccine } from '@interfaces/vaccine.interface';
import VaccineRepository from '@/repository/vaccine';

class VaccineController {
  public vaccineService = new VaccineRepository();

  public getVaccines = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllVaccineData: Vaccine[] = await this.vaccineService.findAllVaccine();

      res.status(200).json({ data: findAllVaccineData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createVaccine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vaccineData: Vaccine = await this.vaccineService.createVaccine(req.body);

      res.status(200).json({ data: vaccineData, message: 'create' });
    } catch (error) {
      next(error);
    }
  };

  public getVaccinesByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllVaccineData: Vaccine[] = await this.vaccineService.findAllVaccineByType(req.body.type);

      res.status(200).json({ data: findAllVaccineData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default VaccineController;
