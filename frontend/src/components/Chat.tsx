"use client";

import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { File, CirclePlus, SendHorizontal } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Thanks for your message. I'm a simple bot, so I don't have real responses yet.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.loading("Uploading PDF file...");
    setFile(e.target.files?.[0] || null);
    if (file && file.type === "application/pdf") {
      // Here you would typically send the file to your server or process it
      // For this example, we'll just add a message about the upload
      toast.dismiss();
      toast.success("PDF file uploaded successfully!");
      const newBotMessage: Message = {
        id: messages.length + 1,
        text: `PDF "${file.name}" has been uploaded successfully!`,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } else {
      toast.dismiss();
      toast.error("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Toaster position="bottom-right" />
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" width={104} height={41} />
        </div>
        <div className="flex gap-2 items-center">
          {file && (
            <div className="flex items-center gap-2">
              <File />
              <p>{file?.name}</p>
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 flex gap-2 border-2 border-black rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <CirclePlus />
            <span className="font-semibold max-sm:hidden">Upload PDF</span>
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf"
          className="hidden"
        />
      </nav>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
              message.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white text-gray-800"
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <SendHorizontal />
          </button>
        </div>
      </form>
    </div>
  );
}
