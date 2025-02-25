#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Recursively copies all files and directories from `src` to `dest`.
 * If a file exists in `dest`, it will be overwritten.
 *
 * @param {string} src - Source directory.
 * @param {string} dest - Destination directory.
 */
function syncDirectories(src, dest) {
  // Ensure the destination directory exists.
  fs.mkdirSync(dest, { recursive: true });
  
  // Read items (files and directories) from the source directory.
  const items = fs.readdirSync(src, { withFileTypes: true });
  for (const item of items) {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);

    if (item.isDirectory()) {
      // Recursively sync subdirectories.
      syncDirectories(srcPath, destPath);
    } else if (item.isFile()) {
      // Copy file from src to dest.
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

function main() {
  // Get command-line arguments.
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node syncFolders.js <sourceFolder> <destinationFolder> [reverse]');
    process.exit(1);
  }
  
  // Default: sync from source to destination.
  let src = args[0];
  let dest = args[1];
  const reverseFlag = args[2];

  // If the reverse flag is provided, swap the source and destination.
  if (reverseFlag && reverseFlag.toLowerCase() === 'reverse') {
    [src, dest] = [dest, src];
    console.log('Reverse sync enabled: copying from destination back to source.');
  }
  
  // Validate that the source exists and is a directory.
  if (!fs.existsSync(src) || !fs.statSync(src).isDirectory()) {
    console.error(`Source folder "${src}" does not exist or is not a directory.`);
    process.exit(1);
  }
  
  console.log(`Syncing from "${src}" to "${dest}"...`);
  syncDirectories(src, dest);
  console.log('Sync completed.');
}

main();
