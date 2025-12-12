import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocs } from '@/lib/docs';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';
import WelcomeHeader from '@/components/WelcomeHeader';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const docs = getAllDocs();
    return docs.map((slug) => ({
        slug,
    }));
}

export default async function DocPage({ params }: PageProps) {
    const { slug } = await params;
    const doc = getDocBySlug(slug);

    if (!doc) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: doc.meta.title,
        dateModified: doc.meta.lastUpdated,
        about: {
            '@type': 'DataFeed',
            name: 'Yahoo Feed Specifications',
        },
    };

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className={styles.content}>
                {slug === 'welcome-kit' ? (
                    <WelcomeHeader
                        title={doc.meta.title}
                        description="Your guide to getting started with Yahoo Feed Specifications."
                    />
                ) : (
                    <div className={styles.header}>
                        <h1 className={styles.title}>{doc.meta.title}</h1>
                        {doc.meta.lastUpdated && (
                            <p className={styles.meta}>
                                Last updated: {new Date(doc.meta.lastUpdated).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                )}
                <MarkdownRenderer content={doc.content} />
            </div>
            <aside className={styles.aside}>
                <TableOfContents />
            </aside>
        </div>
    );
}
