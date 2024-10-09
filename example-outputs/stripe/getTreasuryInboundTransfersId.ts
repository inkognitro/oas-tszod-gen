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
} from '@example-outputs/stripe/core';
import {Treasury_Inbound_transfer, Error} from '@example-outputs/stripe';

export const getTreasuryInboundTransfersIdEndpointSchema = {
  path: '/v1/treasury/inbound_transfers/{id}',
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

export type GetTreasuryInboundTransfersIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryInboundTransfersIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryInboundTransfersIdRequestResult = RequestResult<
  GetTreasuryInboundTransfersIdRequest,
  GetTreasuryInboundTransfersIdResponse
>;

export function getTreasuryInboundTransfersId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryInboundTransfersIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryInboundTransfersIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryInboundTransfersIdEndpointSchema, payload),
    config
  );
}
