Crafty.c('Grid', {
    init: function() {
        this.attr({w: GameConfig.tile_size, h: GameConfig.tile_size});
    },
    at: function(x, y) {
        if(x === undefined && y === undefined) {
            return {x: this.x/GameConfig.tile_size, y: this.y/GameConfig.tile_size};
        } else {
            this.attr({x: x * GameConfig.tile_size, y: y * GameConfig.tile_size});
        }
    }
});

Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    }
});
