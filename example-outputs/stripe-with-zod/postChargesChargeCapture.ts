import {
  z_Charge,
  z_Error,
  Charge,
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

export const postChargesChargeCaptureEndpointSchema = {
  path: '/v1/charges/{charge}/capture',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    charge: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        application_fee: z.number().int().safe().finite().optional(),
        application_fee_amount: z.number().int().safe().finite().optional(),
        expand: z.array(z.string()).optional(),
        receipt_email: z.string().optional(),
        statement_descriptor: z.string().optional(),
        statement_descriptor_suffix: z.string().optional(),
        transfer_data: z
          .object({
            amount: z.number().int().safe().finite().optional(),
          })
          .optional(),
        transfer_group: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Charge,
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

export type PostChargesChargeCaptureRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      application_fee?: number; // int
      application_fee_amount?: number; // int
      expand?: string[];
      receipt_email?: string;
      statement_descriptor?: string;
      statement_descriptor_suffix?: string;
      transfer_data?: {
        amount?: number; // int
      };
      transfer_group?: string;
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeCaptureResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeCaptureRequestResult = RequestResult<
  PostChargesChargeCaptureRequest,
  PostChargesChargeCaptureResponse
>;

export function postChargesChargeCapture(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeCaptureRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeCaptureRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeCaptureEndpointSchema, payload),
    config
  );
}
