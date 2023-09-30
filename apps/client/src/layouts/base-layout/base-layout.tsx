"use client";

import React from "react";
import { isEmpty } from "lodash";
import { createPathnameWithPublicUrl, removePublicUrl } from "@client/helpers/url";
import { usePathname } from "next/navigation";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Link from "next/link";
import type { BaseLayoutProps } from "./base-layout.interface";

import styles from "./base-layout.module.scss";

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, navList }) => {
  const [collapsed, setCollapsed] = React.useState(true);
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
        <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
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
        </Layout.Header>

        <Layout.Content className={styles.container} style={{ background: colorBgContainer }}>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
