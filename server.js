// Require all of the files we need
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// Change to ATLAS_URI in production
const uri = process.env.MONGO_URI;
// uri comes from the MongoDB Atlas, DB is stored there
// useNewUrlParser and useCreateIndex are here because something was depricated before as well as useUnifiedTopology
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const createdPokemonRouter = require('./routes/createdPokemon')
const pokedexPokemonRouter = require('./routes/pokedexPokemon')
const chartRouter = require('./routes/chart')


app.use("/auth", authRouter);
app.use("/create", createdPokemonRouter);
app.use("/pokedex", pokedexPokemonRouter);
app.use("/user", userRouter);
app.use("/chart", chartRouter);

// Starts Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
