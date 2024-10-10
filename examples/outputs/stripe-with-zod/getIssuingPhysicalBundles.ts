import {z_Issuing_Physical_bundle, Issuing_Physical_bundle} from './issuing';
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

export const getIssuingPhysicalBundlesEndpointSchema = {
  path: '/v1/issuing/physical_bundles',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['active', 'inactive', 'review']).optional(),
    type: z.enum(['custom', 'standard']).optional(),
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
            data: z.array(z_Issuing_Physical_bundle),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/issuing\/physical_bundles/),
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

export type GetIssuingPhysicalBundlesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: 'active' | 'inactive' | 'review';
    type?: 'custom' | 'standard';
  }
>;

export type GetIssuingPhysicalBundlesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Physical_bundle[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingPhysicalBundlesRequestResult = RequestResult<
  GetIssuingPhysicalBundlesRequest,
  GetIssuingPhysicalBundlesResponse
>;

export function getIssuingPhysicalBundles(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingPhysicalBundlesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingPhysicalBundlesRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingPhysicalBundlesEndpointSchema, payload),
    config
  );
}
