const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const mongodb = require("mongodb");


let db;
const connectionString = process.env.MONGO_URL;

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
(err, client) => {
  if (err) console.log("ERROR on connection MongoDB");
  else {
    console.log("MongoDB connection succeed");
    module.exports = client;

    const app = require("./app");
    const server = http.createServer(app);
    let PORT = process.env.PORT || 3007;
    server.listen(PORT, function() {
    console.log(`The server successfully run on PORT: ${PORT}, http://localhost:${PORT}`);
    });
  }
}
);
