const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");

//Route 1: Get all the notes from database using: GET "api/notes/fetvhallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//Route 2: Add a new note usinf POST: POST "api/notes/addnote". login required
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 3,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      //take these from req.body
      const { title, description, tag } = req.body;
      //if there are errors return bad request 400 with errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //if no errors
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      console.log("note saved successfully!");
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote" Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note object and pull title, desc, tag from req.body if given
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //now find note that should be updated using it's id
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("Not Found!");
    }

    //check if person logged in is not changing other person's note
    //by comparing logged in id and note's id
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    //if everything is fine, update the note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote" Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //now find note that should be deleted using it's id
    let note = await Note.findById(req.params.id);
    if (!note) {//if note is not present
      return res.status(401).send("Not Found!");
    }

    //check if person logged in is not deleting other person's note
    //by comparing logged in id and note's id
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    //if everything is fine, delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Message: "Note deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
