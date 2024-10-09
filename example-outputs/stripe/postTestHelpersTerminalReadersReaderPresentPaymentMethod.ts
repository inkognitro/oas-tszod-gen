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

export const postTestHelpersTerminalReadersReaderPresentPaymentMethodEndpointSchema =
  {
    path: '/v1/test_helpers/terminal/readers/{reader}/present_payment_method',
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

export type PostTestHelpersTerminalReadersReaderPresentPaymentMethodRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        amount_tip?: number; // int
        card_present?: {
          number?: string;
        };
        expand?: string[];
        interac_present?: {
          number?: string;
        };
        type?: 'card_present' | 'interac_present';
      }
    >,
    {
      reader: string;
    }
  >;

export type PostTestHelpersTerminalReadersReaderPresentPaymentMethodResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTerminalReadersReaderPresentPaymentMethodRequestResult =
  RequestResult<
    PostTestHelpersTerminalReadersReaderPresentPaymentMethodRequest,
    PostTestHelpersTerminalReadersReaderPresentPaymentMethodResponse
  >;

export function postTestHelpersTerminalReadersReaderPresentPaymentMethod(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTerminalReadersReaderPresentPaymentMethodRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTerminalReadersReaderPresentPaymentMethodRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTerminalReadersReaderPresentPaymentMethodEndpointSchema,
      payload
    ),
    config
  );
}
