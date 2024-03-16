import { useState, useEffect } from 'react'
function App() {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");


    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
            'http://localhost:8000/message', {
                method: 'post',
                body: JSON.stringify({ message }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        result = await result.json();
        console.warn(result);
        if (result) {
            setMessage("");
            getMessages();
        }
    }

    const getMessages = async () => {
        let result = await fetch('http://localhost:8000/messages');
        result = await result.json();
        setChatMessages(result)
    }


    useEffect(() => {
        getMessages();
    }, [])

    useEffect(() => {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chatMessages])

    return (
    <>
        <div className="chat-container" style={{ display: 'flex', flexFlow: 'column nowrap', borderRadius: 4, boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.3)', height: '100%', maxHeight: '80vh', overflow: 'scroll', border: '1px solid #000', margin: 45, padding: 20}}>
        <h1 style={{ display: 'flex' }}>GraphQL Chat Demo</h1>
        {
            chatMessages.map((message, index) => {
                return (
                    <div key={index} style={{ borderRadius: 2, padding: 10, border: '1px solid #000', margin: 10}}>
                        <p style={{ fontSize: 12 }}>{message.date}</p>
                        <p>
                            <b>Username:</b>{` `}
                            {message.message}
                        </p>
                    </div>
                )
            })
        }
        <form action="" style={{ display: 'flex', justifyContent: 'center', paddingTop: 15 }}>
            <input type="text" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: '100%', height: '35px'}}/>
            <button type="submit" onClick={handleMessageSubmit} style={{ width: 125, }}>send</button>
        </form>
        </div>
    </>
    );
}

export default App;
