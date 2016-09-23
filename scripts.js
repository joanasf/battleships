//_____________ VARIABLES _____________
var filter = /^[a-z0-9]+$/i;

var size;
var set5=0;
var set4=0;
var set3=0;
var set2=0;
var set1=0;
var playerShots=0;
var cpuShots=0;
var pontos=0;
var Cpontos=0;
var criada=0;
var h_criada =0;
var game_in_progress=0;
var mode='';
var ship='url(sprites/ship.png)';
var block='url(sprites/nonono.png)';
var val;
var field;
var xz;
var yz;
var pshotsTaken=0;
var oshotsTaken=0;

var phits=0;
var cpuhits=0;
var mhits=0;
//_____________________________________




function validate(){
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;
	
	if (filter.test(username) && username.length >= 3 && username.length <= 12 && password != null && password.length >= 3 && filter.test(password)) {
		register();
		return false;
	}
	else
		alert("Problemas com o username e/ou password!\n\nUsername: 3 a 12 caracteres alfanumericos" +
				"\nPassword: 3 a 12 caracteres alfanumericos");
}

function sucesso(){
    $('#login').fadeOut(500);
    setTimeout(function() {$('#menu').fadeIn(400);}, 550);
}

$(document).ready( function(){
    $('.menu').hover( 
    function(){
    $(this).stop().animate({width:"60%"},200)
    },
    function(){
    $(this).stop().animate({width:"25%"},500)
    });
});

function menu_select(x){
    if(x=="single"){
        $('#menu').fadeOut(500);
        mode='single';
        setTimeout(function() {$('#single').fadeIn(400);$('#boat_selection').fadeIn(400);}, 550);
        criar_tabela();
    }
    if(x=="multi"){
        $('#menu').fadeOut(500);
        mode='multi';
        setTimeout(function() {$('#single').fadeIn(400);$('#boat_selection').fadeIn(400);}, 550);
        criar_tabela();
    }
    if(x=="high"){
        $('#menu').fadeOut(500);
        setTimeout(function() {ranking();}, 550);
    }
}

function skip(){
    document.getElementById("login").style.display= "none";
    document.getElementById("menu").style.display= "none";
    criar_tabela();
    document.getElementById("single").style.display= "block";
    start();
}


//__________________ Single Player ___________________________
function criar_tabela() {
    if(criada==0){

        var $tab = '<table id="player_table" cellspacing="0">';

        for (var y=0; y<10; y++) {
            $tab += '<tr>';

            for (var x=0; x<10; x++) {
                $tab += '<td>';
                $tab += '</td>';
            }
            $tab += '</tr>';
        }
        $tab += '</table>';
        $('#player_table_container').append($tab);	
    }
    criada=1;
}


function criar_highscore() {
    if(h_criada==0){
        var $hih = '<table class="highscores" id="highscore">';
        for (var y=0; y<11; y++) {
            $hih += '<tr>';

            for (var x=0; x<2; x++) {
                $hih += '<td>';
                $hih += '</td>';
            }
            $hih += '</tr>';
        }
        $hih += '</table>';
        $('#high').append($hih);
        $('#high').append('<br><button onclick="closeH()">Fechar</button>');
    }
    h_criada=1;
    $('#high').fadeIn(400);
}


var set=0;
var virado = 0;
var selected = 0;
var repor=0;

