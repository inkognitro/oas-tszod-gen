import {DefaultCodeGenerator} from '@oas3/codegen/ts/generator';
const fs = require('fs');

export function generate() {
  const filePath = './oasTestSpecs.json';
  const dataStr = fs.readFileSync(filePath, 'utf-8').toString();
  const data = JSON.parse(dataStr);
  const codeGenerator = new DefaultCodeGenerator(data);
  codeGenerator.generate({
    targetFolderPath: './generated-files',
    predefinedFolderPaths: [['booking', 'core']],
  });
}

generate();
