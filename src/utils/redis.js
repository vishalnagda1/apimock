import Promise from "bluebird";
import redis from "redis";
Promise.promisifyAll(redis.RedisClient.prototype);

// connect to redis
export const redisClient = redis.createClient({
  host: "0.0.0.0", // redis server ip
  port: "6379" // redis server port
});

redisClient.on("connect", () =>
  console.log(" [*] Redis: Connection Succeeded.")
);
redisClient.on("error", err => {
  console.error(err.message);
});
