import React, { useEffect, useState } from 'react';
import "./getTodos.css";
import { Button, Modal, Form } from 'react-bootstrap';
import { BiSearchAlt2 } from "react-icons/bi";
import AddTodos from './addTodo';
import { database } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import ErrorModal from './Modal/errorModal';
import SucceesModal from './Modal/successModal';
import Loader from './Loader/Loader';

function GetTodos() {
    const collectionRef = collection(database, 'todos');
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState({});
    const [errorMsg2, setErrorMsg2] = useState("");
    const [id, setId] = useState("");
    const [errModal, setErrModal] = useState(false);
    const [SucceesModals, setSucceesModals] = useState(false);
    const [load, setLoad] = useState(false);
    const [inputText, setInputText] = useState("");
    const [current, setCurrent] = useState(1);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInput = (e) => {
        let newInput = { [e.target.name]: e.target.value };
        setDatas({ ...datas, ...newInput });
    }

    const handleGetData = () => {
        setLoad(true);
        getDocs(collectionRef)
            .then((response) => {
                setData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setLoad(false);
            })
            .catch((err) => {
                setErrorMsg2(err.message);
                setErrModal(true);
                setLoad(false);
            })
    }

    const handleDelete = (id) => {
        setLoad(true);
        let deleteTodo = doc(database, "todos", id)
        deleteDoc(deleteTodo)
            .then((response) => {
                setSucceesModals(true)
                setLoad(false);
            })
            .catch((err) => {
                console.log(err.message)
                setErrorMsg2(err.message);
                setErrModal(true);
                setLoad(false);
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoad(true);
        handleClose()
        let updateTodo = doc(database, "todos", id)
        let newField = {
            title: datas.titles,
            description: datas.descriptions,
        }
        updateDoc(updateTodo, newField)
            .then((response) => {
                setSucceesModals(true)
                handleClose()
                handleGetData();
                setLoad(false);
            })
            .catch((err) => {
                console.log(err.message)
                setErrorMsg2(err.message);
                setErrModal(true);
                setLoad(false);
            })
    }

    const filteredData = data.filter((el) => {
        if (inputText === "") {
            return el;
        } else {
            return el.title.toLowerCase().includes(inputText);
        }
    });

    useEffect(() => {
        handleGetData();
    }, []);

    const currentDisplay = (index) => {
        setCurrent(index);
    }

    return (
        <div className="container1">
            <div className="switchButin">
                <Button onClick={() => {
                    currentDisplay(1)
                    handleGetData()
                }}>Todos</Button>
                <Button onClick={() => {
                    currentDisplay(0)
                }}>Add Todos</Button>

            </div>
            {current === 1 ? <div>
                <div className="holdInput">
                    <BiSearchAlt2 />
                    <input
                        type="search"
                        placeholder="Search by title..."
                        style={{ outline: "none", border: "none", width: "95%" }}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </div>
                <div className="container2">
                    {
                        filteredData.map((item, index) => {
                            return (
                                <div key={item.id} className="holdInfo">
                                    <div className="info">
                                        <div>
                                            <h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="copy">
                                        <Button variant="primary" size="sm" onClick={() => {
                                            setId(item.id);
                                            handleShow()
                                        }}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => {
                                            handleDelete(item.id)
                                        }}>Delete</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <p>{error}</p> */}
                </div>
            </div> : <div className="container2 padMe">
                <AddTodos />
            </div>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdate} className="formMe">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" name="titles" onChange={(e) => handleInput(e)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="descriptions" onChange={(e) => handleInput(e)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>

            {load ? <Loader /> : null}
            <ErrorModal show={errModal} onHide={() => setErrModal(false)} errorMsg={errorMsg2 || "Opps something went wrong"} />
            <SucceesModal
                show={SucceesModals}
                onHide={() => {
                    setSucceesModals(false);
                    handleGetData();
                }}
            />
        </div >
    );
}

export default GetTodos;