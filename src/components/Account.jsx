import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Bell, Shield, LogOut, ChevronRight, Settings, BookOpen, FileText, Globe } from 'lucide-react';

/* ─── Navbar (consistent with other pages) ─── */
const Navbar = ({ activePage = 'Account' }) => {
    const navigate = useNavigate();
    const navItems = ['Home', 'Chat', 'Flowchart', 'Timeline', 'Resources'];

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
            <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <img src="/legol-icon.png" alt="LEGOL" style={{ height: '28px' }} />
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#003366' }}>LEGOL</span>
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
                            if (item === 'Flowchart') navigate('/flowchart');
                            if (item === 'Timeline') navigate('/timeline');
                            if (item === 'Resources') navigate('/resources');
                        }}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '100px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#64748b',
                            cursor: 'pointer',
                            background: 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#003366';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#64748b';
                            e.currentTarget.style.background = 'transparent';
                        }}>
                        {item}
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <span
                    onClick={() => navigate('/login')}
                    style={{ fontSize: '14px', fontWeight: '500', color: '#003366', cursor: 'pointer', transition: 'opacity 0.25s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >Sign Out</span>
                <button
                    onClick={() => navigate('/account')}
                    style={{
                        background: '#003366',
                        color: 'white',
                        padding: '12px 28px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0, 51, 102, 0.2)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 14px rgba(0, 51, 102, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 51, 102, 0.2)';
                    }}
                >My Profile</button>
            </div>
        </nav>
    );
};

/* ─── Settings Row ─── */
const SettingsRow = ({ icon: Icon, label, sublabel, action, isLast }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '18px 0',
            borderBottom: isLast ? 'none' : '1px solid rgba(0, 51, 102, 0.06)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 51, 102, 0.02)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
        <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'rgba(0, 51, 102, 0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
        }}>
            <Icon size={18} color="#003366" />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E272D' }}>{label}</div>
            {sublabel && <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{sublabel}</div>}
        </div>
        {action || <ChevronRight size={16} color="#94a3b8" />}
    </div>
);

/* ─── Toggle Switch ─── */
const Toggle = ({ enabled, onToggle }) => (
    <div
        onClick={onToggle}
        style={{
            width: '44px', height: '24px', borderRadius: '100px',
            background: enabled ? '#003366' : 'rgba(0, 51, 102, 0.12)',
            cursor: 'pointer', position: 'relative',
            transition: 'background 0.25s ease'
        }}
    >
        <div style={{
            width: '18px', height: '18px', borderRadius: '50%',
            background: 'white',
            position: 'absolute', top: '3px',
            left: enabled ? '23px' : '3px',
            transition: 'left 0.25s ease',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
        }} />
    </div>
);

