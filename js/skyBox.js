Reveal.addEventListener( 'skybox', function() {
    (function(){
        var scene, camera, renderer, light;
        var geometry, material, mesh;

        init();
        addLight();
        animate();
        addSkyBox();
        rotateCamera();

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

            document.getElementById("skyBox").appendChild(renderer.domElement);

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

        function rotateCamera() {
            var rotObjectMatrix;

            function rotateAroundObjectAxis(object, axis, radians) {
                rotObjectMatrix = new THREE.Matrix4();
                rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

                object.matrix.multiply(rotObjectMatrix);

                object.rotation.setFromRotationMatrix(object.matrix);
            }

            keyboardJS.bind('left', function (e) {
                console.log("left is pressed");
                var yAxis = new THREE.Vector3(0, 1, 0);
                rotateAroundObjectAxis(camera, yAxis, Math.PI / 180);
                console.log(mesh.position);
            }, function (e) {
                console.log('left is released');
            });

            keyboardJS.bind('right', function (e) {
                console.log("right is pressed");
                var yAxis = new THREE.Vector3(0, -1, 0);
                rotateAroundObjectAxis(camera, yAxis, Math.PI / 180);
                console.log(mesh.position);
            }, function (e) {
                console.log('right is released');
            });

            keyboardJS.bind('up', function (e) {
                console.log("up is pressed");
                var xAxis = new THREE.Vector3(1, 0, 0);
                rotateAroundObjectAxis(camera, xAxis, Math.PI / 180);
                console.log(mesh.position);
            }, function (e) {
                console.log('up is released');
            });

            keyboardJS.bind('down', function (e) {
                console.log("down is pressed");
                var xAxis = new THREE.Vector3(-1, 0, 0);
                rotateAroundObjectAxis(camera, xAxis, Math.PI / 180);
                console.log(mesh.position);
            }, function (e) {
                console.log('down is released');
            });
        }

        function addSkyBox() {
            var urls = [
                'lib/img/skybox/px.jpg',
                'lib/img/skybox/nx.jpg',
                'lib/img/skybox/py.jpg',
                'lib/img/skybox/ny.jpg',
                'lib/img/skybox/pz.jpg',
                'lib/img/skybox/nz.jpg'

            ];

            var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
            cubemap.format = THREE.RGBFormat;

            var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
            shader.uniforms['tCube'].value = cubemap; // apply textures to shader

            // create shader material
            var skyBoxMaterial = new THREE.ShaderMaterial({
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            });

            // create skybox mesh
            var skybox = new THREE.Mesh(
                new THREE.BoxGeometry(300, 300, 300),
                skyBoxMaterial
            );
            skyBoxMaterial.needsUpdate = true;

            scene.add(skybox);
        }
    })();
});
