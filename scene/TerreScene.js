class TerreScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.actif = true;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 4000);
        this.name = "Terre";
        this.IsDefine = false;
    }
    DefineScene() {

        this.scene.background = new THREE.CubeTextureLoader()
            .setPath('Texture/BackgroundEarth/')
            .load([
                'bluecloud_ft.jpg',
                'bluecloud_bk.jpg',
                'bluecloud_up.jpg',
                'bluecloud_dn.jpg',
                'bluecloud_rt.jpg',
                'bluecloud_lf.jpg'
            ]);;

        var xS = 63, yS = 63;
        var terrainScene = THREE.Terrain({
            easing: THREE.Terrain.Linear,
            frequency: 2.5,
            heightmap: THREE.Terrain.DiamondSquare,
            material: new THREE.MeshBasicMaterial({
                map: solTexture
            }),
            maxHeight: 1000,
            minHeight: -1000,
            steps: 1,
            useBufferGeometry: false,
            xSegments: xS,
            xSize: 4096,
            ySegments: yS,
            ySize: 4096,
        });
        this.scene.add(terrainScene);

/*
        // Optional:
        // Get the geometry of the terrain across which you want to scatter meshes
        var geo = terrainScene.children[0].geometry;
        // Add randomly distributed foliage
        var decoScene = THREE.Terrain.ScatterMeshes(geo, {
            mesh: new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 12, 6)),
            w: xS,
            h: yS,
            spread: 0.02,
            randomness: Math.random,
        });
        terrainScene.add(decoScene);
*/

        this.water = new BestWater(this.scene);
        // positionnement de la caméra
        this.camera.position.y = 500;
        this.camera.position.x = 40;



 

        var controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 1200;

        this.IsDefine = true;
    }
    animate() {
        var delta = clock.getDelta();

        this.water.update();

        if (this.actif)
            requestAnimationFrame(this.animate.bind(this));

        renderer.render(this.scene, this.camera);
    }
    disabled() {
        this.actif = false;
    }
    active() {
        this.actif = true;
    }
}