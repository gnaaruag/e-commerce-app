const Cart = require("../models/cart.model");
const { authMiddleware } = require("./auth.controller");
const addItem = async (req, res) => {
  const { token, email, productId, quantity } = req.body;
  const check = authMiddleware(token);
  if (!check.valid) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const existingItem = await Cart.findOne({ userEmail: email, productId: productId });
    if (existingItem) {
      return res.status(400).send("Item already exists in the cart.");
    }

    const item = new Cart({
      userEmail: email,
      productId: productId,
      quantity: quantity,
    });

    await item.save();
    res.status(201).send("Item added");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const editItem = async (req, res) => {
  const { token, email, productId, quantity } = req.body;
  const check = authMiddleware(token);

  if (!check.valid) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const item = await Cart.findOneAndUpdate(
      { userEmail: email, productId: productId },
      { quantity: quantity },
      { new: true }
    );

    if (!item) {
      return res.status(404).send("Item not found in the cart.");
    }

    res.status(200).send("Item updated");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const deleteItem = async (req, res) => {
  const { token, email, productId } = req.body;
  const check = authMiddleware(token);

  if (!check.valid) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const item = await Cart.findOneAndDelete({ userEmail: email, productId: productId });

    if (!item) {
      return res.status(404).send("Item not found in the cart.");
    }

    res.status(200).send("Item deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const getItems = async (req, res) => {
	const { token, email } = req.body;
	const check = authMiddleware(token);
  
	if (!check.valid) {
	  return res.status(401).send("Access denied. No token provided.");
	}
  
	try {
	  const items = await Cart.find({ userEmail: email });
	  res.status(200).json(items);
	} catch (error) {
	  console.log(error);
	  res.status(500).send(error.message);
	}
  };
  

module.exports = { addItem, editItem, deleteItem, getItems };
