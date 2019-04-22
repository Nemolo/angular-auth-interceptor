# NgAuthHeaderInterceptor

## Scope

This interceptor will add an header to all requesto to authenticate api calls (auth + refresh token).

## How

It provides an abstract service to be completed by the user. The interceptor will add auth token to each request
and will try to refresh it when it recieve a 401 response. It will enqueue all the request till a valid access token is
recieved.

## Disclaimer

This library was made for my own usage, and is provided AS IS, use it at your risk.

## Usage

Install via `npm i --save ng-auth-header-interceptor`

then add interceptor to providers, es:



## Credits

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.
