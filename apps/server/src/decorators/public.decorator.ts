import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "@server/constants/metadata-key";

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
