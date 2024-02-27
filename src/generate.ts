import {Specification} from './oas3/schema';
const fs = require('fs');

export function generate() {
  const filePath = './oasTestSpecs.json';
  fs.readFile(filePath, 'utf-8', (error: any, data: object) => {
    if (error) {
      console.error(`could not load file from filePath "${filePath}"`, error);
      return;
    }
    const specs = new Specification(data);
    specs.generateFiles({
      createFile: (filePath, content) => {
        console.log(`filePath: ${filePath}`);
        console.log(content);
      },
    });
  });
}

generate();
