// LOAD DATA
// We are linking our routes to a series of "data" sources.
const fs = require("fs")
// These data sources hold arrays of information on table-data, waitinglist, etc.
const path = require('path');
const {nanoid} = require('nanoid');

const notes = require("../db/db.json")

  module.exports = function(app){
  app.get('/api/notes', (req, res) => res.json(notes));



app.post('/api/notes', (req, res) => {
let currentNote = {
    id:nanoid(),
    title:req.body.title,
    text:req.body.text
  };



let saveNote = JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf-8"))
saveNote.push(currentNote)
fs.writeFileSync("./db/db.json",JSON.stringify(saveNote))
res.json(saveNote)
})




app.delete("/api/notes/:id", (req, res) => {
let choice = req.params.id
let saveNote =JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf-8"))
const newNote =saveNote.filter(saveNote=>saveNote.id != choice)
fs.deleteFileSync("./db/db.json",JSON.stringify(savedNote))
res.send(newNote)
})


  }


  
