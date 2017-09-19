<?php 
  $flag = $_GET['flag'];
  $cbName = $_GET['abc'];// callback名字后台一般是写死的
  // echo 'var n=123;console.log(n);';
  $arr = array('username'=>'lisi','age'=>'12','flag'=>$flag);
  $str = json_encode($arr);
  echo $cbName.'('.$str.');';// 函数调用

 ?>