function Bselect(clicked_id){
    $('#player_table_container td').unbind('mouseover mouseout click');
    
    selected = clicked_id;

    if(selected==1 && set1==1){set=1; repor=1;}
    if(selected==2 && set2==1){set=1; repor=2;}
    if(selected==3 && set3==1){set=1; repor=3;}
    if(selected==4 && set4==1){set=1; repor=4;}
    if(selected==5 && set5==1){set=1; repor=5;}
    
    if(set==0){
        btnhighlight(clicked_id);
        if(clicked_id < 3) clicked_id++;
        size=clicked_id;
        
        $('#player_table_container td').mouseover(function(){
            x=this.cellIndex;
            y=this.parentNode.rowIndex;
            val = Mplayer[x][y];
            if(val == 'E'){
                 $(this).css("background","rgba(50, 115, 200, 1)");
            }
            else{
                 $(this).css("background","rgba(255, 0, 0, 0.5)");
            }
            highlight(clicked_id);
			});
			
        $('#player_table_container td').mouseout(function(){
            xz = this.cellIndex;
            yz = this.parentNode.rowIndex;
            val = Mplayer[xz][yz];
            
            if(val == 'E'){
                 $(this).css("background","transparent");
            }
            
            else if(val=="B"){
                $(this).css("background","transparent");
                $(this).css("background-image", block);
            }
            
            else if(val==2 || val==3 || val==4 || val==5){
                $(this).css("background","transparent");
                $(this).css("background-image", ship);
            }

            highdark(clicked_id);
        });	
        
        set_piece();
	}
    
    
    
    else{
        
    if(repor==1){set1=0;}
    if(repor==2){set2=0;}
    if(repor==3){set3=0;}
    if(repor==4){set4=0;}
    if(repor==5){set5=0;}
        
    if(set1+set2+set3+set4+set5==5){
                $('#start').fadeIn(500);
            }
            else{$('#start').fadeOut(500);}
        
        
        for(var i=0; i<10; i++){
            for (var j=0; j<10; j++){
                if(Mplayer[j][i]=="B")Mplayer[j][i]="E";
                if(Mplayer[j][i]==repor)Mplayer[j][i]="E";
                }
        }
        setblockadeP();
        updateTable("P");
        set=0;
        
        $('#player_table_container td').mouseover(function(){
            x=this.cellIndex;
            y=this.parentNode.rowIndex;
            $(this).css("border","1px solid red");
            highlight(clicked_id);
			});
			
        $('#player_table_container td').mouseout(function(){
            $(this).css("border","1px solid #5f5f5f");
            highdark(clicked_id);
        });	
        
        btnhighlight(clicked_id);
        set_piece();
    }
    
    

    set=0;
    
}

//HIGHLIGHTS THE BOAT BUTTONS
function btnhighlight(x){
    document.getElementById(1).style.border = "2px solid transparent";
    document.getElementById(2).style.border = "2px solid transparent";
    document.getElementById(3).style.border = "2px solid transparent";
    document.getElementById(4).style.border = "2px solid transparent";
    document.getElementById(5).style.border = "2px solid transparent";
    
    document.getElementById(1).style.backgroundColor = "rgba(0,255,0,0)";
    document.getElementById(2).style.backgroundColor = "rgba(0,255,0,0)";
    document.getElementById(3).style.backgroundColor = "rgba(0,255,0,0)";
    document.getElementById(4).style.backgroundColor = "rgba(0,255,0,0)";
    document.getElementById(5).style.backgroundColor = "rgba(0,255,0,0)";
    
    document.getElementById(x).style.border = "2px ridge rgba(50, 115, 200, 0.8)";
    document.getElementById(x).style.backgroundColor = "rgba(50, 115, 200, 0.2)";
}


function highlight(s){
    var y1=y;
	var x1=x;
    
    field = $('#player_table_container tr:eq(' + y1+ ') td:eq(' + x1 + ')');
    
    if(virado==1){
        for (i = 1; i < s; i++) { 
            y1++;
            field = $('#player_table_container tr:eq(' + y1+ ') td:eq(' + x1 + ')');
            
            if(y1<10){
                val = Mplayer[x1][y1];

                if(val == 'E'){
                     field.css("background","rgba(50, 115, 200, 1)");
                }
                else{
                     field.css("background","rgba(255, 0, 0, 0.5)");
                }
            }
            else{
                 $('#player_table_container tr:eq(' + y + ') td:eq(' + x + ')').css("background", "rgba(255,0,0,0.5)");
            }
        
        }
    }	
    else{
        for (i = 1; i < s; i++) { 
            x1++;
            field = $('#player_table_container tr:eq(' + y1+ ') td:eq(' + x1 + ')');
            
            if(x1<10){
                val = Mplayer[x1][y1];

                if(val == 'E'){
                     field.css("background","rgba(50, 115, 200, 1)");
                }
                else{
                     field.css("background","rgba(255, 0, 0, 0.5)");
                }
            }
            
            else{
                 $('#player_table_container tr:eq(' + y + ') td:eq(' + x + ')').css("background", "rgba(255,0,0,0.5)");
            }
            
        }
    }
	
}
	
