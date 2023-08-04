export const sleep = (time: number = 2000) => {
  console.log(`[SLEEP=${time}ms]`);
  return new Promise((resolve) => setTimeout(resolve, time));
};
