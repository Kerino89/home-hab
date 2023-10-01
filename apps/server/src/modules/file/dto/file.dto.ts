import { ApiProperty } from "@nestjs/swagger";

export class FileDto {
  @ApiProperty({ nullable: false })
  path!: string;
}
