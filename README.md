# HR Acuity Coding Exercise
With more than an hour to make it happen, I decided to back up and create a mono-repo so 
that I could work against a testing server and do things as realistically as possible.

## Toolchain
In addition to the specified stack, I brought in some of my normal/preferred tool chain.

* __commitizen__: to help with versioning and change log generation (as a CI/CD step)
* __Nest.js__: as a server with their OpenApi plugin for API documentation
* __openapi-typescript-codegen__: type generation from the backend
* __lint-stage__: format all changed files pre-commit with prettier
* __Vite and Vitest__: for faster builds and test runs
* __Cypress__: e2e testing
* __NX__: mono-repo super tool holding it all together

## Running the app
Run `npm start` in the terminal. This will start both the client and api applications.
Because the frontend is using Vite and the backend is using Webpack, the client starts
a lot faster, so just be sure to wait for the backend to start. The source for both
applications is in the `/apps` directory.

### Backend
Go to http://localhost:3000/api to see the Swagger documentation site for the mini-REST
api. Things are only persisted in memory, so restarting the server will re-set the data
to its initial state.

### Frontend
Go to http://localhost:4200 (4200 as the default port is a holdover from when NX was an
Angular project) to load the client application. It supports both light and dark mode
based on the system preferences. In my humble opinion, I think it looks better in dark 
mode. Vite's middleware proxies to the backend, so we're not dealing with CORS.

## Libraries
Even if I'm only working against a single application, I will abstract out functionality
used across feature sections into libraries. This has a few advantages:

* Clear delineation between cross-cutting code and that used only within a given feature section.
* Easier to reason about dependency graph.
* Generally a nicer DX to `import { Thing } from @namespane/library` than `import { Thing } from ../../../dir`.

Obviously this application only has one feature section (messages), so I had to pretend a bit,
but generally I find I end up with most of these in some form or another regardless of the
application or stack.

* __auth__: helpers for authentication and authorization, including a custom hook and provider
* __elements__: low-level UI atoms, even if using a third-party DS, there's using some wrapping to be done
* __generated__: where the types generated from the server live. No written code.
* __http__: HTTP utilities for things like appending a JWT to every request or handling 401 errors.
* __testing__: testing utilities for mocking etc.
* __utils__: little vanilla TS utilities.

The backend is super light here, but I usually group libraries into 3 categories:
* __server__: back-end only
* __ui__: front-end only
* __common__: for ones shared between both (usually utility functions and enums)

## Scripts
I added the following scripts to the package.json

* __build__: compile both front-end and backend
* __commit__: shortcut to commitizen
* __format:check__: verify formatting is correct, throw if now (usually more of a CI/CD thing)
* __lint__: lint all projects
* __lint:staged__: format and lint only dirty files before committing
* __start__: serve both api and client
* __start:api__: start only the backend (for e2e tests)
* __test__: run all unit tests (only the auth library and client app have any)
* __test:e2e__: run e2e tests (only the client has any), the server needs to be running first
* __types__: generate types based on the OpenAPI implementation in the server (needs to be running)
