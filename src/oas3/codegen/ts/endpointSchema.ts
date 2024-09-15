import {CodeGenerator, DefinitionOutput, OutputPath, OutputType} from './core';
import {GenerateConfig} from './generator';
import {templateEndpointSchemaType} from '@oas3/codegen/ts/template';
import {Endpoint} from '@oas3/specification';

// todo: make full implementation

export function applyEndpointSchemaConstDefinition(
  codeGenerator: CodeGenerator,
  urlPath: string,
  requestMethod: string,
  schema: Endpoint,
  outputPath: OutputPath,
  config: GenerateConfig
): DefinitionOutput {
  const definition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'const',
    path: outputPath,
    createName: referencingPath => {
      return codeGenerator.createConstName(outputPath, referencingPath);
    },
    createCode: () => {
      const securitySchemasCodeParts: string[] = [];
      if (schema.security) {
        schema.security.forEach(permissionsBySecurityName => {
          for (const securityName in permissionsBySecurityName) {
            const permissions = permissionsBySecurityName[securityName];
            const permissionsCodePart = permissions.length
              ? `['${permissions.join("'")}']`
              : '[]';
            securitySchemasCodeParts.push(
              `{ name: '${securityName}', requiredPermissions: ${permissionsCodePart}}`
            );
          }
        });
      }
      const codeParts: string[] = [
        `method:'${requestMethod}'`,
        `path:'${urlPath}'`,
        `supportedSecuritySchemas: [${securitySchemasCodeParts.join(', ')}]`,
      ];
      return `{\n${codeParts.join(', \n')}\n}`;
    },
    getRequiredOutputPaths: () => [templateEndpointSchemaType.path],
  };
  codeGenerator.addOutput(definition, config);
  return definition;
}
