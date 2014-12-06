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

Crafty.c('Button', {
    init: function() {
        this.requires('Actor, Color, Solid');
        this.attr({enabled: false});
        this.color('red');
    },
    toggle: function(untoggleDisabled) {
        if(this.locked) return;
        this.enabled = !this.enabled;
        this.color(this.enabled? "green": "red");
        if(!untoggleDisabled) {
            var that = this;
            window.setTimeout(function() {
                if(that.enabled) that.toggle(true)
            }, 5000);
        }
    }
});

Crafty.c('Wall', {
    init: function() {
        this.requires('Actor, Color, Solid');
        this.color('blue');
    }
});

Crafty.c('Player', {
    init: function() {
        this.requires('Actor, Color, Fourway, Collision');
        this.color('black');
        this.fourway(5);
        this.at(10, 10);
        this.attr({bid: -1});
        this.collisionDetect();
        this.collided = false;
    },
    collisionDetect: function() {
        this.onHit('Button', this.buttonHit, function() { this.collided = false; });
        this.onHit('Wall', this.halt);
    },
    buttonHit: function(data) {
        if(!this.collided) {
            this.collided = true;
            data[0].obj.toggle();
            Crafty.trigger('buttonPressed', {button: this});
        }
        this.halt();
    },
    halt: function() {
        this._speed = 0;
        if(this._movement) {
            this.x -= (this._movement.x);
            this.y -= (this._movement.y);
        }
    }
});
