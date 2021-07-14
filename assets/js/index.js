$(function() {
        //调用获取用户基本信息
        getUserinfo()
        $('#btnlogout').on('click', function() {
            //提示用户是否退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                //清空本地存储中的token，重新跳转到登录页面
                localStorage.removeItem('token')
                location.href = '/login.html'

                layer.close(index);
            });
        })
    })
    //获取用户基本信息
function getUserinfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        //请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar渲染用户的头像
            renderAvater(res.data)

        },
        //不论时成功还是失败，都会调用complete函数
        complete: function(res) {
            console.log('执行了回调');
            //在complete里面通过res.responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //1.强制清楚token
                localStorage.removeItem('token')
                    //2.强制跳转到登录页面
                location.href('/login.html')

            }


        }
    })
}
//渲染用户头像

function renderAvater(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
        //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        // 渲染文本图像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}