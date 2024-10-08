import {zResponse, zResponseHeaderByNameMap} from './response';
import {zSchema} from './schema';
import {zSecurityScheme} from './security';
import {zEndpoint, zRequestBody} from './endpoint';
import {z} from 'zod';
import {zParameter} from './endpoint';

export const zRequestByMethodMap = z.record(zEndpoint);
export type RequestByMethodMap = z.infer<typeof zRequestByMethodMap>;

const zRequestDefinitionsByPathMap = z.record(zRequestByMethodMap);

const zResponseByNameMap = z.record(zResponse);

const zSchemaByNameMap = z.record(zSchema);

const zSecuritySchemeByNameMap = z.record(zSecurityScheme);

const zRequestParameterByNameMap = z.record(zParameter);

const zRequestBodyByNameMap = z.record(zRequestBody);

const zComponentDefinitions = z.object({
  parameters: zRequestParameterByNameMap.optional(),
  responses: zResponseByNameMap.optional(),
  headers: zResponseHeaderByNameMap.optional(),
  requestBodies: zRequestBodyByNameMap.optional(),
  schemas: zSchemaByNameMap.optional(),
  securitySchemes: zSecuritySchemeByNameMap.optional(),
});

export const zSpecification = z.object({
  openapi: z.string(),
  paths: zRequestDefinitionsByPathMap,
  components: zComponentDefinitions,
});

export type Specification = z.infer<typeof zSpecification>;
