//Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8080;
var mainDir = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Get routes --***order matters for thos. If GET * comes before api routes, it will be read as "other"
//HTML get routes
app.get("/", function(req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});

//API get routes
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8", function(err) {
      if (err) throw err;
    }));
    res.json(savedNotes[Number(req.params.id)]);
});

//Other get URL - send back to homepage
app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});

//API Post route
app.post("/api/notes", function(req, res) {
    var existingNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8", function(err){
      if (err) throw err;
    }));
    var newNote = req.body;
    //Create id for note - length of array works since it will always be 1 higher
    var newNoteID = (existingNotes.length).toString();
    newNote.id = newNoteID;
    existingNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(existingNotes), function(err){
      if (err) throw err;
    });
    console.log("New note successfully saved to db.json: ", newNote);
    res.json(existingNotes);
})

//API Delete route
app.delete("/api/notes/:id", function(req, res) {
    var existingNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8", function(err) {
      if (err) throw err;
    }));

    var noteID = req.params.id;
    var newNoteID = 0;
    console.log("Deleting note with ID: "+noteID);
    existingNotes = existingNotes.filter(note => {
        return note.id != noteID;
    })
    
    for (note of existingNotes) {
      note.id = newNoteID.toString();
      newNoteID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(existingNotes), function(err) {
      if(err) throw err;
    });
    res.json(existingNotes);
})

//Listener
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
})
