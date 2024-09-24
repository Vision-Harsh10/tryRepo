const express = require('express');
const router = express.Router();
const Person1 = require('./../Models/Person1.js');
var Person = Person1.Person;

// POST API -- PERSON
router.post('/', async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data
    // Create a new Person document using the mongoose model
    const NewPerson = new Person(data);

    // Save the new person to the database
    const response = await NewPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET API -- PERSON
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET API -- PERSON by workType
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
      const response = await Person.find({ work: workType });
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:_id' , async (req,res) =>{
    try{
        const personId = req.params._id;
        const UpdatePersonData =  req.body;

        const response = await Person.findByIdAndUpdate(personId,UpdatePersonData, {
            new : true,
            runValidators : true,
        })

        if(!UpdatePersonData){
            res.status(404).json({error :'Person not Found'});
        }

        console.log('Data Update');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error :'Internal Server Error'});
    }
})
 
router.delete('/:_id', async (req,res) =>{
    try{
        const PersonId = req.params._id;
        const response = await Person.findByIdAndDelete(PersonId);
        if(!response){
            res.status(404).json({error :'Person not Found'});
        }
        console.log(' data Delete');
        res.status(200).json({message : 'Person data deleted SUCCESSFULLY'});
    }catch(err){
        console.log(err);
        res.status(500).json({error :'Internal Server Error'});
    }
})
// Export the router directly
module.exports = router