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
import {Terminal_Reader, Error} from '@example-outputs/stripe';

export const getTerminalReadersEndpointSchema = {
  path: '/v1/terminal/readers',
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

export type GetTerminalReadersRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    device_type?:
      | 'bbpos_chipper2x'
      | 'bbpos_wisepad3'
      | 'bbpos_wisepos_e'
      | 'mobile_phone_reader'
      | 'simulated_wisepos_e'
      | 'stripe_m2'
      | 'stripe_s700'
      | 'verifone_P400';
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    location?: string;
    serial_number?: string;
    starting_after?: string;
    status?: 'offline' | 'online';
  }
>;

export type GetTerminalReadersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Terminal_Reader[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTerminalReadersRequestResult = RequestResult<
  GetTerminalReadersRequest,
  GetTerminalReadersResponse
>;

export function getTerminalReaders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTerminalReadersRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTerminalReadersRequestResult> {
  return requestHandler.execute(
    createRequest(getTerminalReadersEndpointSchema, payload),
    config
  );
}
