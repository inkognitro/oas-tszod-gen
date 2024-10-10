import {z_Error, Error} from '../../../../';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../../core';

export const getAlgoListEndpointSchema = {
  path: '/sapi/v1/mining/pub/algoList',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            code: z.number().int().safe().finite(),
            msg: z.string(),
            data: z.array(
              z.object({
                algoName: z.string(),
                algoId: z.number().int().safe().finite(),
                poolIndex: z.number().int().safe().finite(),
                unit: z.string(),
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
  },
};

export type GetAlgoListRequest = Request;

export type GetAlgoListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            algoName: string;
            algoId: number; // int
            poolIndex: number; // int
            unit: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetAlgoListRequestResult = RequestResult<
  GetAlgoListRequest,
  GetAlgoListResponse
>;

export function getAlgoList(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetAlgoListRequestResult> {
  return requestHandler.execute(
    createRequest(getAlgoListEndpointSchema),
    config
  );
}
