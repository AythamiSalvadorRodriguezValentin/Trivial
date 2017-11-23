
var testF = require("../main.js");
var assert = require('assert');

describe("Create New Player: ", function() {
    describe("Player: Name is ok?", function() {
        it("Player's name must be equal to Name original", function() {
            testF.newCategory5();
            var playerCreate = testF.newPlayer("Aythami", "#ccc");
            assert.deepEqual("Aythami", playerCreate.name);
        });
    });
});

describe("Create New Player: ", function() {
    describe("Player: Color is ok?", function() {
        it("Player's color must be equal to color original", function() {
            testF.newCategory5();
            var playerCreate = testF.newPlayer("Aythami", "#ccc");
            assert.deepEqual("#ccc", playerCreate.color);
        });
    });
});

describe("Create New Player: ", function() {
    describe("Player: the player have to 5 categories!", function() {
        it("Player's categories must be equal 5!", function() {
            testF.newCategory5();
            var playerCreate = testF.newPlayer("Aythami", "#ccc");
            assert.deepEqual(5, playerCreate.categories.length);
        });
    });
});

describe("Get Random Categories 5 ", function() {
    describe("Return 5 categories of all Categories", function() {
        it("Return array with 5 categories", function() {
            var categories5 = testF.newCategory5();
            assert.equal(5,categories5.length);
        });
    });
});

describe("Get Random Categories 5 in Array", function() {
    describe("Return 5 categories of all Categories in Array", function() {
        it("The categories in Array must be equal to Categories in Object Categories", function() {
            var assertOK = [true,true,true,true,true];
            var categories5 = testF.newCategory5();
            var categoryBool = [];
            if(testF.objCategorys.categories[categories5[0]] == undefined) categoryBool[0] = false;
            else categoryBool[0] = true;
            if(testF.objCategorys.categories[categories5[1]] == undefined) categoryBool[1] = false;
            else categoryBool[1] = true;
            if(testF.objCategorys.categories[categories5[2]] == undefined) categoryBool[2] = false;
            else categoryBool[2] = true;
            if(testF.objCategorys.categories[categories5[3]] == undefined) categoryBool[3] = false;
            else categoryBool[3] = true;
            if(testF.objCategorys.categories[categories5[4]] == undefined) categoryBool[4] = false;
            else categoryBool[4] = true;
            assert.deepEqual(assertOK, categoryBool);
        });
    });
});

describe("Get Number Random ", function() {
    describe("Return Index Random of Array", function() {
        it("Index must be between Array Length", function() {
            var array = ["1","2","3"];
            var numberR = testF.numberRamdom(array);
            if(numberR >= 0 && numberR < array.length) assert.ok(true);
            else assert.ok(false);
        });
    });
});

describe("Get TurnRandom ", function() {
    describe("Return Players Random", function() {
        it("To check at Least One is not the Same Position in Array", function() {
            var players = new Array(4);
            var boolPlayerRandom = false;
            var categories5 = testF.newCategory5();
            players[0] = testF.newPlayer("Aythami","#888");
            players[1] = testF.newPlayer("Francisco","#ccc");
            players[2] = testF.newPlayer("Lucas","#555");
            players[3] = testF.newPlayer("Javier","#eee");
            var newPlayers = testF.turnRandom(players);
            if(players[0] != newPlayers[0]) boolPlayerRandom = true;
            if(players[1] != newPlayers[1]) boolPlayerRandom = true;
            if(players[2] != newPlayers[2]) boolPlayerRandom = true;
            if(players[3] != newPlayers[3]) boolPlayerRandom = true;
            assert.equal(true, boolPlayerRandom);
        });
    });
});

describe("Remove Character Of Array", function() {
    describe("Remove Character Init '&' and Character End '; of All Array'", function() {
        it("Return Array without phrase between: Character '&' and ';'", function() {
            var arrayI = ["ho&y;la","ayth&y;ami"];
            var arrayF = testF.removeString(arrayI);
            assert.deepEqual(['hola','aythami'],arrayF);
        });
    });
});

describe("Add Scores And Check QuestionsWon", function() {
    describe("If Player Have QuestionWon>=3, Add One Trophies in This Category", function() {
        it("Return True If it is ok!", function() {
            testF.newCategory5();
            var player = testF.newPlayer("Aythami","#ccc");
            testF.addScoresAndCheckQuestionsWon(player,player.categories[0].name)
            testF.addScoresAndCheckQuestionsWon(player,player.categories[0].name)
            testF.addScoresAndCheckQuestionsWon(player,player.categories[0].name)
            if(player.categories[0].questionsWon >=3 && player.categories[0].trophies == 1) assert.ok(true);
            else assert.ok(false);
        });
    });
});

describe("Remove One Trophies of Player", function() {
    describe("Remove One Trophies of One Category", function() {
        it("Return True If Have Robbed Trophies", function() {
            var player = testF.newPlayer("Aythami","#ccc");
            var category = player.categories[0].name;
            player.categories[0].trophies = 1;
            testF.removeOneTrophies(player,category);
            assert.deepEqual(0, player.categories[0].trophies);
        });
    });
});