function highdark(s){
    var y1=y;
    var x1=x;
    if(virado==1){
        for (i = 1; i < s; i++) { 
            y1++;
            field = $('#player_table_container tr:eq(' + y1+ ') td:eq(' + x1 + ')');
        
        if(y1<10){
           val = Mplayer[x1][y1];
            
            
           if(val == 'E'){
                 field.css("background","transparent");
            }
            
            else if(val=="B"){
                field.css("background","transparent");
                field.css("background-image", block);
            }
            
            else if(val==2 || val==3 || val==4 || val==5){
                field.css("background","transparent");
                field.css("background-image", ship);
            }
        }
        }
    }
    else{
        for (i = 1; i < s; i++) { 
            x1++;
            field = $('#player_table_container tr:eq(' + y1+ ') td:eq(' + x1 + ')');
          
            if(x1<10){
            val = Mplayer[x1][y1];
            
            
           if(val == 'E'){
                 field.css("background","transparent");
            }
            
            else if(val=="B"){
                field.css("background","transparent");
                field.css("background-image", block);
            }
            
            else if(val==2 || val==3 || val==4 || val==5){
                field.css("background","transparent");
                field.css("background-image", ship);
            }
            }
        }
        
    }
}



function orient(){
    if(virado==0){
        virado=1;
        document.getElementById("6").style.backgroundColor = "rgba(0, 0, 0, 0.15)";
        
        document.getElementById("6").style.borderTop = "6px inset rgba(50, 115, 200, 1)";
        document.getElementById("6").style.borderRight = "6px inset rgba(50, 115, 200, 1)";
        document.getElementById("6").style.borderBottom = "2px outset rgba(50, 115, 200, 1)";
        document.getElementById("6").style.borderLeft = "2px outset rgba(50, 115, 200, 1)";
    }
    else {
        virado=0;
        document.getElementById("6").style.backgroundColor = "rgba(0, 0, 0, 0.01)";
        
        document.getElementById("6").style.borderTop = "2px outset rgba(50, 115, 200, 1)";
        document.getElementById("6").style.borderRight = "2px outset rgba(50, 115, 200, 1)";
        document.getElementById("6").style.borderBottom = "6px outset rgba(50, 115, 200, 1)";
        document.getElementById("6").style.borderLeft = "6px outset rgba(50, 115, 200, 1)";
        
    }
};




//MATRIZES PLAYER E CPU
var Mplayer = [];
for(var i=0; i<10; i++) {
    Mplayer[i] = [];
    for(var j=0; j<10; j++) {
        Mplayer[i][j] = "E";
    }
}

var Mcpu = [];
for(var i=0; i<10; i++) {
    Mcpu[i] = [];
    for(var j=0; j<10; j++) {
        Mcpu[i][j] = "E";
    }
}

//MULTIPLAYER MATRICE
var Mserv = [];
for(var i=0; i<10; i++) {
    Mserv[i] = [];
    for(var j=0; j<10; j++) {
        Mserv[i][j] = false;
    }
}



function set_piece(){
    $('#player_table_container td').click(function() {
        pieceVer("P");
        
        if(valid==0){
            alert("Colocacao Invalida!");
        }
        
        else{
        
            $('#player_table_container td').unbind('mouseover mouseout click');

            if(selected==5){set5=1;}
            else if(selected==4){set4=1;}
            else if(selected==3){set3=1;}
            else if(selected==2){set2=1;}
            else if(selected==1){set1=1;}

            if(virado==0){
                for(i=0; i<size; i++){
                    Mplayer[x+i][y]=selected;
                }
            }

            if(virado==1){
                for(i=0; i<size; i++){
                    Mplayer[x][y+i]=selected;
                }
            }

            
            updateTable("P");
            setblockadeP();
            updateTable("P");

            if(set1+set2+set3+set4+set5==5){
                $('#start').fadeIn(500);
            }
            else{$('#start').fadeOut(500);}


        }
	});
}


