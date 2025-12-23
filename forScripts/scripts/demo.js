console.log("Старт");

let i = 0;
const id = setInterval(() => {
  console.log("тик", ++i);
  if (i === 5) clearInterval(id);
}, 500);