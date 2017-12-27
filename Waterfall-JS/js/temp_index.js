function $(id) {
    return typeof id === 'string' ? document.getElementById(id) ? id;
}

window.onload = function (ev) {
    waterFall1('main', 'box')
    var a = document.createElement('input');
    window.appendChild(a);
}

function waterFall1(parent, box) {


}