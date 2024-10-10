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
import {Treasury_Received_debit} from './treasury';
import {Error} from './schemas';

export const getTreasuryReceivedDebitsIdEndpointSchema = {
  path: '/v1/treasury/received_debits/{id}',
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

export type GetTreasuryReceivedDebitsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryReceivedDebitsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Received_debit>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryReceivedDebitsIdRequestResult = RequestResult<
  GetTreasuryReceivedDebitsIdRequest,
  GetTreasuryReceivedDebitsIdResponse
>;

export function getTreasuryReceivedDebitsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryReceivedDebitsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryReceivedDebitsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryReceivedDebitsIdEndpointSchema, payload),
    config
  );
}
