import React from "react";
import { BsHdd } from "react-icons/bs";
import type { NavItem } from "@client/layouts/base-layout";

export const NAV_LIST: Array<NavItem> = [
  {
    path: "/disk",
    icon: React.createElement(BsHdd),
    label: "Диск",
  },
];
