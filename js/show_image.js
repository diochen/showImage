"use strict";

/**
 * Created by i_jhuhuchen on 2016/3/28.
 */

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

var manager = new Manager();

window.onload = function() {
    manager.init("id_daddy", PicUrls);
    var trigger = setInterval(function() {
        try {
            if(!manager.showNextItem()){
                clearInterval(trigger);
            }
        }catch(err){
            clearInterval(trigger);
        }
    }, 10000);
};

var viewResize = function(){
    manager.handleResize();
};

window.addEventListener("resize", viewResize);

function Manager () {
    this.picAry = [];
    this.picDragable = [];
    this.containerWidth = 0;
    this.containerHeight = 0;
    this.containerId = "";
    this.itemShowIdx = 0;

    this.init = function(containerId, imgUrls){
        this.containerId = containerId;
        this.itemShowIdx = 0;

        var randomUrls =  this.shuffle(imgUrls);

        var containerDiv = document.getElementById(containerId);
        this.containerWidth = containerDiv.offsetWidth;
        this.containerHeight = containerDiv.offsetHeight;

        var picDiv = document.getElementById("id_pic0");
        this.picAry.push( new Picture("id_pic0", randomUrls[0] ));
        this.picDragable.push( new Draggable("id_pic0",this.containerWidth,this.containerHeight ));

        for(var i=1; i<imgUrls.length ; i++){
            var clone = picDiv.cloneNode(true); // "deep" clone
            clone.id = "id_pic" + i;
            picDiv.parentNode.appendChild(clone);
            this.picAry.push( new Picture(clone.id, randomUrls[i] ));
            this.picDragable.push( new Draggable(clone.id,this.containerWidth,this.containerHeight ));
        }
    };

    this.showNextItem = function(){
        if(this.itemShowIdx < this.picAry.length) {
            console.log("pic index -- : " + this.itemShowIdx);
            this.picAry[this.itemShowIdx].show(this.getRandomX(), this.getRandomY());
            this.itemShowIdx++;
            return true;
        }else{
            return false;
        }
    };

    this.handleResize = function(){
        if(this.containerId == "" || this.containerWidth==0 || this.containerHeight==0)
            return;

        var containerDiv = document.getElementById(this.containerId);
        var changeRate = containerDiv.offsetWidth/this.containerWidth;
        this.containerWidth = containerDiv.offsetWidth;
        this.containerHeight = containerDiv.offsetHeight;


        for(var i=0; i<this.picAry.length ; i++){
            this.picAry[i].changePosition(changeRate);
        }
        for(var i=0; i<this.picDragable.length ; i++){
            this.picDragable[i].resizeSandbox(this.containerWidth, this.containerHeight);
        }
    };

    this.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    this.getRandomX = function() {
        var min = 0;
        var max = this.containerWidth > 0 ? Math.floor(this.containerWidth*0.75) : 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.getRandomY = function() {
        var min = 0;
        var max = this.containerHeight > 0 ? Math.floor(this.containerHeight*0.75) : 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}




function Picture (id, imgURL  ){
    var self = this;
    this.div_id = id;
    this.img_id = "img_" + this.div_id;
    this.imgURL = imgURL;
    this.isHidden = true;
    var picDiv = document.getElementById(this.div_id);
    var picBlock = picDiv.getElementsByTagName('img')[0];
    picBlock.id = this.img_id;
    picBlock.src = this.imgURL;

    picBlock.addEventListener("error", self.loadImageError.bind(this), false);
    picBlock.addEventListener("load", self.loadImageSuccess.bind(this), false);

}

Picture.prototype.show = function(posX, posY){
    var picDiv = document.getElementById(this.div_id);
    picDiv.style.visibility = 'visible';
    picDiv.style.position = 'absolute';
    picDiv.style.left = posX + "px";
    picDiv.style.top = posY + "px";
    //picDiv.style.backgroundColor = '#' + Math.random().toString(16).substring(2, 8);
    this.isHidden = false;
};

Picture.prototype.changePosition = function(changeRate){
    if(this.isHidden == true)
        return;
    var picDiv = document.getElementById(this.div_id);
    var posX = Math.floor(picDiv.offsetLeft*changeRate);
    var posY = Math.floor(picDiv.offsetTop*changeRate);
    picDiv.style.left = posX + "px";
    picDiv.style.top = posY + "px";
};


Picture.prototype.loadImageError = function(){
    console.log("Reload image : " + this.img_id);
    var imgItem = document.getElementById(this.img_id);
    var imgURL = this.imgURL;
    imgItem.style.visibility = "hidden";
    setTimeout(function(){
        imgItem.src = imgURL;
    }, 1000);
};

Picture.prototype.loadImageSuccess = function(){
    var imgItem = document.getElementById(this.img_id);
    if(imgItem.style.visibility == 'hidden'){
        console.log("Show image : " + this.img_id);
        imgItem.style.visibility = "visible";
    }
};



