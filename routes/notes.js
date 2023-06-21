const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')


notesRouter.get('/', (req, res) =>{
  readFromFile('./db/db.json').then(notes => {
    // console.log(JSON.parse(notes));
    res.json(JSON.parse(notes))
  })
  

});

// POST Route for submitting notes

notesRouter.post('/', (req, res) => {
  
  const userInput = req.body;
console.log(userInput);


  // If all the required properties are present
  if (userInput.title && userInput.text) {
    // Variable for the object we will save
    const newNote = {
      title: userInput.title,
      text: userInput.text,
      id: uuidv4(),

}

    readAndAppend(newNote, './db/db.json');

    res.send('Note added.');
  } else {
    res.json('Error in posting feedback');
  }
// res.send('post route')
});

// notesRouter.delete('/:id', (req, res) => {
//   console.log('deleted')
//   const { id } = req.params;
//   res.status(200).json(id)

// });

module.exports = notesRouter;
