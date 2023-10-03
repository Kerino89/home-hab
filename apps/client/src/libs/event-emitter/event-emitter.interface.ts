export type Events = {
  [key: string]: Array<(ctx?: unknown) => void>;
};
