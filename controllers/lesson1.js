const joseRouter = (req, res) => {
  res.send("Jose Catrin");
};

const jennyRouter = (req, res) => {
  res.send("Jenny Caseno");
};

const tereRouter = (req, res, next) => {
  res.json("Tere Quinos");
};

module.exports = {
  joseRouter,
  jennyRouter,
  tereRouter,
};
