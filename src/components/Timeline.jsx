import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

/* ─── Navbar ─── */
const Navbar = ({ activePage = 'Timeline' }) => {
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
                            fontWeight: item === activePage ? '600' : '500',
                            color: item === activePage ? '#003366' : '#64748b',
                            cursor: 'pointer',
                            background: item === activePage ? '#FFFFFF' : 'transparent',
                            boxShadow: item === activePage ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (item !== activePage) {
                                e.currentTarget.style.color = '#003366';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (item !== activePage) {
                                e.currentTarget.style.color = '#64748b';
                                e.currentTarget.style.background = 'transparent';
                            }
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
                >Sign In</span>
                <button
                    onClick={() => navigate('/login')}
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

/* ─── Timeline Item ─── */
const TimelineItem = ({ item, isLast, isCompleted }) => {
    return (
        <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
            {/* Vertical line */}
            {!isLast && (
                <div style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50px',
                    width: '2px',
                    height: 'calc(100% - 50px)',
                    background: 'rgba(0, 51, 102, 0.15)'
                }} />
            )}

            {/* Icon circle */}
            <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isCompleted ? '#28a745' : 'rgba(0, 51, 102, 0.1)',
                border: `2px solid ${isCompleted ? '#28a745' : 'rgba(0, 51, 102, 0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 10,
                marginTop: '2px'
            }}>
                {isCompleted
                    ? <CheckCircle size={20} color="white" />
                    : <Clock size={18} color="#003366" />
                }
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingTop: '4px', paddingBottom: '24px' }}>
                <h3 style={{
                    margin: '0 0 8px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1E272D'
                }}>
                    {item.title}
                </h3>
                <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.5'
                }}>
                    {item.description}
                </p>
                {item.dueDate && (
                    <div style={{
                        fontSize: '13px',
                        color: '#dc3545',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <AlertCircle size={14} />
                        Due: {item.dueDate}
                    </div>
                )}
                {item.relatedDocuments && item.relatedDocuments.length > 0 && (
                    <div style={{ marginTop: '12px', paddingLeft: '12px', borderLeft: '2px solid rgba(0, 51, 102, 0.1)' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#003366', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Resources:
                        </span>
                        <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {item.relatedDocuments.map((doc, idx) => (
                                <span key={idx} style={{
                                    fontSize: '12px',
                                    background: 'rgba(0, 51, 102, 0.08)',
                                    color: '#003366',
                                    padding: '4px 10px',
                                    borderRadius: '6px'
                                }}>
                                    {doc}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─── Helper: Extract milestones from actual chat content ─── */
const extractMilestones = (messages, studentCountry, institution, topic) => {
    const extracted = [];
    const seen = new Set();

    // Combine all assistant responses to analyze
    const assistantResponses = messages
        .filter(msg => msg.role === 'assistant')
        .map(msg => msg.text.toLowerCase())
        .join('\n');

    const userMessages = messages
        .filter(msg => msg.role === 'user')
        .map(msg => msg.text.toLowerCase())
        .join('\n');

    const allText = assistantResponses + '\n' + userMessages;

    // Comprehensive milestone patterns - includes immigration, financial, documents, etc
    const milestonePatterns = [
        {
            keywords: ['f-1', 'f1 student', 'student visa', 'opt', 'practical training'],
            title: 'F-1 Student Visa',
            description: 'Complete F-1 student visa requirements and documentation',
            relatedDocuments: ['Passport', 'I-20 Form', 'Financial Documentation', 'SEVIS Fee Receipt'],
            category: 'visa'
        },
        {
            keywords: ['work visa', 'h-1b', 'employment visa', 'sponsor', 'work authorization'],
            title: 'Secure Work Visa',
            description: 'Obtain employer sponsorship and file for work visa (H-1B or similar)',
            relatedDocuments: ['Employment Letter', 'Job Offer', 'H-1B Petition', 'Passport'],
            category: 'visa'
        },
        {
            keywords: ['green card', 'permanent resident', 'i-485', 'permanent residency', 'green card'],
            title: 'Apply for Green Card',
            description: 'File for permanent residency status',
            relatedDocuments: ['I-485 Form', 'Medical Exam (I-693)', 'Birth Certificate', 'Marriage Certificate'],
            category: 'visa'
        },
        {
            keywords: ['naturalization', 'citizenship', 'form n-400', 'citizen'],
            title: 'File for Citizenship',
            description: 'Complete naturalization application and take citizenship test',
            relatedDocuments: ['Form N-400', 'Birth Certificate', 'Passport', 'Green Card'],
            category: 'visa'
        },
        {
            keywords: ['financial support', 'financial aid', 'scholarship', 'fafsa', 'loans', 'grants', 'tuition'],
            title: 'Secure Financial Support',
            description: 'Explore scholarships, grants, federal aid, and loans to fund your education',
            relatedDocuments: ['FAFSA Application', 'Scholarship Applications', 'Bank Statements', 'Tax Returns', 'CMU Financial Aid Forms'],
            category: 'financial'
        },
        {
            keywords: ['background check', 'fbi', 'criminal', 'police clearance'],
            title: 'Complete Background Check',
            description: 'Pass FBI criminal background check and police clearance',
            relatedDocuments: ['FBI Background Check', 'Police Clearance Certificate'],
            category: 'documents'
        },
        {
            keywords: ['tax return', 'irs', 'income tax', '1040', 'tax documentation'],
            title: 'Submit Tax Documentation',
            description: 'File required federal tax returns and transcripts',
            relatedDocuments: ['Tax Returns (Last 5 Years)', 'W-2 Forms', 'IRS Transcripts'],
            category: 'documents'
        },
        {
            keywords: ['marriage certificate', 'spouse', 'married', 'dependent'],
            title: 'Verify Marriage Documentation',
            description: 'Submit certified marriage certificate if applicable',
            relatedDocuments: ['Marriage Certificate', 'Spouse Passport', 'Birth Certificate'],
            category: 'documents'
        },
        {
            keywords: ['medical exam', 'i-693', 'vaccination', 'physical', 'health check'],
            title: 'Complete Medical Examination',
            description: 'Get required medical exam by USCIS-approved physician',
            relatedDocuments: ['Medical Exam (I-693)', 'Vaccination Records', 'Birth Certificate'],
            category: 'documents'
        },
        {
            keywords: ['employment verification', 'employment letter', 'job offer'],
            title: 'Obtain Employment Verification',
            description: 'Get official letter from current or prospective employer',
            relatedDocuments: ['Employment Letter', 'Job Offer Letter', 'Company Registration'],
            category: 'documents'
        }
    ];

    // Check if milestones are mentioned in the conversation
    milestonePatterns.forEach(pattern => {
        const mentioned = pattern.keywords.some(keyword => allText.includes(keyword));

        if (mentioned && !seen.has(pattern.title)) {
            extracted.push({
                ...pattern,
                completed: false
            });
            seen.add(pattern.title);
        }
    });

    // Add personalization header if user provided context
    if (studentCountry && institution) {
        const header = {
            title: `Immigration & Education Plan for ${studentCountry}`,
            description: `International student from ${studentCountry} studying at ${institution}. Your personalized action items below.`,
            relatedDocuments: [],
            completed: false,
            isHeader: true
        };
        extracted.unshift(header);
    }

    // Default message if nothing extracted
    if (extracted.length === 0 || (extracted.length === 1 && extracted[0].isHeader)) {
        return [
            {
                title: 'Start Your Immigration Journey',
                description: 'Chat with LEGOL to understand your visa, financial aid, and immigration requirements. Ask about your situation and we\'ll create a personalized timeline.',
                relatedDocuments: [],
                completed: false
            }
        ];
    }

    return extracted;
};

/* ─── Main Timeline Page ─── */
const Timeline = () => {
    const navigate = useNavigate();
    const { messages, studentCountry, institution, topic } = useChatContext();

    // Extract milestones based on actual chat content
    const milestones = useMemo(() => {
        return extractMilestones(messages, studentCountry, institution, topic);
    }, [messages, studentCountry, institution, topic]);

    return (
        <div style={{
            height: '100vh',
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

            <Navbar activePage="Timeline" />

            {/* ─── Main Content ─── */}
            <div style={{
                flex: 1,
                position: 'relative',
                zIndex: 10,
                paddingTop: '110px',
                paddingBottom: '32px',
                paddingLeft: '64px',
                paddingRight: '64px',
                maxWidth: '1000px',
                width: '100%',
                margin: '0 auto',
                boxSizing: 'border-box',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{ marginBottom: '48px' }}>
                    <h1 style={{
                        margin: '0 0 12px 0',
                        fontSize: '36px',
                        fontWeight: '700',
                        color: '#003366'
                    }}>
                        Your Immigration Timeline
                    </h1>
                    <p style={{
                        margin: 0,
                        fontSize: '16px',
                        color: '#64748b'
                    }}>
                        {studentCountry && institution
                            ? `${studentCountry} student • ${institution}`
                            : 'Chat to personalize your timeline'}
                    </p>
                </div>

                {/* Timeline */}
                <div style={{
                    overflowY: 'auto',
                    paddingRight: '12px',
                    maxHeight: 'calc(100vh - 260px)'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '24px',
                        padding: '40px 36px',
                        boxShadow: '0 4px 20px rgba(0, 51, 102, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)'
                    }}>
                        {milestones.map((milestone, idx) => (
                            <TimelineItem
                                key={idx}
                                item={milestone}
                                isLast={idx === milestones.length - 1}
                                isCompleted={milestone.completed}
                            />
                        ))}

                        {/* CTA at bottom */}
                        <div style={{
                            marginTop: '32px',
                            paddingTop: '32px',
                            borderTop: '1px solid rgba(0, 51, 102, 0.1)',
                            textAlign: 'center'
                        }}>
                            <p style={{
                                margin: '0 0 16px 0',
                                fontSize: '15px',
                                color: '#64748b'
                            }}>
                                Want to update your timeline?
                            </p>
                            <button
                                onClick={() => navigate('/chat')}
                                style={{
                                    padding: '12px 28px',
                                    background: '#003366',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 12px rgba(0, 51, 102, 0.2)',
                                    transition: 'all 0.2s ease',
                                    fontFamily: 'inherit'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 51, 102, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 51, 102, 0.2)';
                                }}
                            >
                                Go to Chat
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
