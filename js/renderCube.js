Reveal.addEventListener( 'renderCube', function() {
    var scene, camera, renderer;
    var geometry, material, mesh;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            35,         // Field of view
            375 / 300,  // Aspect ratio
            .1,         // Near
            10000       // Far
        );
        camera.position.set(-15, 10, 15);
        camera.lookAt({
            x: scene.position.x,
            y: scene.position.y,
            z: scene.position.z
        });


        geometry = new THREE.BoxGeometry(5, 5, 5);
        material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(375, 300);

        document.getElementById("first-slide").appendChild(renderer.domElement);

    }

    function animate() {

        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }
}, false);