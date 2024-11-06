import {Message} from "../messages/message.model";

export class User{
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public termos?: boolean,
    public sexo?: string,
    public dataNascimento?: Date,
    public messages?: Message[],
    public _id?: string
  ) {}
}
