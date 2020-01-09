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
    new Model("UfoPlane", false),
    new Model("EarthCloud", true, "jpg"),
    new Model("EarthNormal", true, "jpg"),
    new Model("LuneTexture", true, "jpg"),
    new Model("SoleilTexture", true, "jpg"),
    new Model("TerreTexture", true, "jpg")
];
var allPromises = [];

var loader = new THREE.TextureLoader();
var loader3d = new THREE.OBJLoader();
var loaderMtl = new THREE.MTLLoader();


loaderMtl.setPath( 'MTL/' );
loader3d.setPath( 'model/');
loader.setPath( 'Texture/');


var myBar = document.getElementById("myBar");
var width = 1;
var padding = 100/allModel.length;
console.log(padding);
console.log(elem);

var onsuccess = function(){
    width += padding;
    if(width >= 100){
        myBar.style.width = width + "%"; 
    }
}

function ChargementModel(){
    allModel.forEach(function(item){
        allPromises.push(new Promise(function(resolve, error){
            if(!item.texture){
                loaderMtl.load( item.name + '.mtl', function( materials ) {
                    materials.preload();
                    loader3d.setMaterials(materials);
                    loader3d.load( item.name + '.obj', function ( object ) {
                        item.AddModel(object);
                        resolve(item);
                    });
                }, onsuccess);
            }
            else if(item.texture){
                item.AddModel(loader.load( item.name + '.' + item.format, onsuccess));
                resolve(item);
            }
        }));
        
    });
}