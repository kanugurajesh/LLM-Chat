import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const concatData = (data: any) => {
    let result = "";
    data.forEach((element: any) => {
      result += element.text + " ";
    });
    return result;
  };

  const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(concatData(data));
      } else {
        console.error("Failed to fetch response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setMessage(""); // Clear the input field after submission
  };

  return (
    <div>
      <form onSubmit={messageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
        {response && <p>{response}</p>}
      </form>
    </div>
  );
};

export default Chat;
