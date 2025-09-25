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

console.log("=========MIT Task ZN=======");

function rotateArray(arr: number[], index: number): number[] {

  if (index < 0 || index >= arr.length) {
    return arr;
  }

  const firstPart = arr.slice(0, index + 1);
  const secondPart = arr.slice(index + 1);

  return [...secondPart, ...firstPart];
}

console.log(rotateArray([1,2,3,4,5,6], 3)); 