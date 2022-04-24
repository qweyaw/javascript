function Map(mapGame) {
  this.mapCode = new Array(20).fill([]);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 12; j++) {
      this.mapCode[i][j] = 0;
    }
  }
  this.mapGame = mapGame;
}
Map.prototype.render = function () {
  // 渲染地图
  for (let i = 0; i < this.mapGame.row; i++) {
    for (let j = 0; j < this.mapGame.col; j++) {
      if (this.mapCode[i][j] !== 0) {
        game.setColor(i, j, this.mapCode[i][j]);
      }
    }
  }
};
