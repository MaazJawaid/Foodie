import mongoose from 'mongoose';

// Connection URL
const url = 'mongodb://localhost:27017/Foodie';

// Connect to MongoDB
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

export default mongoose.connection;