/* ─── Main Account Page ─── */
const Account = () => {
    const navigate = useNavigate();
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Placeholder user data
    const user = {
        name: 'Jane Doe',
        email: 'jane.doe@andrew.cmu.edu',
        school: 'Carnegie Mellon University',
        country: 'Singapore',
        memberSince: 'January 2026',
        initials: 'JD'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#EEF2F7',
            position: 'relative',
            overflow: 'auto',
            fontFamily: 'inherit'
        }}>
            {/* Background Gradient Blobs */}
            <div style={{
                position: 'fixed', top: '-5%', left: '10%',
                width: '80vw', height: '70vh',
                background: 'radial-gradient(ellipse, rgba(0, 51, 102, 0.12) 0%, rgba(0, 51, 102, 0.04) 40%, transparent 70%)',
                filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none'
            }} />
            <div style={{
                position: 'fixed', bottom: '-10%', right: '-5%',
                width: '50vw', height: '50vh',
                background: 'radial-gradient(ellipse, rgba(100, 140, 200, 0.12) 0%, transparent 70%)',
                filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none'
            }} />

            <Navbar />

            {/* Main Content */}
            <div style={{
                position: 'relative', zIndex: 10,
                paddingTop: '120px', paddingBottom: '60px',
                paddingLeft: '64px', paddingRight: '64px',
                maxWidth: '860px', width: '100%',
                margin: '0 auto', boxSizing: 'border-box'
            }}>
                {/* ─── Profile Header ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(16px)',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 4px 24px rgba(0, 51, 102, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '28px',
                        marginBottom: '24px'
                    }}
                >
                    {/* Avatar */}
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #003366 0%, #1a5c99 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 16px rgba(0, 51, 102, 0.2)'
                    }}>
                        <span style={{ fontSize: '28px', fontWeight: '700', color: 'white', letterSpacing: '1px' }}>
                            {user.initials}
                        </span>
                    </div>

                    {/* User info */}
                    <div style={{ flex: 1 }}>
                        <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '700', color: '#003366' }}>
                            {user.name}
                        </h1>
                        <p style={{ margin: '0 0 2px', fontSize: '15px', color: '#64748b' }}>{user.email}</p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
                            {user.school} · {user.country} · Member since {user.memberSince}
                        </p>
                    </div>

                    {/* Edit button */}
                    <button
                        style={{
                            padding: '10px 24px', borderRadius: '12px',
                            border: '1.5px solid rgba(0, 51, 102, 0.15)',
                            background: 'rgba(0, 51, 102, 0.03)',
                            color: '#003366', fontSize: '13px', fontWeight: '600',
                            cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'all 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 51, 102, 0.08)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 51, 102, 0.03)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Edit Profile
                    </button>
                </motion.div>

                {/* ─── Two-column grid ─── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                    {/* ── Personal Information ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.75)',
                            backdropFilter: 'blur(16px)',
                            borderRadius: '20px',
                            padding: '28px 28px 12px',
                            boxShadow: '0 4px 24px rgba(0, 51, 102, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)'
                        }}
                    >
                        <h2 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#003366' }}>
                            Personal Information
                        </h2>
                        <SettingsRow icon={User} label="Full Name" sublabel={user.name} />
                        <SettingsRow icon={Mail} label="Email Address" sublabel={user.email} />
                        <SettingsRow icon={Globe} label="Country of Origin" sublabel={user.country} />
                        <SettingsRow icon={BookOpen} label="Institution" sublabel={user.school} isLast />
                    </motion.div>

                    {/* ── Account Settings ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.14, ease: [0.215, 0.61, 0.355, 1] }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.75)',
                            backdropFilter: 'blur(16px)',
                            borderRadius: '20px',
                            padding: '28px 28px 12px',
                            boxShadow: '0 4px 24px rgba(0, 51, 102, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)'
                        }}
                    >
                        <h2 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#003366' }}>
                            Account Settings
                        </h2>
                        <SettingsRow icon={Shield} label="Password & Security" sublabel="Change password, 2FA" />
                        <SettingsRow icon={Globe} label="Language" sublabel="English (US)" />
                        <SettingsRow icon={Settings} label="Preferences" sublabel="Dark mode, accessibility" 
                            action={<Toggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />}
                        />
                        <SettingsRow icon={FileText} label="Export Data" sublabel="Download your information" isLast />
                    </motion.div>

                    {/* ── Notifications ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.75)',
                            backdropFilter: 'blur(16px)',
                            borderRadius: '20px',
                            padding: '28px 28px 12px',
                            boxShadow: '0 4px 24px rgba(0, 51, 102, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)'
                        }}
                    >
                        <h2 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#003366' }}>
                            Notifications
                        </h2>
                        <SettingsRow icon={Mail} label="Email Notifications" sublabel="Deadline reminders, updates"
                            action={<Toggle enabled={emailNotifs} onToggle={() => setEmailNotifs(!emailNotifs)} />}
                        />
                        <SettingsRow icon={Bell} label="Push Notifications" sublabel="Browser & mobile alerts"
                            action={<Toggle enabled={pushNotifs} onToggle={() => setPushNotifs(!pushNotifs)} />}
                        />
                        <SettingsRow icon={FileText} label="Document Alerts" sublabel="When docs need attention" isLast />
                    </motion.div>

                    {/* ── Quick Links ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.26, ease: [0.215, 0.61, 0.355, 1] }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.75)',
                            backdropFilter: 'blur(16px)',
                            borderRadius: '20px',
                            padding: '28px 28px 12px',
                            boxShadow: '0 4px 24px rgba(0, 51, 102, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)'
                        }}
                    >
                        <h2 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '600', color: '#003366' }}>
                            Quick Links
                        </h2>
                        <div onClick={() => navigate('/chat')}>
                            <SettingsRow icon={FileText} label="Chat with LEGOL" sublabel="Ask immigration questions" />
                        </div>
                        <div onClick={() => navigate('/timeline')}>
                            <SettingsRow icon={BookOpen} label="My Timeline" sublabel="Track your immigration journey" />
                        </div>
                        <div onClick={() => navigate('/flowchart')}>
                            <SettingsRow icon={FileText} label="Document Flowchart" sublabel="Visualize your documents" isLast />
                        </div>
                    </motion.div>
                </div>

                {/* ─── Sign Out ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.32, ease: [0.215, 0.61, 0.355, 1] }}
                    style={{ marginTop: '24px', textAlign: 'center' }}
                >
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '14px 32px', borderRadius: '14px',
                            border: '1.5px solid rgba(220, 53, 69, 0.2)',
                            background: 'rgba(220, 53, 69, 0.04)',
                            color: '#dc3545', fontSize: '14px', fontWeight: '600',
                            cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'all 0.25s ease',
                            backdropFilter: 'blur(8px)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(220, 53, 69, 0.08)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(220, 53, 69, 0.04)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Account;

