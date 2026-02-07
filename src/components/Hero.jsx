import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Calendar, FileText, Landmark } from 'lucide-react';

/* ─── Staggered letter reveal (exat-style) ─── */
const RevealText = ({ text, delay = 0, className, style }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <span ref={ref} style={{ ...style, display: 'inline-block', overflow: 'hidden' }} className={className}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : {}}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.025,
                        ease: [0.215, 0.61, 0.355, 1]
                    }}
                    style={{ display: 'inline-block', willChange: 'transform' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
};

/* ─── Reveal block (fade + slide up) ─── */
const RevealBlock = ({ children, delay = 0, style }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref} style={{ overflow: 'hidden', ...style }}>
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                    duration: 0.9,
                    delay,
                    ease: [0.215, 0.61, 0.355, 1]
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

/* ─── Horizontal marquee strip (exat-style) ─── */
const Marquee = ({ items, speed = 30, reverse = false }) => (
    <div style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100vw',
        position: 'relative',
        marginLeft: '-64px',
        marginRight: '-64px'
    }}>
        <div style={{
            display: 'inline-flex',
            animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite`,
            willChange: 'transform'
        }}>
            {[...items, ...items, ...items].map((item, i) => (
                <span key={i} style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'rgba(255,255,255,0.18)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '0 32px',
                    flexShrink: 0
                }}>
                    {item}
                </span>
            ))}
        </div>
    </div>
);

/* ─── Navbar ─── */
const Navbar = () => {
    const navigate = useNavigate();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '32px 64px',
                width: '100%',
                position: 'absolute',
                top: 0,
                zIndex: 20,
                boxSizing: 'border-box'
            }}
        >
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#003366' }}>LEGOL</div>

            <div style={{
                background: 'rgba(230, 235, 240, 0.6)',
                backdropFilter: 'blur(10px)',
                padding: '4px 6px',
                borderRadius: '100px',
                display: 'flex',
                gap: '4px'
            }}>
                {['Home', 'Chat', 'Timeline', 'Resources'].map((item, i) => (
                    <div key={item}
                        onClick={() => {
                            if (item === 'Home') navigate('/');
                            if (item === 'Chat') navigate('/chat');
                            if (item === 'Timeline') navigate('/timeline');
                            if (item === 'Resources') navigate('/resources');
                        }}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '100px',
                            fontSize: '14px',
                            fontWeight: i === 0 ? '600' : '500',
                            color: i === 0 ? '#003366' : '#64748b',
                            cursor: 'pointer',
                            background: i === 0 ? '#FFFFFF' : 'transparent',
                            boxShadow: i === 0 ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.3s ease'
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
        </motion.nav>
    );
};

/* ─── Feature Card with stagger ─── */
const FeatureCard = ({ icon: Icon, title, subtitle, route, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const navigate = useNavigate();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
            }}
            onClick={() => route && navigate(route)}
            style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                minHeight: '200px',
                justifyContent: 'space-between',
                cursor: route ? 'pointer' : 'default',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(0, 51, 102, 0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
            }}
        >
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={20} color="#334155" />
            </div>

            <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, marginTop: '8px', lineHeight: '1.5' }}>{subtitle}</p>
            </div>
        </motion.div>
    );
};

/* ─── Scroll indicator ─── */
const ScrollIndicator = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10
        }}
    >
        <span style={{
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(0, 51, 102, 0.35)',
            fontWeight: '500'
        }}>
            Scroll to explore
        </span>
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                width: '1px',
                height: '32px',
                background: 'linear-gradient(to bottom, rgba(0,51,102,0.3), transparent)'
            }}
        />
    </motion.div>
);

/* ─── MAIN HERO ─── */

const MARQUEE_ITEMS_1 = ['Citizenship', 'Green Cards', 'Work Visas', 'H-1B', 'Naturalization', 'Dual Nationality', 'Travel Documents', 'Immigration', 'USCIS'];
const MARQUEE_ITEMS_2 = ['Document Filing', 'Biometrics', 'Background Check', 'Consulate Interview', 'Status Monitoring', 'Visa Stamping', 'Compliance', 'Tax Filing'];

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 600], [0, 120]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const marqueeOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const cardsY = useTransform(scrollY, [200, 700], [0, -40]);

    return (
        <section ref={containerRef} style={{
            minHeight: '160vh',
            position: 'relative',
            overflow: 'hidden',
            background: '#FFFFFF'
        }}>
            {/* CSS Keyframes for marquee */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                @keyframes marqueeReverse {
                    0% { transform: translateX(-33.333%); }
                    100% { transform: translateX(0); }
                }
            `}</style>

            {/* Background Gradient Blob */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.95, scale: 1 }}
                transition={{ duration: 1.8, ease: [0.215, 0.61, 0.355, 1] }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '120vw',
                    height: '120vh',
                    background: 'radial-gradient(circle, #003366 0%, rgba(0, 51, 102, 0.8) 50%, rgba(0, 51, 102, 0) 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0,
                    transform: 'rotate(-10deg)'
                }}
            />
            {/* Secondary lighter blur */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '40vw',
                height: '40vh',
                background: '#818cf8',
                filter: 'blur(120px)',
                opacity: 0.1,
                zIndex: 0
            }} />

            <Navbar />

            <div style={{
                position: 'relative',
                zIndex: 10,
                paddingTop: '200px',
                paddingLeft: '64px',
                paddingRight: '64px',
                maxWidth: '1440px',
                margin: '0 auto'
            }}>
                {/* ─── Hero Text with letter-by-letter animation ─── */}
                <motion.div style={{ y, opacity, marginBottom: '60px' }}>
                    <div style={{
                        fontSize: '96px',
                        fontWeight: '400',
                        lineHeight: '1.1',
                        color: '#FFFFFF',
                        marginBottom: '40px',
                        letterSpacing: '-2px'
                    }}>
                        <div style={{ overflow: 'hidden' }}>
                            <RevealText text="One Platform." delay={0.5} />
                        </div>
                        <div style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
                            <RevealText text="Every Piece, " delay={0.9} style={{ opacity: 0.9 }} />
                            <RevealText text="Pieced." delay={1.3} style={{ fontStyle: 'italic', fontWeight: '500' }} />
                        </div>
                    </div>

                    <RevealBlock delay={1.8}>
                        <p style={{
                            fontSize: '18px',
                            color: 'rgba(255,255,255,0.55)',
                            maxWidth: '500px',
                            lineHeight: '1.7',
                            margin: 0,
                            marginBottom: '32px'
                        }}>
                            Navigate immigration with clarity. One platform for every visa, document, and deadline.
                        </p>
                    </RevealBlock>

                    <RevealBlock delay={2.0}>
                        <button
                            style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                color: '#003366',
                                border: 'none',
                                padding: '16px 32px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                        >
                            Get Started →
                        </button>
                    </RevealBlock>
                </motion.div>

                {/* ─── Marquee Strips (exat-style) ─── */}
                <motion.div style={{ opacity: marqueeOpacity, marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Marquee items={MARQUEE_ITEMS_1} speed={35} />
                        <Marquee items={MARQUEE_ITEMS_2} speed={40} reverse />
                    </div>
                </motion.div>

                {/* ─── Feature Grid with staggered reveal ─── */}
                <motion.div style={{ y: cardsY, paddingBottom: '100px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '24px'
                    }}>
                        <FeatureCard
                            icon={MessageSquare}
                            title="AI Chat Assistant"
                            subtitle="Get instant answers about immigration law, visa requirements, and document needs."
                            route="/chat"
                            index={0}
                        />
                        <FeatureCard
                            icon={Calendar}
                            title="Timeline Planner"
                            subtitle="Track every milestone and deadline in your immigration journey."
                            route="/timeline"
                            index={1}
                        />
                        <FeatureCard
                            icon={FileText}
                            title="Document Manager"
                            subtitle="Organize, verify, and track all required documents in one place."
                            route="/chat"
                            index={2}
                        />
                        <FeatureCard
                            icon={Landmark}
                            title="Agency Resources"
                            subtitle="Direct access to USCIS, State Department, and every agency you need."
                            route="/resources"
                            index={3}
                        />
                    </div>
                </motion.div>
            </div>

            <ScrollIndicator />
        </section>
    );
};

export default Hero;
