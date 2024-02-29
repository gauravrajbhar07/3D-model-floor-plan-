import * as THREE from 'three';

export default class GameScene {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.init();
        
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 50);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

        this.resize();
        this.setUpEvents();
        this.setup();
    }

    renderer() {
        this.renderer.render(this.scene, this.camera);
        this.update();
        requestAnimationFrame(() => { this.render() });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.update();
        requestAnimationFrame(() => { this.render() });
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix(); // Corrected method name
        this.renderer.setSize(window.innerWidth, window.innerHeight); // Corrected method name
    }

    setUpEvents() {
        window.addEventListener("resize", () => {
            this.resize();
        });
    }
}
