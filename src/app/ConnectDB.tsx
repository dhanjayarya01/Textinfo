import mongoose from 'mongoose';
import {DATABASE_NAME} from"../app/constant"
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function ConnectDB(): Promise<void> {
  
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  } else{
    console.log("not connected  to data base")
  }

  console.log("the env id \n",process.env.DATABASE_URL)

  try {
    
    const db = await mongoose.connect(`${process.env.DATABASE_URL}/${DATABASE_NAME}`)

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    process.exit(1);
  }
}

export default ConnectDB;


