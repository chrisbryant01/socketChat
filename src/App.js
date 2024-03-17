import { useState, useEffect } from 'react'
function App() {
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getMessages();
    }, [])

    useEffect(() => {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chatMessages])

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
            'https://socketchat-backend-production.up.railway.app/message', {
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
        let result = await fetch('https://socketchat-backend-production.up.railway.app//messages');
        result = await result.json();
        setChatMessages(result)
    }

    return (
        <>
            <h1 style={{ display: 'flex', paddingLeft: 35 }}>GraphQL Chat Demo</h1>
            <div className="chat-container" style={{ display: 'flex', flexFlow: 'column nowrap', borderRadius: 4, boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.3)', height: '100%', maxHeight: '75vh', overflow: 'scroll', border: '1px solid #000', margin: 35, padding: 20, paddingTop: 10}}>
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
            </div>
            <form action="" style={{ display: 'flex', justifyContent: 'center', paddingTop: 15, position: 'fixed', bottom: 0, width: '100%' }}>
                <input type="text" placeholder="What would you like to say?" value={message} onChange={(e) => setMessage(e.target.value)} style={{ fontSize: 16, border: 'none', backgroundColor: '#000', color: '#fafafa', borderRadius: 0, width: '100%', height: '75px', paddingLeft: 30}}/>
                <button type="submit" onClick={handleMessageSubmit} style={{ backgroundColor: '#000', color: '#fafafa', borderRadius: 0, width: 125, border: 'none' }}>send</button>
            </form>
        </>
    );
}

export default App;
