const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URL;
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
(err, client) => {
  if (err) console.log("ERROR on connection MongoDB");
  else {
    console.log("MongoDB connection succeed");
    const app = require("./app");
    const server = http.createServer(app);
    let PORT = process.env.PORT || 3007;
    server.listen(PORT, function() {
    console.log(`The server successfully run on PORT: ${PORT}, http://localhost:${PORT}`);
    });
  }
}
);
