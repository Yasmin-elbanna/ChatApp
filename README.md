# Roomify - Real-time Chat Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Roomify is a real-time chat application built using Node.js, Express, Socket.io, and MongoDB. It allows users to create chat rooms, join existing rooms, send and receive messages in real-time, and more.

## Features
- **Create and Join Rooms**: Users can create new chat rooms or join existing rooms by entering a room name.
- **Real-time Messaging**: Messages are delivered instantly to all users in the same chat room without the need to refresh the page.
- **Edit and Delete Messages**: Users can edit and delete their own messages within the chat room.
- **User Authentication**: User authentication is implemented to ensure that only registered users can access the chat rooms.
- **Persistent Storage**: Chat messages are stored in a MongoDB database, allowing users to view past messages even after refreshing the page.
- **User Count**: The application displays the number of users currently in each chat room.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime environment.
- **Express**: Web application framework for Node.js.
- **Socket.io**: Library for real-time, bidirectional communication between web clients and servers.
- **MongoDB**: NoSQL database for storing chat messages.
- **HTML/CSS**: Frontend styling and structure.
- **JavaScript (Vanilla)**: Client-side scripting for dynamic behavior.

## Usage
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yasmin-elbanna/ChatApp.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

4. Open your web browser and navigate to `http://localhost:8080` to access the Roomify chat application.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, feature requests, or improvements you would like to see.

## License
[![License](https://img.shields.io/:License-MIT-blue.svg?style=flat-square)](http://badges.mit-license.org)