function updateTable(a){
    
    if(a=="P"){
        for(var i=0; i<10; i++){
            for (var j=0; j<10; j++){

                if(Mplayer[j][i]=="E"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css("background-color","transparent");
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image' , 'none');

                }
                else if(Mplayer[j][i]==1 || Mplayer[j][i]==2 || Mplayer[j][i]==3 || Mplayer[j][i]==4 || Mplayer[j][i]==5){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css("border","1px solid #5f5f5f");
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css("background","transparent");
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image', 'url(sprites/ship.png)');
                    //$('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').html(Mplayer[j][i]);
                }

                else if(Mplayer[j][i]=="B"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css("background","transparent");
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image', 'url(sprites/nonono.png)');
                }
            }
        }
    }
    else if(a=="C"){
        for(var i=0; i<10; i++){
            for (var j=0; j<10; j++){

                if(Mcpu[j][i]=="E"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css("background-color","transparent");
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image' , 'none');

                }
                else if(Mcpu[j][i]==1 || Mcpu[j][i]==2 || Mcpu[j][i]==3 || Mcpu[j][i]==4 || Mcpu[j][i]==5){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css("border","1px solid #5f5f5f");
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css("background-color","rgba(90,90,90,0.7)");
                    //$('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').html(Mcpu[j][i]);
                }

                else if(Mcpu[j][i]=="B"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css("background-color","grey");
                }
            }
        }
    }   
}



function setblockadeP(){
    for(var j=0; j<10; j++){
        for (var i=0; i<10; i++){    
            if(Mplayer[i][j]==1 || Mplayer[i][j]==2 || Mplayer[i][j]==3 || Mplayer[i][j]==4 || Mplayer[i][j]==5){
                if(i>0){
                    if(Mplayer[i-1][j]=="E")    Mplayer[i-1][j]="B";
                    if(j>0){ if(Mplayer[i-1][j-1]=="E")    Mplayer[i-1][j-1]="B"; }
                    if(j<9){ if(Mplayer[i-1][j+1]=="E")    Mplayer[i-1][j+1]="B"; }
                }
                if(i<9){
                    if(Mplayer[i+1][j]=="E")    Mplayer[i+1][j]="B";
                    if(j>0){ if(Mplayer[i+1][j-1]=="E")    Mplayer[i+1][j-1]="B"; }
                    if(j<9){ if(Mplayer[i+1][j+1]=="E")    Mplayer[i+1][j+1]="B"; }
                }
                if(j>0){
                    if(Mplayer[i][j-1]=="E")    Mplayer[i][j-1]="B";
                }
                if(j<9){
                    if(Mplayer[i][j+1]=="E")    Mplayer[i][j+1]="B";
                
}}}}}

function setblockadeC(){
    for(var j=0; j<10; j++){
        for (var i=0; i<10; i++){    
            if(Mcpu[i][j]==1 || Mcpu[i][j]==2 || Mcpu[i][j]==3 || Mcpu[i][j]==4 || Mcpu[i][j]==5){
                if(i>0){
                    if(Mcpu[i-1][j]=="E"){Mcpu[i-1][j]="B";}
                }
                if(i<9){
                    if(Mcpu[i+1][j]=="E"){Mcpu[i+1][j]="B";}
                }
                if(j>0){
                    if(Mcpu[i][j-1]=="E"){Mcpu[i][j-1]="B";}
                }
                if(j<9){
                    if(Mcpu[i][j+1]=="E"){Mcpu[i][j+1]="B";}
}}}}}






