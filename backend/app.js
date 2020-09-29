const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productRoutes);
app.use("/", authRoutes);

// const { MongoClient } = require("mongodb");

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb+srv://admin:admin@cluster0.pfuvh.mongodb.net/shop?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();

//     // const database = client.db('sample_mflix');
//     // const collection = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     // const query = { title: 'Back to the Future' };
//     // const movie = await collection.findOne(query);

//     console.log("connected");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

db.initDb((err,db) =>{
  if(err)
  {
    console.log(err);
  }
  app.listen(3100);

})
