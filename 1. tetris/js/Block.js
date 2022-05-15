function Block() {
  let allTypes = ["S", "T", "O", "Z", "L", "I", "J"];

  // 1.得到随机类型
  this.type = allTypes[Math.floor(Math.random() * allTypes.length)];

  //2. 得到随机方向
  this.allDir = blockType[this.type].length;
  this.dir = Math.floor(Math.random() * this.allDir);
  // 3. 得到当前方块的状态
  this.blockCode = blockType[this.type][this.dir];

  // 初始位置
  this.row = 0;
  this.col = 4;
}

// 渲染方块
Block.prototype.render = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (this.blockCode[i][j] !== 0) {
        game.setColor(this.row + i, j + this.col, this.blockCode[i][j]);
      }
    }
  }
};

//判断是否可以左移
Block.prototype.checkLeft = function () {
  if (this.check(this.row, this.col - 1)) {
    this.col--;
  }
};

//判断是否可以右移
Block.prototype.checkRight = function () {
  if (this.check(this.row, this.col + 1)) {
    this.col++;
  }
};
  
//判断是否可以下移
Block.prototype.checkDown = function () {
  if (this.check(this.row + 1, this.col)) {
    this.row++;
  }
};

//判断一键到底
Block.prototype.checkEnd = function () {
  while (this.check(this.row + 1, this.col)) {
    this.row++;
  }
};

// 方块旋转
Block.prototype.checkRotate = function () {
  let oldDir = this.dir;
  this.dir++;
  if (this.dir >= this.allDir) {
    this.dir = 0;
  }
  this.blockCode = blockType[this.type][this.dir];
  if (!this.check(this.row, this.col)) {
    this.dir = oldDir;
    this.blockCode = blockType[this.type][this.dir];
  }
};

//判断是否可以移动
Block.prototype.check = function (row, col) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        this.blockCode[i][j] !== 0 &&
        game.map.mapCode[row + i][j + col] !== 0
      ) {
        return false;
      }
    }
  }
  return true;
};

// 方块下落
Block.prototype.down = function () {
  if (this.check(this.row + 1, this.col)) {
    this.row++;
  } else {
    game.block = game.nextBlock;
    game.nextBlock = new Block();
    // 到底之后渲染地图
    this.renderMap();
    // 判断是否消除
    game.map.checkRemove();
    // 判断游戏是否结束
    this.checkOver();
  }
};


Block.prototype.renderMap = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (this.blockCode[i][j] !== 0) {
        // 改变地图的mapCode
        game.map.mapCode[this.row + i][j + this.col] = this.blockCode[i][j];
      }
    }
  }
};

// 游戏是否结束
Block.prototype.checkOver = function () {
  for (let i = 0; i < game.col; i++) {
    if (game.map.mapCode[0][i] !== 0) {
      alert('游戏结束！，当前分数为： ' + game.score);
      clearTimeout(game.timer);
    }
  }
};