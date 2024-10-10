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

export const getSubscriptionPreviewEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/subscriptionPreview',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    projectId: z.string(),
    amount: z.number().safe().finite(),
    autoSubscribe: z.boolean().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              rewardAsset: z.string(),
              totalRewardAmt: z.string(),
              extraRewardAsset: z.string(),
              estTotalExtraRewardAmt: z.string(),
              nextPay: z.string(),
              nextPayDate: z.string(),
              valueDate: z.string(),
              rewardsEndDate: z.string(),
              deliverDate: z.string(),
              nextSubscriptionDate: z.string(),
            })
          ),
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

export type GetSubscriptionPreviewRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    amount: number;
    autoSubscribe?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSubscriptionPreviewResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rewardAsset: string;
          totalRewardAmt: string;
          extraRewardAsset: string;
          estTotalExtraRewardAmt: string;
          nextPay: string;
          nextPayDate: string;
          valueDate: string;
          rewardsEndDate: string;
          deliverDate: string;
          nextSubscriptionDate: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSubscriptionPreviewRequestResult = RequestResult<
  GetSubscriptionPreviewRequest,
  GetSubscriptionPreviewResponse
>;

export function getSubscriptionPreview(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSubscriptionPreviewRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubscriptionPreviewRequestResult> {
  return requestHandler.execute(
    createRequest(getSubscriptionPreviewEndpointSchema, payload),
    config
  );
}
