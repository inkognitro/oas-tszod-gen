import {DefaultCodeGenerator, Logger} from './generator';

type OutputPath = string[];

export type Oas3ToTsConfig = {
  getSpecification: () => Promise<object>;
  outputFolderPath: string;
  importRootAlias?: string;
  predefinedFolderOutputPaths?: OutputPath[];
  logger: Logger;
};

export function generateOas3ToTs(config: Oas3ToTsConfig) {
  config.getSpecification().then(data => {
    const codeGenerator = new DefaultCodeGenerator(data, config.logger);
    codeGenerator.generate({
      outputFolderPath: config.outputFolderPath,
      predefinedFolderOutputPaths: config.predefinedFolderOutputPaths,
    });
  });
}
