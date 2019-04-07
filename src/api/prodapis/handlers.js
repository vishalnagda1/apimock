const csv = require('csvtojson')

let adder = (sum, element) => {
  let p = new Promise((resolve) => {
    resolve(sum + element);
  });

  return p;
}

export let loop = async (request, h) => {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let sum = 0;
  let i = 0;
  while (i < numbers.length) {
    console.log(`Trying to add ${numbers[i]}`);
    const res = await adder(sum, numbers[i]);
    console.log(`Current sum is ${res}`);
    sum = res
    i += 1;
  }
  return sum;
};

export let csv2json = async (request, h) => {
  // file is the payload name
  const { file } = request.payload;
  const jsonArray = await csv().fromString(file);
  return jsonArray;
};

