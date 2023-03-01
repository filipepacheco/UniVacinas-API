import { Vaccine } from '@interfaces/vaccine.interface';
import vaccineModel from '@models/vaccine.model';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';

class VaccineRepository {
  public async findAllVaccine(): Promise<Vaccine[]> {
    return vaccineModel.find();
  }

  public async findAllVaccineByType(type): Promise<Vaccine[]> {
    return vaccineModel.findOne({ type });
  }

  public async createVaccine(vaccineData): Promise<Vaccine> {
    if (isEmpty(vaccineData)) throw new HttpException(400, 'vaccineData is empty');
    return await vaccineModel.create(vaccineData);
  }
}

export default VaccineRepository;
