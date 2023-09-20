import type { IDirAndFileStat } from "@server/modules/directory-info";

export interface CardProps extends Omit<IDirAndFileStat, "openDate" | "createDate" | "updateDate"> {
  className?: string;
  openDate: string | null;
  createDate: string | null;
  updateDate: string | null;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}
