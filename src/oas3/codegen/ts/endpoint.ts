import {CodeGenerationSummary} from '@oas3/codegen/ts/core';
import {Endpoint} from '@oas3/specification';
import {SchemaCodeGenerator} from '@oas3/codegen/ts/schema';

type CodeGenerator = SchemaCodeGenerator; // todo: rename underlying or extend this one

export function createEndpointCode(
  schema: Endpoint,
  codeGenerator: CodeGenerator
): CodeGenerationSummary {}
