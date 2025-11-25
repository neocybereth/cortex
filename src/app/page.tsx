'use client';

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [ouraToken, setOuraToken] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || !ouraToken.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          ouraToken,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Cortex - Oura Ring AI Assistant</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Oura API Token
          </label>
          <input
            type="password"
            value={ouraToken}
            onChange={(e) => setOuraToken(e.target.value)}
            placeholder="Enter your Oura API token"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-2">
            Get your token from{' '}
            <a href="https://cloud.ouraring.com/personal-access-tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Oura Cloud Console
            </a>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md h-96 mb-6 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="text-gray-500 text-center mt-20">
              Start a conversation about your Oura Ring data!
              <br />
              Try asking: "What was my sleep score yesterday?" or "Show me my activity for this week"
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-100 ml-auto max-w-xs'
                      : 'bg-gray-100 mr-auto max-w-md'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-600 mb-1">
                    {message.role === 'user' ? 'You' : 'Cortex'}
                  </div>
                  <div>{message.content}</div>
                </div>
              ))}
              {loading && (
                <div className="bg-gray-100 p-3 rounded-lg mr-auto max-w-md">
                  <div className="font-medium text-sm text-gray-600 mb-1">Cortex</div>
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>Analyzing your Oura data...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your Oura Ring data..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim() || !ouraToken.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
