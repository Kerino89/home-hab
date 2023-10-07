"use client";

import * as React from "react";
import { clsx } from "clsx";

import { Layout, Divider } from "antd";
import styles from "./auth-layout.module.scss";
import type { AuthLayoutProps } from "./auth-layout.interface";

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className, title }) => {
  return (
    <Layout className={clsx(styles.wrapper, className)}>
      <Layout.Content className={styles.content}>
        <div className={styles.body}>
          <Divider orientation="center">{title}</Divider>

          {children}
        </div>
      </Layout.Content>
    </Layout>
  );
};
