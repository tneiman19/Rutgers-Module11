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

// app.get("/api/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "./db/db.json"));
// });

// app.post("/api/notes", (req, res) => {
//   fs.readFile("./db/db.json", (err, data) => {
//     if (err) throw err;
//     const notes = JSON.parse(data);
//     const newNote = {
//       id: uuid.v4(),
//       title: req.body.title,
//       text: req.body.text,
//     };
//     notes.push(newNote);
//     fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
//       if (err) throw err;
//       res.send("Note added sucessfully");
//     });
//   });
// });

// app.get("/api/notes/:id", (req, res) => {
//   res.send(req.params.id);
// });

//HTML Routes
app.get("/notes", (req, res) => {
  console.log("Loading notes.html file");
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  console.log("Loading index.html file");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
