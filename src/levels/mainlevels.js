var mainlevelpictures = {"technoresourcesone":"technoresources1.png"}; //please add img/ here

//the sprite numbers
var mainleveltree = ["technoresourcesone", 482, 47, 190, 256, 70, 150, 123, 280];  //src, cx, cy, dx, dy, bx1, by1, bx2, by2 (c = picture loc, d = width etc, b = bounding box coords relative)

var levela = {
  terrain : [ //the behind stuff, with bounding boxes
    { //a tree
      "type" : mainleveltree,
      "x" : 100, //x position
      "y" : 100 //y position
    }
  ],
  landscape : [// the behind stuff
    
  ],
  special : [ //aaannd the infront stuff, but interactive.
    
  ]
};
