import {
  z_Issuing_Physical_bundle,
  z_Error,
  Issuing_Physical_bundle,
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

export const getIssuingPhysicalBundlesPhysicalBundleEndpointSchema = {
  path: '/v1/issuing/physical_bundles/{physical_bundle}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    physical_bundle: z.string(),
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
          zodSchema: z_Issuing_Physical_bundle,
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

export type GetIssuingPhysicalBundlesPhysicalBundleRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    physical_bundle: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingPhysicalBundlesPhysicalBundleResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Physical_bundle>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingPhysicalBundlesPhysicalBundleRequestResult =
  RequestResult<
    GetIssuingPhysicalBundlesPhysicalBundleRequest,
    GetIssuingPhysicalBundlesPhysicalBundleResponse
  >;

export function getIssuingPhysicalBundlesPhysicalBundle(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingPhysicalBundlesPhysicalBundleRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingPhysicalBundlesPhysicalBundleRequestResult> {
  return requestHandler.execute(
    createRequest(
      getIssuingPhysicalBundlesPhysicalBundleEndpointSchema,
      payload
    ),
    config
  );
}
