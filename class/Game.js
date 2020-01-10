class GameInfo{
    constructor(){
        this.scene = IdentifiantScene.TERRE;
        this.timeDay = 5;
    }
    ChangeScene(scene){
        this.scene.disabled();
        this.scene = scene;
        this.scene.active();
        if(!this.scene.IsDefine)
            this.scene.DefineScene();
        this.scene.animate();
    }
}

const IdentifiantScene = {
    SOLAIRE : new SolaireScene(),
    TERRE : new TerreScene()
}