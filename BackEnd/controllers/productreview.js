
const Product = require("../models/Product");

exports.createProductReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user.id,  
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const isReviewed = product.reviews.find(
            (rev) => rev.user.toString() === req.user.id.toString()
        );

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user.id.toString()) {
                    rev.rating = rating;
                    rev.comment = comment;
                }
            });
        } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        let avg = 0;
        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Review added/updated successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.deleteProductReview = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const reviewIndex = product.reviews.findIndex(
            (rev) => rev.user.toString() === req.user.id.toString()
        );

        if (reviewIndex === -1) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        product.reviews.splice(reviewIndex, 1);
        product.numOfReviews = product.reviews.length;

        let avg = 0;
        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = product.reviews.length === 0 ? 0 : avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};