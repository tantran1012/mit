import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Success from "./Success";

function SignUp() {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        getValues,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    const getUsername = async (username) => {
        const { data } = await axios.get(
            `https://mit-be.herokuapp.com/checkuser/${username}`
        );
        return data;
    };

    const mutation = useMutation(
        {
            mutationFn: (user) => {
                return axios({
                    method: "post",
                    url: "https://mit-be.herokuapp.com/signup",
                    data: user,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            },
        },
        {
            onSuccess: (data) => {
                console.log(data);
                const message = "success";
                alert(message);
            },
            onError: () => {
                alert("there was an error");
            },
            onSettled: () => {
                queryClient.invalidateQueries("create");
            },
        }
    );

    const checkUsername = async (e) => {
        if (e.target.value.length > 0) {
            const data = await getUsername(e.target.value);
            if (data) {
                setError("username", {
                    type: "isUsed",
                    message: "Tài khoản đã có người sử dụng",
                });
                return false;
            } else {
                clearErrors("username");
                return true;
            }
        } else {
            return true;
        }
    };

    const checkRePassword = (e) => {
        if (getValues("rePassword") !== getValues("password")) {
            setError("rePassword", {
                type: "isSame",
                message: "Mật khẩu nhập lại không trùng khớp",
            });
            return false;
        } else {
            clearErrors("rePassword");
            return true;
        }
    };

    const onSubmit = (data) => {
        mutation.mutate(data);
        setSuccess(true);
    };

    return (
        <Row className="justify-content-center">
            <Col xs="auto">
                <Form
                    noValidate
                    onSubmit={handleSubmit((data) => {
                        onSubmit(JSON.stringify(data));
                    })}
                    className="align-items-center"
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Tài khoản</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tài khoản"
                            onChange={checkUsername}
                            {...register("username", {
                                required: "Không được bỏ trống tài khoản",
                                onChange: (e) => checkUsername(e),
                            })}
                            className={`${errors.username ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">
                            {errors.username?.message}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Mật khẩu"
                            {...register("password", {
                                required: "Không được bỏ trống mật khẩu",
                            })}
                            className={`${errors.password ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">
                            {errors.password?.message}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            onChange={checkRePassword}
                            {...register("rePassword", {
                                required: "Không được bỏ trống",
                                onChange: (e) => checkRePassword(e),
                            })}
                            className={`${
                                errors.rePassword ? "is-invalid" : ""
                            }`}
                        />
                        <div className="invalid-feedback">
                            {errors.rePassword?.message}
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Đăng ký
                    </Button>
                </Form>
            </Col>
            <Success
                show={success}
                onHide={() => setSuccess(false)}
                user={{
                    username: getValues("username"),
                    password: getValues("password"),
                    name: getValues("username"),
                }}
            />
        </Row>
    );
}

export default SignUp;
