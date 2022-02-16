window.onload = function() {

    var statModal = document.getElementById("statModal");
    var infoModal = document.getElementById("infoModal");

    // Get the button that opens the modal
    var statBtn = document.getElementById("openStats");
    // Get the button that opens the modal
    var infoBtn = document.getElementById("openInfo");

    // Get the <span> element that closes the modal
    var close = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    statBtn.onclick = function() {
        statModal.style.display = "inline-flex";
    }// When the user clicks on the button, open the modal
    infoBtn.onclick = function() {
        document.getElementById("infoModal").style.display = "inline-flex";
    }

    var openStats = function () {
        statModal.style.display = "inline-flex";
    }
    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName("modal").onclick = function() {
        document.getElementsByClassName("modal").style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == statModal) {
            statModal.style.display = "none";
        }
        
        if (event.target == infoModal) {
            infoModal.style.display = "none";
        }
    }

}