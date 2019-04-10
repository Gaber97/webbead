function $(id) {
    //return document.getElementById(id);
	return document.querySelector(id);
}

function $$(id) {
    return document.querySelectorAll(id);
}

function init() {
    $('#NagyPalya').addEventListener('click',newGame2,false);
    $('#KisPalya').addEventListener('click',newGame1,false);
    
   
  
   

}


//adattagok amik kellenek

/*padló (▩)
futószalag (←,↑,→,↓,⮠,⮡,⮢,⮣,⮤,⮥,⮦,⮧)
forgató (↺,↻)
gödör (◼)
start pont egy alap kiindulási iránnyal ⮘,⮙,⮚,⮛
sérülés (✹)
*/

// karakterenkénti olvasás charAt(element)

var Commands = ["","","","","","","","",""];

var CommandsList= ["⭢","⮆","⇶","⬏","⬎","⮌","⭠"];

var command = ["","","","",""];


var game_date = {

   
    large_tabla: [
        "▩▩▩◼↑▩▩▩✹▩",
        "▩▩▩▩↑▩▩▩▩▩",
        "▩▩▩▩⮤←←←←←←↺",
        "▩▩▩▩▩▩▩▩▩▩",
        "▩◼◼▩▩▩▩▩▩▩",
        "▩▩▩◼↑◼▩▩▩▩",
        "▩▩▩◼↑◼▩▩▩▩",
        "▩▩▩◼↑◼▩▩▩▩",
        "▩▩▩◼↑▩▩▩▩▩",
        "▩◼◼▩▩▩▩▩⮙▩",
   
    ],

    little_tabla: [
        "▩▩✹▩◼",
        "▩▩▩▩↑",
        "▩▩▩▩⮤",
        "▩▩▩▩▩",
        "▩◼◼▩⮚"
       
   
    ],

    view: 0,


    ido: 5000 ,
    
    WallePositonX: -1,
    WallePositonY: -1,
    
    // 5s van a kártyák kiválasztására
};

/*padló (▩)
futószalag (←,↑,→,↓,⮠,⮡,⮢,⮣,⮤,⮥,⮦,⮧)
forgató (↺,↻)
gödör (◼)
start pont egy alap kiindulási iránnyal ⮘,⮙,⮚,⮛
sérülés (✹)
*/

function randomCommandList(){


    var l=0;
    while(l !=Commands.length ){

    var k=Math.floor(Math.random() * 7);
    
    var count = 0;

    for(var i = 0; i < Commands.length; ++i){
    if(Commands[i] == CommandsList[k])
        count++;
    }

    if(count<3){
    Commands[l]=CommandsList[k];
    console.log("a");
    l++;
    }
    }



}

function rotate_Walle(jel){


    switch(jel) {
            case "⮘":
            game_date.view=4;
            return "walleleft.jpg";
            break;
            case "⮙":
            game_date.view=1;
            return "walleup.jpg";
            break;
            case "⮚":
            game_date.view=2;
            return "walleright.jpg"
            break;
            case "⮛":
            game_date.view=3;
            return "walledown.jpg";
            break;
        
            default:
       
      }

}


function rotate_Walle_with_rotator(jel){

    //forgatas forgatóval lehet külön megy inkább

    if(jel=="↺"){
    game_date.view=(game_date.view-1) % 4;
    
        

    }
    else{
    game_date.view=(game_date.view+1) % 4;

    }

    switch(game_date.view) {
        case 4:
        
        return "walleleft.jpg";
        break;
        case 1:
      
        return "walleup.jpg";
        break;
        case 2:
       
        return "walleright.jpg"
        break;
        case 3:
     
        return "walledown.jpg";
        break;
    
        default:
   
  }


 
}





function generateTable(meret){


    if(meret===5){
    var table=game_date.little_tabla;
    }
    else{
    var table=game_date.large_tabla;    

    }


    var tableInner='';






    for(var i=0;i<meret;i++){
        
        tableInner+='<tr>';

        for(var j=0;j<meret;j++){

            var item=table[i].charAt(j);

            if(item=="▩"){

            tableInner+='<td bgcolor="#d3d0bd"></td>';    

            }
            else if(item == "⮘" || item == "⮙" ||item == "⮚" ||item == "⮘" ){
            

        
            //rotate Walle image
            tableInner+='<td background='+rotate_Walle(item)+'></td>';
            game_date.WallePositonX=i;
            game_date.WallePositonY=j;
            }
            else if (item == "↺" || item == "↻" ){

            tableInner+='<td>'+item+'</td>';   

            }
            else if (item == "✹"){

                tableInner+='<td bgcolor="#ff7c00">'+item+'</td>';   
    
            }
            else if (item == "◼"){

                tableInner+='<td  bgcolor="#7a7a7a">'+item+'</td>';   
    
            }
            else{

                tableInner+='<td  bgcolor="00e0ff">'+item+'</td>';
            }

        }

        tableInner+='</tr>';

    }


return tableInner;

}


function generateLine(meret){

    if(meret==9){


        randomCommandList();

        var tableInner='';

    
        tableInner+='<tr>';

        for(var j=0;j<meret;j++){

            tableInner+='<td bgcolor="#d3d0bd">'+Commands[j]+'</td>';

        }

        tableInner+='</tr>';


    }else{

    var tableInner='';

    
        tableInner+='<tr>';

        for(var j=0;j<meret;j++){

            tableInner+='<td bgcolor="#d3d0bd"></td>';

        }

        tableInner+='</tr>';
    }
    

return tableInner;

}

function newGame2(){


    
    $('#map').innerHTML = generateTable(10);
    $('#command').innerHTML = generateLine(9);
    $('#selected_command').innerHTML = generateLine(5);


}

function newGame1(){


    
    $('#map').innerHTML = generateTable(5);
    $('#command').innerHTML = generateLine(9);
    $('#selected_command').innerHTML = generateLine(5);





}



window.addEventListener('load', init, false);
