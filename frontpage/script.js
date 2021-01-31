const element = $(".section-1");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, $(window).width() / $(window).height(), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
var light = new THREE.PointLight("#FFFFFF", 1, 1000);

light.position.set(-50, 200, -200);
light.intensity = 10;
renderer.setClearColor("#1e272e");
renderer.setSize($(window).width(), $(window).height());

scene.add(light);
element.append(renderer.domElement);

let loader = new THREE.GLTFLoader();
loader.load('/meshes/alpha.gltf', function (gltf) { gltf.scene.position.set(-250, -200, -1000); scene.add(gltf.scene); });

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

}

function fixorunfix_section1() {
    if (window.innerHeight * 1 < window.scrollY) {
        $(".section-1").css({ 'margin-top': '100vh' });
        $(".section-1").css({ 'position': 'inherit' });
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