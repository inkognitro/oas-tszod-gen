import {MockServerEndpointSchema} from './httpMockServer';

export const getPlainTextEndpointSchema: MockServerEndpointSchema = {
  path: '/plain-text',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'text/plain',
  responseBody: 'pong',
};

export const postPlainTextEndpointSchema: MockServerEndpointSchema = {
  path: '/plain-text',
  method: 'post',
  expectedRequestBody: {
    contentType: 'text/plain',
    content: 'ping',
  },
  responseStatus: 200,
  responseContentType: 'text/plain',
  responseBody: 'pong',
};

export const getJsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};

export const postJsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'post',
  expectedRequestBody: {
    contentType: 'application/json',
    content: {foo: 'bar'},
  },
  responseStatus: 200,
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};

const formData = new FormData();
formData.append('foo', 'bar');
export const mockFormData = formData;

export const getFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/form-data',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/x-www-form-urlencoded',
  responseBody: mockFormData,
};

export const postFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/form-data',
  method: 'post',
  expectedRequestBody: {
    contentType: 'multipart/form-data',
    content: {foo: 'bar'},
  },
  responseStatus: 200,
  responseContentType: 'application/x-www-form-urlencoded',
  responseBody: mockFormData,
};

type MockBlob = Blob & {
  lastModifiedDate?: string;
  name?: string;
};

const pdfBlob: MockBlob = new Blob(['foo'], {type: 'application/pdf'});
pdfBlob.name = 'foo.pdf';
pdfBlob.lastModifiedDate = new Date().toString();
export const mockPdfBlob = pdfBlob;

export const getBlobEndpointSchema: MockServerEndpointSchema = {
  path: '/blob',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/pdf',
  responseBody: mockPdfBlob,
};

export const postBlobEndpointSchema: MockServerEndpointSchema = {
  path: '/blob',
  method: 'post',
  responseStatus: 200,
  expectedRequestBody: {
    contentType: 'application/pdf',
  },
  responseContentType: 'application/pdf',
  responseBody: mockPdfBlob,
};
