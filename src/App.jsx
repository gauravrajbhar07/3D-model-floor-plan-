import React, { useEffect } from 'react';
import * as THREE from 'three';
import SceneInit from './lib/SceneInit';
import Game from './lib/GameScene';
import groundScene from './groundScene';

function App() {
  useEffect(() => {
    // Define JSON data
    const jsonData = [
      {
        "name": "door",
        "class": 5,
        "confidence": 0.9525138139724731,
        "box": {
          "x1": 0,
          "y1": 80,
          "x2": 0,
          "y2": 80
        }
      },
      {
        "name": "door",
        "class": 5,
        "confidence": 0.9497941732406616,
        "box": {
          "x1": 80,
          "y1": 0,
          "x2": 80,
          "y2": 0
        }
      },
      {
        "name": "door",
        "class": 5,
        "confidence": 0.9474611878395081,
        "box": {
          "x1":80,
          "y1": 80,
          "x2": 80,
          "y2": 80
        }
      },
      {
        "name": "door",
        "class": 5,
        "confidence": 0.9474611878395081,
        "box": {
          "x1": 40,
          "y1": 40,
          "x2": 40,
          "y2": 40
        }
      },
      {
        "name": "door",
        "class": 5,
        "confidence": 0.9474611878395081,
        "box": {
          "x1":0,
          "y1": 0,
          "x2": 0,
          "y2": 0
        }
      }
    ];

    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    const geometry = new THREE.PlaneGeometry(80*2+10,80*2+10)
    const material = new THREE.MeshStandardMaterial(({side:THREE.DoubleSide}))

    // const cube = new THREE.Mesh(geometry,material)
    // const geometry = new THREE.BoxGeometry(1, 80*2, 80*2 );
    // const material = new THREE.MeshBasicMaterial({ color: 0x808080 });

    const cube = new THREE.Mesh(geometry, material);
    cube.rotateX(Math.PI*0.5)
    test.scene.add(cube);

    // Loop through the JSON data containing door information
    jsonData.forEach((data, index) => {
      // Calculate width, height, and depth of the door box
      const width = 5;
      const height = 5; // Assuming a fixed height for the door
      const depth = 5;

      // Calculate position of the door
      const posX = (data.box.y1 + data.box.y2) / 2;
      const posY = 3; // Adjust as needed, assuming door is at ground level
      const posZ = (data.box.x1 + data.box.x2) / 2 ;

      // Create geometry for the door
      const doorGeometry = new THREE.BoxGeometry(width, height, depth);

      // Create material for the door (you can use textures if available)
      const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

      // Create the door mesh
      const door = new THREE.Mesh(doorGeometry, doorMaterial);

      // Set position of the door
      door.position.set(posX, posY, posZ);

      // Add the door to the scene
      test.scene.add(door);

      // Create text label for the door
      const label = createLabel(data.name);
      label.position.set(posX, posY + height / 2, posZ);
      test.scene.add(label);
    });
  }, []); // Empty dependency array, meaning this effect runs once after the initial render

  // Function to create a text label
  const createLabel = (text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'Bold 40px Arial';
    context.fillStyle = 'white';
    context.fillText(text, 0, 40);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const geometry = new THREE.PlaneGeometry(canvas.width / 10, canvas.height / 10);
    const label = new THREE.Mesh(geometry, material);
    label.scale.set(0.1, 0.1, 0.1);
    return label;
  };

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
