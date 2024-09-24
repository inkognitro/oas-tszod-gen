const fs = require('fs');
const path = require('path');

const templateFiles = [
  'templates/ts/core/authRequestHandler.ts',
  'templates/ts/core/axiosRequestHandler.ts',
  'templates/ts/core/fetchApiRequestHandler.ts',
  'templates/ts/core/scopedRequestHandler.ts',
  'templates/ts/core/zodValidationRequestHandler.ts',
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
    console.log(source, destination);
    fs.mkdirSync(dirPath, {recursive: true}, err => {
      if (err) throw err;
    });
    fs.cpSync(source, destination);
  });
}

copyCoreTemplateFiles();
