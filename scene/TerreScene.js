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

		// Add light
		var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		//directionalLight.position.set(400, 300, 400);
        this.scene.add(directionalLight);


        var TextureTerrains = new THREE.MeshStandardMaterial({ map: grass });
        //var newMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
        Terrains.traverse ( ( o ) => {
            if ( o.isMesh ) if (o.isMesh) o.material = TextureTerrains
        });
        //Terrains.traverse ( (o) => { console.log(o)})
        this.scene.add(Terrains);

        this.water = new BestWater(this.scene, this.camera, directionalLight);
        // positionnement de la caméra
        this.camera.position.y = 500;
        this.camera.position.x = 40;

        
        var FirstPingouin = new Pingouin(0, -30, 0);


        this.scene.add(FirstPingouin.getModel());
        //Penguin.scale.set(0.01, 0.01, 0.01);

 

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