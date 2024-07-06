To start the project in your local machine, there are two steps.

# METHOD 1 

### Adding Credentials in `.env` file.

```
MONGO_URI = "PASTE YOUR MONGODB URI"
PORT = "SPECIFY PORT(default 8000) WHERE YOU WANT TO START"

```
### Running the server.
1. Install the packages.

```
npm install
```

2. Start server in dev mode

```
npm run dev
```

3. For production mode, start with below command

```
npm start
```

# MEHTOD 2 USING DOCKER

### To run the program using DOCKER.


1. Pull the Docker image from Docker Hub:

```
docker pull yashvsri/chatify:v2
```

2. Run the Docker Container

Run the Docker container with the necessary environment variables. Replace <your-mongo-uri> with your actual MongoDB connection string:

```
docker run -e MONGO_URI=<your mongo uri string> -d -p 8000:8000 yashvsri/chatify:v2
```

For example, if your MongoDB URI is x, you would run:

```
docker run -e MONGO_URI="x" -d -p 8000:8000 yashvsri/chatify:v2
```

3. Access the Application

Open your browser and navigate to 

```
http://localhost:8000 to access the Chatify application.
```
