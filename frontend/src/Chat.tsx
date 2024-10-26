import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      body: JSON.stringify({ message: message }),
    });

    if (response.ok) {
      const data = await response.json();

      setResponse(data.response);

      console.log(data)

    }
  };

  return (
    <div>
      <form onSubmit={messageSubmit}>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Submit</button>
        {response && <p>{response}</p>}
      </form>
    </div>
  );
};

export default Chat;
