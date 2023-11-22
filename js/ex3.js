const data = [
  {
    a: 1,
    x: null,
    k: [1, 2],
    b: 2,
    c: {
      d: 1,
      e: {
        s: {
          f: {
            v: 4,
          },
        },
      },
    },
  },
];
const deepClone = (data) => {
  if (data === null) return null;
  if (Array.isArray(data)) {
    const result = [];
    for (let item of data) {
      result.push(deepClone(item));
    }
    return result;
  }
  if (typeof data === "object") {
    const result = {};
    const keys = Object.keys(data);
    for (let key of keys) {
      result[key] = deepClone(data[key]);
    }
    return result;
  }
  return data;
};
const result = deepClone(data);
console.log(result[0].k === data[0].k);
console.log(result[0].c === data[0].c);
console.log(result[0].c.e.s === data[0].c.e.s);

const ads = [
  { name: "ad1", price: 1.8, show: 0 },
  { name: "ad2", price: 1.55, show: 0 },
  { name: "ad3", price: 1.13, show: 0 },
  { name: "ad4", price: 0.48, show: 0 },
];
const RobinWrapper = (ads) => {
  let priceSum = 0;
  let sum = 0;
  for (let i = 0; i < ads.length; i++) {
    priceSum += ads[i].price;
  }
  return function (ads) {
    let min = Infinity;
    let maxIndex = -1;

    for (let i = 0; i < ads.length; i++) {
      const priceRatio = ads[i].price / priceSum;
      const valueRatio = ads[i].show / sum || 0;
      if (priceRatio >= valueRatio && valueRatio < min) {
        min = valueRatio;
        maxIndex = i;
      }
    }
    sum++;
    ads[maxIndex].show++;
  };
};
const RandomWrapper = (ads) => {
  let sum = 0;
  let sumValue = 0;
  for (let i = 0; i < ads.length; i++) {
    sum += ads[i].price;
  }
  return function (ads) {
    while (true) {
      let index = Math.floor(Math.random() * ads.length);
      const pricePart = ads[index].price / sum;
      let valuePrice = ads[index].show / sumValue || 0;
      if (valuePrice === Infinity) valuePrice = 0;
      if (pricePart + 0.00001 >= valuePrice) {
        ads[index].show++;
        sumValue++;
        break;
      }
    }
  };
};
const ChainWrapper = (ads) => {
  const sumPrice = ads.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  let sumValue = 0;
  return function (ads) {
    let index = 0;
    while (true) {
      if (ads[index].price / sumPrice <= ads[index].show / sumValue) {
        if (index === ads.length - 1) {
          ads[0].show++;
          sumValue++;
          break;
        }
        index++;
      } else {
        ads[index].show++;
        sumValue++;
        break;
      }
    }
  };
};

function spreadTrafficByPrice(ads) {
  let index = 0;
  let max = -Infinity;
  for (let i = 0; i < ads.length; i++) {
    let { price, show: value } = ads[i];
    let result = value > 0 ? price - (value + 1) / price : price;
    if (result > max) {
      max = result;
      index = i;
    }
  }

  ads[index].show++;
}
const SpreadEvenly = (ads) => {
  let min = ads[0].show;
  let minIndex = 0;
  for (let i = 1; i < ads.length; i++) {
    if (ads[i].show < min) {
      min = ads[i].show;
      minIndex = i;
    }
  }
  ads[minIndex].show++;
};
const BinaryWrapper = (ads) => {
  const priceSum = ads.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  let sum = 0;
  return function (ads) {
    let left = 0;
    let right = ads.length - 1;
    let iterations = ads.length;
    let index;
    while (iterations) {
      index = left + Math.floor((right - left) / 2);
      let prev = sum > 0 ? sum : 1;
      const ratioLeft = ads[left].price / priceSum - ads[left].show / prev;
      const ratioRight = ads[right].price / priceSum - ads[right].show / prev;
      const ratio = ads[index].price / priceSum - ads[index].show / prev;
      if (right - left === 1) {
        index = ratioRight > ratioLeft ? right : left;
        break;
      }
      if (ratioLeft >= ratio && ratioLeft > ratioRight) {
        right = index;
        iterations /= 2;
        continue;
      }
      if (ratioRight >= ratio) {
        left = index;
        iterations /= 2;
        continue;
      }
      break;
    }
    ads[index].show++;
    sum++;
    return;
  };
};
const Binary = BinaryWrapper(ads);
const Random = RandomWrapper(ads);
const Robin = RobinWrapper(ads);
const Chain = ChainWrapper(ads);
for (let i = 0; i < 1000000; i++) {
  // SpreadEvenly(ads);
  Binary(ads);
  //   Chain(ads);
  //   Robin(ads);
  //   Random(ads);
  //   spreadTrafficByPrice(ads);
  //   spreadTrafficByPriceBinary(ads, 0, ads.length - 1);
}
console.log(performance.now(), ads);
