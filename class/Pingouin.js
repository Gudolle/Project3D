class Pingouin{
    constructor(x, y , z){
        this.Identity = Penguin.clone();

        var ambiantLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.Identity.add(ambiantLight);
        this.Identity.position.set(x, y, z);

        this.maxSaut = Math.random() * 1000 + this.Identity.position.y;
        this.PositionStart = this.Identity.position.y;
        this.Up = true;

    }
    getModel(){
        return this.Identity;
    }
    animate(delta){
        if(this.Up){
            this.Identity.position.y += delta * 10;
            if(this.Identity.position.y >= this.maxSaut)
                this.Up = false;
        }
        else{
            this.Identity.position.y -= delta * 10;
            if(this.Identity.position.y <= this.PositionStart)
                this.Up = true;
        }
    }
    getCamera(){
        return new THREE.Vector3()
    }
}

