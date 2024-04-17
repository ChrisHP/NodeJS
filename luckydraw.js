const names=["Tina","Jorge","Julien"];

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

async function getResults(names) {
  const results = await Promise.allSettled(names.map(name=>luckyDraw(name)));
  results.forEach(r=> console.log(r.status === "rejected" ? r.reason.message : r.value));
}

getResults(names);