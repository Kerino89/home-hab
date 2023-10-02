import { SessionModel } from "./session.model";

export class AuthModel {
  public accessToken!: string;
  public session!: SessionModel;

  constructor(auth?: Partial<AuthModel>) {
    Object.assign(this, auth);
  }
}
