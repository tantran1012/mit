import { Container } from "react-bootstrap";
import Header from "../../Header";

function Default({ children }) {
    return (
        <>
            <Header />
            <Container >{children}</Container>
        </>
    );
}

export default Default;
