// mongodb.ts

import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.MONGODB_URI!;
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to.env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options); 
    global._mongoClientPromise = client.connect(); 
  }
  clientPromise = global._mongoClientPromise!;
} else {
  client = new MongoClient(uri, options); 
  clientPromise = client.connect(); 
}

export default clientPromise;
