// import mongoose from "mongoose";

// const connectDB = async () =>{

// mongoose.Connection.on('connected',() => {
//      console.log("DB CONNECTED");
//  })
// await mongoose.Connection(`${process.env.MONGODB_URI}/e-commerce`)
        
        
// }

// export default connectDB
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB CONNECTED");
    });

    mongoose.connection.on("error", (err) => {
      console.error("DB CONNECTION ERROR:", err);
    });

    
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectDB;



