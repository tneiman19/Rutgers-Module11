const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const uuid = require("uuid");
const savedNotes = require("./db/db");
const PORT = process.env.PORT || 5000;
const util = require("util");
const readFromFile = util.promisify(fs.readFile);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api/notes routes
app.get("/api/notes", (req, res) => {
  console.log(`${req.method} route for: /api/notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", async (req, res) => {
  console.info(`${req.method} request received to add a note`);

  try {
    const { title, text } = req.body;
    if (!title || !text) {
      throw new Error("Both title and text are required");
    }
    const newNote = {
      title,
      text,
      id: uuid.v4(),
    };
    savedNotes.push(newNote);
    await fs.promises.writeFile("./db/db.json", JSON.stringify(savedNotes));
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  console.log("User hit the delete route");
  try {
    const notes = await fs.promises.readFile("./db/db.json", "utf-8");
    const filteredNotes = JSON.parse(notes).filter(
      (note) => note.id !== req.params.id
    );
    await fs.promises.writeFile("./db/db.json", JSON.stringify(filteredNotes));
    res.send("Note deleted successfully.");
  } catch (error) {
    console.error("Error deleting note: ", error);
    res.status(500).send("Internal Server Error.");
  }
});

// HTML Routes
app.get("/notes", (req, res) => {
  console.log("Loading notes.html file");
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  console.log("Loading index.html file");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
