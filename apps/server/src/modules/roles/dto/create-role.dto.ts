import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ nullable: false })
  value!: string;

  @ApiProperty({ nullable: false })
  description!: string;
}
