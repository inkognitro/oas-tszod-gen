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
import {Issuing_Cardholder} from './issuing';
import {Error} from './schemas';

export const getIssuingCardholdersEndpointSchema = {
  path: '/v1/issuing/cardholders',
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

export type GetIssuingCardholdersRequest = RequestUnion<
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
    email?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    phone_number?: string;
    starting_after?: string;
    status?: 'active' | 'blocked' | 'inactive';
    type?: 'company' | 'individual';
  }
>;

export type GetIssuingCardholdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Cardholder[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingCardholdersRequestResult = RequestResult<
  GetIssuingCardholdersRequest,
  GetIssuingCardholdersResponse
>;

export function getIssuingCardholders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingCardholdersRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingCardholdersRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingCardholdersEndpointSchema, payload),
    config
  );
}
