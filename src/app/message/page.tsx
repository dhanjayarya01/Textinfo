// app/messages/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  _id: string;
  text: string; 
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
          throw new Error('Error fetching messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        // Type assertion to check if the error is an instance of Error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [router]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting message');
      }
      setMessages((prevMessages) => prevMessages.filter((message) => message._id !== id));
    } catch (error) {
      // Type assertion to check if the error is an instance of Error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while deleting.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Messages</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((message) => (
          <div key={message._id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700">Message ID: {message._id}</p>
            <h2 className="text-xl font-semibold mb-2">{message.text}</h2>
            <button
              onClick={() => handleDelete(message._id)}
              className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
