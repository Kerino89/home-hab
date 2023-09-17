export interface IDirAndFileStat {
  ext: string | null;
  name: string;
  path: string;
  size: number;
  openDate: Date | null;
  createDate: Date | null;
  updateDate: Date | null;
  isFile: boolean;
}
