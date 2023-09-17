import React from "react";
import { BaseLayout as BaseLayoutComponent } from "@client/layouts/base-layout";

export default function BaseLayout({ children }: React.PropsWithChildren) {
  return <BaseLayoutComponent>{children}</BaseLayoutComponent>;
}
