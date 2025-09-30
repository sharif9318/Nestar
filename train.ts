// console.log("=========MIT Task ZK=======");

// function printNumbers(): void {
//   let count = 1;

//   const intervalId = setInterval(() => {
//     console.log(count);
//     count++;

//     if (count > 5) {
//       clearInterval(intervalId);
//     }
//   }, 1000); 
// }


// printNumbers();

// console.log("=========MIT Task ZM=======");

// function reverseInteger(num: number): number {
//   const reversed = num.toString().split('').reverse().join('');
//   return Number(reversed) ;
// }

// console.log(reverseInteger(987654321)); 

// console.log("=========MIT Task ZN=======");

// function rotateArray(arr: number[], index: number): number[] {

//   if (index < 0 || index >= arr.length) {
//     return arr;
//   }

//   const firstPart = arr.slice(0, index + 1);
//   const secondPart = arr.slice(index + 1);

//   return [...secondPart, ...firstPart];
// }

// console.log(rotateArray([1,2,3,4,5,6], 3)); 

// console.log("=========MIT Task ZO=======");

// function areArraysEqual(arr1: any[], arr2: any[]): boolean {
//   const countElements = (arr: any[]) => {
//     const map = new Map<any, number>();
//     for (const item of arr) {
//       map.set(item, (map.get(item) || 0) + 1);
//     }
//     return map;
//   };

//   const map1 = countElements(arr1);
//   const map2 = countElements(arr2);

//   if (map1.size !== map2.size) return false;

//   for (const [key, value] of map1) {
//     if (map2.get(key) !== value) return false;
//   }

//   return true;
// }

// console.log(areArraysEqual([1, 2, 2, 3], [3, 2, 1, 2]));
// console.log(areArraysEqual( ['a', 'b', 'a'], ['b', 'a', 'a'] ));
// console.log(areArraysEqual([1, 2, 3], [1, 2, 2, 3]));

console.log("=========MIT Task ZO=======");

function areParenthesesBalanced(input: string): boolean {
  let balance = 0;

  for (const char of input) {
    if (char === '(') {
      balance++;
    } else if (char === ')') {
      balance--;
      if (balance < 0) {
        // Yopuvchi qavs ochuvchidan oldin kelgan
        return false;
      }
    }
  }

  return balance === 0;
}

console.log(areParenthesesBalanced("(a + b) * (c + d)")); // true
console.log(areParenthesesBalanced("((a + b) * (c + d))")); // true
console.log(areParenthesesBalanced("(a + b * (c + d)")); // false