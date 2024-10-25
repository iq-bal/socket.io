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

io.on("connection", function (socket) {
  console.log("A user connected");

  setTimeout(() => {
    // socket.send("Sent message from server side by pre-reserved events");
    //   create a custom event in server side
    // socket.emit("myCustomEvent", {
    //   description: "A custom message from server side",
    // });
  }, 3000);

  //   catch a custom event in the server side
  socket.on("myCustomEventFromClientSide", function (data) {
    console.log(data);
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
