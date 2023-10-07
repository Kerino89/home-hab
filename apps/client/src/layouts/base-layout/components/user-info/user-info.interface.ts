import type { ButtonProps } from "antd";

export interface UserInfoProps {
  role?: string;
  avatar?: string;
  fullName?: string;
  loading?: boolean;
  onLogout: ButtonProps["onClick"];
}
