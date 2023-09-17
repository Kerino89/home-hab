import { MenuProps } from "antd";

export interface BaseLayoutProps extends React.PropsWithChildren {
  navList?: MenuProps["items"];
}