var valid=1;
function pieceVer(a){
    valid=1;
    
    if(a=="P"){
        if(virado==0){
            if(parseInt(parseInt(x)+parseInt(size))>10) valid=0;
            else{
                for(i=0;i<size;i++){
                    if(Mplayer[x+i][y]=="B") valid=0;
                    if(Mplayer[x+i][y]==1 || Mplayer[x+i][y]==2 || Mplayer[x+i][y]==3 || Mplayer[x+i][y]==4 || Mplayer[x+i][y]==5) valid=0;
                }
            }
        }
        else{
            if(parseInt(parseInt(y)+parseInt(size))>10) valid=0;
            else{
                for(i=0;i<size;i++){
                    if(Mplayer[x][y+i]=="B" || Mplayer[x][y+1]=="P") valid=0;
                    if(Mplayer[x][y+i]==1 || Mplayer[x][y+i]==2 || Mplayer[x][y+i]==3 || Mplayer[x][y+i]==4 || Mplayer[x][y+i]==5) valid=0;
                }
            }
        }
    }
    
    if(a=="C"){
        if(virado==0){
            for(i=0;i<size;i++){
                if(Mcpu[x+i][y]=="B") valid=0;
            }
        }
        else{
            for(i=0;i<size;i++){
                if(Mcpu[x][y+i]=="B") valid=0;
            }
        }
    }
}


function start(){
    if(mode=='single'){
        updateTable("C");
        $('#start').fadeOut('500');
        $('#boat_selection').fadeOut('500');
        setTimeout(function() {$('#score').fadeIn(500);}, 700);
        $('#score').html("SCORE");
        $('#player_table_container td').unbind('mouseover mouseout click');
        placeC();
    }
    else if(mode=='multi'){
        readyServerMatrice();
        
        join();
        
        
    }
}

//Gerar numero aleatorio
function RND(x){
    y=Math.floor(Math.random() * (x - 0 + 1)) + 0;
    return y;
}

//Gerar numero aleatorio com minimo 700ms (personalidade cpu)
function RNDCPUSHOT(x){
    y=Math.floor(Math.random() * x) + 700;
    return y;
}

var success=0;
var virado=0;
var x=0;
var y=0;
var valid=1;

//Colocacao de pecas do CPU automatica
function placeC(){
    for(h=1; h<=5; h++){
        virado = RND(1);
        
        size=h;
        if(h<3) size++;
        
        while(success==0){
            if(virado==0){
                x=RND(9-size);
                y=RND(9);
            }
            else if(virado==1){
                x=RND(9);
                y=RND(9-size);
            }
            
            pieceVer("C");
            if(valid==1){
                success=1;
                if(virado==0){
                    for(b=0; b<size; b++){
                        Mcpu[x+b][y]=h;
                    }
                }
                if(virado==1){
                    for(b=0; b<size; b++){
                        Mcpu[x][y+b]=h;
                    }
                }
            }
        }
        
        setblockadeC();
        updateTable("C");
        success=0;
    }
    
    readytables();
    $('#who').css('display','block');
    game_in_progress=1;
setTimeout(function() {$('#quit').fadeIn(400);}, 10);
playerTurn();
}



//Prepara as matrizes de jogo com "E" em vez de "B" e "P" em vez de pecas numeradas
function readytables(){
   for(var i=0; i<10; i++){
            for (var j=0; j<10; j++){
                if(Mplayer[j][i]==1 || Mplayer[j][i]==2 || Mplayer[j][i]==3 || Mplayer[j][i]==4 || Mplayer[j][i]==5){
                   Mplayer[j][i]="P";
                }

                else if(Mplayer[j][i]=="B"){
                    Mplayer[j][i]="E";
                }
            }
        }
    if(mode=='single'){
        for(var i=0; i<10; i++){
            for (var j=0; j<10; j++){
                if(Mcpu[j][i]==1 || Mcpu[j][i]==2 || Mcpu[j][i]==3 || Mcpu[j][i]==4 || Mcpu[j][i]==5){
                    Mcpu[j][i]="P";
                }

                else if(Mcpu[j][i]=="B"){
                    Mcpu[j][i]="E";
                }
            }
        }
    }
}


//Limpa a tabela mostrada ao utilizador (Usada entre rondas)
function clearTable(){
    for(var i=0; i<10; i++){
        for (var j=0; j<10; j++){
            $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image' , 'none');
            $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-color' , 'transparent');
        }
    }
}


