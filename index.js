const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

const dbName="VIC-Database";
const client = new MongoClient(
  "mongodb+srv://heroreal5385:a1ULx6FEqKAd464z@cluster0.hxp3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
  const { name,email,contact,date,car,service,time } = req.body;
  const bookingInfo = {
    name: name,
    email: email,
    contact:contact,
    date: date,
    car:car,
    service:service,
    time:time
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

app.post("/sendBookingemail", async (req, res) => {
  const { email,name,contact,date,time,car,service } =
    req.body;
  // console.log(req.body);
  try {
    await nodemailer
      .createTransport({
        service: "gmail",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "heroreal5385@gmail.com",
        pass: "ybgc fpop npch sgbp",
         
        },
      })
      .sendMail({
        from: "heroreal5385@gmail.com",
        to: email,
        subject: "Booking Email",
        html: `<div>
      <div>Thank you for your booking ${name}</div>
      <p>Name: ${name}</p>
      <p>Contact: ${contact}</p>
      <p>Date: ${date}</p>
      <p>Time: ${time}</p>
      <p>Car Model: ${car}</p>
      <p>Service: ${service}</p>
      </div>`,
      });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteBooking", async (req, res) => {
  const { id } = req.body; // Get the id from the request body

  try {
    const db = client.db(dbName);
    const collection = db.collection("BookingData");

    // Update the booking document by setting the action to "deleted"
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // Filter by the document's _id
      { $set: { action: "deleted" } } // Set the action to "deleted"
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Booking marked as deleted." });
    } else {
      res.status(404).json({ message: "Booking not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the booking." });
  }
});
// Start the server
const port =  3000;
app.listen(port, () => {
  console.log(`Server is running on 3000`);
});
