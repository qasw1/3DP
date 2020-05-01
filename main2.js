/*
    Controls:
    UP and DOWN arrow keys to move forward and backward
    LEFT and RIGHT arrow keys to move left and right
    ENTER or SPACE to jump
    . and / to orbit
*/
var lightColor=color(163, 241, 255);//The color of the light

var bkgColor=color(13, 255, 0);//The color of the background

var bodyColor=color(255, 102, 0);//The color of your body

var otherColor=color(30, 0, 255);//the color of your nose and tail




var roundTo=function(num,digit){
    if(digit===0){
        return num;
    }
    else{
        var n1=num*pow(10,digit);
        var n2=round(n1);
        var n=n2/pow(10,digit);
        if((n-floor(n)).toString().length>digit){
            //println(0);
           return n;
        }
        //println(pow(10,-digit));
        return n;
    }
};
var speedc=60;
var savec=millis();
var speed=function(){
    if(frameCount%20===0){
    speedc=1/((millis()-savec)/1000);
    savec=millis();
    }
    return roundTo(speedc*20,5);
};
var a=createGraphics(width,height,P3D);
var world=[[5,5,10]];
var keys=[];
var collide = function(obj1, obj2) {
        return obj1.y+obj1.h>=obj2.y&&
        obj1.x+obj1.w>=obj2.x&&
        obj1.x<=obj2.x+obj2.w&&
        obj1.y<=obj2.y+obj2.h&&
        obj1.z+obj1.d>=obj2.z&&
        obj1.z<=obj2.z+obj2.d;
    };
var x=100,y=100,z=200,r=90,jump=0,canjump=true;
for(var i=0;i<200;i++){
    var q=floor(random(0,21));
    var w=floor(random(0,21));
    var e=floor(random(0,21));
    for(var j=0;j<world.length;j++){
        if(world[j][0]===q&&world[j][1]===w&&world[j][2]===e){
            q=floor(random(0,21));
            w=floor(random(0,21));
            e=floor(random(0,21));
        }
        else if(j===world.length-1){
            world.push([q,w,e]);
        }
    }
            
}
frameRate(30);
draw= function() {
    background(255, 0, 0);
    this[["KAInfiniteLoopCount"]]=-Infinity;
    
    a.beginDraw();
    
    a.pushMatrix();
    a.directionalLight(red(lightColor),green(lightColor),blue(lightColor),1,1,0);
    a.ambientLight(red(lightColor)-50,green(lightColor)-50,blue(lightColor)-50);
    a.background(bkgColor);
    a.shininess(1);
    a.angleMode="degrees";
    //a.rotateY(r);
    //a.translate(x,y,z);
    a.fill(255);
    for(var i=0;i<world.length;i++){
                    a.pushMatrix();
                    a.translate(world[i][0]*20,world[i][1]*20,world[i][2]*20);
                    a.box(20);
                    a.popMatrix();
                    if(collide({x:x-2.5,y:y-2.5,z:z,w:5,h:6,d:5},{x:world[i][0]*20-10,y:world[i][1]*20-10,z:world[i][2]*20-10,w:20,h:21,d:20})){
                        //a.println("yes");
                        var bl={x:world[i][0]*20,y:world[i][1]*20,z:world[i][2]*20,w:20,h:20,d:20};
                        var pl={x:x,y:y,z:z,w:5,h:5,d:5};
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
    a.noLights();
    a.pushMatrix();
    a.fill(bodyColor);
    a.translate(x,y,z);
    //a.rotateY(90);
    a.box(5);
    a.translate(0,0,-3);
    a.fill(otherColor);
    a.box(2);
    a.translate(0,-1,7);
    a.box(1,1,4);
    a.popMatrix();
    a.popMatrix();
    a.endDraw();
    a.camera(x+cos(r)*(60*height/400),y-20,z+sin(r)*(60*height/400),x,y,z,0,1,0);
    
    image(a,0,0);
    //image(b,200,0);
    if(keys[UP]){
        z-=2;
    }
    if(keys[DOWN]){
        z+=2;
    }
    if(keys[LEFT]){
        x-=2;
    }
    if(keys[RIGHT]){
        x+=2;
    }
    if((keys[ENTER]||keys[32])&&canjump===true){
        jump=-7;
        canjump=false;
    }
    if(keys[SHIFT]){
        y++;
    }
    if(keys[190]){
        r+=5;
    }
    if(keys[191]){
        r-=5;
    }
    if(jump<3){
        
        jump+=0.5;
    }
    if(y===20*20){
        canjump=true;
    }
    x=constrain(x,0,20*20);
    y=constrain(y,0,20*20);
    z=constrain(z,0,20*20);
    y+=jump;
    fill(0);
    textSize(20);
    textAlign(CENTER,CENTER);
    text(speed()+" fps",width/2,15);
};
keyPressed=function(){
    keys[keyCode]=true;
};
keyReleased=function(){
    keys[keyCode]=false;
};
