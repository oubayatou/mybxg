<?php
    header('Content-Type:text/html;charset=utf-8');
    $file = $_FILES['myfile'];
    $name = $file['name'];
    $tmpName = $file['tmp_name'];
//    echo $name.'---'.$tmpName;
//    把临时目录的文件拷贝到当前目录
    move_uploaded_file($tmpName,'./'.$name);
    echo '<img width=50 src="'.'./'.$name.'">';
?>