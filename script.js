'use strict' ;


function removeFromArray(arr , elt){
  for(var i = arr.length-1; i >=0; i--){
    if(arr[i] ==elt ){
      arr.splice(i,1);
    }
  }
}

var cols = 5 ;
var rows = 5 ;
var grid = new Array(cols);

var openSet = [] ;
var closedSet = [] ;
var start ;
var end;
var w , h ;



  function Spot( i ,j){
    this.i =i ;
    this.j = j ; 
    this.f = 0 ;
    this.g = 0 ;
    this.h = 0 ;
    this.neighbors = [] ;

    this.show = function(col){
      fill(col) ;
      //stroke(0);
      noStroke();
      rect(this.i*w , this.j*h , w - 1 , h - 1)
    }

    this.addNeighbors = function(grid){
      var i = this.i ;
      var j = this.j ;

      if(i < cols -1){
        this.neighbors.push(grid[i + 1][j]);
      }

      if(i > 0){
        this.neighbors.push(grid[i - 1][j]);
      }

      if(j < rows - 1){
        this.neighbors.push(grid[i][j + 1]);
      }

      if(j > 0){
        this.neighbors.push(grid[i][j - 1]);
      }
    }
  }

function setup(){
  createCanvas(500, 500);
  console.log("A*");

  w = width / cols ;
  h = height / rows ;

  // Making a 2D Array 
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot( i , j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0] ;
  end = grid[cols - 1][rows - 1] ;

  openSet.push(start) ;

    

  console.log(grid) ;
}

function draw(){

  if(openSet.length > 0){

    var winner = 0 ;
    for (var i = 0; i < openSet.length; i++) {
       if(openSet[i].f < openSet[winner].f){
         winner = i
       }
    }
    var current = openSet[winner] ;

    if(current === end){
      console.log("Done!");
    }

    removeFromArray(openSet,current) ;
    //openSet.remove(current)
    closedSet.push(current) ;
    // we can keep going
  }else{
    // ...
  }
  background(0) ;

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
       grid[i][j].show(color(255)) ;
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
   closedSet[i].show(color(255,0,0)) ; 
  }

  for (var i = 0; i < openSet.length; i++) {
   openSet[i].show(color(0 ,255, 0)); 
    
  }

}