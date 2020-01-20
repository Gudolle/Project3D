class Model {
    constructor(name, texture, format){
        this.name = name;
        this.texture = texture;
        this.format = format;
    }

    AddModel(Model)
    {
        this.Model = Model;
    }
}


var allModel = [
    //Model 3D format GLB
    new Model("Vaiseau", false),
    new Model("Penguin", false),
    new Model("terrain", false),




    //Texture
    new Model("EarthCloud", true, "jpg"),
    new Model("EarthNormal", true, "jpg"),
    new Model("LuneTexture", true, "jpg"),
    new Model("SoleilTexture", true, "jpg"),
    new Model("TerreTexture", true, "jpg"),
    new Model("waternormals", true, "jpg"),
    new Model("grass1", true, "jpg"),
    new Model("JupiterTexture", true, "jpg"),
    new Model("VenusTexture", true, "jpg"),
    new Model("MarsTexture", true, "jpg"),
    new Model("MercureTexture", true, "jpg")
];


var allPromises = [];

var loader = new THREE.TextureLoader();
var loaderGlb = new THREE.GLTFLoader();

loader.setPath( 'Texture/');
loaderGlb.setPath( 'model/');

var myBar = document.getElementById("myBar");
var width = 0;
var padding = 100/allModel.length;

var onsuccess = function(){
    width += padding;
    myBar.style.width = width + "%";
}

function ChargementModel(){
    allModel.forEach(function(item){
        allPromises.push(new Promise(function(resolve, error){
            if(!item.texture){
                loaderGlb.load(item.name + '.glb', function (gltf) {
                    item.AddModel(gltf.scene);
                    resolve(item);
                  },
                  onsuccess,
                  function (error) {
                    console.error(error);
                });
            }
            else if(item.texture){
                item.AddModel(loader.load( item.name + '.' + item.format, undefined, onsuccess , function(err) { console.log("Erreur pour : " + item.name)}));
                resolve(item);
            }
        }));
        
    });
}