import {DefaultCodeGenerator} from '@oas3/codegen/ts/generator';
const fs = require('fs');

type OutputPath = string[];

export type GenerateConfig = {
  type: 'oas3';
  getSpecification: () => Promise<object>;
  outputFolderPath: string;
  importRootAlias?: string;
  predefinedFolderOutputPaths?: OutputPath[];
};

export function generate(config: GenerateConfig) {
  switch (config.type) {
    case 'oas3':
      // eslint-disable-next-line no-case-declarations
      config.getSpecification().then(data => {
        const codeGenerator = new DefaultCodeGenerator(data);
        codeGenerator.generate({
          outputFolderPath: config.outputFolderPath,
          predefinedFolderOutputPaths: config.predefinedFolderOutputPaths,
        });
      });
      break;
    default:
      console.error('');
  }
}

// todo: move this code to the outside of the package
export function usePackage() {
  generate({
    type: 'oas3',
    getSpecification: () => {
      return new Promise<object>(resolve => {
        const filePath = './oasTestSpecs.json';
        const dataStr = fs.readFileSync(filePath, 'utf-8').toString();
        const data = JSON.parse(dataStr);
        resolve(data);
      });
    },
    outputFolderPath: './generated-files',
    predefinedFolderOutputPaths: [['booking', 'core']],
  });
}

usePackage();
