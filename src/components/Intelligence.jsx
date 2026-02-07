import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Intelligence = ({ children }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    // Iris/Aperture effect
    // Clip path circle expands from 0% to 150% radius
    const clipPath = useTransform(scrollYProgress, [0, 1], [
        'circle(0% at 50% 50%)',
        'circle(150% at 50% 50%)'
    ]);

    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} style={{ height: '150vh', position: 'relative', background: '#F6F8FA' }}>
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', zIndex: 1, textAlign: 'center', pointerEvents: 'none' }}>
                    <h2 style={{ fontSize: '24px', letterSpacing: '4px', textTransform: 'uppercase', color: '#1E272D', marginBottom: '20px' }}>
                        MOSAIC Intelligence Layer
                    </h2>
                    <p style={{ color: '#666' }}>Scroll to Access</p>
                </div>

                <motion.div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: '#fff', // Or graph background
                    clipPath,
                    zIndex: 2
                }}>
                    {/* The Graph Component is passed as children */}
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

export default Intelligence;
