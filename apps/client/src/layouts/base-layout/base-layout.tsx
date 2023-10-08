"use client";

import React from "react";
import { useProfile } from "@client/services/user";
import { useAuth } from "@client/services/auth";
import { isEmpty } from "lodash";
import { INTERNAL_ROUTES } from "@client/constants/routes.const";
import { createPathnameWithPublicUrl, removePublicUrl } from "@client/helpers/url";
import { usePathname } from "next/navigation";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { UserInfo } from "./components/user-info";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BaseLayoutProps } from "./base-layout.interface";

import styles from "./base-layout.module.scss";

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, navList }) => {
  const { data: user, isLoading } = useProfile();
  const { isAuthorized, logout } = useAuth();
  const [collapsed, setCollapsed] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKeys = React.useMemo(() => {
    const [path = ""] = removePublicUrl(pathname)
      .split("/")
      .filter((path) => !isEmpty(path));

    return [pathname, createPathnameWithPublicUrl(path)];
  }, [pathname]);

  const getPropsUserInfo = () => {
    if (!user) return {};

    const { firstName, lastName } = user;

    return {
      fullName: [lastName, firstName].filter(Boolean).join(" "),
    };
  };

  if (!isAuthorized) {
    router.push(INTERNAL_ROUTES.LOGIN);
  }

  return (
    <Layout className={styles.wrapper}>
      <Layout.Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{ height: "32px", margin: "16px", background: "rgba(255,255,255,0.2)", borderRadius: "6px" }}
        />

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={navList?.map(({ icon, label, path }) => ({
            icon,
            key: path,
            label: <Link href={path}>{label}</Link>,
          }))}
        />
      </Layout.Sider>

      <Layout>
        <Layout.Header className={styles.header} style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <UserInfo {...getPropsUserInfo()} onLogout={logout} loading={isLoading} />
        </Layout.Header>

        <Layout.Content className={styles.container} style={{ background: colorBgContainer }}>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
