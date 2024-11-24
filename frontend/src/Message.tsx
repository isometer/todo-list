import React, { useState, useEffect } from "react";
import axios from "axios";

const Message: React.FC = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/message")
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error("Error fetching message:", error));
    }, []);

    return (
        <div>
            <h1>{message ? message : "Loading..."}</h1>
        </div>
    );
};

export default Message;
