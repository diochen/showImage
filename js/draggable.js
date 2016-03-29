"use strict";

var Draggable = function (id, boxWidth, boxHeight) {
    var el = document.getElementById(id);
    var isDragReady = false;
    var dragoffset = {
        x: 0,
        y: 0
    };
    var sandbox = {
        width: boxWidth,
        height: boxHeight
    };

    this.init = function () {
        this.handleEvents();
    };

    this.handleEvents = function () {
        this.bindEvent(el, 'mousedown', this.handleMouseDown );
        this.bindEvent(document, 'mouseup', this.handleMouseUp);
        this.bindEvent(document, 'mousemove', this.handleMouseMove);
    };

    // Find the offset between parent div and document(page) top
    this.handleMouseDown = function (e) {
       // console.log("Mouse down");
        isDragReady = true;
        //corssbrowser mouse pointer values
        var pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
        var pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
        dragoffset.x = pageX - el.offsetLeft;
        dragoffset.y = pageY - el.offsetTop;

    };

    this.handleMouseUp = function (e) {
        //console.log("Mouse up");
        isDragReady = false;

    };

    // Current document(page) position - offset
    this.handleMouseMove = function (e) {
        //console.log("Mouse move");
        if (isDragReady) {
            var pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft :
                    document.body.scrollLeft);
            var pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
                    document.documentElement.scrollTop :
                    document.body.scrollTop);

            var newY = (pageY - dragoffset.y);
            var newX = (pageX - dragoffset.x);

            if(newX < 0) {
                newX = 0;
            }
            if(newY<0) {
                newY = 0;
            }
            if(newX + el.offsetWidth > sandbox.width) {
                newX = sandbox.width - el.offsetWidth;
            }
            if(newY + el.offsetHeight > sandbox.height) {
                newY = sandbox.height - el.offsetHeight;
            }
            el.style.top = newY + "px";
            el.style.left = newX + "px";

        }
    };

    this.resizeSandbox = function(width, height){
        sandbox.width = width;
        sandbox.height = height;
        el = document.getElementById(el.id);
    };

    this.bindEvent = function (el, event, fn) {
        el.addEventListener(event, fn, false);
    };

    this.init();
};