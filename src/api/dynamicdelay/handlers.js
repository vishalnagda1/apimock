import { redisClient } from "../../utils/redis";

// Function to put delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const dynamicdelay = async (request, h) => {
  // Getting IP address of the client
  const ip = request.info.remoteAddress;
  let redisResponse = await redisClient.GETAsync(ip);
  const timer = 60 * 5; // 5 minutes
  if (!redisResponse) {
    redisResponse = 0;
    // setting ip as key for redis with expire time
    await redisClient.SETAsync(ip, redisResponse, "EX", timer);
  }
  redisResponse = parseInt(redisResponse);

  // Increasing the api call counter and reset TTL
  // await redisClient.SETAsync(ip, redisResponse + 1, "EX", timer);

  // Increasing the api call counter without reseting TTL
  await redisClient.INCRAsync(ip);

  // delay in seconds
  await delay((2 * redisResponse + 1) * 1000);
  return 2 ** redisResponse;
};
