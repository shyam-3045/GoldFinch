const Favorite = require("../models/favorites");

exports.addToFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      favorite = await Favorite.create({ user: userId, products: [productId] });
    } else {
      if (favorite.products.includes(productId)) {
        return res.status(400).json({ message: "Product already in favorites" });
      }
      favorite.products.push(productId);
      await favorite.save();
    }

    res.status(200).json({ message: "Added to favorites", favorite });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const favorite = await Favorite.findOne({ user: userId });

    if (!favorite || !favorite.products.includes(productId)) {
      return res.status(404).json({ message: "Product not found in favorites" });
    }

    favorite.products = favorite.products.filter(id => id.toString() !== productId);
    await favorite.save();

    res.status(200).json({ message: "Removed from favorites", favorite });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorite = await Favorite.findOne({ user: userId }).populate("products");

    if (!favorite) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json({ products: favorite.products });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
