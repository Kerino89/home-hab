import React from "react";
import { BaseLayout as BaseLayoutComponent } from "@client/layouts/base-layout";
import { NAV_LIST } from "@client/constants/nav-list";

export default function BaseLayout({ children }: React.PropsWithChildren) {
  return <BaseLayoutComponent navList={NAV_LIST}>{children}</BaseLayoutComponent>;
}
