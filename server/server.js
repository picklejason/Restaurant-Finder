require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {

  try {
    const results = await db.query(
      "SELECT * FROM restaurants WHERE id = $1", [req.params.id]
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      }
    });     
  } catch (err) {
    console.log(err);
  }
  
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {

  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", 
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      }
    })
  } catch (err) {
    console.log(err);
  }
});

// Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      }
    })
  } catch (err) {
    console.log(err);
  }
});

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {

  try {
    const results = await db.query(
      "DELETE FROM restaurants where id = $1", [req.params.id]
    );
    res.status(204).json({
      status: "succecss"
    })
  } catch (err) {
    console.log(err);
  }
  
});

const port = process.env.PORT

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
})