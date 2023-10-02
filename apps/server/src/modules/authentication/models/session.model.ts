import * as uuid from "uuid";
import { IRefresh } from "../authentication.interface";

export class SessionModel implements IRefresh {
  public userId!: string;
  public userAgent!: string;
  public token: string;
  public fingerprint!: string;
  public ip!: string;
  public expiresIn!: Date;
  public createdAt: Date;

  constructor(param?: Partial<SessionModel>) {
    this.createdAt = new Date();
    this.token = uuid.v4();

    Object.assign(this, param);
  }
}
