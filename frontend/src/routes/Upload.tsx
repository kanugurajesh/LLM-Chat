import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Upload = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/files", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);

      console.log(data[0]);

      // console.log(typeof data);

      setFiles(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold">Upload</h1>
        <div className="mt-10">
          <input type="file" />
        </div>
        <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload
        </button>
        <div className="mt-10">
          <h1 className="text-3xl font-bold">Files</h1>
          {/* <ul>{typeof files}</ul> */}
          <pre>
            {files[0]}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Upload;
