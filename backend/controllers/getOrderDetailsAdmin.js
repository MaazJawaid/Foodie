import orderData from "../models/orderData.js";

const findAllOrder = async (req, res) => {

    try {
        const orderItemData = await orderData.find()

        if (!orderItemData) {
            return res.status(404).send('Order not found')
        }

        return res.status(200).json({orderItemData})
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default findAllOrder;