import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/infinio_3d_portal';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  failedAt: number | null;
}

declare global {
  // eslint-disable-next-line no-var
  var __infinioMongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.__infinioMongooseCache || {
  conn: null,
  promise: null,
  failedAt: null,
};

if (!global.__infinioMongooseCache) {
  global.__infinioMongooseCache = cached;
}

export async function connectToMongo(): Promise<typeof mongoose | null> {
  if (cached.conn) {
    return cached.conn;
  }

  if (cached.failedAt && Date.now() - cached.failedAt < 15000) {
    return null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 1200,
        connectTimeoutMS: 1200,
      })
      .then((m) => {
        cached.failedAt = null;
        return m;
      })
      .catch(() => {
        cached.failedAt = Date.now();
        cached.promise = null;
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
