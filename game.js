var sketchProc = function(processingInstance) {
     with (processingInstance) {
        size(600, 600,P3D); 
        frameRate(30);
        var level=0;
        var strat=true;
        var grid=[
            [
                [1,1,1,1],
                [1,0,0,1],
                [1,0,0,1],
                [1,1,1,1],
            ],
            [
                [1,1,1,1],
                [1,0,1,1],
                [1,0,0,1],
                [1,1,1,1],
            ],
            [
                [1,1,1,1],
                [1,1,0,1],
                [1,0,0,1],
                [1,1,1,1],
            ],
            [
                [0,1,0,0],
                [1,2,2,1],
                [0,2,1,0],
                [1,0,1,0],
            ],
            ];
            
            var setGrid=function(){
  grid=grids[level];
            };
            
            var keys=[];
            var world=[];
        var x=0,y=-10,z=0,r=0,jump=0,canjump=true,xsp=0,zsp=0;
        
        var collide = function(obj1, obj2) {
            return obj1.y+obj1.h>=obj2.y&&
            obj1.x+obj1.w>=obj2.x&&
            obj1.x<=obj2.x+obj2.w&&
            obj1.y<=obj2.y+obj2.h&&
            obj1.z+obj1.d>=obj2.z&&
            obj1.z<=obj2.z+obj2.d;
        };
        
        draw=function(){
            if(strat){
                x=0,y=-10,z=0,r=0,jump=0,canjump=true,xsp=0,zsp=0;
                setGrid();
                for(var i=0;i<grid.length;i++){
                for(var j=0;j<grid[i].length;j++){
                    for(var k=0;k<grid[i][j].length;k++){
                        if(grid[i][j][k]===1){
                        world.push([k*20,(grid.length-1-i)*20,j*20,false]);
                        
                        
                        }
                        else if(grid[i][j][k]===2){
                            world.push([k*20,(grid.length-1-i)*20,j*20,true]);
                        }
                        else if(grid[i][j][k]===3){
                            world.push([k*20,(grid.length-1-i)*20,j*20,"prtl"]);
                        }
                    }
                }
            }
                strat=false;
            }
            else{
            background(255);
            this[["KAInfiniteLoopCount"]]=-Infinity;
            
            pushMatrix();
            
            
            
            //rotateY(r);
            camera(x+cos(r)*(30*height/400),y-40,z+sin(r)*(30*height/400),x,y,z,0,1,0);
            
            for(var i=0;i<world.length;i++){
                pushMatrix();
                        translate(world[i][0],world[i][1],world[i][2]);
                        fill(world[i][3]===true?color(255,0,0):world[i][3]===false?color(255):color(255,255,0));
                        box(20);
                    popMatrix();    
                 if(collide({x:x-5,y:y-5,z:z,w:10,h:11,d:10},{x:world[i][0]-10,y:world[i][1]-10,z:world[i][2]-10,w:20,h:21,d:20})){
                     var bl={x:world[i][0],y:world[i][1],z:world[i][2],w:20,h:20,d:20};
                        var pl={x:x,y:y,z:z,w:10,h:10,d:10};
                    
                    if(world[i][3]===true){
                        x=0,y=-10,z=0,r=0,jump=0,canjump=true;
                    }
                      if(world[i][3]==="prtl"){
                           level++;
                           strat=true;
                      }
            
if(pl.y>=bl.y&&pl.y<=bl.y+bl.h){
    if(z<=(bl.z+(bl.d/2)+(pl.d/2))&&z>=bl.z+(bl.d/2)-3){
        z=(bl.z+(bl.d/2)+(pl.d/2)+1);
        keys[RIGHT]=false;
    }
    if(pl.z>=bl.z-(bl.d/2)-(pl.d/2)&&pl.z<=bl.z-(bl.d/2)+3){
        z=(bl.z-(bl.d/2)-(pl.d/2)-1);
        keys[LEFT]=false;
        zsp=0;
    }
    if(pl.x>=bl.x-(bl.w/2)-(pl.w/2)&&pl.x<=bl.x-bl.w/2+3){
        x=(bl.x-(bl.w/2)-(pl.w/2)-1);
        keys[DOWN]=false;
    }
     if(pl.x<=bl.x+(bl.w/2)+(pl.w/2)&&pl.x>=bl.x+bl.w/2-3){
        x=(bl.x+(bl.w/2)+(pl.w/2)+1);
        keys[UP]=false;
    }
                     }
                     else{
                        //a.println("yes");
                        var bl={x:world[i][0],y:world[i][1],z:world[i][2],w:20,h:20,d:20};
                        var pl={x:x,y:y,z:z,w:10,h:10,d:10};
                        if(pl.y+pl.h/2+bl.h/2>=bl.y-bl.h/2&&pl.y+pl.h<=bl.y+bl.h/2){
                            y=bl.y-pl.h/2-bl.h/2-1;
                            jump=0;
                        }
                        else if(pl.y-pl.h/2-bl.h/2<=bl.y+bl.h/2&&pl.y-pl.h>=bl.y-bl.h/2){
                            y=bl.y+pl.h/2+bl.h/2+1;
                            jump=0;
                        }
                        else if(pl.x+pl.w/2+bl.w/2>=bl.x-bl.w/2&&pl.x+pl.w<=bl.x+bl.w/2){
                            x=bl.x-pl.w/2-bl.w/2-1;
                            jump=0;
                        }
                        else if(pl.x-pl.w/2-bl.w/2<=bl.x+bl.w/2&&pl.x-pl.w>=bl.x-bl.w/2){
                            x=bl.x+pl.w/2+bl.w/2+1;
                            jump=0;
                        }
                        else if(pl.z+pl.d/2+bl.d/2>=bl.z-bl.d/2&&pl.z+pl.d<=bl.z+bl.d/2){
                            z=bl.z-pl.d/2-bl.d/2-1;
                            jump=0;
                        }
                        else if(pl.z-pl.d/2-bl.d/2<=bl.z+bl.d/2&&pl.z-pl.d>=bl.z-bl.d/2){
                            z=bl.z+pl.d/2+bl.d/2+1;
                            jump=0;
                        }
                        canjump=true;
                    }
                    }
                
                    
            }
            pushMatrix();
            translate(x,y,z);                
            fill(0,255,0,100);
                box(10);
                popMatrix();
                popMatrix();
            
                
            
            if(keys[RIGHT]){
                zsp=-2;
            }
            else if(keys[LEFT]){
                zsp=2;
            }
            else{
                zsp=0;
            }
            if(keys[UP]){
                xsp=-2;
            }
            else if(keys[DOWN]){
                xsp=2;
            }
            else{
                xsp=0
            }
            if(keys[32]&&canjump){
                jump=-2;
                canjump=false;
            }
            if(keys[65]){
                r-=0.1;
            }
            if(keys[68]){
                r+=0.1;
            }
            x+=xsp;
            z+=zsp;
            y+=jump;
            if(jump<3)jump+=0.1;
            }
        };
        keyPressed=function(){
            keys[keyCode]=true;
        };
        keyReleased=function(){
            keys[keyCode]=false;
        };
    }};
