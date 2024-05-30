// mongodb.ts

import { MongoClient } from 'mongodb';

const uri: string = process.env.MONGODB_URI!;
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient | undefined;
let clientConnectPromise: Promise<void>; // Adjusted to Promise<void>

declare global {
  var _mongoClientConnectPromise: Promise<void> | undefined; // Adjusted to Promise<void>
}

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to.env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientConnectPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientConnectPromise = client.connect();
  }
  clientConnectPromise = global._mongoClientConnectPromise!;
} else {
  client = new MongoClient(uri, options);
  clientConnectPromise = client.connect();
}

export default clientConnectPromise;
