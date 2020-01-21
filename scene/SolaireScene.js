class SolaireScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.actif = true;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 4000);
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

        //Création planètes
        this.popupEngine = new PopupEngine(this.camera);
        this.Terre = new Planete(TerreTexture, TerreNormale, sphere, 0x0000ff, "terrePopup", 10, speedTerre, speedTerreAns, this.popupEngine);
        this.Terre.SetGroupPosition(DistanceTerre, null, 0);
        this.Mars = new Planete(MarsTexture, null, sphere, 0xff0000, "marsPopup", 7, speedMars, speedMarsAns, this.popupEngine);
        this.Mars.SetGroupPosition(DisMars, null, 0);
        this.Mercure = new Planete(MercureTexture, null, sphere, 0xff0000, "mercurePopup", 7, speedMercure, speedMercureAns, this.popupEngine);
        this.Mercure.SetGroupPosition(DisMercure, null, 0);
        this.Venus = new Planete(VenusTexture, null, sphere, 0xff0000, "venusPopup", 7, speedVenus, speedVenusAns, this.popupEngine);
        this.Venus.SetGroupPosition(DisVenus, null, 0);
        this.Jupiter = new Planete(JupiterTexture, null, sphere, 0xff0000, "jupiterPopup", 7, speedJupiter, speedJupiterAns, this.popupEngine);
        this.Jupiter.SetGroupPosition(DisJupityer, null, 0);
        this.Saturne = new Planete(TerreTexture, null, sphere, 0xff0000, "saturnePopup", 7, speedSaturne, speedSaturneAns, this.popupEngine);
        this.Saturne.SetGroupPosition(DisSaturne, null, 0);
        this.Uranus = new Planete(TerreTexture, null, sphere, 0xff0000, "uranusPopup", 7, speedUranus, speedUranusAns, this.popupEngine);
        this.Uranus.SetGroupPosition(DisUranus, null, 0);
        this.Neptune = new Planete(TerreTexture, null, sphere, 0xff0000, "neptunePopup", 7, speedNeptune, speedNeptuneAns, this.popupEngine);
        this.Neptune.SetGroupPosition(DisNeptune, null, 0);



        //Ajout dans le système solaire
        this.SystemeSolaire.add(this.Terre.baryGroup);
        this.SystemeSolaire.add(this.Mars.baryGroup);
        this.SystemeSolaire.add(this.Mercure.baryGroup);
        this.SystemeSolaire.add(this.Venus.baryGroup);
        this.SystemeSolaire.add(this.Jupiter.baryGroup);
        this.SystemeSolaire.add(this.Neptune.baryGroup);
        this.SystemeSolaire.add(this.Saturne.baryGroup);
        this.SystemeSolaire.add(this.Uranus.baryGroup);

        console.log(this.Terre.light.toJSON());
        console.log(this.Mars.light.toJSON());
        
        //Ajout des nuages à la terre
        var nuageMat = new THREE.MeshStandardMaterial({ alphaMap: nuageTexture, transparent: true });
        this.nuage = new THREE.Mesh(sphere, nuageMat);
        this.Terre.mesh.add(this.nuage);
        this.nuage.scale.set(1.1, 1.1, 1.1);

        this.GroupLune = new THREE.Group();
        this.Terre.group.add(this.GroupLune);

        //Création de la lune
        var LuneMaterial = new THREE.MeshStandardMaterial({ map: LuneTexture });
        this.Lune = new THREE.Mesh(sphere, LuneMaterial);
        this.GroupLune.add(this.Lune);
        this.Lune.position.z = 50;

        this.Lune.scale.set(2.723, 2.723, 2.723);

        //Méthode pour recupérer la position d'un objet
        this.getPositionOnScreen = function(camera, object3d) {
            var vector = new THREE.Vector3();
            object3d.getWorldPosition(vector).project(camera);
            // On passe des coordonnées dans le repère normalisé (NDC) aux
            // coordonnées de l'écran
            vector.x = Math.round((vector.x + 1) / 2 * window.innerWidth);
            vector.y = Math.round(-(vector.y - 1) / 2 * window.innerHeight);
  
            return vector;
        }

        console.log(DisUranus);
        //Définition de la lumière du soleil
        var pointLight = new THREE.PointLight(0xaaaaff, 10, 15000);
        pointLight.position.set(0, 0, 0);
        //pointLight.scale = new THREE.Vector3(10, 10, 10);
        this.SystemeSolaire.add(pointLight);

        //Lumiere Gris sur la lune
        var LightLune = new THREE.AmbientLight(0xdddddd, 0.3);
        this.Lune.add(LightLune);

        //Initialisation des ombres
        renderer.shadowMap.enabled = true;
        this.Lune.receiveShadow = true;
        this.Lune.castShadow = true;
        pointLight.castShadow = true;
        Vaiseau.castShadow = true;
        Vaiseau.receiveShadow = true;

        // positionnement de la caméra
        
        this.camera.position.y = 40;
        this.camera.position.z = -120;
        this.camera.rotateY(Math.PI);

        //Permet le control à la souris
        var controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 500;

        //Permet de swap entre souris et manette
        var manetteControls;
        var gamepadSupportAvailable = navigator.getGamepads ||
		!!navigator.webkitGetGamepads ||
        !!navigator.webkitGamepads;
        function swapControl(camera, toMouse) {
            if (toMouse) {
                manetteControls = null;
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.minDistance = 2;
                controls.maxDistance = 800;
            } else {
                controls = null;
                manetteControls = new THREE.GamepadControls(camera);
            }
        }
        if (!gamepadSupportAvailable) {
            console.log( 'NOT SUPPORTED' );
        } else {
            window.addEventListener('gamepadconnected', swapControl(this.camera, true));
            window.addEventListener('gamepaddisconnected', swapControl(this.camera, false));
        }

        this.IsDefine = true;
    }

    animate() {
        //Récupérétation du Delta
        var delta = clock.getDelta();
        //Déroulement de l'animation
        this.GroupLune.rotateY(ToRad(delta * speedLune));
        this.Soleil.rotateY(ToRad(delta * speedRotationSoleil));
        this.nuage.rotateZ(ToRad(delta * speedNuage));

        //Animate planètes
        this.popupEngine.animate();

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

var speedMars = CalculTempo(1);//TODO a checker
var speedMarsAns = CalculTempo(687);// TODO ^
var speedMercure = CalculTempo(59);//TODO a checker
var speedMercureAns = CalculTempo(88);// TODO ^
var speedVenus = CalculTempo(117);//TODO a checker
var speedVenusAns = CalculTempo(225);// TODO ^
var speedJupiter = CalculTempo(.4);//TODO a checker
var speedJupiterAns = CalculTempo(4380);// TODO ^
var speedSaturne = CalculTempo(.4);//TODO a checker
var speedSaturneAns = CalculTempo(10585);// TODO ^
var speedUranus = CalculTempo(.8);//TODO a checker
var speedUranusAns = CalculTempo(30660);// TODO ^
var speedNeptune = CalculTempo(.7);//TODO a checker
var speedNeptuneAns = CalculTempo(60225);// TODO ^
var speedLune = CalculTempo(28); //La lune met 28 jours pour tourner autour de la terre
var speedTerre = CalculTempo(1); // La terre met 1 jours pour tourner autour d'elle même
var speedTerreAns = CalculTempo(365); //La terre met 365 jour pour tourner autour du soleil
var speedRotationSoleil = CalculTempo(27); //Soleil tourne en moyenne à 27j pour tourner autour de lui même
var speedNuage = CalculTempo(2); // La vitesse des nuages

var DistanceTerre = 500;
var DisMercure = CalculDistance(.4);
var DisVenus = CalculDistance(.7);
var DisMars = CalculDistance(1.5);
var DisJupityer = CalculDistance(5.2);
var DisSaturne = CalculDistance(9.5);
var DisUranus = CalculDistance(19.6);
var DisNeptune = CalculDistance(30);



function CalculDistance(UE){
    return UE * DistanceTerre;
}


//Permet de calculer la vitesse en fonction de la durée pour faire un tour complet en Jour
function CalculTempo(y) {
    return (360 / (y * 1));
}
//Simplification pour convertir en Radiant car flemme
function ToRad(x) {
    return THREE.Math.degToRad(x);
}