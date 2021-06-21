// LOAD DATA
// We are linking our routes to a series of "data" sources.
const fs = require("fs")
// These data sources hold arrays of information on table-data, waitinglist, etc.
const path = require('path');
const nanoid = require('nanoid');


  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  module.exports = function(app){
  app.get('/api/notes', (req, res) => res.sendFile(path.join(_dirname,"../db/de.json")));


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript _array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
app.post('/api/notes', (req, res) => {
let currentNote = {
    id:nanoid(),
    title:req.body.title,
    text:req.body.text
  };

let pastNote = JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf-8")) 
pastNote.push(currentNote)
fs.writeFileSync("./db/db.json",JSON.stringify(pastNote))
res.json(pastNote)
})


    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
 

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.delete("/api/notes/:id", (req, res) => {
    let choice = req.params.id
    let pastNote =JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf-8"))
    const newNote =pastNote.filter(pastNote=>pastNote.id != choice)
    fs.writeFileSync("./db/db.json",JSON.stringify(newNote))
    res.send(newNote)
})
  }