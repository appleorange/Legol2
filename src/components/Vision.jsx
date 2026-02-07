import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VisionItem = ({ text, range }) => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, range, [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, range, [50, 0, 0, -50]);
    const blur = useTransform(scrollYProgress, range, ['10px', '0px', '0px', '10px']);

    return (
        <motion.h2 style={{
            opacity,
            y,
            filter: useTransform(blur, b => `blur(${b})`),
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            textAlign: 'center',
            fontSize: '48px',
            fontWeight: '500',
            color: '#1E272D',
            padding: '0 20px',
            margin: 0,
            transform: 'translateY(-50%)'
        }}>
            {text}
        </motion.h2>
    );
};

const Vision = () => {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} style={{ height: '300vh', position: 'relative', background: '#F6F8FA' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                <VisionItem
                    text="Navigating visas, military service, and work authorization involves 50+ fragmented steps..."
                    range={[0.1, 0.3, 0.4, 0.6]}
                />
                <VisionItem
                    text="MOSAIC unifies them into a single, intelligent knowledge graph."
                    range={[0.4, 0.6, 0.7, 0.9]}
                />
                <VisionItem
                    text="We anticipate conflicts, map dependencies, and clarify your path forward."
                    range={[0.7, 0.9, 0.95, 1]}
                />
            </div>
        </section>
    );
};

export default Vision;
