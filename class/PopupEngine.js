class PopupEngine {
    constructor(camera) {
        this.camera = camera;
        this.frustum = new THREE.Frustum();
        this.vector = new THREE.Vector3();
        this.popups = new Array();
        this.display = true;
    }

    addPopup(htmlElementId, placeholder, target) {
        this.popups.push({
            "htmlElement": document.getElementById(htmlElementId),
            "placeholder": placeholder,
            "target": target
        });
    }

    toggle() {
        this.display = ! this.display;
        if (! this.display) {
            for (let b of this.popups) {
            b.htmlElement.style.left = "-1000px";
            b.htmlElement.style.top = "-1000px";
            }
        }
    }

    animate() {
        if (! this.display) {
            return;
        }
        this.frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));
        for (let b of this.popups) {
            if (this.frustum.intersectsObject(b.target)) {
            b.placeholder.getWorldPosition(this.vector).project(this.camera);
            
            this.vector.x = Math.round((this.vector.x + 1) / 2 * window.innerWidth);
            this.vector.y = Math.round(-(this.vector.y - 1) / 2 * window.innerHeight);
            } else {
            this.vector.x = 0;
            this.vector.y = - b.htmlElement.offsetHeight;
            }
            b.htmlElement.style.left = this.vector.x + "px";
            b.htmlElement.style.top = this.vector.y - b.htmlElement.offsetHeight + "px";
        }
    }
}
