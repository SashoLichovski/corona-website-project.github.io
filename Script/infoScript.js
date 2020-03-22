
let generalInfoBtn = document.getElementById("generalInfoBtn");
let generalInfoContainer = document.getElementById('generalInfoContainer');
generalInfoContainer.className = 'show';
generalInfoBtn.onclick = function(){
    if (generalInfoContainer.className == 'hide') {
        generalInfoContainer.className = 'show';
    }
    else{
        generalInfoContainer.className = 'hide'
    }
}

function togglePluMinus(e)
{   var t=e.target;
    
    t.style.display="none";
    var minus=document.createElement("img");
    minus.src="minus.png";
    minus.style.height="20px";
    var section=t.parentElement;

    section.appendChild(minus);

    var next=t.parentElement.nextElementSibling.nextElementSibling;//getElementById("dropdown");
    next.style.display="block";
    minus.onclick=function()
    {
        next.style.display="none";
        minus.style.display="none";
        t.style.display="flex"
    }

}

let infoBasicsBtn = document.getElementById('infoBasicsBtn');
let infoBasicsContainer = document.getElementById('infoBasicsContainer');
infoBasicsContainer.className = 'hide';
infoBasicsBtn.onclick = function(){
    if (infoBasicsContainer.className == 'hide') {
        infoBasicsContainer.className = 'show';
    }
    else{
        infoBasicsContainer.className = 'hide'
    }
}

let spreadBtn = document.getElementById('spreadBtn');
let spreadContainer = document.getElementById('spreadContainer');
spreadContainer.className = 'hide';
spreadBtn.onclick = function(){
    if (spreadContainer.className == 'hide') {
        spreadContainer.className = 'show';
    }
    else{
        spreadContainer.className = 'hide'
    }
}