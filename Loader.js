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




    //Texture
    new Model("EarthCloud", true, "jpg"),
    new Model("EarthNormal", true, "jpg"),
    new Model("LuneTexture", true, "jpg"),
    new Model("SoleilTexture", true, "jpg"),
    new Model("TerreTexture", true, "jpg"),
    new Model("solTexture", true, "jpg"),
    new Model("waternormals", true, "jpg")
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
                item.AddModel(loader.load( item.name + '.' + item.format, onsuccess));
                resolve(item);
            }
        }));
        
    });
}