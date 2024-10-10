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

copyCoreTemplateFiles();
