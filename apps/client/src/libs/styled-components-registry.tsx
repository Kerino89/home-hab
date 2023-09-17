"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

import type Entity from "@ant-design/cssinjs/es/Cache";

export const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cache = React.useMemo<Entity>(() => createCache(), [createCache]);

  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
