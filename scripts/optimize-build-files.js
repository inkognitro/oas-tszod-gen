const fs = require('fs');
const path = require('path');

const templateFiles = [
  'templates/core/authRequestHandler.ts',
  'templates/core/axiosRequestHandler.ts',
  'templates/core/fetchApiRequestHandler.ts',
  'templates/core/scopedRequestHandler.ts',
  'templates/core/zodValidationRequestHandler.ts',
  'templates/core/responseExtractors.ts',
];

function copyCoreTemplateFiles() {
  templateFiles.forEach(filePath => {
    const source = path.resolve(__dirname, '../src', filePath);
    const destination = path.resolve(__dirname, '../dist', filePath);
    const dirPath = destination
      .split('\\')
      .join('/')
      .split('/')
      .slice(0, -1)
      .join('/');
    fs.mkdirSync(dirPath, {recursive: true}, err => {
      if (err) throw err;
    });
    fs.cpSync(source, destination);
  });
}

async function moveFiles(sourceDir, targetDir) {
  return new Promise((resolve, reject) => {
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      files.forEach(file => {
        const oldPath = path.join(sourceDir, file);
        const newPath = path.join(targetDir, file);
        const stat = fs.lstatSync(oldPath);
        if (stat.isDirectory()) {
          if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
          }
          moveFiles(oldPath, newPath)
            .then(() => {
              if (files.indexOf(file) === files.length - 1) {
                resolve();
              }
            })
            .catch(err => reject(err));
        } else if (stat.isFile()) {
          fs.rename(oldPath, newPath, err => {
            if (err) {
              reject(err);
              return;
            }
            if (files.indexOf(file) === files.length - 1) {
              resolve();
            }
          });
        }
      });
    });
  });
}

async function extractRequiredBuildFiles() {
  const sourceDirectory = path.resolve(__dirname, '../dist/src');
  const destination = path.resolve(__dirname, '../dist');
  await moveFiles(sourceDirectory, destination).then(() => {
    fs.rmSync(sourceDirectory, {recursive: true, force: true});
    fs.rmSync(path.resolve(__dirname, '../dist/example-outputs'), {
      recursive: true,
      force: true,
    });
  });
}

extractRequiredBuildFiles().then(() => {
  copyCoreTemplateFiles();
});
