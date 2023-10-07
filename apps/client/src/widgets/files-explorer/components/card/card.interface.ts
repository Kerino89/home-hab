import type { DirAndFileStatResponse } from "@client/services/directory";

export interface CardProps extends DirAndFileStatResponse {
  className?: string;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}
