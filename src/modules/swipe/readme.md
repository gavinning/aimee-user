# Swipe

<a href="https://github.com/thebird/swipe" target="_blank">Swipe Github</a>  

本模块基于Swipe@2.0优化版制作，详细Api文档请访问<a href="https://github.com/thebird/swipe" target="_blank">[Swipe]</a>  
功能和 [Swiper](https://github.com/Aimeejs/swiper) 类似，区别在于```Swipe```更轻量，未压缩版只有19KB，但功能不如```Swiper```丰富  
追求极致性能的webapp ```Swipe```是你的选择，追求极致功能的客户端```Swiper```是你的选择

#### Install
```
aimee i swipe
```

### Register
```javascript
// init.js 注册到全局模块
aimee.reg('swipe');
```

#### Example
Dom上的类，为了可以和```Swiper```无缝切换，已和```Swiper```统一，请以下面示例为准，样式已经打包到模块，无需自己手动添加
```html
<div class="swiper-container">
	<div class="swiper-wrapper">
		<div class="swiper-slide">
			<img src="images/1.jpg", alt="">
		</div>
		<div class="swiper-slide">
			<img src="images/2.jpg", alt="">
		</div>
		<div class="swiper-slide">
			<img src="images/3.jpg", alt="">
		</div>
	</div>
</div>
```

因为此模块涉及到尺寸位置计算，所以需要在```page```或者```app```渲染到浏览器之后调用，  
Aimeejs app内应该在 ```app.pagerender``` 方法之内调用，  
Aimeejs page内应该在 ```page.postrender``` 方法之内调用
```javascript
$('.swiper-container').swipe()
```

or
```javascript
$('.swiper-container').swipe({
	// 设定初始化时slide的索引，默认为0
	startSlide: 0,

	// 滑动速度，即slider自动滑动开始到结束的时间（单位ms）
	speed: 400,

	// 自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
	auto: false,

	// 是否开启循环
	continuous: true,

	// 是否禁用滚动条
	disableScroll: false,

	// 是否阻止冒泡
	stopPropagation: false,

	// 滑动后回调
	callback: function(index, elem) {},

	// 动画停止后回调
	transitionEnd: function(index, elem) {}
})
```