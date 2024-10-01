import { useEffect, useState } from "react";

export default function AdminPage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch('/api/messages'); 
            const data = await response.json();
            setMessages(data);
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h1>Admin Page</h1>
            <h2>All Submitted Messages</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.text}</li>
                ))}
            </ul>
        </div>
    );
}
