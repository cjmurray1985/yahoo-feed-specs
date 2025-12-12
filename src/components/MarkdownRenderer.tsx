import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './CopyButton';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className={styles.markdown}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeRaw,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                ]}
                components={{
                    h1: ({ node, ...props }) => <h1 className={styles.h1} {...props} />,
                    h2: ({ node, ...props }) => <h2 className={styles.h2} {...props} />,
                    h3: ({ node, ...props }) => <h3 className={styles.h3} {...props} />,
                    h4: ({ node, ...props }) => <h4 className={styles.h4} {...props} />,
                    h5: ({ node, ...props }) => <h5 className={styles.h5} {...props} />,
                    h6: ({ node, ...props }) => <h6 className={styles.h6} {...props} />,
                    p: ({ node, ...props }) => <p className={styles.p} {...props} />,
                    ul: ({ node, ...props }) => <ul className={styles.ul} {...props} />,
                    ol: ({ node, ...props }) => <ol className={styles.ol} {...props} />,
                    li: ({ node, ...props }) => <li className={styles.li} {...props} />,
                    a: ({ node, ...props }) => {
                        if (props.children && props.children.toString() === 'Learn more') {
                            return (
                                <a className="cta-button" aria-label="Learn more" {...props}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>
                            );
                        }
                        return <a className={styles.a} {...props} />;
                    },
                    code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !match && !String(children).includes('\n');

                        if (isInline) {
                            return (
                                <code className="bg-gray-100 text-pink-600 rounded px-1 py-0.5 font-mono text-sm break-words whitespace-pre-wrap" {...props}>
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <div className={`rounded-lg shadow-sm my-4 overflow-hidden border border-gray-700 ${styles.codeBlockWrapper}`}>
                                {match && (
                                    <div className="bg-[#1e1e1e] px-4 py-2 text-xs font-bold uppercase text-gray-400 select-none border-b border-gray-700 flex justify-between items-center">
                                        <span>{match[1]}</span>
                                        <CopyButton text={String(children).replace(/\n$/, '')} />
                                    </div>
                                )}
                                <SyntaxHighlighter
                                    style={vscDarkPlus as any}
                                    language={match ? match[1] : undefined}
                                    PreTag="div"
                                    customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.875rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                                    codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}
                                    wrapLongLines={true}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        );
                    },
                    pre: ({ children }) => <>{children}</>,
                    table: ({ node, ...props }) => <div className={`${styles.tableWrapper} spec-table`}><table className={styles.table} {...props} /></div>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
