
var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {
    //initialize
    window.localStorage.setItem('goop', JSON.stringify([{x: 7}, {x: 8}]));
    var goop = JSON.parse(window.localStorage.getItem('goop'));

    var won = parseInt(window.localStorage.getItem('won'));
    won = won==null||won!=0||won!=1 ? 0 : won;
    var goal = window.localStorage.getItem('goal');

    $scope.grid =  JSON.parse(window.localStorage.getItem('grid')); 

    $scope.stats =  JSON.parse(window.localStorage.getItem('stats')); 
    $scope.currentGuess = parseInt(window.localStorage.getItem('currentGuess'));
    $scope.currentLetter = window.localStorage.getItem('currentLetter');
    $scope.currentGuess = $scope.currentGuess==null ? 0 : $scope.currentGuess;
    $scope.currentLetter = $scope.currentLetter==null ? 0 : $scope.currentLetter;

    $scope.present = JSON.parse(window.localStorage.getItem('present'));
    $scope.notThere = JSON.parse(window.localStorage.getItem('notThere'));
    $scope.correct = JSON.parse(window.localStorage.getItem('correct'));

    $scope.totalPlays = 0;
    $scope.totalWins = 0;
    if($scope.stats){ 
        for(let i=0; i<$scope.stats.length; i++) { 
            $scope.totalPlays += $scope.stats[i].wins;
            if(i!=6) {
                $scope.totalPlays += $scope.stats[i].wins;                
            }
            $scope.totalWins += $scope.stats[i].wins;       

        }
    }

    var WORDS = [
        'Alice',
        'Alien',
        'Alpha',
        'Akela',
        'Ariel',
        'Anita',
        'Anger',
        'Angry',
        'Baloo',
        'Bambi',
        'Bands',
        'Bears',
        'Beast',
        'Belle',
        'Black',
        'Bones',
        'Brave',
        'Brawn',
        'Brush',
        'Bruno',
        'Bunny',
        'Child',
        'Crown',
        'Cruel',
        'Daisy',
        'Dante',
        'Della',
        'Dewey',
        'Diary',
        'Dinah',
        'Dixie',
        'Dream',
        'Dolly',
        'Dopey',
        'Ducks',
        'Dumbo',
        'Dusty',
        'Dwarf',
        'Epcot',
        'Ernie',
        'Fairy',
        'Fauna',
        'Felix',
        'Flick',
        'Flora',
        'Flynn',
        'Fiona',
        'Forky',
        'Friar',
        'Ghost',
        'Genie',
        'Giant',
        'Goofy',
        'Goose',
        'Great',
        'Guest',
        'Gurgi',
        'Gypsy',
        'Hades',
        'Happy',
        'Heart',
        'Helen',
        'Honey',
        'Horse',
        'Hound',
        'House',
        'Hyena',
        'Jafar',
        'Jumba',
        'Jumbo',
        'Kanga',
        'Kluck',
        'Kronk',
        'Kuzco',
        'Lands',
        'Lemon',
        'Lions',
        'Louie',
        'Lotso',
        'Luisa',
        'Lucky',
        'Magic',
        'Mator',
        'McGee',
        'Meeko',
        'Merry',
        'Mouse',
        'Movie',
        'Moana',
        'Molly',
        'Morph',
        'Mulan',
        'Mushu',
        'Night',
        'Ocean',
        'Pacha',
        'Paint',
        'Paris',
        'Parks',
        'Party',
        'Pearl',
        'Percy',
        'Perry',
        'Peter',
        'Pixar',
        'Place',
        'Pluto',
        'Pongo',
        'Potts',
        'Quack',
        'Queen',
        'Quora',
        'Ralph',
        'Raven',
        'Rider',
        'Robin',
        'Royal',
        'Roger',
        'Rufus',
        'Shark',
        'Shang',
        'Shego',
        'Shrek',
        'Simba',
        'Sleep',
        'Small',
        'Smith',
        'Snake',
        'Space',
        'Spike',
        'Sofia',
        'Stone',
        'Story',
        'Stuff',
        'Sully',
        'Sugar',
        'Sword',
        'Taran',
        'Tales',
        'Tiana',
        'Tiara',
        'Tiger',
        'Timon',
        'Tower',
        'Tramp',
        'Treat',
        'Troop',
        'Train',
        'Ville',
        'Walle',
        'Wendy',
        'White',
        'World',
        'Woody',
        'Wreck'
    ];
      
    //these 2 annoyingly has to stay on the top.
    $scope.setLocalStorage = function () {        
        window.localStorage.setItem('won', won);
        window.localStorage.setItem('goal', goal);
        window.localStorage.setItem('grid', JSON.stringify($scope.grid));
        window.localStorage.setItem('stats', JSON.stringify($scope.stats));
        window.localStorage.setItem('currentGuess', $scope.currentGuess);
        window.localStorage.setItem('currentLetter', $scope.currentLetter);
        window.localStorage.setItem('present', JSON.stringify($scope.present));
        window.localStorage.setItem('notThere', JSON.stringify($scope.notThere));
        window.localStorage.setItem('correct', JSON.stringify($scope.correct));

        
        $scope.grid =  JSON.parse(window.localStorage.getItem('grid')); 
    }
    $scope.newWord = function() {
        $scope.errorMessage = "";
        $scope.successMessage = "";
        won = 0;
        $scope.stats;
        $scope.grid = [
            [{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3}],
            [{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3}],
            [{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3}],
            [{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3}],
            [{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3}],
            [{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3},{letter: '', status: 3}]
        ];
        $scope.correct = [];
        $scope.present = [];
        $scope.notThere = [];
        $scope.currentGuess = 0;
        $scope.currentLetter = 0;
        goal = WORDS[Math.floor(Math.random() * WORDS.length)];
        $scope.setLocalStorage();
    }
    
    // this means that it is a new user - only done one time ever  
    if($scope.stats == null) {        
        $scope.stats = [{wins:0},{wins:0},{wins:0},{wins:0},{wins:0},{wins:0},{wins:0}];
        window.localStorage.setItem('stats', JSON.stringify($scope.stats));

        $scope.newWord();
    }

    // have defaults
    //get local storage

    $scope.addLetter = function (letter) {
        $scope.errorMessage = "";
        $scope.successMessage = "";
        if($scope.currentLetter > 4 || $scope.currentGuess > 5  || won) {
            //@todo
            return;
        }
        let x = $scope.grid[$scope.currentGuess]
        x = x[$scope.currentLetter]
        x.letter = letter;
        
        $scope.currentLetter++;
    }
    $scope.enter = function () {
        $scope.errorMessage = "";
        $scope.successMessage = "";
        if ($scope.currentGuess > 5 || won ) return;
        if ($scope.currentLetter<5) {
            $scope.errorMessage ="Not enough letters";
            return;
        }

        var guess = '';
        guess = guess.concat($scope.grid[$scope.currentGuess][0].letter, $scope.grid[$scope.currentGuess][1].letter, $scope.grid[$scope.currentGuess][2].letter,$scope.grid[$scope.currentGuess][3].letter, $scope.grid[$scope.currentGuess][4].letter);
        
        if(!inWordList(guess)) {  
            $scope.errorMessage ="That word isn't in the word list";
            return;
        }
        verifyLetters($scope.grid[$scope.currentGuess]);
        if(guess.toLowerCase() == goal.toLowerCase()) {
            $scope.errorMessage = "";
            $scope.successMessage = "Yooooou did it!";
            won = 1;
            $scope.stats[$scope.currentGuess].wins ++;
            for(i in $scope.grid[$scope.currentGuess]){
                $scope.grid[$scope.currentGuess][i].status = 2;
            }
            $scope.currentGuess++;
            $scope.totalWins++;
            $scope.totalPlays++;
            $scope.setLocalStorage();
            return;
        }

        $scope.currentGuess++;
        $scope.currentLetter = 0;
        if($scope.currentGuess>5) {
            $scope.errorMessage = "Better luck next time.";
        }

        $scope.setLocalStorage();
    }
    $scope.delete = function () {
        $scope.errorMessage = "";
        $scope.successMessage = "";
        if(won) return;
        if($scope.currentLetter>0) {
            $scope.currentLetter--;
            $scope.grid[$scope.currentGuess][$scope.currentLetter] = {letter:''};
        }
    }
    // $scope.grid = [
    //         ['d','r','e','a','m'],
    //         ['d','u','s','t','y'],
    //         ['','','','',''],
    //         ['','','','',''],
    //         ['','','','',''],
    //         ['','','','','']
    //     ];
    $scope.keyboard = [
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
    ];


    var verifyLetters = function(guess){
        //on currentGuess
        guess = $scope.grid[$scope.currentGuess];
        var goalArray = goal.toLowerCase().split('');
        var overlaps = []; //hold this round of present and corrects
        //check for greens first
        for(var i=0; i<goalArray.length; i++) {
            if(guess[i].letter==goalArray[i]) {
                guess[i].status = 2;
                if(!overlaps.includes(guess[i].letter)) { 
                    overlaps.push(guess[i].letter);                  
                }
                if(!$scope.correct.includes(guess[i].letter)) {
                    $scope.correct.push(guess[i].letter);
                }
            }
        }

        for(var i=0; i<goalArray.length; i++) {
            if(guess[i].status==2) continue;
            var hasLetter = false;
            //the letter is correct somewhere else, but needs to not
            //have a double of the letter
            var onlyOne = goalArray.indexOf(guess[i].letter) == goalArray.lastIndexOf(guess[i].letter);
            if(overlaps.includes(guess[i].letter) && onlyOne) {
                guess[i].status = 0;
            }
            else {
                for(var j=0; j<guess.length; j++){
                    if(guess[i].letter == goalArray[j]){
                        guess[i].status = 1;
                        hasLetter = true;
                        if(!overlaps.includes(guess[i].letter)) { 
                            overlaps.push(guess[i].letter);                  
                        }
                        if(!$scope.present.includes(guess[i].letter)) { 
                            $scope.present.push(guess[i].letter);                  
                        }
                    }
                }    
                if(!hasLetter) {
                    guess[i].status = 0;
                    if(!$scope.notThere.includes(guess[i].letter)) {
                        $scope.notThere.push(guess[i].letter);
                    }  
                }
            }      
        }
    }
    var inWordList = function(guess) {
        var inWords = WORDS.findIndex(element => {
            return element.toLowerCase() === guess.toLowerCase();
        });
        console.log(inWords);
        var inGuesses = -1 //VALIDGUESSES.findIndex(element => {
        //     return element.toLowerCase() === guess.toLowerCase();
        // });
        return (
            inWords > -1 || inGuesses > -1
        )
    }   
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        $scope.errorMessage = "";
        $scope.successMessage = "";
    }

    $scope.share = function () {        
        var text= "Oh Boy! I got today's Word!  \n\n";
        for(var i=0;i<$scope.grid.length;i++){
            if($scope.grid[i][0].status==3) continue;
            for(var j=0;j<5;j++){
                if($scope.grid[i][j].status==2){
                    text += '🟩';
                }if($scope.grid[i][j].status==1){
                    text += '🟨';                    
                }if($scope.grid[i][j].status==0){	
                    text += '⬛';                      
                }
            }
            text += '\n';
        }
        // text += new URL("disnerdle.alyssatyler.com");
        
        var isMobile = false; //initiate as false
        // device detection
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }
        if (navigator.share && isMobile) {
          text += "Try Disnerdle now!";
          navigator.share({
            title: 'WebShare API Demo',
            text: text,
            url: 'https://disnerdle.alyssatyler.com'
          }).then(() => {
            console.log('Thanks for sharing!');
          })
          .catch(console.error);
        } else {
            text += "\nTry Disnerdle at disnerdle.alyssatyler.com";
            /* Copy the text inside the text field */
            document.getElementById("copyText").style.display = "block";
            navigator.clipboard.writeText(text);
            $scope.successMessage = "Copied to clipboard!";
            document.getElementById("statModal").style.display = "none";
            document.getElementById("copyText").style.display = "none";
        }
    }
});
  