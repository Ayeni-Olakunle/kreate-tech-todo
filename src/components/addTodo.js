import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { database } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore"
import ErrorModal from './Modal/errorModal';
import SucceesModal from './Modal/successModal';
import Loader from './Loader/Loader';

export default function AddTodos() {
    const collectionRef = collection(database, 'todos');
    const [data, setData] = useState({});
    const [errorMsg2, setErrorMsg2] = useState("");
    const [errModal, setErrModal] = useState(false);
    const [SucceesModals, setSucceesModals] = useState(false);
    const [load, setLoad] = useState(false);

    const handleInput = (e) => {
        let newInput = { [e.target.name]: e.target.value };
        setData({ ...data, ...newInput });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoad(true);
        addDoc(collectionRef, {
            title: data.title,
            description: data.description,
        })
            .then(() => {
                setSucceesModals(true)
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                setErrModal(true);
                setErrorMsg2(err.message);
                alert(err.message)
                console.log(err.message)
            })
    }

    return (
        <div>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" name="title" onChange={(e) => handleInput(e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" onChange={(e) => handleInput(e)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            {load ? <Loader /> : null}
            <ErrorModal show={errModal} onHide={() => setErrModal(false)} errorMsg={errorMsg2 || "Opps something went wrong"} />
            <SucceesModal
                show={SucceesModals}
                onHide={() => {
                    setSucceesModals(false);
                }}
            />
        </div>
    );
}
