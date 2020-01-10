class SolaireScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.actif = true;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
        this.name = "Solaire";
        this.IsDefine = false;
    }
    DefineScene() {

        //Définition des Textures

        this.scene.add(Vaiseau);
        Vaiseau.position.x = 78;
        Vaiseau.position.y = 78;
        Vaiseau.scale.set(0.1, 0.1, 0.1);

        //Ajout d'une Texture de Type Cube en background de la scene pour avoir l'impression d'être dans un univers
        this.scene.background = new THREE.CubeTextureLoader()
            .setPath('Texture/Background/')
            .load([
                '1.jpg',
                '2.jpg',
                '3.jpg',
                '4.jpg',
                '5.jpg',
                '6.jpg'
            ]);


        //Création du Systeme Solaire
        this.SystemeSolaire = new THREE.Group();
        this.scene.add(this.SystemeSolaire);

        var sphere = new THREE.SphereGeometry(1, 32, 32);

        //Création du Soleil
        var soleilMat = new THREE.MeshBasicMaterial({
            map: SoleilTexture
        });
        this.Soleil = new THREE.Mesh(sphere, soleilMat);
        this.SystemeSolaire.add(this.Soleil);
        this.Soleil.scale.set(50, 50, 50);


        this.GroupTerreSoleil = new THREE.Group();
        this.SystemeSolaire.add(this.GroupTerreSoleil);


        //Initialisation du Group "Terre" comprennant la Terre et sa Lune
        this.GroupTerre = new THREE.Group();
        this.GroupTerreSoleil.add(this.GroupTerre);
        this.GroupTerre.position.z = 0;
        this.GroupTerre.position.x = 150;



        //Création de la Terre
        var material = new THREE.MeshStandardMaterial({
            map: TerreTexture,
            normalMap: TerreNormale
        });
        this.Terre = new THREE.Mesh(sphere, material);
        this.GroupTerre.add(this.Terre);
        this.Terre.scale.set(10, 10, 10);





        //Ajout des nuages à la terre
        var nuageMat = new THREE.MeshStandardMaterial({ alphaMap: nuageTexture, transparent: true });
        this.nuage = new THREE.Mesh(sphere, nuageMat);
        this.Terre.add(this.nuage);
        this.nuage.scale.set(1.1, 1.1, 1.1);


        this.GroupLune = new THREE.Group();
        this.GroupTerre.add(this.GroupLune);
        //Création de la lune
        var LuneMaterial = new THREE.MeshStandardMaterial({ map: LuneTexture });
        this.Lune = new THREE.Mesh(sphere, LuneMaterial);
        this.GroupLune.add(this.Lune);
        this.Lune.position.z = 50;

        this.Lune.scale.set(2.723, 2.723, 2.723);

        // ajouter un objet vide pour porter la div
        this.empty = new THREE.Object3D();
        this.empty.position.x = .75;
        this.empty.position.y = .75;
        this.Terre.add(this.empty);

        // recup position
        this.getPositionOnScreen = function(camera, object3d) {
            var vector = new THREE.Vector3();
            object3d.getWorldPosition(vector).project(camera);
            // On passe des coordonnées dans le repère normalisé (NDC) aux
            // coordonnées de l'écran
            vector.x = Math.round((vector.x + 1) / 2 * window.innerWidth);
            vector.y = Math.round(-(vector.y - 1) / 2 * window.innerHeight);
  
            return vector;
          }

        //Définition de la lumière du soleil
        var pointLight = new THREE.PointLight(0xaaaaff, 10, 2000);
        pointLight.position.set(0, 0, 0);
        //pointLight.scale = new THREE.Vector3(10, 10, 10);
        this.SystemeSolaire.add(pointLight);

        //Lumiere Bleu sur la Terre
        var LightTerre = new THREE.AmbientLight(0x0000ff, 0.3);
        this.Terre.add(LightTerre);

        //Lumiere Gris sur la lune
        var LightLune = new THREE.AmbientLight(0xdddddd, 0.3);
        this.Lune.add(LightLune);



        
        this.Terre.add(Penguin);
        Penguin.position.y = 5;
        Penguin.rotation.z = Math.PI;
        Penguin.scale.set(0.01, 0.01, 0.01);



        //Initialisation des ombres
        renderer.shadowMap.enabled = true;
        this.Lune.receiveShadow = true;
        this.Lune.castShadow = true;
        this.Terre.receiveShadow = true;
        this.Terre.castShadow = true;
        pointLight.castShadow = true;
        Vaiseau.castShadow = true;
        Vaiseau.receiveShadow = true;

        // positionnement de la caméra
        this.camera.position.z = 150;
        this.camera.position.y = 20;
        this.camera.position.x = -70;




        //Permet le control à la souris
        /*var controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 500;*/

        //Permet le control à la manette
        var manetteControls = new THREE.GamepadControls(this.camera);

        this.IsDefine = true;

        
    }

    animate() {
        //Récupérétation du Delta
        var delta = clock.getDelta();
        //Déroulement de l'animation
        this.GroupLune.rotateY(ToRad(delta * speedLune));
        this.Terre.rotateY(ToRad(delta * speedTerre));
        this.GroupTerreSoleil.rotateY(ToRad(delta * speedTerreAns));
        this.Soleil.rotateY(ToRad(delta * speedRotationSoleil));
        this.nuage.rotateZ(ToRad(delta * speedNuage));

        //affichage terrePopup
        var pos = this.getPositionOnScreen(this.camera, this.empty);
        terrePopup.style.left = pos.x + "px";
        terrePopup.style.top = pos.y + "px";

        if(this.actif)
            requestAnimationFrame(this.animate.bind(this));

        renderer.render(this.scene, this.camera);
    }
    disabled(){
        this.actif = false;
    }
    active(){
        this.actif = true;
    }
    

}

var speedLune = CalculTempo(28); //La lune met 28 jours pour tourner autour de la terre
var speedTerre = CalculTempo(1); // La terre met 1 jours pour tourner autour d'elle même
var speedTerreAns = CalculTempo(365); //La terre met 365 jour pour tourner autour du soleil
var speedRotationSoleil = CalculTempo(27); //Soleil tourne en moyenne à 27j pour tourner autour de lui même
var speedNuage = CalculTempo(2); // La vitesse des nuages

//Permet de calculer la vitesse en fonction de la durée pour faire un tour complet en Jour
function CalculTempo(y) {
    return (360 / (y * 5));
}
//Simplification pour convertir en Radiant car flemme
function ToRad(x) {
    return THREE.Math.degToRad(x);
}