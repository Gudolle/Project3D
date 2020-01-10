class TerreScene{
    constructor() {
        this.scene = new THREE.Scene();
        this.actif = true;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
        this.name = "Terre";
        this.IsDefine = false;
    }
    DefineScene(){
        this.scene.background = new THREE.Color(0, 0, 1);

        var geometry = new THREE.BoxGeometry( 1, 1, 1,1,1,1 );
        var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );
        this.cube.position.z = -3;
        this.cube.rotation.x = 0;
        this.cube.rotation.y = 0;
        this.cube.add(new THREE.AxesHelper(1.3))

        // positionnement de la caméra
        this.camera.lookAt(this.cube.position); 
        this.IsDefine = true;
    }
    animate(){
        var delta = clock.getDelta();

        
        this.cube.rotateY(ToRad(delta * CalculTempo(2)));

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