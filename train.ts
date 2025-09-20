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

console.log("=========MIT Task ZM=======");

function reverseInteger(num: number): number {
  const reversed = num.toString().split('').reverse().join('');
  return Number(reversed) ;
}

console.log(reverseInteger(987654321)); 