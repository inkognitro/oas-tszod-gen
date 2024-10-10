import {z_Charge, z_Error, Charge, Error} from './schemas';
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
} from './core';

export const getChargesChargeEndpointSchema = {
  path: '/v1/charges/{charge}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    charge: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
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

export type GetChargesChargeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    charge: string;
  },
  {
    expand?: string[];
  }
>;

export type GetChargesChargeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetChargesChargeRequestResult = RequestResult<
  GetChargesChargeRequest,
  GetChargesChargeResponse
>;

export function getChargesCharge(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetChargesChargeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetChargesChargeRequestResult> {
  return requestHandler.execute(
    createRequest(getChargesChargeEndpointSchema, payload),
    config
  );
}
