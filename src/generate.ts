import {isSpecification} from '@oas3/specification';
const fs = require('fs');

export function generate() {
  const filePath = './oasTestSpecs.json';
  fs.readFile(filePath, 'utf-8', (error: any, data: object) => {
    if (error) {
      console.error(`could not load file from filePath "${filePath}"`, error);
      return;
    }
    if (!isSpecification(data)) {
      console.error('specs are invalid :(');
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
  });
}

generate();
