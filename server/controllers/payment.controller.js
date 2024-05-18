const Order = require('../models/order.model');
const Cart = require('../models/cart.model'); // Import the Cart model
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const checkOut = async (req, res) => {
  const { products, userEmail } = req.body;

  const lineItems = products.map(product => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.productName,
        images: [product.mainImage.asset.url || ""],
      },
      unit_amount: product.price * 100, // amount in paisa
    },
    quantity: product.quantity || 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    for (const product of products) {
      const orderItem = new Order({
        userEmail: userEmail,
        productId: product.productId.toString(),
        quantity: product.quantity,
      });

      await orderItem.save();
    }

    await Cart.deleteMany({ userEmail: userEmail });

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { checkOut };
