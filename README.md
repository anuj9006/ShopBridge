# ShopBridge

## Host app
Run `npm install`
Run `npm run start-prod`. Navigate to `http://localhost:3000/`.

## Development server
Run `npm install`
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Docker start
Run `docker build -t shop-bridge-docker . ` . This will be build the docker image with App.

Run `docker run -p 3000:3000 -d shop-bridge-docker` . This will start container for above built image.
Navigate to `http://localhost:3000/`

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).