var dragonHP = 100; //left towards dragon
var knightHP = 100;
var knightsPack = [5];
//var pawnHP = 5; //right towards pawn

var randomHit = function () {
    return Math.floor(Math.random() * (6) + 1);
};
var randomPotion = function (){
  var num = Math.floor(Math.random()*5) +1
  num *= Math.floor(Math.random() *2) == 1 ? 1: -1;
  return num
}
var knighthood = function (knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps) {
    rightSteps = rightSteps || 0;
    leftSteps = leftSteps || 0;
    knightsPack = knightsPack || [];
    var direction = '';
    if (knightHP > 0) {
        direction = prompt("Left or Right?");
        if (direction.toLowerCase() === "left") {
            leftSteps += parseInt(prompt("The knight has set off on a quest to fight the Dragon!, choose your brave steps"));
            if (typeof leftSteps !== "number" || leftSteps < 1) {
                alert("must choose a number, start over");
                knighthood(knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps);
            }
            if (leftSteps < 25) {
                var trust = prompt("dragon further on ahead, passed a beggar, trust and take potion?");
                if (trust === "yes") {
                    var x = randomPotion();
                    knightsPack.push(x);
                    //console.log(knightsPack);
                    alert("Potion added to Knight's Pack");
                    knighthood(knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps);
                } else {
                    knighthood(knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps);
                }
            } else if (leftSteps >= 25) {
                alert("You have come to the dragon, prepare for battle!");
                return fightingDragon(knightHP, dragonHP, knightsPack);
            }

        } else if (direction.toLowerCase() === "right") {
            rightSteps += parseInt(prompt("Pawns up ahead, prepare your sword, choose your brave steps"));
            if(typeof rightSteps !== "number" ||rightSteps < 1){
               alert("must choose a number, start over");
                knighthood(knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps); 
            }
            if (rightSteps < 25) {
                alert("Pawns ahead! even is a hit, odd is a miss, click OK to roll");
                var roll = randomHit();
                if (roll % 2 === 0) {
                    alert("Success!! rolled a: " + roll);
                    return  knighthood(knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps);
                } else {
                    alert("You were hit! Roll was " + roll + " Loss of 2 hp points, your HP is " + (knightHP -= 2));
                    knighthood(knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps);

                }
            } else if (rightSteps >= 25) {
                alert("You have snuck past the pawns and circled around!");
                knighthood(knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps);
            }
        } else {
            alert("not a valid direction, start over");
             knighthood(knightHP, dragonHP, fightingDragon, knightsPack, rightSteps, leftSteps);
        }
    }
};

var fightingDragon = function (knightHP, dragonHP, knightsPack, knighthood) {
    //console.log(knightsPack);
    alert("The dragon is awake and grumpy, prepare your shield and sword!");
    while (knightHP > 0 && dragonHP > 0) {
        if (randomHit() < 5) {
            alert("You have hit the dragon! Dragon's HP: " + (dragonHP -= 5));
        } else if (randomHit() === 5) {
            alert("you have blocked the dragon's attack!");
        } else {
            alert("Dragon hit you! Knight's HP: " + (knightHP -= 5));
            var potion = prompt("Would you like to try a potion? yes or no")
            if(potion === "yes"){
                if (knightsPack.length > 2) {
                    knightHP += knightsPack.shift();
                    alert("Was it a good potion? knight's HP is now: " + knightHP)
                    var endBattle = prompt("Your HP is " + knightHP + " would you like to run from the dragon and lose 5 hp points? yes or no?")
                    if(endBattle === "yes"){
                        alert("Your inventory and health will be remembered. Please try again when you're feeling more up to it")
                      return knightHP, knightsPack, dragonHP;
                    }
                } else {
                    alert("nothing in your pack");
                    var endBattle = prompt("Your HP is " + knightHP + " would you like to run from the dragon and lose 5 hp points? yes or no?");
                    if(endBattle === "yes"){
                        knightHP -= 5
                        alert("Your inventory and health will be remembered. Please try again when you're feeling more up to it");
                      return (knightHP, knightsPack, dragonHP);
                    }
                }
            } else {
                var endBattle = prompt("Your HP is " + knightHP + " would you like to run from the dragon and lose 5 hp points? yes or no?");
                    if(endBattle === "yes"){
                            knightHP -= 5
                        alert("You have left battle with your head hung low. Please try again");
                      return knightHP;
                    }

            }

        }
        console.log("dragonHP: " + dragonHP + " knightHP: " + knightHP);
    }
    if (dragonHP === 0) {
        alert("You have won!! Go to the castle with the dragon's head to receive your knighthood!");
    } else {
        alert("The knight has fallen bravely in battle... really he was burned to a crisp");
    }
};