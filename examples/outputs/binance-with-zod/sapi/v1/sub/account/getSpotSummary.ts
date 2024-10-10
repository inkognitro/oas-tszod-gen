import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getSpotSummaryEndpointSchema = {
  path: '/sapi/v1/sub-account/spotSummary',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string().optional(),
    page: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
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
            totalCount: z.number().int().safe().finite(),
            masterAccountTotalAsset: z.string(),
            spotSubUserAssetBtcVoList: z.array(
              z.object({
                email: z.string(),
                totalAsset: z.string(),
              })
            ),
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

export type GetSpotSummaryRequest = RequestUnion<
  any,
  any,
  {
    email?: string;
    page?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSpotSummaryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalCount: number; // int
          masterAccountTotalAsset: string;
          spotSubUserAssetBtcVoList: {
            email: string;
            totalAsset: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSpotSummaryRequestResult = RequestResult<
  GetSpotSummaryRequest,
  GetSpotSummaryResponse
>;

export function getSpotSummary(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSpotSummaryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSpotSummaryRequestResult> {
  return requestHandler.execute(
    createRequest(getSpotSummaryEndpointSchema, payload),
    config
  );
}
