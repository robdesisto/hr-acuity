# ui-http

Another library that is overkill for this project, but authentication and http requests 
tend to be related. By making an HTTP library, we can abstract away - say - the process
of migrating to micro-services from a monolith, or just keep behavior consistent across
apps.

I didn't actually set up bearer authorization in Nest, so it's basically just faking it.

## Running unit tests

Run `nx test ui-http` to execute the unit tests via [Jest](https://jestjs.io).
