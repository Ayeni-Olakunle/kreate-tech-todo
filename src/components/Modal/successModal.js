import { Button, Modal } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";

function SucceesModal(props) {
  return (
    <Modal
      {...props}
      //   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ textAlign: "center" }}>
        <div>
          <AiOutlineCheckCircle
            style={{ fontSize: "10em", color: "#11a7b0" }}
          />
        </div>
        <p style={{ fontSize: "30px", color: "#11a7b0" }}>Successful</p>

        <Button type="button" className="login" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default SucceesModal;
