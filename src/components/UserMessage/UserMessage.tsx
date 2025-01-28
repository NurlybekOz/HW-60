import {useEffect, useState} from "react";
import {MessagesProps} from "../../types";


const UserMessage = () => {
    const [messages, setMessages] = useState<MessagesProps[]>([]);
    const [lastMessageDate, setLastMessageDate] = useState<string>('');
    const url = `http://146.185.154.90:8000/messages`;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            if (response.ok) {
                const messages: MessagesProps[] = await response.json();
                setMessages(messages.reverse());
                if (messages.length > 0) {
                    setLastMessageDate(messages[0].datetime);
                }
            }
        };

        fetchData().catch(e => console.error(e));

    }, [url]);

    useEffect(() => {
        const fetchNewData = async () => {
            if (!lastMessageDate) return;

            const fetchUrl = `${url}?datetime=${lastMessageDate}`;
            const response = await fetch(fetchUrl);
            if (response.ok) {
                const newMessages: MessagesProps[] = await response.json();
                if (newMessages.length > 0) {
                    setMessages(prevMessages => [...newMessages, ...prevMessages]);
                    setLastMessageDate(newMessages[0].datetime);
                }
            }
        };

        const interval = setInterval(() => {
            fetchNewData().catch(e => console.error(e));
        }, 3000);

        return () => clearInterval(interval);

    }, [lastMessageDate, url]);
    return (
        <div>
            <ul className="list-unstyled mb-0">
                {messages.map((message, index) => (
                    <li key={index} className="p-2">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between p-3">
                                <p className="fw-bold mb-0">{message.author}</p>
                                <p className="text-muted small mb-0"><i className="far fa-clock"></i>{message.datetime}</p>
                            </div>
                            <div className="card-body">
                                <p className="mb-0">
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    </li>
                ))
                }
            </ul>
        </div>
    );
};

export default UserMessage;