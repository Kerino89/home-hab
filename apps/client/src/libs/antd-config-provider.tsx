"use client";

import React from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

import { ConfigProvider } from "antd";

import ru_RU from "antd/locale/ru_RU";
import "dayjs/locale/ru";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

dayjs.locale("ru");

export const AntdConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ConfigProvider locale={ru_RU}>{children}</ConfigProvider>;
};
