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
import {Issuing_Personalization_design} from './issuing';
import {Error} from './schemas';

export const getIssuingPersonalizationDesignsEndpointSchema = {
  path: '/v1/issuing/personalization_designs',
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

export type GetIssuingPersonalizationDesignsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    lookup_keys?: string[];
    preferences?: {
      is_default?: boolean;
      is_platform_default?: boolean;
    };
    starting_after?: string;
    status?: 'active' | 'inactive' | 'rejected' | 'review';
  }
>;

export type GetIssuingPersonalizationDesignsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Personalization_design[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingPersonalizationDesignsRequestResult = RequestResult<
  GetIssuingPersonalizationDesignsRequest,
  GetIssuingPersonalizationDesignsResponse
>;

export function getIssuingPersonalizationDesigns(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingPersonalizationDesignsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingPersonalizationDesignsRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingPersonalizationDesignsEndpointSchema, payload),
    config
  );
}
