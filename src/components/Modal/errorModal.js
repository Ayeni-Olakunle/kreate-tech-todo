import { Button, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";

function ErrorModal(props) {
  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ textAlign: "center" }}>
        <div>
          <AiOutlineCloseCircle style={{ fontSize: "10em", color: "red" }} />
        </div>
        <p style={{ fontSize: "22px", color: "red" }}>
          {props.errorMsg}
        </p>

        <Button
          type="button"
          style={{ backgroundColor: "red", borderColor: "red" }}
          className="login"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ErrorModal;
