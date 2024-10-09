import {
  z_Terminal_Reader,
  z_Error,
  Terminal_Reader,
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

export const postTestHelpersTerminalReadersReaderPresentPaymentMethodEndpointSchema =
  {
    path: '/v1/test_helpers/terminal/readers/{reader}/present_payment_method',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      reader: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          amount_tip: z.number().int().safe().finite().optional(),
          card_present: z
            .object({
              number: z.string().optional(),
            })
            .optional(),
          expand: z.array(z.string()).optional(),
          interac_present: z
            .object({
              number: z.string().optional(),
            })
            .optional(),
          type: z.enum(['card_present', 'interac_present']).optional(),
        }),
      },
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Terminal_Reader,
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
