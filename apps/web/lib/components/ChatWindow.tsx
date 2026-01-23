"use client";

import { useState, useEffect, useRef } from "react";
import api from "@lib/axios"     
const send_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    className="bi bi-send"
    viewBox="0 0 16 16"
  >
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
  </svg>
);

type Message = {
  text: string;
  sendBy: "user" | "sender";
};

const Chatbubble = ({ text, sendBy }: Message) => {
  const isUser = sendBy === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 m-2 font-bold max-w-[75%] break-words whitespace-pre-wrap ${
          isUser
            ? "bg-gray-300 text-black rounded-bl-3xl rounded-t-3xl"
            : "bg-indigo-600 text-white rounded-br-3xl rounded-t-3xl"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

const initialMessages: Message[] = [
  { text: "Hello! How can I assist you today?", sendBy: "sender" },
  { text: "I have a question about my order.", sendBy: "user" },
  { text: "Sure! Can you provide your order number?", sendBy: "sender" },
  { text: "Yes, it's 123456.", sendBy: "user" },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: inputText, sendBy: "user" },
    ]);

    setInputText("");
  };

  return (
    <>
    <div></div>
    <div className="border border-gray-400 w-80 h-[420px] rounded-2xl flex flex-col shadow-lg fixed right-4 bottom-4 bg-white">
      
      {/* Header */}
      <div className="h-12 bg-indigo-600 rounded-t-2xl flex items-center justify-center">
        <h1 className="text-white font-bold">Chat Window</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <Chatbubble key={index} text={msg.text} sendBy={msg.sendBy} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={sendMessage}
          className="text-indigo-600 hover:text-indigo-800 "
        >
          {send_icon}
        </button>
      </div>
    </div>
    </>
  );
};



const Friends_list= async ()=>{

    const [user_list,setUser_list]=useState<string[]>(["Alice","Bob","Charlie","David"]);

    useEffect(() => {
        const fetchUsers = async () => {
            const url = "/get-user-list";
            try {
                const response = await api.get(url);
                const users = response.data;
                const names = users.map((user: { name: string }) => user.name);
                setUser_list(names);
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        };
        fetchUsers();
    },[])
    return(
        <div className="border border-gray-400 w-80 h-[420px] rounded-2xl flex flex-col shadow-lg fixed right-4 bottom-4 bg-white">
                  
      {/* Header */}
      <div className="h-12 bg-indigo-600 rounded-t-2xl flex items-center justify-center">
        <h1 className="text-white font-bold">Chat Window</h1>
      </div>

        <div className="border h-[50px] flex items-center justify-center">
            <input type="text"
            placeholder="hello"
            className=" border-1 rounded-2xl p-2 m-1"></input>
           
        </div>

        
            <div>
                {user_list.map((it,index)=>(
                    <div key={index} className="border-b p-2 hover:bg-gray-100 cursor-pointer">
                        {it}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatWindow;