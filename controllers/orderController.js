import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { patientId, medicines, totalAmount } = req.body;

    const newOrder = new Order({
      patientId,
      medicines,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { patientId } = req.params;

    const orders = await Order.find({ patientId }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('patientId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};