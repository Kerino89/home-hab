import "@client/styles/global.scss";

import { App } from "antd";
import { AuthProvider } from "@client/services/auth";
import { ReactQueryProvider } from "@client/libs/react-query-provider";
import { AntdConfigProvider } from "@client/libs/antd-config-provider";
import { StyledComponentsRegistry } from "@client/libs/styled-components-registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomeHab",
  description: "Приложение для удаленного управления файловой системой",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ru">
      <body>
        <StyledComponentsRegistry>
          <ReactQueryProvider>
            <AntdConfigProvider>
              <AuthProvider>
                <App>{children}</App>
              </AuthProvider>
            </AntdConfigProvider>
          </ReactQueryProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
