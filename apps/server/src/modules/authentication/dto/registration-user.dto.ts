import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "@server/modules/users";

export class RegistrationUserDto extends CreateUserDto {
  @ApiProperty({ required: false, default: "" })
  fingerprint!: string;
}
