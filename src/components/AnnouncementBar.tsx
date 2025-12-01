"use client";

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dismissed = localStorage.getItem('announcement-dismissed');
        if (dismissed === 'true') {
            setIsVisible(false);
        }
    }, []);

    useEffect(() => {
        const updateHeight = () => {
            if (barRef.current && isVisible) {
                const height = barRef.current.offsetHeight;
                document.documentElement.style.setProperty('--announcement-height', `${height}px`);
            } else {
                document.documentElement.style.setProperty('--announcement-height', '0px');
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [isVisible]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('announcement-dismissed', 'true');
        document.documentElement.style.setProperty('--announcement-height', '0px');
    };

    if (!isVisible) return null;

    return (
        <div ref={barRef} className={styles.bar}>
            <div className={styles.content}>
                <span className={styles.badge}>NEW</span>
                <span className={styles.message}>
                    Welcome to the new Yahoo Feed Specifications. <a href="/docs/whats-new" className={styles.link}>Catch up on the latest.</a>
                </span>
            </div>
            <button onClick={handleDismiss} className={styles.closeButton} aria-label="Dismiss announcement">
                <X size={18} />
            </button>
        </div>
    );
}
