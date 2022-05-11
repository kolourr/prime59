function subsetSum(numbers, target, partial) {
    var s, n, remaining;
  
    partial = partial || [];
  
    // sum partial
    s = partial.reduce(function (a, b) {
      return a + b;
    }, 0);
  
    // check if the partial sum is equals to target
    if (s === target) {
      console.log("%s=%s", partial.join("+"), target)
    }
  
    if (s >= target) {
      return;  // if we reach the number why bother to continue
    }
  
    for (var i = 0; i < numbers.length; i++) {
      n = numbers[i];
      remaining = numbers.slice(i + 1);
      subsetSum(remaining, target, partial.concat([n]));
    }
  }
  
  subsetSum([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53],59);