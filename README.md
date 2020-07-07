NICE InContact Calculator API
======================

# Installation

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)

## Local installation

### Regular installation

- Please install Node.js on your machine: https://nodejs.org/en/download/
- Go to the folder with the project
- Install dependencies:

    npm install

- Run the project:


    npm start


### Installation Using Docker
Set the PUBLIC_URL environment variable

Please, create a new Docker image:

    docker build -t nice-incontact-api .

Confirm that the image was created and copy the "IMAGE ID":

    docker image ls

Run a Docker container

    docker run -p 8081:3000 IMAGE_ID

