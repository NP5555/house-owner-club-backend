const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Copy all files from source to destination
function copyFiles(sourceDir, destDir) {
  ensureDirectoryExistence(destDir);
  
  const files = fs.readdirSync(sourceDir);
  
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      copyFiles(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${sourcePath} -> ${destPath}`);
    }
  }
}

// Paths
const sourcePath = path.join(__dirname, 'src', 'i18n');
const distMainPath = path.join(__dirname, 'dist', 'i18n');
const distSrcPath = path.join(__dirname, 'dist', 'src', 'i18n');

console.log('Copying i18n files for deployment...');

// Copy to dist/i18n
copyFiles(sourcePath, distMainPath);

// Copy to dist/src/i18n
copyFiles(sourcePath, distSrcPath);

console.log('i18n files copied successfully!'); 