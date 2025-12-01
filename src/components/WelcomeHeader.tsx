import React from 'react';
import Image from 'next/image';
import styles from './WelcomeHeader.module.css';

interface WelcomeHeaderProps {
    title: string;
    description?: string;
}

export default function WelcomeHeader({ title, description }: WelcomeHeaderProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                {description && <p className={styles.description}>{description}</p>}
            </div>
            <div className={styles.imageContainer}>
                <Image
                    src="/images/welcome-kit-header.png"
                    alt="Welcome Kit Illustration"
                    width={500}
                    height={400}
                    className={styles.image}
                    priority
                />
            </div>
        </div>
    );
}
