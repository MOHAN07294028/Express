const express = require("express");
const mongoose = require("mongoose");
const { UserModal } = require("../schema/UserSchema");
const { dbUrl } = require("../config/dbConnection");
const routes = express.Router();
mongoose.connect(dbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

routes.get("/", async (req, res) => {
  try {
    let user = await UserModal.find();
    res.status(200).send({
      resultBoolean: true,
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      resultBoolean: false,
      data: error?.message,
    });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    let user = await UserModal.findById(req.params.id);
    if (user) {
      res.status(200).send({
        resultBoolean: true,
        data: user,
      });
    } else {
      res.status(400).send({
        resultBoolean: false,
        data: "Invalid User",
      });
    }
  } catch (error) {
    res.status(400).send({
      resultBoolean: false,
      data: error.message,
    });
  }
});

routes.post("/", async (req, res) => {
  try {
    let users = await UserModal.findOne({ email: req.body.email });
    if (!users) {
      let newUsers = await UserModal.create(req.body);
      res.status(200).send({
        resultBoolean: true,
        data: "Data Saved Successfully",
      });
    } else {
      res.status(400).send({
        resultBoolean: true,
        data: "Data already exist",
      });
    }
  } catch (error) {
    res.status(400).send({
      resultBoolean: false,
      data: error?.message,
    });
  }
});

routes.put("/:id", async (req, res) => {
  try {
    let user = await UserModal.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      await user.save();
      res.status(200).send({
        resultBoolean: true,
        data: "Data updated successfully",
      });
    } else {
      res.status(400).send({
        resultBoolean: false,
        data: "Invalid User",
      });
    }
  } catch (error) {
    res.status(400).send({
      resultBoolean: false,
      data: error?.message,
    });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    let user = await UserModal.findByIdAndDelete(req.params.id);
    res.status(200).send({
      resultBoolean: true,
      data: "Deleted Successfully",
    });
  } catch (error) {
    res.status(400).send({
      resultBoolean: false,
      data: error?.message,
    });
  }
});
module.exports = routes;