function updateGame(a){
     if(a=="P"){
        clearTable();
        for(var i=0; i<10; i++){
            for (var j=0; j<10; j++){
                if(Mcpu[j][i]=="W"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image', 'url(sprites/water.png)');
                }
                else if(Mcpu[j][i]=="F"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image', 'url(sprites/fire.png)');
                }
            }
        }   
  
     }
    
    if(a=="C"){
        clearTable();
        for(var i=0; i<10; i++){
            for (var j=0; j<10; j++){
                if(Mplayer[j][i]=="W"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image', 'url(sprites/water.png)');
                }
                else if(Mplayer[j][i]=="P"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image', 'url(sprites/ship.png)');
                }
                else if(Mplayer[j][i]=="F"){
                    $('#player_table_container tr:eq(' +i+ ') td:eq(' +j+ ')').css('background-image', 'url(sprites/fire.png)');
                }
            }
        }
    }
    if(mode=='single'){
        $('#score').html('SCORE<br>Tu: ' + pontos + '<br><progress class="pace" max="17" value='+phits+'></progress><br>CPU: ' + Cpontos + '<br><progress class="pace" max="17" value='+cpuhits+'></progress><br>');
    }
}




//Sinaliza ultimo tiro
function lastShot(j,n,m){
    if(j=="P"){
        $('#player_table_container tr:eq(' +m+ ') td:eq(' +n+ ')').css("background-color","rgba(235,210,45,0.7)");
    }
    else{
        $('#player_table_container tr:eq(' +m+ ') td:eq(' +n+ ')').css("background-color","rgba(235,210,45,0.7)");
    }   
}



var xis=0;
var ips=0;

//Tiro do jogador
function playerTurn(){
    $('#player_table_container').fadeIn(350);
    $('#who').html('E a tua vez ' + username + '!');
    $('#player_table_container td').unbind('mouseover mouseout click');
    updateGame("P");

    shoot();
}

function shoot(){
    $('#player_table_container td').click(function() {
        xis=this.cellIndex;
        ips=this.parentNode.rowIndex;
        
        if(Mcpu[xis][ips]=="W" || Mcpu[xis][ips]=="F"){alert('Ja disparaste aqui!');}
        
        else if(Mcpu[xis][ips]=="P"){
                $('#player_table_container td').stop(true).unbind('mouseover mouseout click');
                Mcpu[xis][ips]="F";
                phits++;
                pontos++;
                playerShots++;
                if(playerShots>=17) gameover("P");
                setTimeout(function() {$('#player_table_container').fadeOut(400);}, 1700);
                setTimeout("cpuTurn();",2101);
            }
        else{
            Mcpu[xis][ips]="W";
            $('#player_table_container td').stop(true).unbind('mouseover mouseout click');
            pontos++;
            setTimeout(function() {$('#player_table_container').fadeOut(400);}, 1700);
            setTimeout("cpuTurn();",2101);
            lastShot("P",xis,ips);
            }
        updateGame("P");
        lastShot("P",xis,ips);
    });
}



//Tiro do cpu
function cpuTurn(){
    $('#player_table_container').fadeIn(350);
    $('#who').html('E a vez do teu adversario!');
    updateGame("C");
    
       setTimeout("cpuShot();",RNDCPUSHOT(2000)); 
}


function cpuShot(){
        x=RND(9);
        y=RND(9);
        var test = Mplayer[x][y];
    
        /*while(test=="W" || test=="F"){
            x=RND(9);
            y=RND(9);
        }*/
		
		if(test=="W") cpuShot();
		else if(test=="F") cpuShot();
		
		else{
			if(Mplayer[x][y]=="P"){
				Mplayer[x][y]="F";
                cpuhits++;
				Cpontos++;;
				cpuShots++;
				if(cpuShots>=17)gameover("C");
				setTimeout("cpuTurn();",1500);
                setTimeout(function() {$('#player_table_container').fadeOut(400);}, 2000);
				setTimeout("playerTurn();",2401);
				
			}
			
			else{
				Cpontos++;
				Mplayer[x][y]="W";
                setTimeout(function() {$('#player_table_container').fadeOut(400);}, 2000);
				setTimeout("playerTurn();",2401);
			}
            
            updateGame("C");
            lastShot("C",x,y);
		}
}



