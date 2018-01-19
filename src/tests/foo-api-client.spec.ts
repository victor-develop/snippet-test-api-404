import * as assert from 'assert'
import { AssertionError } from 'assert';

// NOTICE: in a real project, interfaces and classes should never be place in this file. 
// They should be place in difference inidividua files with corresponding name like src/SomeclassOfInterface.ts

const targetApi = '/bar'

interface IHttpResponse {
  status: number,
  headers: Object,
  body: any
}

interface IHttpClient {
  rootUri: string
  get: (path: string) => Promise<IHttpResponse>
}

class FooApiClient {
  private httpClient: IHttpClient
  constructor(aHttpClient: IHttpClient) {
    this.httpClient = aHttpClient;
  }

  public bar(): Promise<number> {
    return this.httpClient.get(targetApi)
      .then((response: IHttpResponse) => {
        return <number>(response.body.fooValue)
      })
      .catch(err => {
        // ...other handling logic
        return Promise.reject(new APICallError(APICallErrType.httpErr, err))
      })
  }
}

enum APICallErrType {
  httpErr,
  networkErr,
  unkownErr
}

class APICallError {
  public readonly errType: APICallErrType
  public readonly context: any
  constructor(et: APICallErrType, ct: any) {
    this.errType = et
    this.context = ct
  }
}


// Only the content below really belongs to these file
describe('apiClient make request to /bar and receive 404 error', () => {

  it('should return a rejected Promise with an APICallError instance', () => {
    const errStatusCode = 400
    const mockHttpClient: IHttpClient = {
      rootUri:'mock.test',
      get(url) {
        const res = {
          status:  errStatusCode,
          headers: { "content-type": "application/json" },
          body: { error: "Not Found." },     
        }
        return Promise.reject(res)
      }
    }

    const client = new FooApiClient(mockHttpClient)

    return client.bar()
      .then((result) => {
        throw new AssertionError({
          message: 'The promise was returned when IT SHOULD REJECT'
        })
      })
      .catch((err: APICallError) => {
        const isApiCallErr: Boolean = err instanceof APICallError
        assert.ok(isApiCallErr, `The err is not an instance of ${APICallError.name}`)
        assert.equal(err.errType, APICallErrType.httpErr)
      })
  })

})


