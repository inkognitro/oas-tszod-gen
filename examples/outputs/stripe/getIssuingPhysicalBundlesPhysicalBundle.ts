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
import {Issuing_Physical_bundle} from './issuing';
import {Error} from './schemas';

export const getIssuingPhysicalBundlesPhysicalBundleEndpointSchema = {
  path: '/v1/issuing/physical_bundles/{physical_bundle}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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
