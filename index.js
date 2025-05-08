import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
                    'Authorization': `Bearer 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`,
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
            <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
                <CardContent>
                    <h2 className="text-2xl font-semibold mb-4">Your Personal Copilot</h2>
                    <Input
                        placeholder="Ask me anything..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full mb-4 p-3 rounded-2xl"
                    />
                    <Button onClick={handleSendMessage} disabled={loading} className="w-full py-2 rounded-2xl bg-blue-600 text-white">
                        {loading ? 'Thinking...' : 'Send'}
                    </Button>
                    {response && <p className="mt-4 text-gray-700 p-4 rounded-2xl bg-white shadow">{response}</p>}
                </CardContent>
            </Card>
        </div>
    );
};

export default ChatGPTCopilot;
