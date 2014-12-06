buttons = {};
function getGroup(n) {
    var x = Math.floor(n / 2);
    var y = n % 2;
    var groups = [[0, 0, 2, 2], [0, 4, 2, 6], [4, 0, 6, 2], [4, 4, 6, 6]];
    var result = [];
    for(var i = groups[n][0]; i <= groups[n][2]; i++) {
        for(var j = groups[n][1]; j <= groups[n][3]; j++) {
            console.log(i, j);
            result.push(buttons[i][j]);
        }
    }
    return result;
}
function checkGroupComplete(n) {
    var x = true;
    getGroup(n).forEach(function(k) {
        if(!k.enabled) x = false;
    });
    return x;
}
function checkGroupsComplete() {
    for(var i = 0; i < 4; i++) {
        if(checkGroupComplete(i)) {
            getGroup(i).forEach(function(x){
                x.color("yellow");
                x.attr({locked: true});
                window.setTimeout(function() {
                    x.attr({locked: false, enabled: false});
                    x.color("red");
                }, 30000);
            });
        }
    }
}
function go() {
    statusMessage = Crafty.e("2D, Canvas, Text").attr({x: 400, y: 500}).text("rekt");
    for(var i = 3; i <= 28; i += 4) {
        buttons[Math.floor(i/4)] = [];
        for(var j = 3; j <= 28; j += 4) {
            if(i == 15 || j == 15) continue;
            var button = Crafty.e('Button');
            buttons[Math.floor(i/4)][Math.floor(j/4)] = button;
            button.at(i, j);
        }
    }
    Crafty.e('Player').at(15, 15);
    Crafty.bind('buttonPressed', checkGroupsComplete);
}
