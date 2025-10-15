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

// console.log("=========MIT Task ZO=======");

// function areParenthesesBalanced(input: string): boolean {
//   let balance = 0;

//   for (const char of input) {
//     if (char === '(') {
//       balance++;
//     } else if (char === ')') {
//       balance--;
//       if (balance < 0) {
//         // Yopuvchi qavs ochuvchidan oldin kelgan
//         return false;
//       }
//     }
//   }

//   return balance === 0;
// }

// console.log(areParenthesesBalanced("(a + b) * (c + d)")); // true
// console.log(areParenthesesBalanced("((a + b) * (c + d))")); // true
// console.log(areParenthesesBalanced("(a + b * (c + d)")); // false

// console.log("=========MIT Task ZP=======");

// function areArraysEqual(arr1: any[], arr2: any[]): boolean {
//   for (let item of arr1) {
//     let index = arr2.indexOf(item);
//     if (index === -1) return false;
//     arr2.splice(index, 1);
//   }
//   return true;
// }

// console.log(areArraysEqual([1, 2, 2, 3], [3, 2, 1, 2]));
// console.log(areArraysEqual( ['a', 'b', 'a'], ['b', 'a', 'c'] ));
// console.log(areArraysEqual([1, 2, 3], [1, 2, 2, 3]));

// console.log("=========MIT Task ZQ=======");

// function findDuplicates(arr: number[]): number[] {
//   const seen: number[] = [];
//   const duplicates: number[] = [];

//   for (let num of arr) {
//     if (seen.includes(num)) {
//       if (!duplicates.includes(num)) {
//         duplicates.push(num);
//       }
//     } else {
//       seen.push(num);
//     }
//   }

//   return duplicates;
// }

// console.log(findDuplicates([1, 2, 3, 2, 4, 5, 3]));
// console.log(findDuplicates([5, 5, 5, 5, 5]));
// console.log(findDuplicates([1, 2, 3, 4, 5]));

// console.log("=========MIT Task ZR=======");

// function countNumberAndLetters(input: string): { number: number; letter: number } {
//   let number = 0;
//   let letter = 0;

//   for (let char of input) {
//     if (char >= '0' && char <= '9') {
//       number++;
//     } else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
//       letter++;
//     }
//   }

//   return { number, letter };
// }

// console.log(countNumberAndLetters("Hello123"));
// console.log(countNumberAndLetters("2024 is the year of AI!"));
// console.log(countNumberAndLetters("No numbers here!"));

console.log('=========MIT Task ZS=======');

function singleNumber(arr: number[]): number | null {
	for (let num of arr) {
		if (arr.indexOf(num) === arr.lastIndexOf(num)) {
			return num;
		}
	}
	return null;
}

console.log(singleNumber([2, 2, 3, 2]));
console.log(singleNumber([1, 1, 1, 1]));
