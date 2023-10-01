import { ApiProperty } from "@nestjs/swagger";
import { IDirAndFileStat } from "../directory.interface";

export class DirAndFileStatModel implements IDirAndFileStat {
  @ApiProperty({ nullable: true, default: null })
  public ext: string | null = null;

  @ApiProperty({ nullable: false, default: "" })
  public name: string = "";

  @ApiProperty({ nullable: false, default: "" })
  public path: string = "";

  @ApiProperty({ nullable: false, default: false })
  public isFile: boolean = false;

  @ApiProperty({ nullable: false, default: 0 })
  public size: number = 0;

  @ApiProperty({ nullable: true, default: null })
  public openDate: Date | null = null;

  @ApiProperty({ nullable: true, default: null })
  public createDate: Date | null = null;

  @ApiProperty({ nullable: true, default: null })
  public updateDate: Date | null = null;

  constructor(param?: Partial<DirAndFileStatModel>) {
    Object.assign(this, param);
  }
}
