const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const dbName="VIC-Database";
const client = new MongoClient(
  "mongodb+srv://heroreal5385:a1ULx6FEqKAd464z@cluster0.hxp3a.mongodb.net/"
);

async function connectToMongo() {
  try {
    client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongo();
// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post("/bookingData", async (req, res) => {
  const { name,email,contact,date,car,service } = req.body;
  const bookingInfo = {
    name: name,
    email: email,
    contact:contact,
    date: date,
    car:car,
    service:service
  };
  const db = client.db(dbName);
  const collection = db.collection("BookingData");
  await collection.insertOne(bookingInfo);
});
app.get("/bookingData", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("BookingData");
    // Retrieve data from MongoDB
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
