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
// Убрал лишний цикл
const deepClone = (data) => {
  const result = Array.isArray(data) ? [] : {};
  const keys = Object.keys(data);
  const queue = [[result, data]];
  while (queue.length && keys.length) {
    const [res, base] = queue.shift();
    const key = keys.shift();
    const item = base[key];
    if (typeof item === "object" && item !== null) {
      const newKeys = Object.keys(item);
      res[key] = Array.isArray(item) ? [] : {};
      let counter = 0;
      do {
        queue.unshift([res[key], item]);
        counter++;
      } while (counter < newKeys.length);
      keys.unshift(...newKeys);
    } else {
      res[key] = item;
      if (keys.length) queue.push([res, base]);
    }
  }
  return result;
};

const result = deepClone(data);
console.log(result);
console.log(result[0].k === data[0].k);
console.log(result[0].c === data[0].c);
console.log(result[0].c.e.s === data[0].c.e.s);

// Добавил разные ads для тестов
const ads = [
  { name: "ad1", price: 1.8, show: 0 },
  { name: "ad2", price: 1.55, show: 0 },
  { name: "ad3", price: 1.13, show: 0 },
  { name: "ad4", price: 0.48, show: 0 },
];
const ads1 = [
  { name: "ad1", price: 1, show: 0 },
  { name: "ad2", price: 0.5, show: 0 },
];
const ads2 = [
  { name: "ad1", price: 1, show: 0 },
  { name: "ad2", price: 1, show: 0 },
  { name: "ad2", price: 1, show: 0 },
];
const RobinWrapper = (ads) => {
  let priceSum = 0;
  let sum = 0;
  for (let i = 0; i < ads.length; i++) {
    priceSum += ads[i].price;
    sum += ads[i].show;
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
    sumValue += ads[i].show;
  }
  return function (ads) {
    let counter = 0;
    // Убрал бесконечный цикл
    while (counter < ads.length) {
      let index = Math.floor(Math.random() * ads.length);
      if (counter === ads.length - 1) {
        ads[index].show++;
        sumValue++;
        break;
      }
      const pricePart = ads[index].price / sum;
      let valuePrice = ads[index].show / sumValue || 0;
      if (valuePrice === Infinity) valuePrice = 0;
      if (pricePart + 0.00001 >= valuePrice) {
        ads[index].show++;
        sumValue++;
        break;
      }
      counter++;
    }
  };
};
const ChainWrapper = (ads) => {
  let sumValue = 0;
  const sumPrice = ads.reduce((acc, item) => {
    sumValue += item.show;
    return acc + item.price;
  }, 0);

  return function (ads) {
    let index = 0;
    let counter = 0;
    // Убрал бесконечный цикл
    while (counter < ads.length) {
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
      counter++;
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
      break;
    }
  }
  ads[minIndex].show++;
};
const BinaryWrapper = (ads) => {
  let sum = 0;
  const priceSum = ads.reduce((acc, item) => {
    sum += item.show;
    return acc + item.price;
  }, 0);
  return function (ads) {
    // Байнери несколько дней мучал, алгоритм покороче так и не придумал
    let left = 0;
    let right = ads.length - 1;
    let iterations = ads.length;
    let target = 0;
    let val = Infinity;
    while (iterations >= 1) {
      let middle = left + Math.floor((right - left) / 2);
      let centerVal = Math.abs(
        ads[middle].price / priceSum - (ads[middle].show + 1) / (sum + 1)
      );
      let leftVal = Math.abs(
        ads[left].price / priceSum - (ads[left].show + 1) / (sum + 1)
      );
      let rightVal = Math.abs(
        ads[right].price / priceSum - (ads[right].show + 1) / (sum + 1)
      );
      if (leftVal < val) {
        val = leftVal;
        target = left;
      }
      if (rightVal < val) {
        val = rightVal;
        target = right;
      }
      if (Math.abs(centerVal - leftVal) > Math.abs(centerVal - rightVal)) {
        iterations /= 2;
        right = middle;
      } else {
        iterations /= 2;
        left = middle;
      }
    }
    ads[target].show++;
    sum++;
    return;
  };
};
const Binary = BinaryWrapper(ads);
const Random = RandomWrapper(ads);
const Robin = RobinWrapper(ads);
const Chain = ChainWrapper(ads);
for (let i = 0; i < 100; i++) {
  // SpreadEvenly(ads);
  Binary(ads);
  // Chain(ads);
  //   Robin(ads);
  // Random(ads);
  // spreadTrafficByPrice(ads);
}
console.log(performance.now(), ads);
