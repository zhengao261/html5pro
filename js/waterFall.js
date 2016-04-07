window.onload = function () {
    //script引入在head中,使页面在js完全加载完的时候才渲染完成
    waterFall('main','box');
    var dataInt = {"data":[{"src":"waterFallImages/0.jpg"},{"src":"waterFallImages/1.jpg"},{"src":"waterFallImages/2.jpg"}]};
    window.onscroll = function() {
        if(checkScrollSlide()){
            var oParent = document.getElementById('main');
            for(var i =0;i<dataInt.data.length;i++) {
                var oBox = document.createElement('div');
                oBox.className = "box";
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = "pic";
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterFall('main','box');
        }
    }

};
//根据class获取元素
function getByClass(parent,clsName) {
    var boxArr = new Array(), // 用来存储所有class为box的元素
        oElements = parent[0].getElementsByTagName('*') || parent.getElementsByTagName('*'); // 获取父元素下的所有子元素

    for(var i=0;i<oElements.length;i++){
        if (oElements[i].className == clsName){
            boxArr.push(oElements[i]); // 将子元素中className == 你想要的className的元素添加到数据的最后.
        }
    }
    return boxArr;
}
//获取数组中最小值的索引
function getMinHIndex(arr,val){
    for(var i in arr ) {
        if(arr[i] == val){
            return i ;
        }
    }
}


function waterFall(parent,box) {
    //将所有main下的class为box的div取出来然后处理
    var oParent = document.getElementsByClassName(parent);//取出父级
    var oBoxs = getByClass(oParent,box); // getByClass() 函数是用来取得父元素下的class为box的DOM,oBoxs数组存放的是
    //计算整个页面的列数(页面宽度/box宽度)
    var boxWidth = oBoxs[0].offsetWidth; // 每个数据块的宽度包括边距
    var colsTemp = document.documentElement.clientWidth / boxWidth; // 得出列数
    var cols = Math.floor(colsTemp); // 取整列数
    //重点1:***设置main的宽度,对齐方式***
    oParent[0].style.cssText = 'width:'+boxWidth * cols+'px;margin:0 auto'; // main宽度等于列数*每个块的宽度
    //重点2:***图片的定位方法:从第二行开始,图片出现在高度最小的图片下方.
    var hArr = new Array(); // hArr 存放每一列的高度

    for(var i =0;i<oBoxs.length;i++){
        if(i < cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else {
            var minH = Math.min.apply(null,hArr); // 求
            var index = getMinHIndex(hArr,minH);
            oBoxs[i].style.position = "absolute";
            oBoxs[i].style.top = minH+'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }
    //console.log(hArr);
    //console.log(minH);
    //console.log(index);


}
function checkScrollSlide() {
    //检查是否需要滚动加载(最后数据块到顶端的距离小与滚动条滚动的距离+页面的高度)
    var oParent = document.getElementsByClassName('main');//取出父级
    var oBoxs = getByClass(oParent,'box');
    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);//最后的数据块到页面开始顶端的距离
    var scrollTop = document.body.scrollTop ||document.documentElement.scrollTop; // 滚动条滚动的距离
    var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
    console.log(lastBoxH);
    console.log(scrollTop);
    return (lastBoxH < scrollTop + clientHeight ? true : false );


}


