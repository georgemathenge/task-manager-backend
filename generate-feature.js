const fs = require('fs');
const path = require('path');

const featureName = process.argv[2];
if (!featureName) {
  console.error('❌ Please provide a feature name');
  process.exit(1);
}

const baseDir = path.join(__dirname, 'src', 'modules', featureName);
if (fs.existsSync(baseDir)) {
  console.error('⚠️ Feature already exists.');
  process.exit(1);
}

fs.mkdirSync(baseDir, { recursive: true });

const files = {
  [`${featureName}.routes.js`]: `const express = require('express');
const router = express.Router();
const { getAll${capitalize(featureName)} } = require('./${featureName}.controller');

router.get('/', getAll${capitalize(featureName)});

module.exports = router;`,

  [`${featureName}.controller.js`]: `// Example DB call in controller
const getAll${capitalize(featureName)} = async (req, res) => {
  try {
    // Replace this with DB logic
    res.json([{ id: 1, name: '${capitalize(featureName)} 1' }]);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getAll${capitalize(featureName)} };`,

  [`${featureName}.service.js`]: `// Optional: Add business logic here
// Example: const db = require('../../config/db');
`,
};

for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, fileName), content);
}

console.log(`✅ Feature '${featureName}' created in src/modules/${featureName}`);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
