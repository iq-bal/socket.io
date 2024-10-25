const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");

const io = require("socket.io")(http);

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error loading the page.");
    }
  });
});

let users = 0;

// '/' is default namespace
// '/custom-namespace

const cnsp = io.of("/custom-namespace");
// now wherever we used to use io before we are going to use cnsp now

cnsp.on("connection", function (socket) {
  console.log("A user connected");

  setTimeout(() => {
    // socket.send("Sent message from server side by pre-reserved events");
    //   create a custom event in server side
    // socket.emit("myCustomEvent", {
    //   description: "A custom message from server side",
    // });
  }, 3000);

  //   catch a custom event in the server side
  // socket.on("myCustomEventFromClientSide", function (data) {
  //   console.log(data);
  // });

  users++;
  // for global broadcast, message to all connected users
  // io.sockets.emit("broadcast", { message: `${users} connected` });

  // different message for already connected user and new user
  // new user will get this message
  // socket.emit("newuserconnect", { message: "Hii welcome Dear" });
  // already connected user will get this message
  // socket.broadcast.emit("newuserconnect", { message: `${users} connected` });

  cnsp.emit("testEvent", "Test event call");

  socket.on("disconnect", function () {
    console.log("A user disconnected");
    users--;
    // io.sockets.emit("broadcast", { message: `${users} connected` });
    // socket.broadcast.emit("newuserconnect", {
    //   message: `${users} connected`,
    // });
  });
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
