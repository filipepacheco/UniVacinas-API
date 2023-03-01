import { VACCINE_TYPE } from '@models/vaccine.model';

export interface Vaccine {
  _id: string;
  type: VACCINE_TYPE;
  quantity: number;
  available: boolean;
}
