import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

// Reminder to self: above: import dotenv (already installed)

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
import animalsData from "./data/animals-data.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/animals";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const Animal = mongoose.model("Animal", {
  animalID: Number,
  name: String,
  animal: String,
  color: String,
  isFurry: Boolean
})

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Animal.deleteMany({})

    animalsData.forEach((animalItem) => {
      new Animal(animalItem).save()
    })
  }
  seedDatabase()
}

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello animal lovers!");
});

// Route to see all available endpoints
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
});

// Route to get all animals from my data set
app.get("/collection", async (req, res) => {
  const collectionOfAnimals = await Animal.find()
  res.json(collectionOfAnimals)
})

// Endpoint to search for an animal by species:

// Endpoint (?) to show all animals that are furry and those that are not:

// Endpoint to search for a specific color:

// Endpoint to search for an animal name:
  
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
