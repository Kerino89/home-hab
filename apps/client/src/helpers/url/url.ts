const { PUBLIC_URL = "/" } = process.env;

export const removeSlash = (url: string) => url.replace(/^\/|\/$/g, "");
export const removePublicUrl = (url: string) => {
  // eslint-disable-next-line no-useless-escape
  const reg = new RegExp(`^\/?${removeSlash(PUBLIC_URL)}`, "i");

  return url.replace(reg, "");
};

export const createPathnameWithPublicUrl = (url: string, publicUrl = PUBLIC_URL) => {
  return `/${removeSlash(publicUrl)}/${removeSlash(url)}`;
};
