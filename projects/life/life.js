var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"]

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});

for (var i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}
