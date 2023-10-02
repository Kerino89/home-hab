import { CreateUserDto } from "@server/modules/users";

export class RegistrationUserDto extends CreateUserDto {
  fingerprint!: string;
}
