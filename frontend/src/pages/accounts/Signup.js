import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

export default function Signup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({}); 

  const onFinish = values => {
    // console.log('Success:', values);
    async function fn() {
        const { username, password } = values;

        setFieldErrors({});  

        const data = { username, password };

        try {
            await Axios.post("http://localhost:8000/accounts/signup/", data);

            notification.open({                                        // 회원가입 성공했을 때, 나오는 메시지 설정
                message: "회원가입 성공",
                description: "로그인 페이지로 이동합니다.",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />
              });
      
            history.push("/accounts/login"); 
        }
        catch(error) {
            if ( error.response ) {
                notification.open({
                    message: "회원가입 실패",
                    description: "아이디/암호를 확인해주세요.",
                    icon: <FrownOutlined style={{ color: "#ff3333" }} />
                  });
                const { data: fieldsErrorMessages } = error.response;

                setFieldErrors(
                    Object.entries(fieldsErrorMessages).reduce(
                        (acc, [fieldName, errors]) => {
                        acc[fieldName] = {
                            validateStatus: "error",
                            help: errors.join(" "),
                        }
                        return acc;
                    },
                    {}
                    )
                );
            }
        }
    }
    fn();
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
          { min: 5, message: "5글자 이상 입력해주세요"},
        ]}
        hasFeedback
        {...fieldErrors.username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          { min: 10, message: "10글자 이상 입력해주세요"},
        ]}
        {...fieldErrors.password}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    
  )
};