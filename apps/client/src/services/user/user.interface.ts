import type { User } from "@server/modules/users";
import type { SerializeObject } from "@client/interfaces/serialize";

export type UserResponse = SerializeObject<Pick<User, "email" | "firstName" | "id" | "lastName">>;
