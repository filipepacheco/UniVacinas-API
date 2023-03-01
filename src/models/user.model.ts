import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
class User {
  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ type: String, required: true, unique: true })
  public document: string;

  @prop({ type: String, required: true })
  public password: string;

  @prop({ type: Date, required: true })
  public birthdate: string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

const UserModel = getModelForClass(User);

export default UserModel;
