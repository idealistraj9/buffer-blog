// mongodb.d.ts

declare module 'mongodb' {
    export interface MongoClientOptions {
      useUnifiedTopology?: boolean;
      useNewUrlParser?: boolean;
    }
  
    export class MongoClient {
      constructor(uri: string, options?: MongoClientOptions);
  
      connect(): Promise<void>;
    }
  }
  