const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/&[a-z#0-9]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Adds ids to h2 headings and builds a table of contents from them.
function renderArticle(content) {
  const toc = [];
  const seen = new Set();
  let html = md.render(content);
  html = html.replace(/<h2>(.*?)<\/h2>/g, (match, inner) => {
    const text = inner.replace(/<[^>]+>/g, '');
    let id = slugifyHeading(text) || 'section';
    while (seen.has(id)) id += '-2';
    seen.add(id);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, toc, faq: extractFaq(content) };
}

// Reads the "Frequently asked questions" section: each ### question and the text under it.
function extractFaq(content) {
  const parts = content.split(/\n## Frequently asked questions[^\n]*\n/i);
  if (parts.length < 2) return [];
  const block = parts[1].split(/\n## /)[0];
  return block
    .split(/\n### /)
    .slice(1)
    .map((chunk) => {
      const [q, ...rest] = chunk.split('\n');
      return { q: q.trim(), a: rest.join(' ').replace(/\s+/g, ' ').trim() };
    })
    .filter((x) => x.a);
}

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');
const CASE_STUDY_DIR = path.join(__dirname, '..', 'content', 'case-studies');

/**
 * Frontmatter schema (all files in /content/blog and /content/case-studies):
 *
 * ---
 * title: "Post or case study title"
 * category: "Meta Ads"            (free-text tag shown on the card, e.g. channel or vertical)
 * type: "blog" | "case-study"     (must match the folder it lives in — used for filtering)
 * date: "2026-07-01"              (YYYY-MM-DD, used for sorting + display)
 * excerpt: "One-sentence summary shown on resource cards."
 * cover: "/images/blog/slug/cover.svg"  (optional — thumbnail shown on the resource card; falls back to a plain label if omitted)
 * ---
 *
 * Markdown body below the frontmatter becomes the article content.
 * The slug is the filename without .md (e.g. white-label-questions.md -> /resources/white-label-questions)
 */

function readDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => fs.statSync(path.join(dir, f)).size > 0)
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        category: data.category || '',
        type: data.type || (dir === CASE_STUDY_DIR ? 'case-study' : 'blog'),
        date: data.date || null,
        excerpt: data.excerpt || '',
        cover: data.cover || null,
        content,
        ...renderArticle(content)
      };
    });
}

function getAllContent() {
  const items = [...readDir(BLOG_DIR), ...readDir(CASE_STUDY_DIR)];
  items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  return items;
}

function getBySlug(slug) {
  const all = getAllContent();
  return all.find((item) => item.slug === slug) || null;
}

module.exports = { getAllContent, getBySlug };
