'use client';
import { useState, FormEvent } from 'react';
import axios from 'axios';

const TextForm: React.FC = () => {
    const [text, setText] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
             await axios.post('/api/sendtext', { text });
            alert('Text submitted successfully!');
            setText('');
        } catch (error) {
            console.error('Error submitting text:', error);
            alert('Failed to submit text.');
        }
    };



    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-2xl p-3 bg-gray-100 rounded-md shadow-lg">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your Message (max 300 lines)"
                rows={10}
                maxLength={3000}
                required
                className="resize-none border border-gray-300 rounded-md p-2 mb-4 text-lg outline-none focus:border-blue-500 transition duration-200"
            />
            <button
                type="submit"
                className="px-4 py-2 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Submit Text
            </button>
        </form>
    );
};

export default TextForm;
