const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");

// Post Method add a Item in Menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const menuItem = new MenuItem(data);

    const response = await menuItem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server Error" });
  }
});

// Get method in menu to  get all items

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;

    if (tasteType == "Spicy" || tasteType == "Sweet" || tasteType == "Sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ err: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

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
    res.status(200).json({ message: "person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});
//comment 

module.exports = router;
