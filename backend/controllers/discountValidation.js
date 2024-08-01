// Function to check and clear expired discounts
const clearExpiredDiscounts = async () => {
    try {
        const currentDate = new Date();
        // Find all food items where discountValidUntil is in the past
        const expiredItems = await FoodItem.find({
            discountValidUntil: { $lt: currentDate },
            discount: { $ne: null } // Ensure there is an active discount to clear
        });

        // Update each expired item to clear discount fields
        for (let item of expiredItems) {
            item.discount = null;
            item.discountPeriod = null;
            item.discountedPrice = null;
            item.discountValidUntil = null;
            await item.save();
        }

        console.log('Expired discounts cleared:', expiredItems.length);
    } catch (err) {
        console.error('Error clearing expired discounts:', err);
    }
};

export default clearExpiredDiscounts ;
