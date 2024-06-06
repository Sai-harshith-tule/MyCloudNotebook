const express = require("express"); 
const router = express.Router(); 
const Notes = require("../models/Notes"); 
var fetchuser = require("../middleware/fetchuser"); 
 
//Route 1: Get all the notes from database using: GET "api/notes/fetvhallnotes". login required 
router.get("/fetchallnotes", fetchuser, async (req, res) => { 
  const notes = await Notes.find({ user: req.user.id }); 
  res.json(notes); 
}); 
 
module.exports = router;