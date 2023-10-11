import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @ApiProperty({ required: false, default: "" })
  fingerprint!: string;
}
