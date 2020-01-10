class BestWater{
    constructor(scene){
        WaterTexture.wrapS = WaterTexture.wrapT = THREE.RepeatWrapping; 

        
		// Add light
		var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
		directionalLight.position.set(-600, 300, 600);
		scene.add(directionalLight);

        this.ms_Water = new THREE.Water(this.ms_Renderer, this.ms_Camera, this.ms_Scene, {
            textureWidth: 256,
            textureHeight: 256,
            waterNormals: WaterTexture,
            alpha: 1.0,
            sunDirection: directionalLight.position.normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            betaVersion: 0,
            side: THREE.DoubleSide
        });
        var aMeshMirror = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2000, 2000, 10, 10),
            this.ms_Water.material
        );
        aMeshMirror.add(this.ms_Water);
        aMeshMirror.rotation.x = - Math.PI * 0.5;
    
        scene.add(aMeshMirror);
    }
    update(){
        this.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
    }
}

