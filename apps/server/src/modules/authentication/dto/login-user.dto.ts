import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ required: true, default: "" })
  email!: string;

  @ApiProperty({ required: true, default: "" })
  password!: string;

  @ApiProperty({ required: false, default: "" })
  fingerprint!: string;
}
