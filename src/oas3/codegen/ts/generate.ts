import {
  DefaultCodeGenerator,
  Logger,
  RequestHandlersGenerateConfig,
} from './generator';
import {OutputPath} from './core';

export type Oas3ToTsConfig = {
  getSpecification: () => Promise<object>;
  outputFolderPath: string;
  importRootAlias?: string;
  predefinedFolderOutputPaths?: OutputPath[];
  logger: Logger;
  withZod?: boolean;
  requestHandlers?: RequestHandlersGenerateConfig;
};

export function generateOas3ToTs(config: Oas3ToTsConfig) {
  config.getSpecification().then(data => {
    const codeGenerator = new DefaultCodeGenerator(data, config.logger);
    codeGenerator.generate({
      outputFolderPath: config.outputFolderPath,
      predefinedFolderOutputPaths: config.predefinedFolderOutputPaths,
      importRootAlias: config.importRootAlias,
      withZod: !!config.withZod,
    });
  });
}
