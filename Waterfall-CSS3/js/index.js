function $(id) {
    return typeof id === 'string'?document.getElementById(id):id;
}

// 当网页加载完毕
window.onload = function () {
    // 瀑布流布局
    waterFall('main', 'box');
    // 滚动加载盒子
    window.onscroll = function (ev) {
        // 条件
        if (cheackWillLoad()) {
            // 造数据
            var data = {'dataImg':[{'img':'1.jpg'}, {'img':'19.jpg'}, {'img':'14.jpg'}, {'img':'16.jpg'}, {'img':'17.jpg'}, {'img':'13.jpg'}, {'img':'15.jpg'}, {'img':'18.jpg'}, {'img':'12.jpg'}]}


            // 加载数据
            for (var i=0; i < data.dataImg.length; i++) {
                // 创建盒子
                var newBox = document.createElement('div');
                newBox.className = 'box';
                // 添加盒子
                $('main').appendChild(newBox);

                // 创建里面的盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);

                // 创建图片
                var newImg = document.createElement('img');
                newImg.src = 'imgs/' + data.dataImg[i].img;
                newPic.appendChild(newImg);

            }
        }

        waterFall('main', 'box');

    }
}

// 实现瀑布流布局
function waterFall(parent, son) {
    // 1 父盒子居中
    // 1.1 拿到所有的子盒子
    var allBox = $(parent).getElementsByClassName(son);
    // 1.2 取出一个盒子的宽度
    var boxWidht = allBox[0].offsetWidth;
    // 1.3 求出浏览器的宽度
    var screenWidth = document.body.offsetWidth;
    // 1.4 求出列数
    var cols = Math.floor(screenWidth / boxWidht);
    // 1.5 父标签居中
    $(parent).style.width = boxWidht * cols + 'px';
    // $(parent).style.margin = '0 auto';
    $(parent).style.textAlign = 'center';

    // 2 子盒子定位
    // 2.1 高度数组
    var boxHeightArr = [];
    // 2.2 放入高度数组
    for (var i = 0; i < allBox.length; i++) {
        // 2.2.1 求出单个盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        if (i < cols) {  // 第一行中的盒子
            boxHeightArr.push(boxHeight);
        } else { // 需要定位的盒子
            // 2.2.2 求出最矮盒子的高度
            var minBoxHeight = Math.min.apply(this, boxHeightArr);
            // 2.2.3 求出最矮盒子的索引
            var minBoxIndex  = getMinBoxIndex(minBoxHeight, boxHeightArr);
            // 2.2.4 盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.top  = minBoxHeight + 'px';
            allBox[i].style.left = minBoxIndex * boxWidht + 'px';
            // 2.2.5 更新数组中盒子的高度
            boxHeightArr[minBoxIndex] += boxHeight;
        }
    }
}

// 取出最矮盒子对应的索引
function getMinBoxIndex(val, heightArr) {
    for (var i = 0 in heightArr) {
        if (val == heightArr[i])
            return i;
    }
}


// 判断是否符合加载条件
function cheackWillLoad() {
    // 取出所有的盒子
    var allBox = $('main').getElementsByClassName('box');
    // 取出最后一个盒子
    var lastBox = allBox[allBox.length-1];
    // 求出最后一个盒子高度的一半 + 头部偏离位置
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
    // 求出浏览器的高度 标准模式 和 混杂模式
    // var screenHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
    var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
    // 求出屏幕偏移量
    var scrollTopHeight = document.body.scrollTop;

    // 判断
    return lastBoxDis <= screenHeight + scrollTopHeight;
}