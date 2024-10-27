"use client";

import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { File, CirclePlus, SendHorizontal, Plus } from "lucide-react";
import { motion } from "framer-motion";

// Defining the Message type
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

  // The below functions is used to scroll to the bottom of the chat window
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // whenever the messages are updated it will scroll to the bottom
  useEffect(scrollToBottom, [messages]);

  // Function to handle the user message and bot response
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    toast.dismiss();
    toast.loading("Thinking...");

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputMessage }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.dismiss();
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: data,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } else {
      toast.dismiss();
      toast.error("Error occurred. Please try again.");
      const newBotMessage: Message = {
        id: messages.length + 2,
        text: "Error: " + data.message,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    }
  };

  // Function to handle the file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.loading("Uploading PDF file...");
    setFile(e.target.files?.[0] || null);

    // Adding the below one to handle the delay in setFile
    const file = e.target.files?.[0];

    if (file && file.type === "application/pdf") {
      // upload the file to the server

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.dismiss();
        toast.error("Error occurred while uploading the file.");
        return;
      }

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
      <Toaster />
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-14">
          <a href="/">
            <img
              src="/logo.png"
              alt="logo"
              width={104}
              height={41}
              className="cursor-pointer"
            />
          </a>
          <div className="group font-semibold relative pb-1">
            <a href="/chat">Chat</a>
            <span className="h-1 w-full bg-[#0FA958] absolute top-6 left-0"></span>
          </div>
          <div className="group font-semibold relative pb-1">
            <a href="/upload">Upload</a>
            <span className="h-1 w-0 bg-[#0FA958] group-hover:w-full transition-all ease-in-out duration-300 absolute top-6 left-0"></span>
          </div>
          <div className="group font-semibold relative pb-1">
            <a href="/about">About</a>
            <span className="h-1 w-0 bg-[#0FA958] group-hover:w-full transition-all ease-in-out duration-300 absolute top-6 left-0"></span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {file && (
            <div className="flex items-center gap-2">
              <div className="border-2 border-[#0FA95870] p-2 rounded-md">
                <File color="#0FA958" />
              </div>
              <p className="text-[#0FA958] font-semibold">{file?.name}</p>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 overflow-x-hidden">
        {messages.map((message) => (
          <motion.div
            initial={
              message.sender === "bot"
                ? { opacity: 0, scale: 0.9, x: "-25%" }
                : { opacity: 0, scale: 0.9, x: "25%" }
            }
            animate={
              message.sender === "bot"
                ? { opacity: 1, scale: 1, x: "0%" }
                : { opacity: 1, scale: 1, x: "0%" }
            }
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            WhileTap={{ scale: 0.95 }}
            key={message.id}
            className={` w-fit max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
              message.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white text-gray-800"
            }`}
          >
            {message.text}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
          >
            <Plus />
          </button>
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
