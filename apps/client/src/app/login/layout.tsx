import React from "react";
import { AuthLayout as AuthLayoutComponent } from "@client/layouts/auth-layout";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return <AuthLayoutComponent title="Home Hub">{children}</AuthLayoutComponent>;
}
