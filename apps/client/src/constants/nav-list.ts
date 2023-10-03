import React from "react";
import { BsHdd } from "react-icons/bs";
import { INTERNAL_ROUTES } from "./routes.const";
import type { NavItem } from "@client/layouts/base-layout";

export const NAV_LIST: Array<NavItem> = [
  {
    path: INTERNAL_ROUTES.DISK,
    icon: React.createElement(BsHdd),
    label: "Диск",
  },
];
