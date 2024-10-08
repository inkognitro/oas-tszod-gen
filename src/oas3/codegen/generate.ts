import {DefaultCodeGenerator, Logger} from './generator';
import {GenerateConfig} from '@/oas3/codegen/core';
import {Specification} from '@/oas3/specification';

export type Oas3ToTsConfig = GenerateConfig & {
  getSpecification: () => Promise<Specification>;
  logger: Logger;
};

export function generateOas3ToTs(config: Oas3ToTsConfig) {
  const {getSpecification, logger, ...generateConfig} = config;
  getSpecification().then(data => {
    const codeGenerator = new DefaultCodeGenerator(data, logger);
    codeGenerator.generate(generateConfig);
  });
}
