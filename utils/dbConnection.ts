import { connect } from 'mongoose';

let url: string = 'mongodb://localhost:27017/next_auth_swr';

interface DataBaseConnection {
  isConnected?: number;
}

const connection: DataBaseConnection = {};

const dbConnect = async () => {
  // Check if we have a connection to our database
  if (connection.isConnected) {
    return;
  }

  // Connection to the database
  const db = await connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  connection.isConnected = db.connections[0].readyState;
};

export { dbConnect };
