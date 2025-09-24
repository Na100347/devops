const express = require('express');
const Booking = require('../models/booking');
const router = express.Router();

// Đặt chỗ mới
router.post('/bookings', async (req, res) => {
  const { customerName, date, time } = req.body;

  try {
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) return res.status(400).json({ message: 'Booking already exists!' });

    const newBooking = new Booking({ customerName, date, time });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

// Xem danh sách lịch đặt chỗ
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Sửa đặt chỗ
router.put('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { customerName, date, time, status } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id, 
      { customerName, date, time, status }, 
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
});

// Hủy đặt chỗ
router.delete('/bookings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cancelledBooking = await Booking.findByIdAndUpdate(
      id, 
      { status: 'Cancelled' }, 
      { new: true }
    );
    res.status(200).json(cancelledBooking);
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
});

module.exports = router;
