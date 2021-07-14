$(function() {
    //点击去注册账号的链接
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [/^[\S]{6,12}$/,
                '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次输入不一致'
                }
            }
        })
        //监听表单提交事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault() //阻止默认行为
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link-login').click()

        })

    })
    $('#form-login').submit(function(e) {
        e.preventDefault() //阻止默认提交行为
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(), //快速获取表单中的数据
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    //将得到的token值保存起来
                localStorage.setItem('token', res.token)
                    //返回到主页
                location.href = '/index.html'
            }
        })
    })
})