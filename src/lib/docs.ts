import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface DocMeta {
    title: string;
    date?: string;
    lastUpdated: string;
    [key: string]: any;
}

export function getDocBySlug(slug: string) {
    const fullPath = path.join(contentDirectory, `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const stats = fs.statSync(fullPath);
        const lastUpdated = data.last_updated_override
            ? new Date(data.last_updated_override).toISOString()
            : stats.mtime.toISOString();

        return {
            slug,
            meta: {
                ...data,
                lastUpdated,
            } as DocMeta,
            content,
        };
    } catch {
        return null;
    }
}

export function getAllDocs() {
    const fileNames = fs.readdirSync(contentDirectory);
    return fileNames.map((fileName) => {
        return fileName.replace(/\.md$/, '');
    });
}
