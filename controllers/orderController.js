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
// Update order status (for admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.status(200).json({
      message: 'Order status updated successfully!',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};