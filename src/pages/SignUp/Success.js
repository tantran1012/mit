
import Modal from "react-bootstrap/Modal";

function Success({ user, ...props }) {
    return (
        <Modal
            {...props}
            fullscreen={"md-down"}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Đăng ký thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Tài khoản : {user.username} </p>
                <p>Mật khẩu : {user.password} </p>
                <p>Chuyển đến <a href="#/signin"> đăng nhập</a></p>
            </Modal.Body>
        </Modal>
    );
}

export default Success;
