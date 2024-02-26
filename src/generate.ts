import {Oas3Specification} from './Oas3Specification';
const fs = require('fs');

export function generate() {
  const filePath = './oasTestSpecs.json';
  fs.readFile(filePath, 'utf-8', (error: any, data: object) => {
    if (error) {
      console.error('could not load file from filePath', filePath);
      return;
    }
    const specs = new Oas3Specification(data);
    specs.print();
  });
}

generate();
