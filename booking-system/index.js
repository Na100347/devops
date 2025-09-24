const mongoose = require('mongoose');

// Kết nối MongoDB Atlas với các tùy chọn hiện đại
mongoose.connect('mongodb+srv://na100347:hona1009@booking.d2roc.mongodb.net/?retryWrites=true&w=majority&appName=booking', {
  // useNewUrlParser: true,  // Đảm bảo sử dụng bộ phân tích URL mới
  // useUnifiedTopology: true  // Đảm bảo sử dụng topology mới
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
