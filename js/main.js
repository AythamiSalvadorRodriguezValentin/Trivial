/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// READY!!! /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

$(document).ready(()=>{
    categories = getRandomCategories5();
    colorCategory = getRandomColorCategory5();
    onClickPlayBtn();
    setRandomColor();
    onClickColor();
    createButtonCategories();
});

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// API TRIVIAL DB ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

var questionAnswers = new Array(4);
var objCategory = {
    categories: {
        "General Knowledge"                     :9,
        "Entertainment: Books"                  :10,
        "Entertainment: Film"                   :11,
        "Entertainment: Music"                  :12,
        "Entertainment: Musicals & Theatres"    :13,
        "Entertainment: Television"             :14,
        "Entertainment: Video Games"            :15,
        "Entertainment: Board Games"            :16,
        "Science & Nature"                      :17,
        "Science: Computers"                    :18,
        "Science: Mathematics"                  :19,
        "Mythology"                             :20,
        "Sports"                                :21,
        "Geography"                             :22,
        "History"                               :23,
        "Politics"                              :24,
        "Art"                                   :25,
        "Celebrities"                           :26,
        "Animals"                               :27,
        "Vehicles"                              :28,
        "Entertainment: Comics"                 :29,
        "Science: Gadgets"                      :30,
        "Entertainment: Japanese Anime & Manga" :31,
        "Entertainment: Cartoon & Animations"   :32
    },
    arrayCategories:["General Knowledge","Entertainment: Books","Entertainment: Film","Entertainment: Music","Entertainment: Musicals & Theatres","Entertainment: Television","Entertainment: Video Games","Entertainment: Board Games","Science & Nature","Science: Computers","Science: Mathematics","Mythology","Sports","Geography","History","Politics","Art","Celebrities","Animals","Vehicles","Entertainment: Comics","Science: Gadgets","Entertainment: Japanese Anime & Manga","Entertainment: Cartoon & Animations"]
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// PLAYERS //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

let players = [];
let playerTurn = 0;
let colorPlayers = [];
let accountNameBarTime;
let colorPlayerRandom = [];
let numbersColorByPlayer = 4;
let categories = new Array(5);
let colorCategory = new Array(5);
let player = {
    name: "",
    color: "#00000",
    scores: 0,
    numberHits: 0,
    categories:[]
} 
let category = {
    name: "",
    trophies: 0,
    points: 0,
    questionsWon: 0,
    questionsUsed: 0
};
function createNewPlayer(name,color){
    let playerCreate  = JSON.parse(JSON.stringify(player));
    playerCreate.name = name;
    playerCreate.color = color;
    addCategories(playerCreate);
    players.push(playerCreate);
    return playerCreate;
}
function addCategories(playerCreate){
    for(let i=0;i<categories.length;i++){
        let categoryCreate = JSON.parse(JSON.stringify(category));
        categoryCreate.name = categories[i]; 
        playerCreate.categories.push(categoryCreate);    
    } 
    return playerCreate.categories;
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// PAGE INIT ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function getRandomCategories5(){
    let arrayC = objCategory.arrayCategories;
    let randomC = new Array(5);
    for(let u=0; u<randomC.length; u++){
        let aux = getNumberRandom(objCategory.arrayCategories);
        if(u==0){
            randomC[u] = arrayC[aux];
        } else {
            if(randomC.indexOf(arrayC[aux]) == -1){
                randomC[u] = arrayC[aux];
            }
            else u--;
        }
    }
    categories = randomC;
    return randomC;
};

function getRandomColorCategory5(){
    for(let i=0; i<categories.length; i++){
        colorCategory[i] = getRandomColor();
    }
    return colorCategory;
}

function createButtonCategories(){
    for(let i=0;i<categories.length;i++){
        $("#loadCategories ul").append("<li>"+categories[i]+"</li>");
    }    
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  
function setRandomColor() {
    colorPlayers = new Array($(".color").length);
    for(let i=0;i<$(".color").length;i++){
        colorPlayers[i] = getRandomColor();
        $(".color").eq(i).css("background-color", colorPlayers[i]);
    }
}

function onClickColor(){
    colorPlayerRandom = new Array(4);
    $(".color").on("click",function(){
        let colorPushed = rgbToHex($(this).css("background-color"));
        let colorPushedIndex = indexElementInArray(colorPlayers, colorPushed);
        for(let i=0; i<4; i++){
            let lastColorPushedIndex = indexElementInArray(colorPlayers, colorPlayerRandom[i]);
            if(lastColorPushedIndex >= i*numbersColorByPlayer && lastColorPushedIndex < (i+1)*numbersColorByPlayer && colorPushedIndex >= i*numbersColorByPlayer && colorPushedIndex < (i+1)*numbersColorByPlayer && lastColorPushedIndex != false){
                if(colorPushedIndex != colorPlayerRandom[i]){
                    $(".color").eq(lastColorPushedIndex).css("border","0px");
                    colorPlayerRandom[i] = colorPushed;
                }
            } else if(colorPushedIndex >= i*numbersColorByPlayer && colorPushedIndex < (i+1)*numbersColorByPlayer && lastColorPushedIndex == false) {
                colorPlayerRandom[i] = colorPushed;
            } else if(colorPushedIndex < numbersColorByPlayer){
                $(".color").eq(0).css("border","0px");
            }            
        }
        $(this).css("border", "2px solid grey");
    });
}

function onClickPlayBtn(){
    $("#playBtn").on("click",function(){
        let textBoxUserName = $(".textbox--userName");
        for(let i=0;i<textBoxUserName.length;i++){
            let name = textBoxUserName.eq(i).val();
            createNewPlayer(name,colorPlayerRandom[i]);
        }
        players = getRandomTurn(players);
        createUserCard();
        $("#initPage").hide();
        $(".scoreUser").eq(playerTurn).css("border","5px solid " + players[playerTurn].color);
        firstRound();
    });
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// GENERATED USER CARD //////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function createUserCard(){
    for(let i=0;i<players.length;i++){
        $("#scoreBoard").append(
            '<div class="scoreUser">'+
                '<div class="scoreUser__name">'+
                    '<div class="scoreUser__color"></div>'+players[i].name+
                '</div>'+
                '<div class="scoreUser__score">Score: '+players[i].scores+'</div>'+
                '<div class="scoreUser__trophies">'+
                    '<div class="trophy"></div>' +
                    '<div class="trophy"></div>' +
                    '<div class="trophy"></div>' +
                    '<div class="trophy"></div>' +
                    '<div class="trophy"></div>' +
                '</div>'+
            '</div>'
        );
        $(".scoreUser__color").eq(i).css("background",players[i].color);
    }
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// MODIFY TIME'S BAR ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function resetTimeBar(){
    $(".fillBar").css("width", "0px");
}

function modifyTimeBar(time){
    $(".fillBar").css("width", Math.round(time) + 'px');
}

function colorTimeBar(colorBar){
    $(".fillBar").css("background",colorBar);
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// FUCTION  FIRST ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function firstRound(){
    $("#buttonAnswer").empty();
    $("#buttonCategories").empty();
    $(".scoreUser").eq(playerTurn - 1).css("border","0px");
    if(playerTurn==players.length) playerTurn=0;
    $(".scoreUser").eq(playerTurn).css("border","5px solid " + players[playerTurn].color);
    createButtonSelectCategories(categories);
    selectCategory();
    colorTimeBar(players[playerTurn].color);
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SELECT  CATEGORY /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function createButtonSelectCategories(categoriesPlayer){
    for(let i=0;i<categoriesPlayer.length;i++){
        $("#buttonCategories").append("<li>"+categoriesPlayer[i]+"</li>");
    }
}

function selectCategory(){
    $("#buttonCategories li").on("click",function(){
        let categorySelected = $(this).html();
        extractQuestionAnswers(categorySelected);
    });
}

function extractQuestionAnswers(categoryUser){
    let numberCategory = objCategory.categories[categoryUser];
    let uRlOneCategory = "https://opentdb.com/api.php?amount=10&category=" + numberCategory + "&type=multiple";
    $.ajax({
            method: "GET",
            url: uRlOneCategory,
            dataType: "json"
        }).then(function(response){
            let aux = getNumberRandom(new Array(response.results.length));
            let data = response.results[aux];
            questionAnswers[0] = data["question"];
            questionAnswers[1] = data["correct_answer"];
            questionAnswers[2] = data["incorrect_answers"];
            questionAnswers[3] = data["category"];
            questionAnswers = removeLettersNotNecessary(questionAnswers);
            updateScreenQuestionAnswers();
            resetTimeBar();
            accountNameBarTime = accountBarTime(true);
            $(".selectCategory").hide();
            $(".selectAnswer").show();
        }).catch(function(error){
            console.log("Error: " + error);
    });
};

function updateScreenQuestionAnswers(){
    // Introducimos todas las respuestas en un array y selecionamos aleatoriamente:
    let responseAnwers = new Array(4);
    let arrayResponseRandom = new Array(4);
    let correctAnswer = questionAnswers[1];
    let incorrectAnswers = questionAnswers[2];
    responseAnwers[0] = incorrectAnswers[2];
    responseAnwers[1] = incorrectAnswers[0];
    responseAnwers[2] = correctAnswer;
    responseAnwers[3] = incorrectAnswers[1];
    for(let u=0; u<responseAnwers.length; u++){
        let aux = getNumberRandom(responseAnwers);
        if(u==0){
            arrayResponseRandom[u] = responseAnwers[aux];
        } else {
            if(arrayResponseRandom.indexOf(responseAnwers[aux]) == -1){
                arrayResponseRandom[u] = responseAnwers[aux];
            } else u--;
        }
    }
    $(".question__title").text(questionAnswers[0]);
    createButtonSelectAnswers(arrayResponseRandom);
    selectQuestionAnswers();
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SELECT  ANSWERS //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function createButtonSelectAnswers(answers){
    for(let i=0;i<answers.length;i++){
        $("#buttonAnswer").append("<li class='btn'>" + answers[i] + "</li>");
    }
}

function selectQuestionAnswers(){
    $("#buttonAnswer li").on("click",function(){
        let AnswersSelected = $(this).html();
        accountBarTime(false, accountNameBarTime);
        /*______________________________________FALTA*/
        if(AnswersSelected == questionAnswers[1]){ //Respuesta correcta.
            players[playerTurn] = checkingQuestionsWinner(players[playerTurn], questionAnswers[3]);
            players[playerTurn].numberHits += 1;
        } 
        else { //Respuesta incorrecta.
            players[playerTurn].numberHits = 0;
        }
        players[playerTurn] = checkingHitsPlayer(players[playerTurn]);        
        $(".selectAnswer ").hide();
        $(".selectCategory").show();
        playerTurn+=1;
        firstRound();
        /*________________________________________FALTA*/
        
        refreshScoreBoard();
    });
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// FUCTION  SECOND //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function getRandomTurn(playersSelected){
    let randomT = new Array(playersSelected.length);
     for(let u=0; u<randomT.length; u++){
        let aux = getNumberRandom(playersSelected);
        if(u==0){
            randomT[u] = playersSelected[aux];
        } else {
            if(randomT.indexOf(playersSelected[aux]) == -1){
                randomT[u] = playersSelected[aux];
            } else u--;
        }
    }
    return randomT;
};

function getNumberRandom(arrayObject){
    var aux = 0;
    while(1) {
        aux = parseInt(Math.random()*arrayObject.length);
        if(aux < arrayObject.length) {
            break;
        }
    }
    return aux;
};

function removeLettersNotNecessary(array){
    for(let i=0; i<array.length; i++){
        if(i != 2){
            array[i] = removeString(array[i],"&",";");
        } else {
            let arrayI = array[i];
            for(let a=0; a<arrayI.length; a++){
                arrayI[a] = removeString(arrayI[a],"&",";");
            }
            array[i] = arrayI;
        }
    }
    return array;
}

function removeString(str,letterI,letterF){
    str = str.split("");
    for(var h=0; h<5; h++){
        let indexI = str.join("").indexOf(letterI);
        let indexF = str.join("").indexOf(letterF);
        if(indexI != -1 && indexF !=-1) {
            str.splice(indexI,indexF-indexI+1);
        }
    }
    return str.join("");
}

function refreshScoreBoard(){
    // Refresh Scores:
    for(let i=0; i<players.length; i++){
        $(".scoreUser__score").eq(i).text("Score: " + players[i].scores);
    }
    // Refresh Trophies:
    let cont = 0;
    for(let j=0; j<players.length; j++){
        for(let k=0; k<players[j].categories.length; k++){
            if(players[j].categories[k].trophies == 1) {
                $(".trophy").eq(cont).css("background",colorCategory[k]);
            } else {
               $(".trophy").eq(cont).css("background","white"); 
            }
            cont++;
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// ACCOUNT //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function accountBarTime(OnOff, nameAccount){
    let timeBar = 0;
    if(OnOff){
        let accountOn = accountBarTime();
        return setInterval(accountOn, 50);
    } else {
        clearInterval(nameAccount);
    }
    return function accountGrowDown(){
        timeBar = ++timeBar;
        modifyTimeBar(timeBar);
        if(timeBar == 600){
            accountBarTime(false, accountNameBarTime);
            players[playerTurn].numberHits = 0;
            $(".selectAnswer ").hide();
            $(".selectCategory").show();
            playerTurn+=1;
            firstRound();
        }
        return timeBar;
    }
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////// RGB TO HEX //////////////////////////////////
function rgbToHex(colorRGB) {
    colorRGB = "" + colorRGB;
    if (!colorRGB || colorRGB.indexOf("rgb") < 0) return;
    if (colorRGB.charAt(0) == "#") return colorRGB;
    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(colorRGB),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);
    var colorHEX = "#"+ (
        (r.length == 1 ? "0"+ r : r) +
        (g.length == 1 ? "0"+ g : g) +
        (b.length == 1 ? "0"+ b : b)
    );
    return colorHEX.toUpperCase();
}
/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function checkingQuestionsWinner(playerSelect, categoryWinner){
    let categoryE = false;
    for(let f=0; f<playerSelect.categories.length; f++){
        if(categoryWinner == playerSelect.categories[f].name){
            playerSelect.scores += 10;
            playerSelect.categories[f].questionsWon += 1;
            if(playerSelect.categories[f].questionsWon >= 3) {
                playerSelect.categories[f].trophies = 1;
            }
            CategoryE = true;
            break;
        }
    }
    if(!CategoryE) console.log("No Exists Category: " + categoryWinner);
    return playerSelect;
}

function checkingHitsPlayer(playerSelect){
    if(playerSelect.numberHits == 5){
        
        ///////////////////////////////////////////////////////
        //ACTIVA PANTALLA PARA SELECCIONAR CUAL QUIERES ROBAR//
        ///////////////////////////////////////////////////////
        
        playerSelect.numberHits = 0;
    }
    return playerSelect;
}

function checkGame(){
    /*checkingHitsPlayer()
    checkingQuestionsWinner()*/
    //...
}

function robTrophiesOnePlayer(playerSelected, category){
    for(let f=0; f<playerSelected.categories.length; f++){
        if(category == playerSelected.categories[f].name) {
            playerSelected.categories[f].trophies = 0;
            return true;
        }
    }
    return false;
};

function categoriesWinPlayer(playerSelect){
    let categoriesWin = [];
    for(let g=0; g<playerSelect.categories.length; g++){
        if(playerSelect.categories[g].trophies == 1){
           categoriesWin.push(playerSelect.categories[g].name);
        }
    }
    return categoriesWin;
}

function checkingMaxNumberOfCategorySelected(playerSelected, category){
    for(var y=0; y<playerSelected.categories.length; y++){
        if(category == playerSelected.categories[y].name){
            if(playerSelected.categories[y].questionsUsed >=2){
                //////////////////////////////////////
                ///////////////FUNCION////////////////
                //////////////////////////////////////
                return true;
            } else {
                playerSelected.categories[y].questionsUsed++;
            }
        } else {
            playerSelected.categories[y].questionsUsed = 0;
        }
    }
    return false;
}

function indexElementInArray(arrayToIndex, elementIndex){
    for(let r=0; r<arrayToIndex.length; r++){
        if(arrayToIndex[r] == elementIndex) return parseInt(r);
    }
    return false;
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// TEST /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/*
var testF = {
    objCategorys:                           objCategory,
    newPlayer:                              createNewPlayer,
    newCategory5:                           getRandomCategories5,
    numberRamdom:                           getNumberRandom,
    turnRandom:                             getRandomTurn,
    removeString:                           removeLettersNotNecessary,
    addScoresAndCheckQuestionsWon:          checkingQuestionsWinner,
    checkNumberHits:                        checkingHitsPlayer,
    removeOneTrophies:                      robTrophiesOnePlayer
}
    
module.exports = testF;
*/