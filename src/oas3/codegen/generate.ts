import {DefaultCodeGenerator, GenerateConfig, Logger} from './generator';

export type Oas3ToTsConfig = GenerateConfig & {
  getSpecification: () => Promise<object>;
  logger: Logger;
};

export function generateOas3ToTs(config: Oas3ToTsConfig) {
  const {getSpecification, logger, ...generateConfig} = config;
  getSpecification().then(data => {
    const codeGenerator = new DefaultCodeGenerator(data, logger);
    codeGenerator.generate(generateConfig);
  });
}
