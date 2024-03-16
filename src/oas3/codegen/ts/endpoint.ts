import {CodeGenerator, ApplySchemaOutput, IndirectOutputType} from './core';
import {Endpoint} from '@oas3/specification';

export function createEndpointSummary(
  codeGenerator: CodeGenerator,
  schema: Endpoint
): ApplySchemaOutput {
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
