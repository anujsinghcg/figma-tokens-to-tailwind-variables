// const fs = require('fs');
// const path = require('path');

// const tokens = require('../tokens/tokens.json');

// const cssVars = [];
// const tailwindExtend = { theme: { extend: {} } };
// const angularTheme = [];

// for (const [category, values] of Object.entries(tokens)) {
//   for (const [key, { value }] of Object.entries(values)) {
//     const varName = `--${category}-${key}`;
//     cssVars.push(`${varName}: ${value};`);

//     // Tailwind extension
//     if (!tailwindExtend.theme.extend[category]) {
//       tailwindExtend.theme.extend[category] = {};
//     }
//     tailwindExtend.theme.extend[category][key] = value;

//     // Angular Material theme override (simplified)
//     if (category === 'color') {
//       angularTheme.push(`$${key}: ${value};`);
//     }
//   }
// }

// // Write CSS variables
// fs.writeFileSync(
//   path.join(__dirname, '../src/styles/design-tokens.css'),
//   `:root {\n  ${cssVars.join('\n  ')}\n}`
// );

// // Write Tailwind config extension
// fs.writeFileSync(
//   path.join(__dirname, '../tailwind.tokens.js'),
//   `module.exports = ${JSON.stringify(tailwindExtend, null, 2)};`
// );

// // Write Angular Material theme overrides
// fs.writeFileSync(
//   path.join(__dirname, '../src/styles/angular-material-theme.scss'),
//   angularTheme.join('\n')
// );

// console.log('✅ Tokens built successfully.');


// const fs = require('fs');
// const path = require('path');

// const tokens = require('../tokens/tokens.json');

// const cssVars = [];
// const tailwindExtend = { theme: { extend: {} } };
// const angularTheme = [];

// for (const [categoryPath, values] of Object.entries(tokens)) {
//   // Normalize category name by replacing slashes with hyphens
//   const category = categoryPath.replace(/\//g, '-').toLowerCase();

//   if (!tailwindExtend.theme.extend[category]) {
//     tailwindExtend.theme.extend[category] = {};
//   }

//   for (const [key, value] of Object.entries(values)) {
//     const varName = `--${category}-${key.replace(/\s+/g, '-').toLowerCase()}`;
//     cssVars.push(`${varName}: ${value};`);

//     // Tailwind extension
//     tailwindExtend.theme.extend[category][key.replace(/\s+/g, '-').toLowerCase()] = value;

//     // Angular Material theme override (only for color categories)
//     if (category.includes('color')) {
//       angularTheme.push(`$${key.replace(/\s+/g, '-').toLowerCase()}: ${value};`);
//     }
//   }
// }

// // Write CSS variables
// fs.writeFileSync(
//   path.join(__dirname, '../src/styles/design-tokens.css'),
//   `:root {\n  ${cssVars.join('\n  ')}\n}`
// );

// // Write Tailwind config extension
// fs.writeFileSync(
//   path.join(__dirname, '../tailwind.tokens.js'),
//   `module.exports = ${JSON.stringify(tailwindExtend, null, 2)};`
// );

// // Write Angular Material theme overrides
// fs.writeFileSync(
//   path.join(__dirname, '../src/styles/angular-material-theme.scss'),
//   angularTheme.join('\n')
// );

// console.log('✅ Tokens built successfully.');




/*------------------------------------*/
const fs = require('fs');
const path = require('path');

const tokens = require('../tokens/tokens.json');

const cssVars = [];
const tailwindExtend = { theme: { extend: {} } };
const angularTheme = [];

function normalizeKey(key) {
  return key.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase();
}

function processTokens(categoryPath, values) {
  const category = normalizeKey(categoryPath);

  if (!tailwindExtend.theme.extend[category]) {
    tailwindExtend.theme.extend[category] = {};
  }

  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'object' && value !== null) {
      processTokens(`${categoryPath}-${key}`, value);
    } else {
      const normalizedKey = normalizeKey(key);
      const varName = `--${category}-${normalizedKey}`;
      cssVars.push(`${varName}: ${value};`);

      tailwindExtend.theme.extend[category][normalizedKey] = value;

      if (category.includes('color')) {
        angularTheme.push(`$${normalizedKey}: ${value};`);
      }
    }
  }
}

// Process all tokens
for (const [categoryPath, values] of Object.entries(tokens)) {
  processTokens(categoryPath, values);
}

// Write CSS variables
fs.writeFileSync(
  path.join(__dirname, '../src/styles/design-tokens.css'),
  `:root {\n  ${cssVars.join('\n  ')}\n}`
);

// Write Tailwind config extension
fs.writeFileSync(
  path.join(__dirname, '../tailwind.tokens.js'),
  `module.exports = ${JSON.stringify(tailwindExtend, null, 2)};`
);

// Write Angular Material theme overrides
fs.writeFileSync(
  path.join(__dirname, '../src/styles/angular-material-theme.scss'),
  angularTheme.join('\n')
);

console.log('✅ Tokens built successfully.');