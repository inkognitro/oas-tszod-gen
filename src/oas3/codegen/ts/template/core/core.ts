export type EndpointId = {
  method: string;
  path: string;
};

export type Request = {
  endpointId: EndpointId;
  url: string;
  headers: object;
  queryParams: object;
  body: object;
};

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export type Response<S extends StatusCode = any, Body extends object = {}> = {
  statusCode: S;
  body: Body;
};

export type RequestResult<
  Req extends Request = any,
  Res extends Response = any,
> = {
  request: Req;
  response: undefined | Res;
  hasRequestBeenCancelled: boolean;
};

export interface Core {
  execute(request: Request): RequestResult;
}

// todo: remove following experimental code
export const authenticateEndpointId: EndpointId = {
  method: 'post',
  path: '/v1/authenticate',
};

export type AuthenticateRequest = Request & {};

type OkAuthenticateResponse = Response<StatusCode.OK, {accessToken: string}>;
type BadRequestAuthenticateResponse = Response<StatusCode.BAD_REQUEST>;

export type AuthenticateResponse =
  | OkAuthenticateResponse
  | BadRequestAuthenticateResponse;

export type AuthenticateRequestResult = RequestResult<
  AuthenticateRequest,
  AuthenticateResponse
>;

export function authenticate(
  requestHandler: Core,
  request: AuthenticateRequest
): Promise<AuthenticateRequestResult> {
  // todo: implement url transformation
  return new Promise<AuthenticateRequestResult>(resolve => {
    resolve(requestHandler.execute(request) as AuthenticateRequestResult);
  });
}
