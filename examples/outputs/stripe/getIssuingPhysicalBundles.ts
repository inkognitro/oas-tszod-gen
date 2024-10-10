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

export const getIssuingPhysicalBundlesEndpointSchema = {
  path: '/v1/issuing/physical_bundles',
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
