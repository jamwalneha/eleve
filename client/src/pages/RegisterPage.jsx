import React, { useEffect } from "react";
import { Form, Input, Button, message,Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../redux/userActions";

const RegisterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    isRegisterRequest,
    isRegisterSuccess,
    isRegisterError,
    registerMessage,
  } = useSelector((store) => ({
    isRegisterRequest: store.user_reducer.isRegisterRequest,
    isRegisterSuccess: store.user_reducer.isRegisterSuccess,
    isRegisterError: store.user_reducer.isRegisterError,
    registerMessage: store.user_reducer.registerMessage,
  }));

  useEffect(() => {
    isRegisterError && message.error(registerMessage);
    isRegisterSuccess && message.success(registerMessage);
    isRegisterSuccess && history.push("/login");
  }, [isRegisterError, isRegisterSuccess, registerMessage]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const handleRegisterUser = (form) => {
    dispatch(
      registerUser({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      })
    );
  };

  return (
    <div className="form_container">
    <Typography.Title level={3}>Register</Typography.Title>
      <Form
        {...layout}
        name="register_form"
        onFinish={handleRegisterUser}
        onFinishFailed={(error) => console.log(error)}
      >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isRegisterRequest}>
            Register
          </Button>
        </Form.Item>
        <Typography.Text>Already have an Account !!  </Typography.Text>
        <Typography.Link onClick={() => history.push("/login")}>login here</Typography.Link>
      </Form>
    </div>
  );
};

export default RegisterPage;
