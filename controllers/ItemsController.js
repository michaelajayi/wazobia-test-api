const Item = require("../models/Item");
const User = require("../models/User");

exports.findAll = async (req, res) => {
  const items = await Item.find({})
    .populate("user", "-__v -dateRegistered -password -isVerified")
    .sort({ createdAt: 1 });

  return res.status(200).json({
    success: true,
    items,
  });
};

exports.addOne = async (req, res) => {
  const { name, desc } = req.body;
  try {
    // find user
    const user = await User.findById(req.body.user);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }

    // check if item exists
    let item = await Item.findOne({ name });

    if (item) {
      return res.status(400).json({
        success: false,
        msg: "Item already exists",
      });
    }

    // create item
    item = new Item({
      name,
      desc,
    });

    item = await item.save();

    // Add property-item assocation
    item = await Item.findByIdAndUpdate(
      item._id,
      {
        $push: { user: user._id },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    ).populate("user", "-__v -dateRegistered -password -isVerified");

    return res.status(201).json({
      success: true,
      msg: "Item created",
      item,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOne({ id }).populate(
      "user",
      "-__v -dateRegistered -password -isVerified"
    );

    if (!item) {
      return res.status(404).json({
        msg: "Item not found",
      });
    }

    return res.status(200).json(item);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  try {
    // check if item exists
    let item = await Item.findById(id);

    if (!item) {
      return res.status(400).json({
        success: false,
        msg: "Item not found",
      });
    }

    item = await Item.findByIdAndUpdate(
      id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true }
    ).populate("user", "-__v -dateRegistered -password -isVerified");

    return res.status(200).json({
      success: true,
      msg: "Item updated",
      item,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.deleteOne = async (req, res) => {
  const id = req.params.id;

  try {
    // check if item exists
    const item = await Item.findById(id);

    if (!item) {
      return res.status(400).json({
        success: false,
        msg: "Item not found",
      });
    }

    await Item.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      msg: "Item deleted",
      item: {
        _id: item._id,
        name: item.name,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
