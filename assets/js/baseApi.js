//注意每次调用$.get/ajax/post之前都会调用ajaxPrefliter这个函数，在函数中我们可以拿到Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})