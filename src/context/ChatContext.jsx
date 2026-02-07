import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: "Hello! I'm your LEGOL immigration assistant. I can help answer questions about dual citizenship, work visas, document requirements, and more. How can I assist you today?"
        }
    ]);
    const [studentCountry, setStudentCountry] = useState('Singapore');
    const [institution, setInstitution] = useState('Carnegie Mellon University');
    const [topic, setTopic] = useState(null);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('chatState');
        if (saved) {
            try {
                const { messages: savedMessages, studentCountry: savedCountry, institution: savedInst, topic: savedTopic } = JSON.parse(saved);
                setMessages(savedMessages);
                setStudentCountry(savedCountry);
                setInstitution(savedInst);
                setTopic(savedTopic);
            } catch (err) {
                console.error('Failed to load chat state:', err);
            }
        }
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('chatState', JSON.stringify({
            messages,
            studentCountry,
            institution,
            topic
        }));
    }, [messages, studentCountry, institution, topic]);

    const addMessage = (role, text) => {
        setMessages(prev => [...prev, { role, text }]);
    };

    const clearMessages = () => {
        setMessages([
            {
                role: 'assistant',
                text: "Hello! I'm your LEGOL immigration assistant. I can help answer questions about dual citizenship, work visas, document requirements, and more. How can I assist you today?"
            }
        ]);
    };

    return (
        <ChatContext.Provider value={{
            messages,
            setMessages,
            addMessage,
            clearMessages,
            studentCountry,
            setStudentCountry,
            institution,
            setInstitution,
            topic,
            setTopic
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within ChatProvider');
    }
    return context;
};
