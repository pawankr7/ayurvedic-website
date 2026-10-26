import fs from 'fs';
import path from 'path';
import { CATEGORIES } from '../src/data/categories';
import { PRODUCTS } from '../src/data/products';
import { BATCH_REPORTS } from '../src/data/batches';
import { CLAIMS_REGISTRY } from '../src/data/claimsCompliance';
import { DOCTORS_VAIDYAS } from '../src/data/doctors';
import { BLOG_POSTS, INGREDIENT_ENCYCLOPEDIA } from '../src/data/blogs';
import { PRAKRITI_QUESTIONS, PRIMARY_CONCERNS } from '../src/data/quizQuestions';
import { DICTIONARY } from '../src/data/translations';

const outDir = path.join(__dirname, '../database/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'categories.json'), JSON.stringify(CATEGORIES, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'products.json'), JSON.stringify(PRODUCTS, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'batches.json'), JSON.stringify(BATCH_REPORTS, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'claims.json'), JSON.stringify(CLAIMS_REGISTRY, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'doctors.json'), JSON.stringify(DOCTORS_VAIDYAS, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'blogs.json'), JSON.stringify(BLOG_POSTS, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'ingredients.json'), JSON.stringify(INGREDIENT_ENCYCLOPEDIA, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'quiz_questions.json'), JSON.stringify(PRAKRITI_QUESTIONS, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'quiz_concerns.json'), JSON.stringify(PRIMARY_CONCERNS, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'translations.json'), JSON.stringify(DICTIONARY, null, 2), 'utf8');

console.log('✅ Successfully exported all datasets to JSON in database/data/');
