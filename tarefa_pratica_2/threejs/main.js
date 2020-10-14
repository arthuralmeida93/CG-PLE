// Rotation around point logic
// Based on https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733

THREE.Object3D.prototype.savePosition = function() {
    return function () {
        this.__position = this.position.clone(); 
        
        return this;
    };
}();

THREE.Object3D.prototype.rotateAroundPoint = function() {
    return function (point, theta, pointIsWorld = false,
                     axis = new THREE.Vector3(0, 0, 1)) {
    // point: Vector3 -  center of rotation
    // theta: float - rotation angle (in radians)
    // pointIsWord: bool
        if(pointIsWorld){
            this.parent.localToWorld(this.position); // compensate for world coordinate
        }
    
        this.position.sub(point); // remove the offset
        this.position.applyAxisAngle(axis, theta); // rotate the POSITION
        this.position.add(point); // re-add the offset
    
        if(pointIsWorld){
            this.parent.worldToLocal(this.position); // undo world coordinates compensation
        }
    
        this.rotateOnAxis(axis, theta); // rotate the OBJECT

        return this;
    };

}();


// ThreeJS variables
var camera, scene, renderer;
// Optional (showFps)
var stats;
// Objects in Scene
var robot;

// Auxiliary function to generate rectangle
function gen_rect(width, height, color ) {
      var plane_geometry = new THREE.PlaneGeometry( width, height );
      var plane_material = new THREE.MeshBasicMaterial( {color, side: THREE.DoubleSide} );
      var plane = new THREE.Mesh(plane_geometry, plane_material);

  return plane;
}

// Auxiliary function to generate circle
function gen_circle( radius, segs = 30, color ) {
      var circle_geometry = new THREE.CircleGeometry(radius, segs);
      var circle_material = new THREE.MeshBasicMaterial( {color} );
      var circle = new THREE.Mesh(circle_geometry, circle_material);

  return circle;
}


// Auxiliary function to generate triangle
function gen_triangle( size, v1 = new THREE.Vector3(-1, 0, 0), v2 = new THREE.Vector3(1, 0, 0), v3 = new THREE.Vector3(-1, 1, 0) ) {
    var triangle_geometry = new THREE.Geometry();
    var triangle = new THREE.Triangle(v1, v2, v3);
    var normal = triangle.normal();
    triangle_geometry.vertices.push(triangle.a);
    triangle_geometry.vertices.push(triangle.b);
    triangle_geometry.vertices.push(triangle.c);
    triangle_geometry.faces.push(new THREE.Face3(0, 1, 2, normal));
    var triangle = new THREE.Mesh(triangle_geometry, new THREE.MeshNormalMaterial());
    
    triangle.size = size;

    return triangle;
}

function init() {
    // Canvas height/width
    var width = 50;
    var height = 30;
    // Setting up camera
    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0, 2 );
    camera.lookAt( 0, 0, -1);
    camera.position.z = 1;

    // Setting up scene
    scene = new THREE.Scene();
    robot = gen_robot();
    scene.add(robot);

    // Setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    window.addEventListener('resize', onWindowResize, false);
    /* renderer.setViewport( vpXmin, vpYmin, vpXwidth, vpYheight );  Unused */ 
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Adding both renderer and stats to the Web page
    stats = new Stats();
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);

    // Adding listener for keydown 
    document.addEventListener("keydown", onDocumentKeyDown, false);

    // Saving initial position (necessary for rotation solution)
    scene.traverse( function( node ) {
        if ( node instanceof THREE.Object3D ) {
            node.savePosition();
        }
    
    } );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    /* renderer.setViewport( vpXmin, vpYmin, vpXwidth, vpYheight ); Unused */
    renderer.setSize(window.innerWidth, window.innerHeight);
    
}

controlKey = null;

function onDocumentKeyDown(event) {
    // One for Hand wave, Two for your Custom Animation #2 and Three - Your Custom Animation #3
    switch(event.key) {
        case '1':
            return controlKey = '1';
        case '2':
            return controlKey = '2';
        case '3':
            return controlKey = '3';
        default:
            return controlKey = null;
  }
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

    //
    // // wave
    // if (controlKey === '1') {
    //
    //     var right_upper_arm_rot_pt;
    //
    //     var right_upper_arm = ((robot.getObjectByName("right_upper_arm")));

    //
    //     right_upper_arm.rotateAroundPoint(right_upper_arm_rot_pt, 0.02);
    //
    //     var right_lower_arm_rot_pt;
    //
    //     var right_lower_arm = ((robot.getObjectByName("right_upper_arm")).getObjectByName("lower_arm"));
    //     right_lower_arm_rot_pt = new THREE.Vector3
    //     (
    //         (0) / 2,
    //         (right_lower_arm.__position.y) / 1.6,
    //         0
    //     );
    //     right_lower_arm.rotateAroundPoint(right_lower_arm_rot_pt, 0.005);
    //
    //     var right_hand_rot_pt;
    //
    //     var right_hand = (right_lower_arm.getObjectByName("hand"));
    //     right_hand_rot_pt = new THREE.Vector3
    //     (
    //         (0) / 2,
    //         (right_lower_arm.__position.y) / 1.6,
    //         0
    //     );
    //     right_hand.rotateAroundPoint(right_hand_rot_pt, 0.005);
    // }
    // // fly
    // if (controlKey === '2') {
    // }
    //
    // // jumping jack
    // if (controlKey === '3') {
    // }

function animate() {
    requestAnimationFrame(animate);

    var right_upper_arm = ((robot.getObjectByName("right_upper_arm")));
    let right_upper_arm_rot_pt = new THREE.Vector3
    (
        (right_upper_arm.geometry.parameters.width + right_upper_arm.__position.x) / 1.6,
        (right_upper_arm.geometry.parameters.height + right_upper_arm.__position.y) / 1.8,
        0
    );
    new TWEEN.Tween( right_upper_arm.rotation ).to( {  z:135}, 1500).start();

    // right_upper_arm.rotateAroundPoint(right_upper_arm_rot_pt, 0.02);


    render();
    stats.update();


}

function render() {
    TWEEN.update();
    renderer.render(scene, camera);
}



init();
animate();

