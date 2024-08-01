"use client"

import React, { useEffect, useRef, useState } from 'react';
import socket from '@/app/utils/socket';

const Chat = ({ params }: { params: { roomId: string } }) => {
    const [messages, setMessages] = useState<{ id: string; message: string }[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [className, setClassName] = useState<string>('');

    const roomId = params.roomId;

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleReceiveMessage = (messageData: { id: string; message: string }) => {
            setMessages((prevMessages) => [...prevMessages, messageData]);
            console.log('Received message:', messageData);
        };

        socket.on('receiveMessage', handleReceiveMessage);

        socket.emit("joinedRoom", roomId);
        socket.on("getClassName", (cn) => {
            setClassName(cn);
            console.log(cn);
        });

        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
            socket.off("getClassName");
        };
    }, [roomId, messages, className]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            console.log('Sending message to room:', roomId);
            socket.emit('sendMessage', roomId, newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className='flex flex-row h-screen'>
            <div className='flex-1 bg-[#E6E6FA] p-4'>
                <div className='flex flex-col h-full overflow-y-auto'>
                    {messages.map((msg, index) => (
                        <div key={index} className='p-2 mb-2 bg-white rounded-lg shadow-sm'>
                            {msg.message}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className='flex-1 bg-white p-4 flex flex-col'>
                <p className='mb-4 text-[30px]'>授業名:{className}</p>
                <p className='mb-4 text-[30px]'>ルームID:{roomId}</p>
                <textarea 
                    name="text" 
                    id="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className='w-full h-80 p-2 border rounded-lg mb-2 resize-none'
                ></textarea>
                <button 
                    onClick={handleSendMessage}
                    className='self-end p-2 bg-blue-500 text-white rounded-lg'
                >
                    コメントする
                </button>
            </div>
        </div>
    );
};

export default Chat;
