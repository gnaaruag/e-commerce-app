const Order = require('../models/order.model'); // Adjust the path as necessary

const orderFetch = async (req, res) => {
	const { email } = req.body;
  
	if (!email) {
	  return res.status(400).json({ error: "Email is required" });
	}
  
	try {
	  // Fetch orders for the user
	  const orders = await Order.find({ userEmail: email });
  
	  // If no orders are found, return an empty array
	  if (orders.length === 0) {
		return res.status(200).json({ orders: [] });
	  }
  
	  res.status(200).json({ orders });
	} catch (error) {
	  console.error("Error fetching orders:", error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  };
  
module.exports = {orderFetch};
