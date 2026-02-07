import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../api';

const Navbar = ({ activePage = 'Chat' }) => {
    const navigate = useNavigate();

    const navItems = ['Home', 'Chat', 'Timeline', 'Resources'];

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '32px 64px',
            width: '100%',
            position: 'absolute',
            top: 0,
            zIndex: 20,
            boxSizing: 'border-box'
        }}>
            <div
                style={{ fontSize: '24px', fontWeight: '700', color: '#003366', cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                LEGOL
            </div>

            <div style={{
                background: 'rgba(230, 235, 240, 0.6)',
                backdropFilter: 'blur(10px)',
                padding: '4px 6px',
                borderRadius: '100px',
                display: 'flex',
                gap: '4px'
            }}>
                {navItems.map((item) => (
                    <div key={item}
                        onClick={() => {
                            if (item === 'Home') navigate('/');
                            if (item === 'Chat') navigate('/chat');
                            if (item === 'Timeline') navigate('/timeline');
                        }}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '100px',
                            fontSize: '14px',
                            fontWeight: item === activePage ? '600' : '500',
                            color: item === activePage ? '#003366' : '#64748b',
                            cursor: 'pointer',
                            background: item === activePage ? '#FFFFFF' : 'transparent',
                            boxShadow: item === activePage ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                        }}>
                        {item}
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#003366', cursor: 'pointer' }}>Sign Out</span>
                <button style={{
                    background: '#003366',
                    color: 'white',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 51, 102, 0.2)'
                }}>My Profile</button>
            </div>
        </nav>
    );
};

const FilterDropdown = ({ label, value, options, isOpen, onToggle }) => {
    return (
        <div style={{ position: 'relative', flex: 1 }}>
            <button
                onClick={onToggle}
                style={{
                    width: '100%',
                    padding: '18px 24px',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0, 51, 102, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#003366',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                }}
            >
                <span>
                    {label}{value && ' : '}
                    {value && <em style={{ fontStyle: 'italic', fontWeight: '600' }}>{value}</em>}
                </span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && options && (
                <div style={{
                    position: 'absolute',
                    bottom: '110%',
                    left: 0,
                    right: 0,
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '16px',
                    padding: '12px 0',
                    boxShadow: '0 8px 32px rgba(0, 51, 102, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                    zIndex: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                }}>
                    {options.map((option) => (
                        <div
                            key={option}
                            style={{
                                padding: '12px 24px',
                                fontSize: '15px',
                                fontWeight: '500',
                                color: '#003366',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 51, 102, 0.05)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Chat = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const inputRef = useRef(null);

    const handleSend = async () => {
        if (!query.trim() || isLoading) return;

        const userMessage = query.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setQuery('');
        setIsLoading(true);

        try {
            const result = await api.sendQuery(userMessage);
            if (result.answer) {
                setMessages(prev => [...prev, { role: 'assistant', text: result.answer }]);
            }
        } catch (err) {
            console.error('Chat query failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleDropdown = (name) => {
        setOpenDropdown(prev => prev === name ? null : name);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#EEF2F7',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Background Gradient Blobs */}
            <div style={{
                position: 'absolute',
                top: '-5%',
                left: '10%',
                width: '80vw',
                height: '70vh',
                background: 'radial-gradient(ellipse, rgba(0, 51, 102, 0.18) 0%, rgba(0, 51, 102, 0.08) 40%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                top: '30%',
                left: '25%',
                width: '50vw',
                height: '50vh',
                background: 'radial-gradient(ellipse, rgba(100, 140, 200, 0.15) 0%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '40vh',
                background: 'linear-gradient(to top, rgba(220, 228, 240, 0.6), transparent)',
                zIndex: 0
            }} />

            <Navbar activePage="Chat" />

            {/* Main Chat Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                zIndex: 10,
                paddingTop: '120px',
                paddingBottom: '40px',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                paddingLeft: '40px',
                paddingRight: '40px',
                boxSizing: 'border-box'
            }}>
                {/* Messages Area */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    paddingBottom: '24px'
                }}>
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                                padding: '16px 20px',
                                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                background: msg.role === 'user'
                                    ? 'rgba(0, 51, 102, 0.85)'
                                    : 'rgba(255, 255, 255, 0.8)',
                                color: msg.role === 'user' ? '#FFFFFF' : '#003366',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 4px 12px rgba(0, 51, 102, 0.08)'
                            }}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{
                            alignSelf: 'flex-start',
                            padding: '16px 20px',
                            borderRadius: '20px 20px 20px 4px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            color: '#64748b',
                            fontSize: '15px',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 12px rgba(0, 51, 102, 0.08)'
                        }}>
                            Thinking...
                        </div>
                    )}
                </div>

                {/* Filter Dropdowns Row */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '16px'
                }}>
                    <FilterDropdown
                        label="International Student"
                        value="Singapore"
                        isOpen={openDropdown === 'student'}
                        onToggle={() => toggleDropdown('student')}
                        options={['Singapore', 'India', 'China', 'South Korea', 'Japan', 'Other...']}
                    />
                    <FilterDropdown
                        label="Institution"
                        value="Carnegie Mellon University"
                        isOpen={openDropdown === 'institution'}
                        onToggle={() => toggleDropdown('institution')}
                        options={['Carnegie Mellon University', 'MIT', 'Stanford', 'Harvard', 'Other...']}
                    />
                    <FilterDropdown
                        label="Topic"
                        value={null}
                        isOpen={openDropdown === 'topic'}
                        onToggle={() => toggleDropdown('topic')}
                        options={['Work Visa', 'Financial Support', 'Immigration', 'Other...']}
                    />
                </div>

                {/* Input Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    padding: '6px 8px 6px 24px',
                    boxShadow: '0 4px 20px rgba(0, 51, 102, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything..."
                        style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontSize: '15px',
                            color: '#003366',
                            fontFamily: 'inherit',
                            padding: '12px 0'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !query.trim()}
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'transparent',
                            cursor: query.trim() ? 'pointer' : 'default',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            opacity: query.trim() ? 0.8 : 0.35
                        }}
                    >
                        <Send size={20} color="#003366" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;

