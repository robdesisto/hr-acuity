# ui-auth

A lot of times in an organization with multiple apps, how they authenticate is different,
but they all need to. So putting the plumbing into a library makes sense, so that the apps
behave consistently to the user even when the implementations are different under the hood.

Also, I'm using Jest as a test runner here because the app isn't.

## Running unit tests

Run `nx test ui-auth` to execute the unit tests via [Jest](https://jestjs.io).
