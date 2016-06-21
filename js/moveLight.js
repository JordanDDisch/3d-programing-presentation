Reveal.addEventListener( 'moveLight', function() {
    var scene, camera, renderer, light;
    var geometry, material, mesh;

    init();
    addLight();
    animate();

    var lightButton = document.getElementById("lightMvSlide");
    lightButton.addEventListener("change", function() {
        light.position.set(lightButton.value, 0, 10);
        console.log(lightButton.value);
    });

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
        material = new THREE.MeshLambertMaterial({color: 0xFF0000});

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();

        renderer.setSize(375, 300);

        document.getElementById("lightMovement").appendChild(renderer.domElement);

    }

    function addLight() {
        light = new THREE.DirectionalLight(0xFFFF00);
        light.position.set(10, 0, 10);
        scene.add(light);
    }

    function animate() {

        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }
}, false);


