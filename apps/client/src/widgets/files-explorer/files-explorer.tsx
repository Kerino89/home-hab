"use client";

import React from "react";
import { Breadcrumb, Spin, Empty } from "antd";
import { useReadDir } from "@client/services/directory-info";
import { Card } from "./components/card";
import { HomeOutlined } from "@ant-design/icons";
import styles from "./files-explorer.module.scss";

import type { FilesExplorerProps } from "./files-explorer.interface";
import type { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/lib/breadcrumb/Breadcrumb";

export const FilesExplorer: React.FC<FilesExplorerProps> = ({ className }) => {
  const [path, setPath] = React.useState("");
  const { data, isLoading } = useReadDir(path);

  const breadcrumbItems = React.useMemo<Array<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>>>(() => {
    return path.split("/").map((name, index, arr) => {
      if (index === 0) {
        return {
          onClick: arr.length !== 1 ? () => setPath("") : undefined,
          title: <HomeOutlined />,
        };
      }

      return {
        onClick: arr.length - 1 > index ? () => setPath(arr.slice(0, index + 1).join("/")) : undefined,
        title: name,
      };
    });
  }, [path]);

  const openFolder = (name: string) => {
    const names = [...path.split("/"), name];

    setPath(names.join("/"));
  };

  return (
    <Spin className={className} spinning={isLoading}>
      <Breadcrumb items={breadcrumbItems} />

      <div className={styles["list-files"]}>
        {data && data.length
          ? data.map((fileAndFolder) => (
              <Card
                {...fileAndFolder}
                key={fileAndFolder.path}
                onDoubleClick={!fileAndFolder.isFile ? () => openFolder(fileAndFolder.name) : undefined}
              />
            ))
          : isLoading || <Empty className={styles.empty} />}
      </div>
    </Spin>
  );
};
