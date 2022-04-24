function Block() {
  let allTypes = ["S", "T", "O", "Z", "L", "I", "J"];

  // 1.得到随机类型
  this.type = allTypes[Math.floor(Math.random() * allTypes.length)];

  //2. 得到随机方向
  this.allDir = blockType[this.type].length;
  this.dir = Math.floor(Math.random() * this.allDir);
  // 3. 得到当前方块的状态
  this.block = blockType[this.type][this.dir];

  // 初始位置
  this.row = 0;
  this.col = 4;
}

// 渲染方块
Block.prototype.render = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (this.block[i][j] !== 0) {
        game.setColor(this.row, j + this.col, this.block[i][j]);
      }
    }
  }
};

//判断是否可以下落
Block.prototype.canDown = function (row, col) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (this.block[i][j] !== 0) {
        console.log(row + i);
        if (
          this.row < game.map.mapCode.length &&
          game.map.mapCode[row + i][j + col] !== 0
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

// 方块下落
Block.prototype.down = function () {
  if (this.canDown(this.row + 1, this.col)) {
    this.row++;
  } else {
    this.block = new Block();
  }
};
