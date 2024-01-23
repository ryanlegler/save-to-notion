"use client";
import { useCallback, useState } from "react";

export function Form() {
    const [url, setUrl] = useState("");

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }, []);
    const handleSubmit = useCallback(async () => {
        const response = await fetch(`/api/bookmark`, {
            method: "POST",
            body: JSON.stringify({
                url,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("response", response);
    }, [url]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <input value={url} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </main>
    );
}
