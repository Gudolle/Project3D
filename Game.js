
//var scene;
var renderer;



function Game() {
    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("Barre").style.display = "none";

    MyGame.ChangeScene(IdentifiantScene.SOLAIRE);


    function updateViewportSize() {
        MyGame.scene.camera.aspect = window.innerWidth / window.innerHeight;
        MyGame.scene.camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(MyGame.scene.scene, MyGame.scene.camera);
    }
    window.addEventListener("resize", updateViewportSize);

    function test(e) {
        if (e.keyCode == 96) {
            if (MyGame.scene.name == "Solaire") {
                MyGame.ChangeScene(IdentifiantScene.TERRE);
            }
            else {
                MyGame.ChangeScene(IdentifiantScene.SOLAIRE);
            }
        }
    }
    window.addEventListener("keydown", test);

}

