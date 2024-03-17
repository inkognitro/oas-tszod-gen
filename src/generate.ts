import {isSpecification} from '@oas3/specification';

const fs = require('fs');

export function generate() {
  const filePath = './oasTestSpecs.json';
  const dataStr = fs.readFileSync(filePath, 'utf-8').toString();
  const data = JSON.parse(dataStr);
  if (!isSpecification(data)) {
    console.error('specs are invalid :(');
    return;
  }
  console.info('specs are valid :)');
  /*if (!isSpecification())
    specs.generateFiles({
      createFile: (filePath, content) => {
        console.log(`filePath: ${filePath}`);
        console.log(content);
      },
    });
  */
}

generate();
