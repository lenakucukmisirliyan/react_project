import { useState, useEffect, useRef} from "react";
import { generateDummyMessages } from "../utils/generateDummyMessage";

export function useDummyWebSocket(interval=3000) {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        socketRef.current = {
            send: (msg) => {
                console.log("Kullanıcı mesajı gönderdi: ", msg);
                setMessages((prev) => [...prev, { form: "user", text: msg }]);
            },
            close: () => {
                clearInterval(timerRef.current);
                console.log("Dummy WebSocket kapandı");
            },
        };

        timerRef.current = setInterval(() => {
            const msg = generateDummyMessages();
            setMessages((prev) => [...prev, {form: "server", text: msg }]);
        }, interval);

        return () => {
            socketRef.current.close();
        };
    }, [interval]);
    return {
        messages,
        sendMessage: (msg) => socketRef.current?.send(msg),
    };
}