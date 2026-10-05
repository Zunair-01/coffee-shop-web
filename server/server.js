const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const authRoute = require('./Routes/authRoutes');
const itemRoute = require('./Routes/itemRoutes');
const orderRoute = require('./Routes/orderRoutes');
const orderConfirmationRoute = require('./Routes/orderConfirmationRoutes');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/CafeCoffe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoute);
app.use('/api/items', upload.single('image'), itemRoute);
app.use('/api/orders', orderRoute);
app.use('/api/order-confirmations', orderConfirmationRoute);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
