// 以下為庫存備料刪除邏輯

const stock = [
  { name: "吐司", quantity: 100 },
  { name: "洋蔥", quantity: 50 },
  { name: "番茄", quantity: 50 },
];

const ing = [
  { lab: "吐司", amount: 1000 },
  { lab: "番茄", amount: 1 },
  { lab: "不存在", amount: 10 },
];

ing.map((i) => {
  const has = stock.findIndex((s) => s.name === i.lab);

  if (has === -1) console.log(`庫存中沒有${i.lab}`);
  if (has !== -1 && stock[has].quantity < i.amount)
    console.log(`${stock[has].name}不足`);
  if (has !== -1) stock[has].quantity -= i.amount;
});

console.log(stock);
