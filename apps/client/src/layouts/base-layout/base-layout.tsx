"use client";

import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import type { BaseLayoutProps } from "./base-layout.interface";

import styles from "./base-layout.module.scss";

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, navList }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={styles.wrapper}>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{ height: "32px", margin: "16px", background: "rgba(255,255,255,0.2)", borderRadius: "6px" }}
        />
        <Menu theme="dark" mode="inline" items={navList} />
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

        <Layout.Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
