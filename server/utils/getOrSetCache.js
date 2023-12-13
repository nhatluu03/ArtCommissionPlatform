import client from "../redisSetup.js";

const getFromRedis = async (key) => {
  const cacheResult = await client.get(key);
  return cacheResult ? JSON.parse(cacheResult) : null;
};

const setToRedis = async (key, data) => {
  await client.set(key, JSON.stringify(data));
};
export default {getFromRedis, setToRedis}
