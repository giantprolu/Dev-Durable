/**
 * Migration script to move file-based content to database
 *
 * Run with: npx tsx scripts/migrate-content.ts
 *
 * This script will:
 * 1. Read existing markdown articles and migrate to Article table
 * 2. Read page JSON files and migrate to PageContent table
 * 3. Read settings JSON and migrate to SiteSetting table
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

function parseMarkdownFrontmatter(content: string): { frontmatter: ArticleFrontmatter; body: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    throw new Error('Invalid markdown file format');
  }

  const frontmatterStr = frontmatterMatch[1];
  const body = frontmatterMatch[2].trim();

  const frontmatter: Partial<ArticleFrontmatter> = {};

  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n');
  let currentKey = '';
  let arrayValues: string[] = [];
  let inArray = false;

  for (const line of lines) {
    if (line.match(/^\w+:/)) {
      if (inArray && currentKey) {
        (frontmatter as any)[currentKey] = arrayValues;
        arrayValues = [];
        inArray = false;
      }

      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      currentKey = key.trim();

      if (value === '') {
        inArray = true;
      } else if (value.startsWith('[')) {
        // Inline array
        const arrayMatch = value.match(/\[(.*)\]/);
        if (arrayMatch) {
          (frontmatter as any)[currentKey] = arrayMatch[1]
            .split(',')
            .map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      } else {
        (frontmatter as any)[currentKey] = value.replace(/^["']|["']$/g, '');
      }
    } else if (inArray && line.match(/^\s*-\s*/)) {
      arrayValues.push(line.replace(/^\s*-\s*/, '').trim().replace(/^["']|["']$/g, ''));
    }
  }

  if (inArray && currentKey) {
    (frontmatter as any)[currentKey] = arrayValues;
  }

  return { frontmatter: frontmatter as ArticleFrontmatter, body };
}

async function migrateArticles() {
  console.log('Migrating articles...');
  const articlesDir = path.join(CONTENT_DIR, 'articles');

  if (!fs.existsSync(articlesDir)) {
    console.log('No articles directory found');
    return;
  }

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} article files`);

  // Get the first admin user to set as author
  const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!adminUser) {
    console.log('No admin user found. Please create an admin user first.');
    return;
  }

  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const slug = file.replace('.md', '');

    try {
      const { frontmatter, body } = parseMarkdownFrontmatter(content);

      // Check if already exists
      const existing = await prisma.article.findUnique({ where: { slug } });
      if (existing) {
        console.log(`  Skipping ${slug} (already exists)`);
        continue;
      }

      await prisma.article.create({
        data: {
          title: frontmatter.title,
          slug,
          description: frontmatter.description,
          content: body,
          image: frontmatter.image,
          imageAlt: frontmatter.imageAlt,
          tags: frontmatter.tags,
          published: true,
          authorId: adminUser.id,
          createdAt: new Date(frontmatter.date),
        },
      });

      console.log(`  Migrated: ${slug}`);
    } catch (error) {
      console.error(`  Error migrating ${file}:`, error);
    }
  }
}

async function migratePages() {
  console.log('\nMigrating pages...');
  const pagesDir = path.join(CONTENT_DIR, 'pages');

  if (!fs.existsSync(pagesDir)) {
    console.log('No pages directory found');
    return;
  }

  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} page files`);

  for (const file of files) {
    const filePath = path.join(pagesDir, file);
    const slug = file.replace('.json', '');

    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Upsert the page
      await prisma.pageContent.upsert({
        where: { slug },
        update: { content },
        create: { slug, content },
      });

      console.log(`  Migrated: ${slug}`);
    } catch (error) {
      console.error(`  Error migrating ${file}:`, error);
    }
  }
}

async function migrateSettings() {
  console.log('\nMigrating settings...');
  const settingsFile = path.join(CONTENT_DIR, 'settings', 'general.json');

  if (!fs.existsSync(settingsFile)) {
    console.log('No settings file found');
    return;
  }

  try {
    const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
    console.log(`Found ${Object.keys(settings).length} settings`);

    for (const [key, value] of Object.entries(settings)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
      console.log(`  Migrated: ${key}`);
    }
  } catch (error) {
    console.error('Error migrating settings:', error);
  }
}

async function main() {
  console.log('Starting content migration...\n');

  await migrateArticles();
  await migratePages();
  await migrateSettings();

  console.log('\nMigration complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
