


function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

// 当网页加载完毕时调用
window.onload = function () {
    // 拿到所有的li标签和内容
    var lis = $('tab-header').getElementsByTagName('li');
    var contents = $('tab-content').getElementsByClassName('dom');

    // 验证
    // console.log(lis, contents);
    if (lis.length != contents.length) return ;

    // 遍历整个数组
    for (var i = 0; i < lis.length; i++) {
        // 取出每一个li标签
        var li = lis[i];
        console.log(li);

        li.id = 'tab-header-' + i;

        li.onmousemove = function () {
            // 设置当前对象的className
            for (var j=0; j<lis.length; j++) {
                // 让所有的li标签都不被选中
                lis[j].className = '';
                lis[j].style.color = 'black';
                contents[j].style.display = '';
            }
            this.className = 'selected';
            this.style.color = 'orange';
            contents[this.id.substr(11)].style.display = 'block';
        }

    }
}


// function $(id) {
//     // 类型的比较
//     return typeof id === 'string' ? document.getElementById(id) : id;
// }
//
// // 当网页加载完毕时调用
//
//
// window.onload = function () {
//     // 拿到所有的li标签和对应的内容
//     var lis = $('tab-header').getElementsByTagName('li');
//     var contents = $('tab-content').getElementsByClassName('dom');
//
//     // 验证
//     if (lis.length != contents.length) return;
//
//     // 遍历
//     for (var i = 0; i < lis.length; i++) {
//         // 取出每一个li标签
//         var li = lis[i];
//         console.log(li);
//         li.id = 'tab-header-' + i;
//
//         li.onmousemove = function () {
//
//             for (var j = 0; j < lis.length; j++) {
//                 // 让所有的li都不被选中
//                 lis[j].className = '';
//                 contents[j].style.display = 'none'
//             }
//
//             // 设置当前对象的className
//             this.className = 'selected';
//             contents[this.id].style.display = 'block';
//
//         }
//     }
//
// }