'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  date: string;
  time: string;
  sender: string;
  message: string;
}

const WhatsAppChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch and parse the text file
    fetch('/chat.txt') // Replace with the actual path to your text file
      .then((response) => response.text())
      .then((text) => {
        const parsedMessages = parseMessages(text);
        setMessages(parsedMessages);
      });
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages are updated
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const parseMessages = (text: string): Message[] => {
    const lines = text.split('\n');
    const messageRegex = /(\d{1,2}\/\d{1,2}\/\d{2}), (\d{1,2}:\d{2}\s[AP]M) - (.*?): (.*)/;
    const messages: Message[] = [];

    lines.forEach((line) => {
      const match = line.match(messageRegex);
      if (match) {
        const [, date, time, sender, message] = match;
        messages.push({ date, time, sender, message });
      }
    });

    return messages;
  };

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col p-4 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md h-screen overflow-y-auto overflow-x-hidden"
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex mb-4 ${
            msg.sender === 'Naqabi' ? 'justify-start' : 'justify-end'
          }`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
              msg.sender === 'Naqabi'
                ? 'bg-white border border-gray-200'
                : 'bg-green-100 border border-green-200'
            }`}
          >
            <div className="text-sm text-gray-800">{msg.message}</div>
            <div className="text-xs text-gray-500 text-right mt-1">{msg.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatsAppChat;
