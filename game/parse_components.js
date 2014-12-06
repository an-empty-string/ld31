ParseComponents = {
    getGrid: function(level, cb) {
        $.get("/game/levels/" + level + ".lvl", function(data) {
            var level = []
            data = data.split("\n");
            data.forEach(function(d) {
                level.push(d.split(""));
            });
            cb(level.slice(0, -1));
        });
    }
}
