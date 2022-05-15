function Game() {
  this.row = 20;
  this.col = 12;
  this.init(); // 初始化
  this.block = new Block(); // 实例化 Block
  this.nextBlock = new Block(); // 实例化 nextBlock
  this.timer = null;
  this.start(); // 启动定时器
  this.map = new gameMap(this); // 实例化 Map
  this.bindEvent(); // 绑定键盘事件
  this.score = 0; // 分数
  this.f = 20; // 帧频率
}
// 初始化渲染
Game.prototype.init = function () {
  // 渲染整体表格
  let $table = $("<table></table>");
  $table.addClass("tableMain");
  for (let i = 0; i < this.row; i++) {
    let $tr = $("<tr></tr>");
    for (let j = 0; j < this.col; j++) {
      let $td = $("<td></td>");
      $tr.append($td);
    }
    $table.append($tr);
  }
  // 渲染预览窗口
  let $tablePreview = $("<table></table>");
  $tablePreview.addClass("tablePreview");
  for (let i = 0; i < 4; i++) {
    let $tr = $("<tr></tr>");
    for (let j = 0; j < 4; j++) {
      let $td = $("<td></td>");
      $tr.append($td);
    }
    $tablePreview.append($tr);
  }

  $("body").append($table).append($tablePreview);
};
// 设置颜色
Game.prototype.setColor = function (row, col, num) {
  $(".tableMain")
    .find("tr")
    .eq(row)
    .children("td")
    .eq(col)
    .addClass("color" + num);
};

// 设置next颜色
Game.prototype.setNextColor = function () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (this.nextBlock.blockCode[i][j] !== 0) {
        $(".tablePreview")
          .find("tr")
          .eq(i)
          .children("td")
          .eq(j)
          .addClass("color" + this.nextBlock.blockCode[i][j]);
      }
    }
  }
};

// 启动定时器
Game.prototype.start = function () {
  let self = this;
  this.timer = setInterval(function () {
    self.clear(); // 清屏
    self.block.render(); // 渲染方块
    self.setNextColor(); // 渲染next方块
    self.map.render(); // 渲染地图
    self.block.down(); // 方块下落
  }, 500);
};
// 键盘事件
Game.prototype.bindEvent = function () {
  const self = this;
  $(document).keydown(function (e) {
    switch (e.keyCode) {
      case 37:
        self.block.checkLeft();
        break;
      case 38:
        self.block.checkRotate();
        break;
      case 39:
        self.block.checkRight();
        break;
      case 40:
        self.block.checkDown();
        break;
      case 32:
        self.block.checkEnd();
        break;
    }
  });
};
// 清除屏幕
Game.prototype.clear = function () {
  for (let i = 0; i < this.row; i++) {
    for (let j = 0; j < this.col; j++) {
      $('.tableMain').find("tr").eq(i).children("td").eq(j).removeClass();
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      $('.tablePreview').find("tr").eq(i).children("td").eq(j).removeClass();
    }
  }
};
