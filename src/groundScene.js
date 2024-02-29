import GameScene from "./lib/GameScene";
import * as THREE from 'three';

export default class groundScene extends GameScene{


    setup(){
        const BoxGeometry = new THREE.BoxGeometry(5,5,5);
        const boxMaterial = new THREE.MeshBasicMaterial();
        const box = new THREE.Mesh(BoxGeometry,boxMaterial)
        this.scene.add(box)

    }

    update(){

    }

}