# note-taker

# Unit 11 Express Homework: Note Taker

## User Story

AS A user, I want to be able to write and save notes

I WANT to be able to delete notes I've written before

SO THAT I can organize my thoughts and keep track of tasks I need to complete

## Description

This application can be used to write, save, and delete notes. This application uses an express backend and save and retrieve note data from a JSON file.

* The following HTML routes exist in this application:
  * GET `/notes` - returns the `notes.html` file.
  * GET `*` - returns the `index.html` file

* This application has a `db.json` file on the backend that is used to store and retrieve notes using the `fs` module.

* The following API routes exist in this application:

  * GET `/api/notes` - Reads the `db.json` file and returns all saved notes as JSON.

  * POST `/api/notes` - Receives a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client.

  * DELETE `/api/notes/:id` - Receives a query parameter containing the id of a note to delete. Each note has a unique `id` when it's saved. Deleting a note reads all notes from the `db.json` file, removes the note with the given `id` property, and then rewrites the notes to the `db.json` file.



