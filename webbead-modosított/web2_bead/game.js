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
	$('#command').addEventListener('click',Clicked_Command,false);
	
    
   
  
   

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
var commandindex = ["","","","",""];

var actual_command=0;


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

	for (var i=0;i<5;i++){
		
		command[i]="";
		commandindex[i]="";
		
	}
	
	


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

            tableInner+='<td bgcolor="#d3d0bd">'+command[j]+'</td>';

        }

        tableInner+='</tr>';
    }
    

return tableInner;

}




function GameMain(){
	
	
	$('#command').innerHTML = generateLine(9);
    $('#selected_command').innerHTML = generateLine(5);
	
	
	
	
	
}


function feladat8keres(e)
{
	if(vege)return;
	if(e.target.tagName!='TD')return;
	var td=e.target;
	var pozicio=xykoord(td);
	if(kincskoord.x==pozicio.x &&kincskoord.y==pozicio.y )
	{
		vege=true;
		td.style.backgroundColor='yellow';
		setTimeout(function()
		{
			ujjatek($('#txtmeret').value);
			
		},2000)
	}else
	{
		td.style.backgroundColor='red';
	}
}

function xykoord(td)
{
	var x=td.cellIndex;
	var tr=td.parentNode;
	var y=tr.sectionRowIndex;
	return{x:x,y:y};
}

function Clicked_Command(e){
	
	if(e.target.tagName!='TD')return;
	var td=e.target;
	var x=td.cellIndex;
	
	if(actual_command<5){
		command[actual_command]=Commands[x];
		actual_command++;
		$('#selected_command').innerHTML = generateLine(5);
		
	}
	else
	{
	actual_command=0;
	$('#command').innerHTML = generateLine(9);
	$('#selected_command').innerHTML = generateLine(5);
    //vegerehajtas
	}
	
	
	
	
	
	
}




function newGame2(){


    
    $('#map').innerHTML = generateTable(10);
    GameMain();
	


}

function newGame1(){


    
    $('#map').innerHTML = generateTable(5);
    GameMain();





}



window.addEventListener('load', init, false);
