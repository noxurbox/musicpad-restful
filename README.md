# Musicpad's Restful API

Musicpad is an open-source artist first music platform. My goal with musicpad is to offer an alternative to soundcloud with better audio quality and better artist discovery using TensorFlow mechine learning.

Keep in mind that the project is in early development and that things will not work 100% correctly.

## Development

To run the application in development mode you'll need docker, node18, visual studio build tools and python3.

DO NOT DEPLOY THE APPLICATION TO A K8S CLUSTER.

Once you have the prerequisites you can simply run `docker-compose up --build` in a termnial. Docker & docker compose will pull everything needed to run the application.

The application will by defult run on `http://localhost:3080`

The API endpoints will use the route `/_helix`

## Contributing

As of now i have not offically setup unit tests or a CI pipeline with the repo so please DO NOT open pull requests yet.