//Fim de jogo
function gameover(v){
    game_in_progress=0;
    
    $('#score').html("SCORE<br><br>Tu: " + pontos + "<br>CPU: " + Cpontos);
    
    if(v=="D"){alert("Desististe!");}
    else if(v=="P")  alert("Ganhaste com " + pontos + " pontos!");
    else if(v=="C")  alert("Jogo cancelado!");
    else if(v=="M"){alert('Obrigado por jogares!');}
    else alert("Perdeste!");
    
    pontos=0;     
    Cpontos=0;
    playerShots=0;
    cpuShots=0;
    size;
    set5=0;
    set4=0;
    set3=0;
    set2=0;
    set1=0;
    pshotsTaken=0;
    oshotsTaken=0;
    phits=0;
    cpuhits=0;
    mhits=0;
    
    if(virado == 1) orient();
    
    for(var i=0; i<10; i++) {
        for(var j=0; j<10; j++) {
            Mplayer[i][j] = "E";
        }
    }
    for(var i=0; i<10; i++) {
        for(var j=0; j<10; j++) {
            Mcpu[i][j] = "E";
        }
    }
    
    clearTable();
    
    $('#waiting').fadeOut(200);
    $('#quit').fadeOut(200);
    $('#single').fadeOut(200);
    $('#score').fadeOut(200);
    setTimeout(function() {ranking();}, 300);
    
}

//Fechar Highscores
function closeH(){
    $('#high').fadeOut(500);
    setTimeout(function() {$('#menu').fadeIn(400);}, 600);
}


//__________ MULTIPLAYER __________
var test='';

function readyServerMatrice(){
    readytables();
    for(var i=0; i<10; i++) {
        for(var j=0; j<10; j++) {
            if(Mplayer[j][i]=="P")  Mserv[i][j] = true;
            else Mserv[i][j] = false;
        }
    }
}


function start(){
    if(mode=='single'){
        updateTable("C");
        $('#start').fadeOut('500');
        $('#boat_selection').fadeOut('500');
        setTimeout(function() {$('#score').fadeIn(500);}, 700);
        $('#score').html("SCORE");
        $('#player_table_container td').unbind('mouseover mouseout click');
        placeC();
    }
    else if(mode=='multi'){
        readyServerMatrice();
        join(); 
    }
}


function joined(){
    $('#start').fadeOut('500');
    $('#boat_selection').fadeOut('100');
    setTimeout(function() {$('#waiting').fadeIn(200);}, 150);
    $('#player_table_container td').unbind('mouseover mouseout click');

    for(var i=0; i<10; i++) {
        for(var j=0; j<10; j++) {
            Mcpu[i][j] = "E";
        }
    }
    setTimeout(function() {update();}, 360);
}



function MultiGame(x){
    if(x==username){
        updateGame("P");
        $('#who').html('E a tua vez ' + username + '!');
        $('#player_table_container td').click(function() {
            col=this.cellIndex;
            row=this.parentNode.rowIndex;
            col++;
            row++;
            setTimeout(function() {notify();}, 100);
        });
    }
    
    else if(x==opponent){
        updateGame("C");
        $('#who').html('E a vez de ' + opponent + '!');
    }
}


function shootit(id,hit){
    if(id=='u'){
        if(hit){
            phits++;
            Mcpu[col][row]="F";
        }
        else{
            Mcpu[col][row]="W";
        }
        updateGame('P');
    }

    else if(id=='o'){
        if(hit){
            mhits++;
            Mplayer[col][row]="F";
        }
        else{
            Mplayer[col][row]="W";
        }
        updateGame('C');
    }
    $('#score').html('SCORE<br><br>' + username + ': ' + pshotsTaken + '<br><progress class="pace" max="17" value='+phits+'></progress><br>' + opponent + ': ' + oshotsTaken + '<br><progress class="pace" max="17" value='+mhits+'></progress>');
}