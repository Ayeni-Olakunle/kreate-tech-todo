import React, { useEffect, useState } from 'react';
import "./getTodos.css";
import { Button } from 'react-bootstrap';
import AddTodos from './addTodo';
import { database } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import ErrorModal from './Modal/errorModal';
import SucceesModal from './Modal/successModal';
import Loader from './Loader/Loader';

function GetTodos(props) {
    const collectionRef = collection(database, 'todos');
    const [data, setData] = useState([]);
    const [errorMsg2, setErrorMsg2] = useState("");
    const [errModal, setErrModal] = useState(false);
    const [SucceesModals, setSucceesModals] = useState(false);
    const [load, setLoad] = useState(false);
    const [current, setCurrent] = useState(1);

    const handleGetData = () => {
        setLoad(true);
        getDocs(collectionRef)
            .then((response) => {
                setData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setLoad(false);
            })
            .catch((err) => {
                console.log(err.message)
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
                }}>Notes</Button>
                <Button onClick={() => {
                    currentDisplay(0)
                }}>Add Notes</Button>

            </div>
            {current === 1 ? <div className="container2">
                {
                    data.map((item, index) => {
                        return (
                            <div key={item.id} className="holdInfo">
                                <div className="info">
                                    <div>
                                        <h5>{item.title}</h5>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className="copy">
                                    <Button variant="primary" size="sm">Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => {
                                        handleDelete(item.id)
                                    }}>Delete</Button>
                                </div>
                            </div>
                        )
                    })
                }
                {/* <p>{error}</p> */}
            </div> : <div className="container2 padMe">
                <AddTodos />
            </div>
            }
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