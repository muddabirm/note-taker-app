//start express router
const express = require('express')
const fs = require('fs') // require filesystem
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
var uniqid = require('uniqid')// used for unique id 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use(express.json())
app.use(express.static('public'))// middleware to point to the public folder with css and html files.

//gets notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});
//gets index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
  });
//needs to read json file and return all saved notes as json
  app.get('/api/notes', (req, res) => {
    try {
      const notesDB = fs.readFileSync(path.join(__dirname,'./db/db.json'), 'utf-8')
      const noteData = JSON.parse(notesDB)
      res.json(noteData)//sends notes as json response
      console.log(noteData)

    } catch (error) {
      console.log(error)
    }
  });
//needs to recieve a new note on req.body and add it to the json file and then return the new note to the client 
  app.post('/api/notes', (req, res) => {
    try {
      const notesDB = fs.readFileSync(path.join(__dirname,'./db/db.json'), 'utf-8')
      const noteData = JSON.parse(notesDB)
      //creating the array to store the new note data
      //using uniqid to make an id for the notes 
      const newTextData = {
        title: req.body.title,
        text: req.body.text,
        uniqid: uniqid()
      }
      noteData.push(newTextData) //adds the new note to the end of the array
      fs.writeFileSync(path.join(__dirname,'./db/db.json'),JSON.stringify(noteData))
      res.json(newTextData)

     console.log(req.body)
    } catch (error) {
      console.log(error)
    }
  });

 