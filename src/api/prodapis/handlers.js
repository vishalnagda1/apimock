const csv = require('csvtojson')

let adder = (sum, element) => {
  let p = new Promise((resolve) => {
    resolve(sum + element);
  });

  return p;
}


export let loop = (request, h) => {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let sum = 0;

  numbers.forEach(n => {
    console.log(`Trying to add ${n}`);
    adder(sum, n)
      .then(res => {
        console.log(`Current sum is ${n}`);
        sum = res
      });
  });

  return sum;
};

export let csv2json = async (request, h) => {
  // file is the payload name
  const { file } = request.payload;
  const jsonArray = await csv().fromString(file);
  return jsonArray;
};

