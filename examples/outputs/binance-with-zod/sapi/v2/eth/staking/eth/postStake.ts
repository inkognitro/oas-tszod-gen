import {z_Error, Error} from '../../../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../core';

export const postStakeEndpointSchema = {
  path: '/sapi/v2/eth-staking/eth/stake',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    amount: z.number().safe().finite(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            success: z.boolean(),
            wbethAmount: z.string(),
            conversionRatio: z.string(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostStakeRequest = RequestUnion<
  any,
  any,
  {
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostStakeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          wbethAmount: string;
          conversionRatio: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostStakeRequestResult = RequestResult<
  PostStakeRequest,
  PostStakeResponse
>;

export function postStake(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostStakeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostStakeRequestResult> {
  return requestHandler.execute(
    createRequest(postStakeEndpointSchema, payload),
    config
  );
}
