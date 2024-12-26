import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri: string | undefined = process.env.MONGO_URI;
    if(!uri){
        throw new Error("Mongo URI is not defined");
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
