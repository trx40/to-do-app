## To do app

### Project to learn AJAX with jQuery and CORS

#### Installation instructions

Clone the project onto your machine

We are running a client and a server

##### Server

- `cd` into `to-do-app/server` and run `npm install` (just to be sure you have all of the node_modules you need)
- Start your mongo daemon `mongod` (`mongosh`) in a separate terminal tab
- Install nodemon globally (if you don't already have it installed) with `npm i -g nodemon`
- Run your server in its own terminal tab with `nodemon` or `node app`

##### Client

- Navigate to `to-do-app/client` in a separate terminal tab and run `npm install`
- Run an initial `gulp default` to be sure your transpiled JS file is up to date
- While working in development you can run `gulp watch` from a separate tab to listen for changes and tanspile your client-side JavaScript each time you update the `/client/src/ajax.js` file
- Run your client server from `/client` with `python -m SimpleHTTPServer` (Windows users see [here](https://stackoverflow.com/questions/17351016/set-up-python-simplehttpserver-on-windows/17351115#17351115))
- Navigate to `localhost:8000` in your browser
