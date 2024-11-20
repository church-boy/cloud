const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Connect to MongoDB
try {
  mongoose.connect("YOUR_MONGODB_URI");
  console.log("MongoDB connected successfully!");
} catch (error) {
  console.error(error);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Define Movie Schema
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

// Define Movie Model
const Movie = mongoose.model("Movie", movieSchema);

// Routes
// Welcome Route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Movie Adding App! Use /movies to add, view, update, or delete movies."
  );
});

// READ: Get all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send("Error fetching movies: " + err.message);
  }
});

// READ: Get a single movie by ID
app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send("Movie not found!");
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).send("Error fetching movie: " + err.message);
  }
});

// CREATE: Add a new movie
app.post("/movies", async (req, res) => {
  const { title, year, genre } = req.body;
  if (!title || !year || !genre) {
    return res.status(400).send("Invalid movie data");
  }
  try {
    const movie = await Movie.create({ title, year, genre });
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).send("Error adding movie: " + err.message);
  }
});

// UPDATE: Update a movie by ID
app.put("/movies/:id", async (req, res) => {
  const { title, year, genre } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, year, genre },
      { new: true, runValidators: true } // Return updated document
    );
    if (!movie) {
      return res.status(404).send("Movie not found!");
    }
    res.status(200).json({ message: "Movie updated successfully!", movie });
  } catch (err) {
    res.status(500).send("Error updating movie: " + err.message);
  }
});

// DELETE: Delete a movie by ID
app.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send("Movie not found!");
    }
    res.status(200).json({ message: "Movie deleted successfully!", movie });
  } catch (err) {
    res.status(500).send("Error deleting movie: " + err.message);
  }
});

// Start Server
app.listen(5000, () => console.log("Server started on port 5000"));
