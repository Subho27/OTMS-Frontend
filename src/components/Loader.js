import {Button, Spinner} from "react-bootstrap";

const Loader = () => {
  return (
      <Button variant="primary" disabled
            style={{
              width: "50px",
              height: "50px",
              margin: "10px auto",
              display: "block",
            }}>
          <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
          />
      </Button>
  );
};

export default Loader;
