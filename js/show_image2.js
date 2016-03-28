/**
 * Created by i_jhuhuchen on 2016/3/28.
 */

var PicIds = [
    "id_pic0",
    "id_pic1",
    "id_pic2",
    "id_pic3",
    "id_pic4",
    "id_pic5",
    "id_pic6",
    "id_pic7",
    "id_pic8",
    "id_pic9",
    "id_pic10",
    "id_pic11"
];

var PicUrls = [
    "images/0.png",
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
    "images/8.png",
    "images/9.png",
    "images/10.png",
    "images/11.png"
];


//var PicUrls = [
//    "img/0.jpg",
//    "img/1.jpg",
//    "img/2.jpg",
//    "img/3.jpg",
//    "img/4.jpg",
//    "img/5.jpg",
//    "img/6.jpg",
//    "img/7.jpg",
//    "img/8.jpg",
//    "img/9.jpg",
//    "img/10.jpg",
//    "img/11.jpg"
//];

window.onload = function() {
    var picIdx = 0;
    var manager = new Manager();
    manager.init();
    var trigger = setInterval(function() {
        try {
            manager.picAry[picIdx].show();
            console.log("pic index -- : " + picIdx);
            picIdx++;
            if (picIdx >= manager.picAry.length) {
                clearInterval(trigger);
            }
        }catch(err){
            clearInterval(trigger);
        }
    }, 1000);
};

function Manager () {
    this.picAry = [];
    this.init = function(){
        var randomIDs = this.shuffle(PicIds);
        var randomUrls =  this.shuffle(PicUrls);

        for(var i=0; i<randomIDs.length ; i++){
            this.picAry.push( new Picture(randomIDs[i], randomUrls[i]) )
        }
    }

    this.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}

function Picture (id, imgURL){
    this.div_id = id;
    this.imgURL = imgURL;
    var picDiv = document.getElementById(this.div_id);
    var picBlock = picDiv.getElementsByTagName('img')[0];
    picBlock.src = this.imgURL;
}

Picture.prototype.show = function(){
    var picDiv = document.getElementById(this.div_id);
    picDiv.style.visibility = 'visible';
    //picDiv.style.backgroundColor = '#' + Math.random().toString(16).substring(2, 8);
}