const Cart=require("../models/cart")


exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body; // default quantity to 1

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [] });
    }

    const existingItem = cart.cartItems.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity = Number(quantity); // ensure it’s a number
    } else {
      cart.cartItems.push({ product: productId, quantity: Number(quantity) });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding to cart', error: error.message });
  }
};

  


exports.getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id }).populate('cartItems.product');
  
      if (!cart) return res.status(200).json({ success: true, cart: [] });
      res.status(200).json({ success: true, cartDetails:cart,cart:cart.cartItems });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching cart', error:error.message });
    }
  };



exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
  
    try {
      const cart = await Cart.findOne({ user: req.user.id });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      const item = cart.cartItems.find(item => item.product.toString() === productId);
      if (item) {
        item.quantity = quantity;
        cart.updatedAt = Date.now();
        await cart.save();
        return res.status(200).json({ success: true, cart });
      }
  
      res.status(404).json({ message: 'Item not found in cart' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart item', error });
    }
  };
  

exports.removeFromCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== req.params.productId);
      cart.updatedAt = Date.now();
      await cart.save();
  
      res.status(200).json({ success: true, cart });
    } catch (error) {
      res.status(500).json({ message: 'Error removing item from cart', error });
    }
  };
  
  