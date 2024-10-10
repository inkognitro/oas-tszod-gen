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
import {Transfer_reversal, Error} from './schemas';

export const getTransfersIdReversalsEndpointSchema = {
  path: '/v1/transfers/{id}/reversals',
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

export type GetTransfersIdReversalsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetTransfersIdReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Transfer_reversal[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTransfersIdReversalsRequestResult = RequestResult<
  GetTransfersIdReversalsRequest,
  GetTransfersIdReversalsResponse
>;

export function getTransfersIdReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTransfersIdReversalsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransfersIdReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(getTransfersIdReversalsEndpointSchema, payload),
    config
  );
}
