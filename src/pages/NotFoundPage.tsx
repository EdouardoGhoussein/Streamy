import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <Container fluid className="not-found-container">
      <Row className="justify-content-center align-items-center text-center vh-100">
        <Col md={8}>
          <h1 className="display-1 text-white">404</h1>
          <h2 className="text-white">Page Not Found</h2>
          <p className="text-white mb-4">
            Oops! The page you are looking for does not exist.
          </p>
          <Link to="/Streamy/">
            <Button variant="light">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
