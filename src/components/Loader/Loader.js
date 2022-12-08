import React from "react";
import "./Loader.css";

export default function Loader(props) {
    return (
        <>
            <div className="holdLoader">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
}
