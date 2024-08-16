import {
  createRequest,
  Request,
  RequestExecutionConfig,
  RequestHandler,
  RequestResult,
  Response,
} from '../core';

export const authenticateEndpointId = {
  method: 'post',
  path: '/v1/auth/authenticate',
};

type OkAuthenticateResponse = Response<200, {accessToken: string}>;
type BadRequestAuthenticateResponse = Response<400>;

const zodOkAuthenticateResponseBodySchema = 'fooo...';
const zodBadRequestAuthenticateResponseBodySchema = 'bar...';

export type AuthenticateResponse =
  | OkAuthenticateResponse
  | BadRequestAuthenticateResponse;

export type AuthenticateRequestResult = RequestResult<
  Request,
  AuthenticateResponse
>;

export type AuthenticatePayload = {
  xHeader: string;
  emailOrUsername: string;
  password: string;
};

const authenticateRequestBodySchema = 'fooo...';

export const zodAuthenticateRequestBodySchema = z.infer<
  typeof authenticateRequestBodySchema
>;

export function authenticate(
  requestHandler: RequestHandler,
  payload: AuthenticatePayload,
  config?: RequestExecutionConfig
): Promise<AuthenticateRequestResult> {
  const {xHeader, ...body} = payload;
  const request = createRequest({
    endpointId: authenticateEndpointId,
    headers: {
      'Content-Type': 'application/json',
      x: xHeader,
    },
    body: body,
    zodSchema: {
      body: zodAuthenticateRequestBodySchema,
      responseByStatusCode: {
        '200': {
          body: zodOkAuthenticateResponseBodySchema,
        },
        '400': {
          body: zodBadRequestAuthenticateResponseBodySchema,
        },
      },
    },
  });
  return requestHandler.execute(request, config);
}
