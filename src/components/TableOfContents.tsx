"use client";

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('h2, h3'))
            .map((element) => ({
                id: element.id,
                text: element.textContent || '',
                level: Number(element.tagName.substring(1)),
            }));
        // eslint-disable-next-line
        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        elements.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className={styles.toc}>
            <h4 className={styles.title}>On this page</h4>
            <ul className={styles.list}>
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`${styles.item} ${styles[`level${heading.level}`]}`}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={activeId === heading.id ? styles.active : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                setActiveId(heading.id);
                                window.history.pushState(null, '', `#${heading.id}`);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
