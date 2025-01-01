"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BOARDDIMENSION = 14;
window.onload = function () {
    console.log("starting up");
    buttons();
};
function buttons() {
    var h = document.getElementById("homeSwap");
    if (h) {
        h.onclick = swap;
    }
    var bb = document.getElementById("boardBackButton");
    if (bb) {
        bb.onclick = swap;
    }
    var db = document.getElementById("debugButton");
    var draggable = document.getElementById("draggable");
    if (draggable) {
        console.log("dragging element");
        dragPieceElement(draggable);
    }
}
// func for swapping between home and game pages
function swap() {
    console.log("swapping");
    let gameDiv = document.getElementById("gameDiv");
    let homeDiv = document.getElementById("homeDiv");
    console.log(`${gameDiv}`);
    // mandatory error handling by ts
    if (!homeDiv || !gameDiv) {
        console.error("No divs founds");
        return;
    }
    if (homeDiv.getAttribute("class") == "centered" && gameDiv.getAttribute("class") == "destroy") {
        homeDiv.setAttribute("class", "destroy");
        gameDiv.setAttribute("class", "block");
        initBoard();
    }
    else {
        homeDiv.setAttribute("class", "centered");
        gameDiv.setAttribute("class", "destroy");
    }
}
// func for dragging pieces
// uses ts event handling no libraries needed
function dragPieceElement(element) {
    var initialSquare;
    var initialPos;
    if (!element) {
        // error here 
        console.error(`Unable to retrieve element <${element}>`);
        return;
    }
    element.onmousedown = startDrag;
    function setInitialSquare(square) {
        initialSquare = square;
    }
    function setInitialPosition(pos) {
        initialPos = pos;
    }
    // triggered by onmousedown
    function startDrag(e) {
        if (!element) {
            console.error("trying to move non existent element");
            return;
        }
        // cache initial position and square in case needed to return there
        var elemRect = element.getBoundingClientRect();
        setInitialPosition([elemRect.left, elemRect.top]);
        e.preventDefault();
        document.onmouseup = stopDrag;
        document.onmousemove = elementDrag;
        return true;
    }
    // triggered when moving
    function elementDrag(ev) {
        ev.preventDefault();
        if (element) {
            // elemenet midpoint binds to cursor position
            element.style.top = (ev.clientY - (element.offsetHeight / 2)) + "px";
            element.style.left = (ev.clientX - (element.offsetWidth / 2)) + "px";
            return true;
        }
        console.error("Element has been clicked dragged and disappeared");
        return false;
    }
    // triggered by on mouse up
    function stopDrag(ev) {
        snapToBoard([ev.clientX, ev.clientY]);
        document.onmouseup = null;
        document.onmousemove = null;
        return true;
    }
    // takes position of element relative to the viewport and snaps it to the board element if element is over a valid square 
    function snapToBoard(position) {
        if (!element) {
            console.error("Unable to find elements in snapToBoard function");
            alert("something went wrong with the board see console for details");
            return;
        }
        var square = positionToSquare(position);
        // check if piece can move there
        if (!elemCanMove(initialSquare, square)) {
            console.log(`returning to initial position: ${initialPos[0]},${initialPos[1]}`);
            // return to intitial space 
            element.style.left = initialPos[0] + "px";
            element.style.top = initialPos[1] + "px";
            return;
        }
        // calculate pixel coords to move to
        position = positionFromSquare(square);
        console.log(`moving to pos: ${position[0]},${position[0]}`);
        element.style.left = position[0] + "px";
        element.style.top = position[1] + "px";
        setInitialPosition(position);
        setInitialSquare(square);
    }
    // validates if an element can move from a valid t  o square to a potentially invalid square
    function elemCanMove(fromSquare, toSquare) {
        // validate toSquare is on the board 
        var boardSquareLimit = toSquare[0] >= BOARDDIMENSION || toSquare[0] < 0 || toSquare[1] >= BOARDDIMENSION || toSquare[1] < 0;
        var inCorners = toSquare[0] < 3 && (toSquare[1] < 3 || toSquare[1] > 10) ||
            toSquare[0] > 10 && (toSquare[1] < 3 || toSquare[1] > 10);
        if (boardSquareLimit || inCorners) {
            return false;
        }
        return true;
    }
}
// takes position of the element relative to viewport
function positionToSquare(position) {
    //TODO optimise this function to use global variables instead of recalculating
    var boardElement = document.getElementById("boardImage");
    if (!boardElement) {
        console.error("unable to find board element");
        return [-1, -1];
    }
    var boardRect = boardElement.getBoundingClientRect();
    const squareLength = (boardRect.right - boardRect.left) / BOARDDIMENSION;
    // make position relative to board
    position[0] -= boardRect.left;
    position[1] -= boardRect.top;
    // remove position relative to the square 
    var square = [-1, -1];
    square[0] = Math.floor(position[0] / squareLength);
    square[1] = Math.floor(position[1] / squareLength);
    return square;
}
// returns psoition relative to viewport
function positionFromSquare(square) {
    //TODO optimise this function to use global variables instead of recalculating
    var boardElement = document.getElementById("boardImage");
    if (!boardElement) {
        console.error("unable to find board element");
        return [-1, -1];
    }
    var boardRect = boardElement.getBoundingClientRect();
    const squareLength = (boardRect.right - boardRect.left) / BOARDDIMENSION;
    console.log(`boardRect.right: ${boardRect.right}`);
    console.log(`boardRect.left: ${boardRect.left}`);
    console.log(`boardRect.top: ${boardRect.top}`);
    var position = [-1, -1];
    position[0] = boardRect.left + square[0] * squareLength;
    position[1] = boardRect.top + square[1] * squareLength;
    return position;
}
// assume we have <div class="piece-br"></div>
function initBoard() {
    const pieceClassNames = ["bb", "bk", "bn", "bp", "bq", "br", "gb", "gk", "gn", "gp", "gq", "gr", "rb", "rk", "rn", "rp", "rq", "rr", "yb", "yk", "yn", "yp", "yq", "yr"];
    // const pieceClassNames = ["bb"]; DEBUG CODE
    for (var i = 0; i < pieceClassNames.length; i++) {
        var pieceName = pieceClassNames[i];
        // gets indices of leftmost and downmost piece
        console.log(`initialising piece: ${pieceName}`);
        assignPieces(pieceName);
    }
}
function calculatePieceColumn(pieceName) {
    switch (pieceName[0]) {
        case 'b': {
            if (pieceName[1] == 'p') {
                return 1;
            }
            return 0;
        }
        case 'g': {
            if (pieceName[1] == 'p') {
                return 12;
            }
            return 13;
        }
        case 'r': {
            switch (pieceName[1]) {
                case 'k': {
                    return 7;
                }
                case 'q': {
                    return 6;
                }
                case 'b': {
                    return 5;
                }
                case 'n': {
                    return 4;
                }
                default: {
                    return 3;
                }
            }
        }
        default: {
            switch (pieceName[1]) {
                case 'k': {
                    return 7;
                }
                case 'q': {
                    return 6;
                }
                case 'b': {
                    return 5;
                }
                case 'n': {
                    return 4;
                }
                default: {
                    return 3;
                }
            }
        }
    }
}
function calculatePieceRow(pieceName) {
    switch (pieceName[0]) {
        case 'r': {
            if (pieceName[1] == 'p') {
                return 1;
            }
            return 0;
        }
        case 'y': {
            if (pieceName[1] == 'p') {
                return 12;
            }
            return 13;
        }
        case 'b': {
            switch (pieceName[1]) {
                case 'k': {
                    return 7;
                }
                case 'q': {
                    return 6;
                }
                case 'b': {
                    return 5;
                }
                case 'n': {
                    return 4;
                }
                default: {
                    return 3;
                }
            }
        }
        default: {
            switch (pieceName[1]) {
                case 'k': {
                    return 7;
                }
                case 'q': {
                    return 6;
                }
                case 'b': {
                    return 5;
                }
                case 'n': {
                    return 4;
                }
                default: {
                    return 3;
                }
            }
        }
    }
}
function assignPieces(pieceName) {
    var container = document.getElementById("pieceContainer");
    if (!container) {
        console.error("contaienr not found");
        return;
    }
    // calculate indices according to piece name eg: "bb" = blue bishop 
    var initCol = calculatePieceColumn(pieceName);
    var initRow = calculatePieceRow(pieceName);
    var position;
    var pieces = container.getElementsByClassName("piece-" + pieceName);
    var pieceCount = pieces.length;
    // for piece duplication
    // take initial position adding row or col offset
    var offset = -1;
    switch (pieceName[1]) {
        case 'p': {
            offset = 1;
            break;
        }
        case 'r': {
            offset = 7;
            break;
        }
        case 'n': {
            offset = 5;
            break;
        }
        default: {
            offset = 3;
            break;
        }
    }
    ;
    for (var i = 0; i < pieceCount; i++) {
        var element = pieces[i];
        dragPieceElement(element);
        // adding offset is orthogonal between ry and bg pieces
        // hence we want to choose whether to increment columns or rows
        if (pieceName[0] == 'r' || pieceName[0] == 'y') {
            console.log("square: " + [initCol + (i * offset), initRow]);
            position = positionFromSquare([initCol + (i * offset), initRow]);
        }
        else {
            console.log("square: " + [initCol + (i * offset), initRow]);
            position = positionFromSquare([initCol, initRow + (i * offset)]);
        }
        element.style.left = position[0] + "px";
        element.style.top = position[1] + "px";
    }
}
