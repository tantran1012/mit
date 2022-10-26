import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Success from "./Success";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isUsed, setIsUsed] = useState(false);
    const [isTheSamePassword, setIsTheSamePassword] = useState(true);
    const [isStrongPassword, setIsStrongPassword] = useState(true);
    const [success, setSuccess] = useState(false);
    const [alert, setAlert] = useState({
        username: "",
        password: "",
        rePassword: "",
    });

    const handleUsername = (e) => {
        setUsername(e.target.value);
        if (e.target.value.length > 0) {
            fetch(`https://mit-be.herokuapp.com/checkuser/${e.target.value}`)
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        setIsUsed(true);
                        setAlert((prev) => {
                            prev.username = "Tài khoản đã có người sử dụng";
                            return prev;
                        });
                    } else {
                        setIsUsed(false);
                    }
                });
        }
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
            setAlert((prev) => {
                prev.password = "Mật khẩu không phù hợp điều kiện";
                return prev;
            });
            setIsStrongPassword(false);
        } else {
            setIsStrongPassword(true);
        }
    };
    const handleRePassword = (e) => {
        setRePassword(e.target.value);
        if (e.target.value !== password) {
            setAlert((prev) => {
                prev.rePassword = "Mật khẩu không trùng khớp";
                return prev;
            });
            setIsTheSamePassword(false);
        } else {
            setIsTheSamePassword(true);
        }
    };

    const handleSubmit = (e) => {
        if (!isUsed && isTheSamePassword && isStrongPassword) {
            setSuccess(true);
            fetch("https://mit-be.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: username,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log("Success:", JSON.stringify(response));
                })
                .catch((error) => console.error("Error:", error));
        }
        setIsUsed(true)
        e.preventDefault();
        // e.stopPropagation();
        //setValidated(true);
    };

    return (
        <Row className="justify-content-center">
            <Col xs="auto">
                <Form
                    // noValidate
                    //validated={validated}
                    onSubmit={handleSubmit}
                    className="align-items-center"
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Tài khoản</Form.Label>
                        <Form.Control
                            required
                            value={username}
                            type="text"
                            placeholder="Tài khoản"
                            onChange={handleUsername}
                            isInvalid={isUsed}
                        />
                        <Form.Control.Feedback type="invalid">
                            {alert.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            required
                            value={password}
                            type="password"
                            placeholder="Mật khẩu"
                            onChange={handlePassword}
                            isInvalid={!isStrongPassword}
                        />
                        <Form.Text className="text-muted m-2">
                            Mật khẩu phải có ít nhất 8 ký tự, có cả chữ và số.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {alert.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control
                            required
                            value={rePassword}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            onChange={handleRePassword}
                            isInvalid={!isTheSamePassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {alert.rePassword}
                        </Form.Control.Feedback>
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
                    username: username,
                    password: password,
                    name: username,
                }}
            />
        </Row>
    );
}

export default SignUp;
