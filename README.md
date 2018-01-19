### Test Api Client
This Typescript project includes a test snippet. It tests the class `FooApiClient`'s behavior of handling a 404 error when accessing the `/bar` api point.
It was assumed that this class make use of a `IHttpClient` to make requests, and is expected to return a correct `APICallError` instance via a rejected Promise. __In a real project the intereaction between `FooApiClient` and `IHttpClient` should also be tested with some more test cases, e.g. whether it really calls its `IHttpClient`.__

### Snippet Path
It was at `./src/tests/foo-api-client.spec.ts`
To help you see all codes in one glance, all interfaces and class implementations in my assumptions was put together in the test script altogether. But in a real project they should of course be placed back into `src` folder separatly.

### How to run tests
Run the following commands

```sh
npm install
npm run test
```

And you may see

```sh
> mocha --require ts-node/register src/**/*.spec.ts

  apiClient make request to /bar and receive 404 error
    ✓ should return a rejected Promise with an APICallError instance

  1 passing (14ms)
```

