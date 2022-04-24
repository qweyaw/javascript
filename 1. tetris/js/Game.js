function Game() {
  this.row = 20;
  this.col = 12;

  this.init(); // 初始化
  this.block = new Block(); // 实例化 Block
  this.timer = null;
  this.start(); // 启动定时器
  this.map = new Map(this); // 实例化 Map
}
Game.prototype.init = function () {
  // 初始化渲染表格
  let $table = $("<table></table>");
  for (let i = 0; i < this.row; i++) {
    let $tr = $("<tr></tr>");
    for (let j = 0; j < this.col; j++) {
      let $td = $("<td></td>");
      $tr.append($td);
    }
    $table.append($tr);
  }
  $("body").append($table);
};

Game.prototype.setColor = function (row, col, num) {
  $("tr")
    .eq(row)
    .children("td")
    .eq(col)
    .addClass("color" + num);
};

Game.prototype.start = function () {
  let self = this;
  this.timer = setInterval(function () {
    self.clear();
    self.block.render();
    self.map.render();
    self.block.down();
  }, 500);
};

// 清除屏幕
Game.prototype.clear = function () {
  for (let i = 0; i < this.row; i++) {
    for (let j = 0; j < this.col; j++) {
      $("tr").eq(i).children("td").eq(j).removeClass();
    }
  }
};
