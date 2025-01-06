function openModal(modal)
{   
    modal.style.display = "block"

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none"
        }
    }
}

function closeModal(modal){
    modal.style.display = "none"
}

var $ = function( id ) { return document.getElementById( id ) }

function openPage(pageToClose, pageToOpen){
    $(pageToClose).style.display = "none"
    $(pageToClose + "Menu").style.display = "none"

    $(pageToOpen).style.display = ""
    $(pageToOpen + "Menu").style.display = ""
}

function toggleSearchCardBar(){
    if($("searchCard").style.display === "none"){
        $("searchCard").style.display = ""
    }else{
        $("searchCard").style.display = "none"
    }
}