console.log("Welcome to spotify");

let songIndex = 0;
let audioElement= new Audio("song/1.mp3")
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let masterSongName = document.getElementById("masterSongName")
let songItems =Array.from(document.getElementsByClassName("songItem")); 

let e = document.querySelector('.volume-slider-con');
let eInner = document.querySelector('.volume-slider');
let drag = false;
let mute = document.getElementById("mute")

let songs=[
    {songName:"Akastsuki",filePath:"song/1.mp3", coverPath:"cover/1.png"},
    {songName:"NO Love",filePath:"song/2.mp3", coverPath:"cover/2.png"},
    {songName:"Teeji Seat",filePath:"song/3.mp3", coverPath:"cover/3.png"},
    {songName:"Temporary Pyar",filePath:"song/4.mp3", coverPath:"cover/4.png"},
    {songName:"Tu Hai Kahan",filePath:"song/5.mp3", coverPath:"cover/5.png"},
    {songName:"Aarambh Hai Prachand",filePath:"song/6.mp3", coverPath:"cover/6.png"},
    {songName:"All black",filePath:"song/7.mp3", coverPath:"cover/7.png"},
    {songName:"Bhartar",filePath:"song/8.mp3", coverPath:"cover/8.png"},
    {songName:"Chan Vekhya",filePath:"song/9.mp3", coverPath:"cover/9.png"},
    {songName:"Cladestine ",filePath:"song/10.mp3", coverPath:"cover/10.png"},
    {songName:"Dhundhala",filePath:"song/11.mp3", coverPath:"cover/11.png"},
    {songName:"Fakira",filePath:"song/12.mp3", coverPath:"cover/12.png"},
    {songName:"Gallan 4",filePath:"song/13.mp3", coverPath:"cover/13.png"},
    {songName:"Hanuman Chalisa",filePath:"song/14.mp3", coverPath:"cover/14.png"},
    {songName:"Hookah Bar",filePath:"song/15.mp3", coverPath:"cover/15.png"},
    {songName:"Jaguar",filePath:"song/16.mp3", coverPath:"cover/16.png"},
    {songName:"Jo Tu Na Mila",filePath:"song/17.mp3", coverPath:"cover/17.png"},
    {songName:"Kaleshi Chori",filePath:"song/18.mp3", coverPath:"cover/18.png"},
    {songName:"Kuley Kuley",filePath:"song/19.mp3", coverPath:"cover/19.png"},
    {songName:"Kya Muje Pyarr Hai",filePath:"song/20.mp3", coverPath:"cover/20.png"},
    {songName:"Lover",filePath:"song/21.mp3", coverPath:"cover/21.png"},
    {songName:"Main Tera Hoya",filePath:"song/22.mp3", coverPath:"cover/22.png"},
    {songName:"Patola",filePath:"song/23.mp3", coverPath:"cover/23.png"},
    {songName:"Power Hanuman Chalisa",filePath:"song/24.mp3", coverPath:"cover/24.png"},
    {songName:"Saada pyaar",filePath:"song/25.mp3", coverPath:"cover/25.png"},
    

]
songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
})


// audioElement.play();

// handle play/pause click
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause")
        masterPlay.classList.add("fa-circle-play")
        
        gif.style.opacity = 0;

    }
})
//==============================listen to events======================

audioElement.addEventListener("timeupdate",()=>{
//    console.log("timeupdate");
   //===========================update seekbar
   progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
//    console.log(progress);
   myProgressBar.value =progress;
})

myProgressBar.addEventListener("change" , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays=()=>{
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    // audioElement.play();

    element.classList.remove("fa-circle-pause")
    element.classList.add("fa-circle-play")

})
}



Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src = `song/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        
    })
   
})




document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex>=4)
    {
        songIndex=0
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})
document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex<=0)
    {
        songIndex=0
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})


//==============================volume barr=================================================

e.addEventListener('mousedown',function(ev){
    drag = true;
    updateBar(ev.clientX);
    
 });
 document.addEventListener('mousemove',function(ev){
    if(drag){
       updateBar(ev.clientX);
    }
 });
 document.addEventListener('mouseup',function(ev){
    drag = false;
   });
   var updateBar = function (x, vol) {
    var volume = e;
         var percentage;
         //if only volume have specificed
         //then direct update volume
         if (vol) {
             percentage = vol * 100;
         } else {
             var position = x - volume.offsetLeft;
             percentage = 100 * position / volume.clientWidth;
         }
 
         if (percentage > 100) {
             percentage = 100;
         }
         if (percentage < 0) {
             percentage = 0;
         }
 
         //update volume bar and video volume
         eInner.style.width = percentage +'%';
         audioElement.volume = percentage / 100;


 };
 //===================================for mute=========================================



    var percentage = 100; 

    mute.addEventListener('click', function () {
      if (audioElement.volume>0) {
        // Audio is not muted
        eInner.style.width =0;
        audioElement.volume = 0;
        mute.classList.remove('fa-volume-high');
        mute.classList.add('fa-volume-xmark');
      } 
      else {
        // Audio is muted
        eInner.style.width = percentage +'%';
        audioElement.volume = percentage / 100;
        mute.classList.remove('fa-volume-xmark');
        mute.classList.add('fa-volume-high');
      }
    });
    //==================================on decre volume====================================

