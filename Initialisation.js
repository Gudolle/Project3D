var TerreTexture;
var TerreNormale;
var LuneTexture;
var SoleilTexture;
var nuageTexture;
var WaterTexture;
var JupiterTexture;
var VenusTexture;
var MarsTexture;
var MercureTexture;
var NeptuneTexture;
var UranusTexture;
var SaturneTexture;

var Penguin;
var Vaiseau;
var Terrains;
var grass;


var clock;



var MyGame;

//Lancement de l'initialisation
init();

function init(){
    ChargementModel();

    MyGame = new GameInfo();
    clock = new THREE.Clock();
    Promise.all(allPromises).then(function(retour){
        
        retour.forEach(function(item){
            switch(item.name){
                case "Penguin":
                    Penguin = item.Model;
                    Penguin.rotation.x = -.5 * Math.PI;
                    Penguin.scale.set(.1,.1,.1)
                    break;
                case "Vaiseau":
                    Vaiseau = item.Model;
                    break;
                case "EarthCloud":
                    nuageTexture = item.Model;
                    break;
                case "EarthNormal":
                    TerreNormale = item.Model;
                    break;
                case "TerreTexture":
                    TerreTexture = item.Model;
                    break;
                case "SoleilTexture":
                    SoleilTexture = item.Model;
                    break;
                case "LuneTexture":
                    LuneTexture = item.Model;
                    break;
                case "waternormals":
                    WaterTexture = item.Model;
                    break;
                case "terrain":
                    Terrains = item.Model;
                    break;
                case "grass1":
                    grass = item.Model;
                    break;
                case "JupiterTexture":
                    JupiterTexture = item.Model;
                    break;
                case "VenusTexture":
                    VenusTexture = item.Model;
                    break;
                case "MarsTexture":
                    MarsTexture = item.Model;
                    break;
                case "MercureTexture":
                    MercureTexture = item.Model;
                    break;
                case "NeptuneTexture":
                    NeptuneTexture = item.Model;
                    break;
                case "UranusTexture":
                    UranusTexture = item.Model;
                    break;
                case "SaturneTexture":
                    SaturneTexture = item.Model;
                    break;


            }
        });
        Game();
    });

}