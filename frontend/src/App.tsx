import { useState } from "react";
// import Chat from "./Chat";
import Chat from "./components/Chat";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      const result = await response.json();
      setMessage(result.message); // Success message
    } catch (error) {
      setMessage((error as Error).message || "An error occurred.");
    } finally {
      setUploading(false);
      setFile(null); // Clear the file input
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit} method="post">
        <input
          type="file"
          accept="application/pdf" // Specify the accepted file type
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
      {message && <p>{message}</p>} */}
      <Chat />
    </div>
  );
}

export default App;
