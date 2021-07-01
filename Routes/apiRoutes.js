// LOAD DATA
// We are linking our routes to a series of "data" sources.
const fs = require("fs")
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
  
}
let pastNote = JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf-8")) 
    pastNote.push(currentNote)
    fs.writeFileSync("./db/db.json",JSON.stringify(pastNote))
    res.json(pastNote)
})
app.delete("/api/notes/:id", (req, res) => {
    let choice = req.params.id
    let pastNote =JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf-8"))
pastNote.forEach((element, i) => {
        if(element.id == choice){
            pastNote.splice(i, 1)
        }
    });


    fs.writeFileSync("./db/db.json",JSON.stringify(pastNote))
    res.json(pastNote)


})

}


  
