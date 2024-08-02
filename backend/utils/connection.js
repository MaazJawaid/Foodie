import mongoose from 'mongoose';

// MongoDB Atlas connection URL
const uri = "mongodb+srv://maazk3611:MWHuY3L0IcmFppYG@cluster0.vpbjarw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(uri, { dbName: 'Foodie' })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

export default mongoose.connection;
