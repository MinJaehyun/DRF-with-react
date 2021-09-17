import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, notification } from "antd";
// import { useHistory } from "react-router-dom";
import Axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import useLocalStorage from "../../utils/useLocalStorage";

function Login() {
    // const history = useHistory();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const [fieldErrors, setFieldErrors] = useState({}); 

    console.log("loaded jwttoken", jwtToken);

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;
    
            setFieldErrors({});  
    
            const data = { username, password };
    
            try {
                const response = await Axios.post("http://localhost:8000/accounts/token/", data);
                const { data: { token: jwtToken }} = response
                setJwtToken(jwtToken);

                notification.open({     
                    message: "로그인 성공",
                    description: "? 페이지로 이동합니다.",                 // FIXME: 
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                  });
          
                // history.push("/accounts/login");                      // FIXME: 이동할 주소 적기
            }
            catch(error) {
                if ( error.response ) {
                    notification.open({
                        message: "로그인 실패",
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
    }

    return (
        <Card title="로그인">
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
            // onFinishFailed={onFinishFailed}
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
                {...fieldErrors.non_field_errors} 
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
                { min: 8, message: "8글자 이상 입력해주세요"},
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
        </Card>
        )
}

export default Login;