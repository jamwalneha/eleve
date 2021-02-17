import React, { useEffect } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/userActions";

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    isLoginRequest,
    isLoginSuccess,
    isLoginError,
    loginMessage,
  } = useSelector((store) => ({
    isLoginRequest: store.user_reducer.isLoginRequest,
    isLoginSuccess: store.user_reducer.isLoginSuccess,
    isLoginError: store.user_reducer.isLoginError,
    loginMessage: store.user_reducer.loginMessage,
  }));

  useEffect(() => {
    isLoginError && message.error(loginMessage);
    isLoginSuccess && message.success(loginMessage);
    isLoginSuccess && history.push("/");
  }, [isLoginError, isLoginSuccess, loginMessage]);

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

  const handleLoginUser = (form) => {
    dispatch(
      loginUser({
        email: form.email,
        password: form.password,
      })
    );
  };

  return (
    <div className="form_container">
      <Typography.Title level={3}>Login</Typography.Title>
      <Form
        {...layout}
        name="login_form"
        onFinish={handleLoginUser}
        onFinishFailed={(error) => console.log(error)}
      >
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
          <Button type="primary" htmlType="submit" loading={isLoginRequest}>
            Login
          </Button>
        </Form.Item>
        <Typography.Text>Don't have an Account !! </Typography.Text>
        <Typography.Link onClick={() => history.push("/register")}>
          Register here
        </Typography.Link>
      </Form>
    </div>
  );
};

export default LoginPage;
