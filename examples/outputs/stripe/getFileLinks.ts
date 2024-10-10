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
import {File_link, Error} from './schemas';

export const getFileLinksEndpointSchema = {
  path: '/v1/file_links',
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

export type GetFileLinksRequest = RequestUnion<
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
    expired?: boolean;
    file?: string;
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetFileLinksResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: File_link[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFileLinksRequestResult = RequestResult<
  GetFileLinksRequest,
  GetFileLinksResponse
>;

export function getFileLinks(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFileLinksRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFileLinksRequestResult> {
  return requestHandler.execute(
    createRequest(getFileLinksEndpointSchema, payload),
    config
  );
}
