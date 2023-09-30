import { IDirAndFileStat } from "../directory.interface";

export class DirAndFileStatModel implements IDirAndFileStat {
  public ext: string | null = null;
  public name: string = "";
  public path: string = "";
  public isFile: boolean = false;
  public size: number = 0;
  public openDate: Date | null = null;
  public createDate: Date | null = null;
  public updateDate: Date | null = null;

  constructor(param?: Partial<DirAndFileStatModel>) {
    Object.assign(this, param);
  }
}
