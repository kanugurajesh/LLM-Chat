import { useState, useRef, useEffect } from "react";
import { File, Upload, Send, Plus, Menu, User, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Thinking...");
    if (inputMessage.trim() === "" || isLoading) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      toast.dismiss();
      if (response.ok) {
        const newBotMessage: Message = {
          id: messages.length + 2,
          text: data,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      } else {
        toast.error("Failed to send message. Please try again.");
        throw new Error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearMemory = async () => {
    toast.dismiss();
    toast.loading("Clearing memory...");
    const response = await fetch("http://localhost:8000/clear", {
      method: "GET",
    });

    toast.dismiss();
    if (response.ok) {
      const newBotMessage: Message = {
        id: messages.length + 1,
        text: "Memory has been cleared successfully!",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      toast.success("Memory cleared successfully!");
    } else {
      toast.error("Failed to clear memory. Please try again.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      toast.loading("Uploading...");
      setFile(file);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });

        toast.dismiss();
        if (!response.ok) throw new Error("Upload failed");

        const newBotMessage: Message = {
          id: messages.length + 1,
          text: `PDF "${file.name}" has been uploaded successfully!`,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);

        toast.success("PDF uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload PDF. Please try again.");
      }
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center space-x-4">
          <a href="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="logo"
              width={104}
              height={41}
              className="w-24 h-auto"
            />
          </a>
          <div className="hidden md:flex space-x-4">
            {[
              { name: "Chat", path: "/chat" },
              { name: "Upload", path: "/upload" },
              { name: "About", path: "/about" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative group px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {file && (
            <div className="hidden md:flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
              <File className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500 truncate max-w-[100px]">
                {file.name}
              </span>
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded-full transition-colors"
            title="Upload PDF"
          >
            <Upload className="h-5 w-5" />
            <span className="sr-only">Upload PDF</span>
            {file && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
          <button className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded-full transition-colors">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
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
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                {message.sender === "bot" ? (
                  <Bot className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </div>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700"
      >
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleClearMemory}
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded-full transition-colors"
            title="Add attachment"
          >
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add attachment</span>
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
}
