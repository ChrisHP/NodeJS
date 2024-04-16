function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));
    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}
luckyDraw("Joe").then((res)=>console.log(res),error=>console.error(error.message)).then(()=>luckyDraw("Caroline")).then((res)=>console.log(res),error=>console.error(error.message)).then(()=>luckyDraw("Sabrina")).then((res)=>console.log(res),error=>console.error(error.message));