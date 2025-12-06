"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import styles from './Sidebar.module.css';
import clsx from 'clsx';

const navItems = [
    { label: 'Welcome Kit', href: '/docs/welcome-kit' },
    { label: 'Article Ingestion', href: '/docs/article-ingestion' },
    { label: 'Video Ingestion', href: '/docs/video-ingestion' },
    { label: 'Slideshow Ingestion', href: '/docs/slideshow-ingestion' },
    { label: 'Brand Specifications', href: '/docs/brand-specifications' },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={clsx(styles.overlay, { [styles.overlayOpen]: isOpen })}
                onClick={onClose}
            />

            <nav className={clsx(styles.nav, { [styles.navOpen]: isOpen })}>
                <div className={styles.mobileHeader}>
                    <span className={styles.mobileTitle}>Menu</span>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>
                <ul className={styles.list}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={clsx(styles.link, { [styles.active]: pathname === item.href })}
                                onClick={onClose}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
