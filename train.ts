console.log("=========MIT Task ZK=======");

function printNumbers(): void {
  let count = 1;

  const intervalId = setInterval(() => {
    console.log(count);
    count++;

    if (count > 5) {
      clearInterval(intervalId);
    }
  }, 1000); 
}


printNumbers();