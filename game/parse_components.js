ParseComponents = {
    getGrid: function(level) {
        $.get("/game/levels/" + level + ".lvl", function(data) {
            data = data.split("\n");
            console.log(data);
        });
    }
}
