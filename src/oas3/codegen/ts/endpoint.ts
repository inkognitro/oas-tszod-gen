import {CodeGenerator, DirectOutput, IndirectOutputType} from './core';
import {Endpoint} from '@oas3/specification';

export function createEndpointSummary(
  codeGenerator: CodeGenerator,
  schema: Endpoint
): DirectOutput {
  const path = codeGenerator.createOutputPathByOperationId(schema.operationId);
  /*
  const responsesSummary = createResponsesSummary(schema.responses, [
    ...path,
    'response',
  ]);
  */
  return {
    createCode: referencingPath => '',
    path,
    requiredOutputPaths: [],
  };
}
