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
const Binary = (ads, left, right, prev) => {
  let mid = Math.floor((right - left) / 2);
  mid = mid < left ? left : mid;
  if (left === mid) {
    const op1 = ads[left].price - ads[left].show / ads[left].price;
    const op2 = ads[right].price - ads[right].show / ads[right].price;
    let index = op1 > op2 ? left : right;

    if (prev !== -1) {
      const current = ads[index].price - ads[index].show / ads[index].price;
      const prevVal = ads[prev].price - ads[prev].show / ads[prev].price;
      index = current > prevVal ? index : prev;
    }
    return index;
  }
  if (right <= left) {
    if (prev !== -1) {
      const current = ads[left].price - ads[left].show / ads[left].price;
      const prevVal = ads[prev].price - ads[prev].show / ads[prev].price;
      let index = current > prevVal ? index : prev;
      return index;
    }
    return left;
  }
  if (ads[left].show === ads[right].show) {
    if (prev !== -1) {
      const current = ads[left].price - ads[left].show / ads[left].price;
      const prevVal = ads[prev].price - ads[prev].show / ads[prev].price;
      let index = current > prevVal ? index : prev;
      return index;
    }
    return left;
  }
  if (ads[left].show === ads[mid].show) {
    let res = ads[left].price - ads[left].value / ads[left].price;
    let target = left;
    const newTarget = Binary(ads, mid + 1, right, target);
    const newRes =
      ads[newTarget].price - ads[newTarget].value / ads[newTarget].price;
    if (newRes > res) {
      target = newTarget;
      res = newRes;
    }
    if (prev !== -1) {
      const prevVal = ads[prev].price - ads[prev].show / ads[prev].price;
      let index = res > prevVal ? res : prev;
      return index;
    } else return target;
  }
  if (ads[right].show === ads[mid].show) {
    let res = ads[mid].price - ads[mid].value / ads[mid].price;
    let target = mid;
    const newTarget = Binary(ads, left, mid, target);
    const newRes =
      ads[newTarget].price - ads[newTarget].value / ads[newTarget].price;
    if (newRes > res) {
      target = newTarget;
      res = newRes;
    }
    if (prev !== -1) {
      const prevVal = ads[prev].price - ads[prev].show / ads[prev].price;
      let index = res > prevVal ? res : prev;
      return index;
    } else return target;
  }
  let index = -1;
  let result = -Infinity;
  for (let i = left; i <= right; i++) {
    const res = ads[i].price - ads[i].show / ads[i].price;
    if (res > result) {
      result = res;
      index = i;
    }
  }
  if (prev !== -1) {
    const current = ads[index].price - ads[index].show / ads[index].price;
    const prevVal = ads[prev].price - ads[prev].show / ads[prev].price;
    let newIndex = current > prevVal ? index : prev;
    return newIndex;
  } else {
    return index;
  }
};
const spreadTrafficByPriceBinary = (ads, left, right) => {
  let index = Binary(ads, left, right, -1);
  ads[index].show++;
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
const Random = RandomWrapper(ads);
const Robin = RobinWrapper(ads);
const Chain = ChainWrapper(ads);
for (let i = 0; i < 100; i++) {
  SpreadEvenly(ads);
  //   Chain(ads);
  //   Robin(ads);
  //   Random(ads);
  //   spreadTrafficByPrice(ads);
  //   spreadTrafficByPriceBinary(ads, 0, ads.length - 1);
}
console.log(performance.now(), ads);
