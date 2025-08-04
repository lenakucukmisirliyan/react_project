import { useState, useEffect, useRef} from "react";
import { generateDummyMessages } from "../utils/generateDummyMessage";

export function useDummyWebSocket(interval=3000) {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        socketRef.current = {
            send: (msg) => {
                setMessages((prev) => [...prev, { from: "user", text: msg }]);
            },
            close: () => {
                clearInterval(timerRef.current);
            },
        };

        timerRef.current = setInterval(() => {
            const msg = generateDummyMessages();
            setMessages((prev) => [...prev, {from: "server", text: msg }]);
        }, interval);

        return () => {
            socketRef.current.close();  // memory leak olmasın diye
        };
    }, [interval]);
    return {
        messages,
        sendMessage: (msg) => socketRef.current?.send(msg),
    };
}