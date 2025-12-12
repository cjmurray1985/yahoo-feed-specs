import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
    const contentDir = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(contentDir);

    const posts = files
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
            const slug = file.replace(/\.md$/, '');
            return {
                url: `https://yahoo-feed-specs.vercel.app/docs/${slug}`,
                lastModified: fs.statSync(path.join(contentDir, file)).mtime,
                changeFrequency: 'weekly' as const,
                priority: 1,
            };
        });

    return [
        {
            url: 'https://yahoo-feed-specs.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...posts,
    ];
}
