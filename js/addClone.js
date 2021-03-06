Reveal.addEventListener( 'addClone', function() {
    (function() {
        var scene, camera, renderer, light;
        var geometry, material, mesh, ground, ground_material;
        var positionX = 0,
            positionY = 10,
            positionZ = 50;

        init();
        buildAxes( 1000 );
        addLight();
        animate();
        movement();
        rotation();

        function init() {

            scene = new Physijs.Scene();

            camera = new THREE.PerspectiveCamera(
                35,         // Field of view
                500 / 400,  // Aspect ratio
                .1,         // Near
                10000       // Far
            );

            camera.position.set( positionX, positionY, positionZ );
            camera.lookAt({
                x: scene.position.x,
                y: scene.position.y,
                z: scene.position.z
            });

            // ground
            ground_material = Physijs.createMaterial(
                new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'lib/img/rocks.jpg' ) }),
                .8, // high friction
                .4 // low restitution
            );
            ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
            ground_material.map.repeat.set( 2.5, 2.5 );
            ground = new Physijs.BoxMesh(
                new THREE.BoxGeometry(50, 1, 50),
                ground_material,
                0 // mass
            );
            ground.receiveShadow = true;
            ground.position.set(0, -1, 0);

            scene.add( ground );

            // player
            geometry = new THREE.BoxGeometry( 5, 5, 5 );
            material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );

            mesh = new Physijs.BoxMesh( geometry, material );

            mesh.position.set(0, 5, 0);

            mesh.matrixAutoUpdate = true;

            mesh.updateMatrix();

            scene.add( mesh );
            mesh.add(camera);


            //background
            renderer = new THREE.WebGLRenderer();

            renderer.setClearColor( 0xdddddd, 1);

            renderer.setSize( 500, 400 );

            //attach to tag
            document.getElementById("addClone").appendChild( renderer.domElement );

        }

        function addLight()
        {
            // Light
            light = new THREE.DirectionalLight( 0xFFFFFF );
            light.position.set( 20, 40, -15 );
            light.target.position.copy( scene.position );
            light.castShadow = true;
            light.shadowCameraLeft = -60;
            light.shadowCameraTop = -60;
            light.shadowCameraRight = 60;
            light.shadowCameraBottom = 60;
            light.shadowCameraNear = 20;
            light.shadowCameraFar = 200;
            light.shadowBias = -.0001;
            light.shadowMapWidth = light.shadowMapHeight = 2048;
            light.shadowDarkness = .7;
            scene.add( light );
        }

        function animate() {

            requestAnimationFrame( animate );

            renderer.render( scene, camera );
            scene.simulate();
        }

        function rotation()
        {
// Rotate an object around an arbitrary axis in object space
            var rotObjectMatrix;
            mesh.__dirtyRotation = true;

            function rotateAroundObjectAxis(object, axis, radians) {
                rotObjectMatrix = new THREE.Matrix4();
                rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

                object.matrix.multiply(rotObjectMatrix);

                object.rotation.setFromRotationMatrix(object.matrix);
            }

            keyboardJS.bind('left', function(e) {
                console.log("left is pressed");
                var yAxis = new THREE.Vector3(0,1,0);
                rotateAroundObjectAxis(mesh, yAxis, Math.PI / 180);
                console.log(mesh.position);
            }, function(e) {
                console.log('a is released');
            });
        }

        function movement() {
            var speed = 5;
            keyboardJS.bind('a', function(e) {
                mesh.setLinearVelocity({x: -speed, y: 0, z: 0});
                console.log(mesh.position);
            }, function(e) {
                console.log('a is released');
            });

            keyboardJS.bind('a + w', function(e) {
                mesh.setLinearVelocity({x: -speed, y: 0, z: -speed});
                console.log(mesh.position);
            }, function(e) {
                console.log('a + w is released');
            });

            keyboardJS.bind('d', function(e) {
                console.log('d is pressed');
                mesh.setLinearVelocity({x: speed, y: 0, z: 0});
                console.log(mesh.position);
            }, function(e) {
                console.log('d is released');
            });

            keyboardJS.bind('w + d', function(e) {
                mesh.setLinearVelocity({x: speed, y: 0, z: -speed});
                console.log(mesh.position);
            }, function(e) {
                console.log('w + d is released');
            });

            keyboardJS.bind('w', function(e) {
                mesh.setLinearVelocity({x: 0, y: 0, z: -speed});
                console.log(mesh.position);
            }, function(e) {
                console.log('w is released');
            });

            keyboardJS.bind('d + s', function(e) {
                mesh.setLinearVelocity({x: speed, y: 0, z: speed});
                console.log(mesh.position);
            }, function(e) {
                console.log('d + s is released');
            });

            keyboardJS.bind('a + s', function(e) {
                mesh.setLinearVelocity({x: -speed, y: 0, z: speed});
                console.log(mesh.position);
            }, function(e) {
                console.log('a + s is released');
            });

            keyboardJS.bind('s', function(e) {
                mesh.setLinearVelocity({x: 0, y: 0, z: speed});
                console.log(mesh.position);
            }, function(e) {
                console.log('s is released');
            });
        }

        function buildAxes( length ) {
            var axes = new THREE.Object3D();

            axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
            axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
            axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
            axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
            axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
            axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

            scene.add(axes);
        }

        function buildAxis( src, dst, colorHex, dashed ) {
            var geom = new THREE.Geometry(),
                mat;

            if(dashed) {
                mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
            } else {
                mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
            }

            geom.vertices.push( src.clone() );
            geom.vertices.push( dst.clone() );
            geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

            var axis = new THREE.Line( geom, mat, THREE.LinePieces );

            return axis;

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
