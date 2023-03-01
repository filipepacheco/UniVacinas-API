import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

export enum VACCINE_TYPE {
  'COVID' = 'covid',
  'H1N1' = 'h1n1',
}

@modelOptions({ schemaOptions: { collection: 'vaccine', timestamps: true } })
class Vaccine {
  @prop({ enum: VACCINE_TYPE })
  public type: VACCINE_TYPE;

  @prop({ type: Boolean })
  public available: boolean;

  @prop({ type: Number })
  public quantity: number;
}

const VaccineModel = getModelForClass(Vaccine);

export default VaccineModel;
