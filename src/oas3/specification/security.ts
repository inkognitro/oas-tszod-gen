import {z} from 'zod';

const zHttpSecurityScheme = z.object({
  type: z.literal('http'),
  scheme: z.enum(['basic', 'bearer']),
});

const zApiKeySecurityScheme = z.object({
  type: z.literal('apiKey'),
  name: z.string(),
  in: z.enum(['header', 'query', 'cookie']),
});

const zOAuth2SecuritySchemeScopeDescriptionByName = z.record(z.string());

const zOAuth2SecuritySchemeFlows = z.object({
  implicit: z
    .object({
      authorizationUrl: z.string(),
      scopes: zOAuth2SecuritySchemeScopeDescriptionByName.optional(),
    })
    .optional(),
});

const zOAuth2SecurityScheme = z.object({
  type: z.literal('oauth2'),
  flows: zOAuth2SecuritySchemeFlows,
});

export const zSecurityScheme = z.union([
  zHttpSecurityScheme,
  zApiKeySecurityScheme,
  zOAuth2SecurityScheme,
]);
