"use client";

import { clsx } from "clsx";
import { theme, Tooltip } from "antd";
import { FileIcon } from "react-file-icon";
import { FcFolder } from "react-icons/fc";

import styles from "./card.module.scss";

import type { CardProps } from "./card.interface";

export const Card: React.FC<CardProps> = ({ className, name, ext, isFile, onDoubleClick }) => {
  const {
    token: { colorTextSecondary, colorBgLayout },
  } = theme.useToken();

  return (
    <div className={clsx(className, styles.wrapper)} onDoubleClick={onDoubleClick}>
      <div className={styles.icon}>
        {isFile ? (
          <FileIcon
            color={colorBgLayout}
            labelTextColor={colorTextSecondary}
            extension={ext?.replace(".", "") || undefined}
            labelUppercase
          />
        ) : (
          <FcFolder style={{ fontSize: 64 }} />
        )}
      </div>

      <Tooltip title={name} mouseEnterDelay={0.4}>
        <span className={styles.text}>{name}</span>
      </Tooltip>
    </div>
  );
};
