import { IDirAndFileStat } from "@server/modules/directory";
import { SerializeObject } from "@client/interfaces/serialize";

export type DirAndFileStatResponse = SerializeObject<IDirAndFileStat>;
