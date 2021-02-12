const element = $(".section-1");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, $(window).width() / $(window).height(), 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
var light = new THREE.PointLight("#FFFFFF", 1, 1000);
var point = new THREE.Vector3(-200, -100, -1500);

camera.lookAt(point);
light.position.set(-50, 200, -300);
light.intensity = 5;
renderer.setClearColor("#000");
renderer.setSize($(window).width(), $(window).height());

scene.add(light);
element.append(renderer.domElement);

let loader = new THREE.GLTFLoader();
var model;
loader.load('/meshes/alpha.gltf', function (gltf) {
    model = gltf.scene;
    model.position.set(0, -400, -1000);
    model.rotation.x = 0.1;
    model.rotation.y = 2.8;
    model.rotation.z = 0;
    scene.add(model);
});


var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

window.addEventListener("resize", () => {
    renderer.setSize($(window).width(), $(window).height());
    camera.aspect = $(window).width() / $(window).height();
    camera.updateProjectionMatrix();
});


function sec1_moveview() {
    var modrot1 = [0.1, 2.8, 0]
    var modrot2 = [-0.4, 1.5, 0.2]
    //model.position.set(0, 0, 0);
    let scrollperc = window.scrollY / window.innerHeight * 100;
    if (scrollperc > 100) {
    scrollperc = 100
    }
        model.rotation.x = modrot1[0] + ((modrot2[0] - modrot1[0]) / 100 * scrollperc);
        model.rotation.y = modrot1[1] + ((modrot2[1] - modrot1[1]) / 100 * scrollperc);
        model.rotation.z = modrot1[2] + ((modrot2[2] - modrot1[2]) / 100 * scrollperc);
        light.intensity = 5 - 0.005 * scrollperc;
        console.log(scrollperc);
}

function fixorunfix_section1() {
    if (window.innerHeight < window.scrollY) {
        $(".section-1").css({ 'margin-top': '100vh' });
        $(".section-1").css({ 'position': 'absolute' });
    } else {
        $(".section-1").css({ 'margin-top': '0' });
        $(".section-1").css({ 'position': 'fixed' });
    }
}

function callonscroll() {
    fixorunfix_section1();
    sec1_moveview();
}

document.addEventListener("scroll", callonscroll);

$(document).ready(function () {
    callonscroll();
});