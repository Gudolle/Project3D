class BestWater{
    constructor(scene, camera, light){
        WaterTexture.wrapS = WaterTexture.wrapT = THREE.RepeatWrapping; 

        

        this.ms_Water = new THREE.Water(renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: WaterTexture,
            alpha: 1.0,
            sunDirection: light.position.normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001eff,
            betaVersion: 0,
            side: THREE.DoubleSide
        });
        
        var aMeshMirror = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(5000, 5000, 0, 0),
            this.ms_Water.material
        );
        aMeshMirror.add(this.ms_Water);
        aMeshMirror.rotation.x = - Math.PI * 0.5;
            
        scene.add(aMeshMirror);
        aMeshMirror.position.y = -80;

    }
    update(){
        this.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
    }
}

