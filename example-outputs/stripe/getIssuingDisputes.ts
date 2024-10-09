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
import {Issuing_Dispute, Error} from '@example-outputs/stripe';

export const getIssuingDisputesEndpointSchema = {
  path: '/v1/issuing/disputes',
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

export type GetIssuingDisputesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: 'expired' | 'lost' | 'submitted' | 'unsubmitted' | 'won';
    transaction?: string;
  }
>;

export type GetIssuingDisputesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Dispute[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingDisputesRequestResult = RequestResult<
  GetIssuingDisputesRequest,
  GetIssuingDisputesResponse
>;

export function getIssuingDisputes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingDisputesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingDisputesRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingDisputesEndpointSchema, payload),
    config
  );
}
