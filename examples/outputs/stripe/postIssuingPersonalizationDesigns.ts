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

export const postIssuingPersonalizationDesignsEndpointSchema = {
  path: '/v1/issuing/personalization_designs',
  method: 'post',
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

export type PostIssuingPersonalizationDesignsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      card_logo?: string;
      carrier_text?: {
        footer_body?: string | '';
        footer_title?: string | '';
        header_body?: string | '';
        header_title?: string | '';
      };
      expand?: string[];
      lookup_key?: string;
      metadata?: {
        [key: string]: string;
      };
      name?: string;
      physical_bundle: string;
      preferences?: {
        is_default: boolean;
      };
      transfer_lookup_key?: boolean;
    }
  >
>;

export type PostIssuingPersonalizationDesignsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Personalization_design>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingPersonalizationDesignsRequestResult = RequestResult<
  PostIssuingPersonalizationDesignsRequest,
  PostIssuingPersonalizationDesignsResponse
>;

export function postIssuingPersonalizationDesigns(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingPersonalizationDesignsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingPersonalizationDesignsRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingPersonalizationDesignsEndpointSchema, payload),
    config
  );
}
