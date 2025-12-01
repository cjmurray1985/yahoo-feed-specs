import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getDocBySlug(slug: string) {
    const fullPath = path.join(contentDirectory, `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            meta: data,
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
