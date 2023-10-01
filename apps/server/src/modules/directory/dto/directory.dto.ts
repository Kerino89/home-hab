import { ApiProperty } from "@nestjs/swagger";

export class DirectoryDto {
  @ApiProperty({ nullable: false, default: "" })
  path?: string = "";
}
