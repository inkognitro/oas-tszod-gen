import {
  z_Issuing_Personalization_design,
  Issuing_Personalization_design,
} from './issuing';
import {z_Error, Error} from './schemas';
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
} from './core';

export const getIssuingPersonalizationDesignsEndpointSchema = {
  path: '/v1/issuing/personalization_designs',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    lookup_keys: z.array(z.string()).optional(),
    preferences: z
      .object({
        is_default: z.boolean().optional(),
        is_platform_default: z.boolean().optional(),
      })
      .optional(),
    starting_after: z.string().optional(),
    status: z.enum(['active', 'inactive', 'rejected', 'review']).optional(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            data: z.array(z_Issuing_Personalization_design),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/issuing\/personalization_designs/),
          }),
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

export type GetIssuingPersonalizationDesignsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    lookup_keys?: string[];
    preferences?: {
      is_default?: boolean;
      is_platform_default?: boolean;
    };
    starting_after?: string;
    status?: 'active' | 'inactive' | 'rejected' | 'review';
  }
>;

export type GetIssuingPersonalizationDesignsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Personalization_design[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingPersonalizationDesignsRequestResult = RequestResult<
  GetIssuingPersonalizationDesignsRequest,
  GetIssuingPersonalizationDesignsResponse
>;

export function getIssuingPersonalizationDesigns(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingPersonalizationDesignsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingPersonalizationDesignsRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingPersonalizationDesignsEndpointSchema, payload),
    config
  );
}
