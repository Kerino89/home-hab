"use client";

import React from "react";
import { useEffectOnce, useUpdateEffect } from "react-use";
import { useAuth } from "@client/services/auth";

import { INTERNAL_ROUTES } from "@client/constants/routes.const";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";

import type { FormLoginProps, FormLoginValues } from "./form-login.interface";

export const FormLogin: React.FC<FormLoginProps> = () => {
  const [form] = Form.useForm<FormLoginValues>();
  const router = useRouter();
  const { isAuthorized, isLoading, logout, login } = useAuth();
  const handlerSubmit = async (values: FormLoginValues) => {
    try {
      await login(values);
    } catch (error) {
      form.setFields([
        { name: "email", errors: ["Неверный логин."] },
        { name: "password", errors: ["Неверный пароль."] },
      ]);
    }
  };

  useUpdateEffect(() => {
    if (isAuthorized) {
      router.push(INTERNAL_ROUTES.DISK);
    }
  }, [isAuthorized]);

  useEffectOnce(() => {
    if (isAuthorized) logout();
  });

  return (
    <Form
      form={form}
      name="login"
      style={{ width: 300 }}
      initialValues={{ remember: true }}
      onFinish={handlerSubmit}
    >
      <Form.Item name="email" rules={[{ required: true, message: "Пожалуйста, введите свой email!" }]}>
        <Input prefix={<UserOutlined />} placeholder="Введите email" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "Пожалуйста, введите свой пароль!" }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="Введите пароль" />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} style={{ width: "100%" }} type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
