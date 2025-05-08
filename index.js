import React, { useState } from 'react';

const ChatGPTCopilot = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: message }],
                    max_tokens: 150,
                }),
            });
            const data = await res.json();
            setResponse(data.choices[0].message.content);
        } catch (error) {
            setResponse('Error connecting to ChatGPT. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 gap-4 min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Your Personal Copilot</h2>
                <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full mb-4 p-3 rounded-2xl border border-gray-300"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="w-full py-2 rounded-2xl bg-blue-600 text-white"
                >
                    {loading ? 'Thinking...' : 'Send'}
                </button>
                {response && <p className="mt-4 text-gray-700 p-4 rounded-2xl bg-gray-50">{response}</p>}
            </div>
        </div>
    );
};

export default ChatGPTCopilot;
