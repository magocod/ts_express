# One Time Secret Outside In TDD

An exercice to create a OneTimeSecret backend clone. We will take into account the following restrictions:

* The public interface must be a RESTful API
* Store secrets in the server and get a url to retrieve them afterwards
* Secrets must have 3 characters at least
* Secrets can be retrieved only once, after they get deleted
* Url Id to access secrets must have at least 10 characters
* When the get url does not exist, a not found error must be returned
* If the get url is expired, a not found error must be returned

We will build it using Outside In TDD approach.

To run the tests, execute:  
`npm i` to install the depencencies and then  
`npm run test` to run the tests