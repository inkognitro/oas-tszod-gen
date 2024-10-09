import {
  z_Tax_Settings,
  z_Error,
  Tax_Settings,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe-with-zod/core';

export const postTaxSettingsEndpointSchema = {
  path: '/v1/tax/settings',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        defaults: z
          .object({
            tax_behavior: z
              .enum(['exclusive', 'inclusive', 'inferred_by_currency'])
              .optional(),
            tax_code: z.string().optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        head_office: z
          .object({
            address: z.object({
              city: z.string().optional(),
              country: z.string().optional(),
              line1: z.string().optional(),
              line2: z.string().optional(),
              postal_code: z.string().optional(),
              state: z.string().optional(),
            }),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Tax_Settings,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostTaxSettingsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      defaults?: {
        tax_behavior?: 'exclusive' | 'inclusive' | 'inferred_by_currency';
        tax_code?: string;
      };
      expand?: string[];
      head_office?: {
        address: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
      };
    }
  >
>;

export type PostTaxSettingsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Settings>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxSettingsRequestResult = RequestResult<
  PostTaxSettingsRequest,
  PostTaxSettingsResponse
>;

export function postTaxSettings(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxSettingsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxSettingsRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxSettingsEndpointSchema, payload),
    config
  );
}
