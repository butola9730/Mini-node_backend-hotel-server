const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

//Person route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    //Save  the person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Get Method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//get Method to geth the person using params
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the work type form the URL parameters

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ err: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//Update method  to update the person

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body; //updated dat for the person
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Validate the updated document
      }
    );

    if (!response) {
      return res.status(404).json({ error: " Person not Found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    //Assuming you have a person model
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: " Person not Found" });
    }
    console.log("Data updated");
    res.status(200).json({ message: "person deleted succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

//comment add for testing purpose

module.exports = router;
