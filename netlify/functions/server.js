const express = require("express");
import serverless from "serverless-http";
const cors = require("cors");
const tracksWithId = require("../../data/tracksWithId");
const artistsWithId = require("../../data/artistsWithId");
const playListsWithId = require("../../data/playListsWithId");

const app = express();
const port = 8000;

const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "https://hosein-music-city.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/tracks", (req, res) => {
  res.status(200).json({
    data: tracksWithId,
  });
});

app.get("/track/:id", (req, res) => {
  const track = tracksWithId.find((track) => track.id === req.params.id);
  if (track) res.status(200).json(track);
  else res.status(404).json({ message: "track not found" });
});

app.get("/artists", (req, res) => {
  res.status(200).json({
    data: artistsWithId,
  });
});

app.get("/artist/:id", (req, res) => {
  const artist = artistsWithId.find((artist) => artist.id === req.params.id);
  if (artist) res.status(200).json(artist);
  else res.status(404).json({ message: "artist not found" });
});

app.get("/playlists", (req, res) => {
  res.status(200).json({
    data: playListsWithId,
  });
});

app.get("/playlist/:id", (req, res) => {
  const playList = playListsWithId.find(
    (playlist) => playlist.id === req.params.id
  );
  if (playList) res.status(200).json(playList);
  else res.status(404).json({ message: "playlist not found" });
});

app.listen(port, () => {
  console.log(`music app listening on port ${port}`);
});

export const handler = serverless(app);
