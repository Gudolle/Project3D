var TerreTexture;
var TerreNormale;
var LuneTexture;
var SoleilTexture;
var nuageTexture;


var Vaiseau;

//Lancement de l'initialisation
init();

function init(){


    ChargementModel();

    Promise.all(allPromises).then(function(retour){
        retour.forEach(function(item){
            switch(item.name){
                case "UfoPlane":
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
            }
        });
        Game();
    });

}