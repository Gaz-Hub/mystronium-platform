const fs = require('fs');
const path = require('path');

// Function to remove unused React imports
function removeUnusedReactImports(content) {
  // Remove React import if it's only used for JSX (which doesn't require explicit import in modern React)
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip React import line if it's just "import React from 'react';" or "import React, { ... } from 'react';"
    if (line.trim().startsWith('import React') && line.includes("from 'react'")) {
      // Check if React is actually used in the file (not just JSX)
      const restOfFile = lines.slice(i + 1).join('\n');
      if (!restOfFile.includes('React.')) {
        continue; // Skip this line
      }
    }
    
    newLines.push(line);
  }
  
  return newLines.join('\n');
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = removeUnusedReactImports(content);
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log(`Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Function to recursively process directories
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      processFile(fullPath);
    }
  }
}

// Start processing from src directory
const srcPath = path.join(__dirname, 'src');
if (fs.existsSync(srcPath)) {
  console.log('Fixing unused React imports...');
  processDirectory(srcPath);
  console.log('Done!');
} else {
  console.log('src directory not found');
} 