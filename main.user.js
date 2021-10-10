// ==UserScript==
// @name         Gelbooru Wait Display
// @namespace    com.dirtyboi.greasemonkey.gelbooru.wait
// @description  Displays a wait counter for how long to wait until an edit is possible again
// @version      1.0
// @updateURL    https://raw.githubusercontent.com/dirtyboi/Gelbooru-Userscript/master/main.meta.js
// @downloadURL  https://raw.githubusercontent.com/dirtyboi/Gelbooru-Userscript/master/main.user.js
// @author       Dirty Boi
// @match        https://gelbooru.com/*
// @icon         https://gelbooru.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var namespace = "cmggw";
    var waitTime = 13000;
    var storageType = window.localStorage;
    var origTitle = document.title;
    var elem_editForm = document.querySelector("#edit_form");
    elem_editForm.addEventListener("submit", function (event) {
        let lastedit = new Date();
        storageType.setItem(`${namespace}_lastedit`, lastedit.getTime());
        console.log(Date(parseInt(storageType.getItem(`${namespace}_lastedit`))));
    });
    var edit_timeoutID = window.setInterval(function() {
        let lastedit = parseInt(storageType.getItem(`${namespace}_lastedit`), 10);
        console.log(lastedit);
        if (!lastedit) {
            lastedit = 0;
        }
        let now = new Date();
        let elem_scrollebox = document.querySelector("#scrollebox");
        let elem_timeDisplay = document.querySelector(`div.${namespace}-timedisplay`);
        if (!elem_timeDisplay) {
            elem_timeDisplay = document.createElement("div");
            elem_timeDisplay.style.fontSize = "3em";
            elem_timeDisplay.style.fontWeight = "bold";
            elem_timeDisplay.className = `${namespace}-timedisplay`;
            elem_scrollebox.insertAdjacentElement("afterend", elem_timeDisplay);
        }
        let timeDiff = now.getTime() - lastedit;
        if (timeDiff > waitTime) {
            elem_timeDisplay.style.backgroundColor = "green";
            elem_timeDisplay.style.color = "white";
            elem_timeDisplay.innerText = "CLEAR!";
            document.title = "SUBMIT";
        } else {
            elem_timeDisplay.style.backgroundColor = "red";
            elem_timeDisplay.style.color = "black";
            let remainingSeconds = Math.floor((waitTime - timeDiff)/1000);
            elem_timeDisplay.innerText = remainingSeconds;
            document.title = remainingSeconds;
        }
    }, 1000);
})();