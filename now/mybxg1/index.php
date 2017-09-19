<?php
    header('Content-Type:text/html;charset=utf-8');
    //根据URL返回响应的页面
    /* 后台路由 */
    /* 根据url中的特征判断用户想访问哪个页面 */
    //include('./view/main/index.html');
    //include作用是嵌入页面
    //var_dump($_SERVER);
    //'PATH_INFO' => string '/view/main/indexl' (length=17)
    /* $_SERVER是php的全部数组对象，其中的PATH_INFO是记录url域名后的信息的 */
    /* 我们可以通过$_SERVER来获取url的信息，判断用户要访问哪个页面 */
    /* 设置默认的目录 */
    $dir = 'main';
    /* 设置默认的文件名称 */
    $fileName = 'index';
    /* 判断$_SERVER中是否存在PATH_INFO */
    if(array_key_exists('PATH_INFO',$_SERVER)){
        /* 路径存在 */
        $path = $_SERVER['PATH_INFO'];
        /* 截取出其中的目录和文件名 */
        $str = substr($path,1);
        /* 分割字符串 */
        $relArr = explode('/',$str);
        if(count($relArr)==2){
            /* 有两层路径 */
            /* 覆盖默认路径 */
            $dir = $relArr[0];
            /* 覆盖默认文件名 */
            $fileName = $relArr[1];
        }else{
            /*有一层路径 其他情况都跳转到登录页 */
            $fileName = 'login';
        }
    }
    /* 嵌入子页面 */
    include('./view/'.$dir.'/'.$fileName.'.html');
?>
