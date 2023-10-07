"use client";

import * as React from "react";

import { Button, Avatar, Skeleton } from "antd";
import { ImportOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./user-info.module.scss";
import type { UserInfoProps } from "./user-info.interface";

export const UserInfo: React.FC<UserInfoProps> = ({ fullName, role, avatar, loading, onLogout }) => {
  return (
    <div className={styles.wrapper}>
      {!loading && (role || fullName) && (
        <>
          {role && <span className={styles.role}>{role}</span>}
          {fullName && <span>{fullName}</span>}
        </>
      )}

      <Button className={styles.button} type="link" icon={<ImportOutlined />} onClick={onLogout}>
        Выйти
      </Button>

      {loading ? (
        <Skeleton.Avatar active className={styles.avatar} size="large" />
      ) : (
        <Avatar className={styles.avatar} src={avatar} size="large" icon={<UserOutlined />} />
      )}
    </div>
  );
};
