class Planete {
    constructor(map, normalMap, form, lightColor, popupId, scaleMesh, speed, speedAns) {
        //set all the variables
        this.map = map;
        this.normalMap = normalMap;
        this.form = form;
        this.light = new THREE.AmbientLight(lightColor, 0.3);
        this.popupDiv = document.getElementById(popupId);
        this.scaleMesh = scaleMesh;
        this.speed = speed;
        this.speedAns = speedAns;

        //execute setup method to configure the planet
        this.Setup();
    }

    Setup() {
        //create a group for the planet and the barycenter of the spin
        this.baryGroup = new THREE.Group();

        //create a group for the planet
        this.group = new THREE.Group();
        this.baryGroup.add(this.group);

        //create the mesh object with its texture and form
        if (!this.normalMap) {
            this.material = new THREE.MeshStandardMaterial({
                map: this.map,
            })
        } else {
            this.material = new THREE.MeshStandardMaterial({
                map: this.map,
                normalMap: this.normalMap
            })
        };
        this.mesh = new THREE.Mesh(this.form, this.material);
        
        //set mesh object
        this.group.add(this.mesh);
        this.mesh.scale.set(this.scaleMesh, this.scaleMesh, this.scaleMesh);
        this.mesh.add(this.light);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;

        //create an empty mesh for the info popup
        this.popupMesh = new THREE.Object3D();
        this.mesh.add(this.popupMesh);

        //place the pop up on the side
        this.popupMesh.position.x = .75;
        this.popupMesh.position.y = .75;
    }

    Animate(camera, delta) {

        //Animation de la planète
        this.baryGroup.rotateY(ToRad(delta * this.speedAns))
        this.mesh.rotateY(ToRad(delta * this.speed));

        //Get popup's position
        var vector = new THREE.Vector3();
        this.popupMesh.getWorldPosition(vector).project(camera);
        vector.x = Math.round((vector.x + 1) / 2 * window.innerWidth);
        vector.y = Math.round(-(vector.y - 1) /2 * window.innerHeight);

        //Set popup's position
        this.popupDiv.style.left = vector.x + "px";
        this.popupDiv.style.top = vector.y + "px";
    }
}
