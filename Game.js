
var scene;
var renderer;

//Définition de la durée d'une journée en Seconde
var timeDay = 5;


function Game() {
    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("Barre").style.display = "none";

    scene = new THREE.Scene();

    //Définition de la caméra
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);

    //Définition des Textures

    scene.add(Vaiseau);
    Vaiseau.position.x = 78;
    Vaiseau.position.y = 78;
    Vaiseau.scale.set(0.1,0.1,0.1);

    //Ajout d'une Texture de Type Cube en background de la scene pour avoir l'impression d'être dans un univers
    scene.background = new THREE.CubeTextureLoader()
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
    var SystemeSolaire = new THREE.Group();
    scene.add(SystemeSolaire);

    var sphere = new THREE.SphereGeometry(1, 32, 32);

    //Création du Soleil
    var soleilMat = new THREE.MeshBasicMaterial({
        map: SoleilTexture
    });
    var Soleil = new THREE.Mesh(sphere, soleilMat);
    SystemeSolaire.add(Soleil);
    Soleil.scale.set(50, 50, 50);


    var GroupTerreSoleil = new THREE.Group();
    SystemeSolaire.add(GroupTerreSoleil);


    //Initialisation du Group "Terre" comprennant la Terre et sa Lune
    var GroupTerre = new THREE.Group();
    GroupTerreSoleil.add(GroupTerre);
    GroupTerre.position.z = 0;
    GroupTerre.position.x = 150;



    //Création de la Terre
    var material = new THREE.MeshStandardMaterial({
        map: TerreTexture,
        normalMap: TerreNormale
    });
    var Terre = new THREE.Mesh(sphere, material);
    GroupTerre.add(Terre);
    Terre.scale.set(10, 10, 10);


    


    //Ajout des nuages à la terre
    var nuageMat = new THREE.MeshStandardMaterial({ alphaMap: nuageTexture, transparent: true });
    var nuage = new THREE.Mesh(sphere, nuageMat);
    Terre.add(nuage);
    nuage.scale.set(1.1, 1.1, 1.1);


    var GroupLune = new THREE.Group();
    GroupTerre.add(GroupLune);
    //Création de la lune
    var LuneMaterial = new THREE.MeshStandardMaterial({ map: LuneTexture });
    var Lune = new THREE.Mesh(sphere, LuneMaterial);
    GroupLune.add(Lune);
    Lune.position.z = 50;   
    
    Lune.scale.set(2.723, 2.723, 2.723);

    //Définition de la lumière du soleil
    var pointLight = new THREE.PointLight(0xaaaaff, 10, 2000);
    pointLight.position.set(0, 0, 0);
    pointLight.scale = new THREE.Vector3(10,10,10);
    SystemeSolaire.add(pointLight);

    //Lumiere Bleu sur la Terre
    var LightTerre = new THREE.AmbientLight(0x0000ff, 0.3);
    Terre.add(LightTerre);

    //Lumiere Gris sur la lune
    var LightLune = new THREE.AmbientLight(0xdddddd, 0.3);
    Lune.add(LightLune);



    //var LightPenguin = new THREE.AmbientLight(0x00ffff, 1);
    //Terre.add(LightTerre);
    
    Terre.add(Penguin);
    Penguin.position.y = 10;
    Penguin.rotation.x = Math.PI;
    Penguin.scale.set(0.1,0.1,0.1);
    //Penguin.add(LightPenguin);

    //Initialisation des ombres
    renderer.shadowMap.enabled = true;
    Lune.receiveShadow = true;
    Lune.castShadow = true;
    Terre.receiveShadow = true;
    Terre.castShadow = true;
    pointLight.castShadow = true;

    // positionnement de la caméra
    camera.position.z = 150;
    camera.position.y = 20;
    camera.position.x = -70;


    //Met à jours lorsque l'écrans change de taille
    function updateViewportSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }
    window.addEventListener("resize", updateViewportSize);


    //camera.lookAt(Vaiseau.position);

    //Permet le control à la souris
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 500;
    controls.target = Vaiseau.position;



    //Initialise l'horloge
    var clock = new THREE.Clock();

    //Calcul des vitesses
    var speedLune = CalculTempo(28); //La lune met 28 jours pour tourner autour de la terre
    var speedTerre = CalculTempo(1); // La terre met 1 jours pour tourner autour d'elle même
    var speedTerreAns = CalculTempo(365); //La terre met 365 jour pour tourner autour du soleil
    var speedRotationSoleil = CalculTempo(27); //Soleil tourne en moyenne à 27j pour tourner autour de lui même
    var speedNuage = CalculTempo(2); // La vitesse des nuages

    //Function d'animation
    function animate() {
        //Récupérétation du Delta
        var delta = clock.getDelta();

        //Déroulement de l'animation
        GroupLune.rotateY(ToRad(delta * speedLune));
        Terre.rotateY(ToRad(delta * speedTerre));
        GroupTerreSoleil.rotateY(ToRad(delta * speedTerreAns));
        Soleil.rotateY(ToRad(delta * speedRotationSoleil));
        nuage.rotateZ(ToRad(delta * speedNuage));

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

//Permet de calculer la vitesse en fonction de la durée pour faire un tour complet en Jour
function CalculTempo(y) {
    return (360 / (y * timeDay));
}
//Simplification pour convertir en Radiant car flemme
function ToRad(x) {
    return THREE.Math.degToRad(x);
}
