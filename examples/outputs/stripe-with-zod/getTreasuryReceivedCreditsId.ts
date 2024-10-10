import {z_Treasury_Received_credit, Treasury_Received_credit} from './treasury';
import {z_Error, Error} from './schemas';
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

export const getTreasuryReceivedCreditsIdEndpointSchema = {
  path: '/v1/treasury/received_credits/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Treasury_Received_credit,
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

export type GetTreasuryReceivedCreditsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryReceivedCreditsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Received_credit>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryReceivedCreditsIdRequestResult = RequestResult<
  GetTreasuryReceivedCreditsIdRequest,
  GetTreasuryReceivedCreditsIdResponse
>;

export function getTreasuryReceivedCreditsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryReceivedCreditsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryReceivedCreditsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryReceivedCreditsIdEndpointSchema, payload),
    config
  );
}
