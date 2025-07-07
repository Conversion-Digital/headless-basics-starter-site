// scripts/copyThemeCss.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// 1. Load .env or .env.local
const envPath = fs.existsSync(path.resolve(process.cwd(), '.env'))
  ? path.resolve(process.cwd(), '.env')
  : fs.existsSync(path.resolve(process.cwd(), '.env.local'))
    ? path.resolve(process.cwd(), '.env.local')
    : null;
if (envPath) {
  dotenv.config({ path: envPath });
  console.log(`Loaded environment variables from ${envPath}`);
} else {
  console.warn('No .env or .env.local file found. Using process.env directly.');
}

// 2. Determine theme name
const siteTheme = process.env.SITE_THEME || 'default';

// 3. Define two possible source roots:
//    A) the published package in node_modules
//    B) a local dev checkout one level up
const pkgPath = path.resolve(
  process.cwd(),
  'node_modules/@conversiondigital/headless-basics-components/src/theme'
);
const devPath = path.resolve(
  __dirname,
  '../../headless-basics-components/src/theme'
);

let themeRoot;
if (fs.existsSync(pkgPath)) {
  themeRoot = pkgPath;
  console.log('Using node_modules package for headless-basics-components');
} else if (fs.existsSync(devPath)) {
  themeRoot = devPath;
  console.log('Using local dev checkout for headless-basics-components');
} else {
  console.error(
    'Could not find headless-basics-components in node_modules or ../../headless-basics-components'
  );
  process.exit(1);
}

// 4. Build source and destination paths
const srcDir = path.join(themeRoot, siteTheme, 'styles');
const fontsSrcPath = path.join(themeRoot, siteTheme, 'styles/fonts/fontsGlobalStyle.tsx');
const configSrcPath = path.join(themeRoot, siteTheme, 'tailwind.config.js');

const destDir = path.resolve(process.cwd(), 'theme/styles/component-lib-transfer');
const fontsDestPath = path.resolve(process.cwd(), 'theme/styles/fonts/fontsGlobalStyle.tsx');
const configDestPath = path.resolve(process.cwd(), 'theme/styles/tailwind.config.js');

console.log(`Copying theme CSS for "${siteTheme}"...`);
console.log(` → srcDir:    ${srcDir}`);
console.log(` → destDir:   ${destDir}`);
console.log(` → configSrc: ${configSrcPath}`);
console.log(` → configDst: ${configDestPath}`);

try {
  // ensure destination exists
  fs.mkdirSync(destDir, { recursive: true });

  // copy all .css files
  const files = fs.readdirSync(srcDir);
  const cssFiles = files.filter((f) => f.toLowerCase().endsWith('.css'));
  if (cssFiles.length) {
    cssFiles.forEach((file) => {
      const from = path.join(srcDir, file);
      const to = path.join(destDir, file);
      fs.copyFileSync(from, to);
      console.log(`  ✔ copied ${file}`);
    });
  } else {
    console.warn('  ⚠ no .css files found to copy');
  }

  // copy tailwind.config.js
  if (fs.existsSync(configSrcPath)) {
    fs.mkdirSync(path.dirname(configDestPath), { recursive: true });
    fs.copyFileSync(configSrcPath, configDestPath);
    console.log('  ✔ copied tailwind.config.js');
  } else {
    console.warn('  ⚠ no tailwind.config.js found to copy');
  }

  // copy fontsGlobalStyle.tsx
  if (fs.existsSync(fontsSrcPath)) {
    fs.mkdirSync(path.dirname(fontsDestPath), { recursive: true });
    fs.copyFileSync(fontsSrcPath, fontsDestPath);
    console.log('  ✔ copied fontsGlobalStyle.tsx');
  } else {
    console.warn('  ⚠ no fontsGlobalStyle.tsx found to copy');
  }
} catch (err) {
  console.error('Error copying theme files:', err);
  process.exit(1);
}
