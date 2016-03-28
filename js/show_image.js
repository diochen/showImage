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

window.onload = function() {
    var picIdx = 0;
    var manager = new Manager();
    manager.init("id_daddy");
    var trigger = setInterval(function() {
        try {
            manager.showItem(picIdx);
            console.log("pic index -- : " + picIdx);
            picIdx++;
            if (picIdx >= manager.getItemCount()) {
                clearInterval(trigger);
            }
        }catch(err){
            clearInterval(trigger);
        }
    }, 1000);
};

function Manager () {
    this.picAry = [];
    this.containerWidth = 0;
    this.containerHeight = 0;

    this.init = function(containerId){
        //var randomIDs = this.shuffle(PicIds);
        var randomUrls =  this.shuffle(PicUrls);

        var containerDiv = document.getElementById(containerId);
        this.containerWidth = containerDiv.offsetWidth;
        this.containerHeight = containerDiv.offsetHeight;

        var picDiv = document.getElementById(PicIds[0]);
        this.picAry.push( new Picture(PicIds[0], randomUrls[0] ));

        for(var i=1; i<PicIds.length ; i++){
            var clone = picDiv.cloneNode(true); // "deep" clone
            clone.id = PicIds[i];
            picDiv.parentNode.appendChild(clone);
            this.picAry.push( new Picture(PicIds[i], randomUrls[i] ));
        }
    }

    this.getItemCount = function(){
        return this.picAry.length;
    }

    this.showItem = function(idx){
        if(idx < this.picAry.length) {
            this.picAry[idx].show(this.getRandomX(), this.getRandomY());
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

    this.getRandomX = function() {
        var min = 0;
        var max = this.containerWidth > 0 ? Math.floor(this.containerWidth*0.75) : 0;
        console.log(max);
        console.log(Math.floor(Math.random() * (max - min + 1)) + min);
        console.log("----");
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.getRandomY = function() {
        var min = 0;
        var max = this.containerHeight > 0 ? Math.floor(this.containerHeight*0.75) : 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}

function Picture (id, imgURL  ){
    this.div_id = id;
    this.imgURL = imgURL;
    var picDiv = document.getElementById(this.div_id);
    var picBlock = picDiv.getElementsByTagName('img')[0];
    picBlock.src = this.imgURL;
}

Picture.prototype.show = function(posX, posY){
    var picDiv = document.getElementById(this.div_id);
    picDiv.style.visibility = 'visible';
    picDiv.style.position = 'absolute';
    picDiv.style.left = posX + "px";
    picDiv.style.top = posY + "px";
    picDiv.style.backgroundColor = '#' + Math.random().toString(16).substring(2, 8);
}


