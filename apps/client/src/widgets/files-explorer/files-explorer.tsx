"use client";

import React from "react";
import { Space, Breadcrumb } from "antd";
import { useReadDir } from "@client/services/directory-info";
import { Card } from "./components/card";
import { HomeOutlined } from "@ant-design/icons";
import type { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/lib/breadcrumb/Breadcrumb";

export const FilesExplorer: React.FC = () => {
  const [path, setPath] = React.useState("");
  const { data } = useReadDir(path);

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
    <Space direction="vertical" size="middle">
      <Breadcrumb items={breadcrumbItems} />

      <Space wrap align="start" size="middle">
        {data?.map((fileAndFolder) => (
          <Card
            {...fileAndFolder}
            key={fileAndFolder.path}
            onDoubleClick={!fileAndFolder.isFile ? () => openFolder(fileAndFolder.name) : undefined}
          />
        ))}
      </Space>
    </Space>
  );
};
