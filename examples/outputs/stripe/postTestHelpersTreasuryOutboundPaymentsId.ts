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
import {Treasury_Outbound_payment} from './treasury';
import {Error} from './schemas';

export const postTestHelpersTreasuryOutboundPaymentsIdEndpointSchema = {
  path: '/v1/test_helpers/treasury/outbound_payments/{id}',
  method: 'post',
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

export type PostTestHelpersTreasuryOutboundPaymentsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      tracking_details: {
        ach?: {
          trace_id: string;
        };
        type: 'ach' | 'us_domestic_wire';
        us_domestic_wire?: {
          chips?: string;
          imad?: string;
          omad?: string;
        };
      };
    }
  >,
  {
    id: string;
  }
>;

export type PostTestHelpersTreasuryOutboundPaymentsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_payment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryOutboundPaymentsIdRequestResult =
  RequestResult<
    PostTestHelpersTreasuryOutboundPaymentsIdRequest,
    PostTestHelpersTreasuryOutboundPaymentsIdResponse
  >;

export function postTestHelpersTreasuryOutboundPaymentsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryOutboundPaymentsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryOutboundPaymentsIdRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryOutboundPaymentsIdEndpointSchema,
      payload
    ),
    config
  );
}
