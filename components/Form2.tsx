"use client";
import { useCallback, useState } from "react";

export function Form2() {
  const [url, setUrl] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.target.value);
    },
    []
  );
  const handleSubmit = useCallback(async () => {
    const response = await fetch(
      // `/api/metadata?url=${url}`,
      `https://save-to-notion-gray.vercel.app/api/metadata?url=${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log("result", result);
  }, [url]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input value={url} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
}
