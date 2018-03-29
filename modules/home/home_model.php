<?php session_start();
    require_once 'include/php/model.php';
    class home_model extends model{
        public function __construct() {
            parent::__construct();
        }

        public function show(){
            $select = $this->conn->query("SELECT * From product");
            $result = $select ->fetchAll();
            $product=array();
            foreach ($result as $item) {
                $product[]=array(
                    'product_id'=>$item['product_id'],
                    'product_name'=>$item['product_name'],
                    'product_image'=>$item['product_image'],
                    'price'=>$item['price'],
                );
            }
            return $product;
        }

        public function check(){
            if(isset($_SESSION['user']))
            {
                    $return_value['status']='登出';
                    $return_value['message']="您好，您已登入 ".$_SESSION['user'];
                    $return_value['function']="1";
            } else{
                    $return_value['status']='登入';
                    $return_value['message']="Hi, 訪客 您好!";
                    $return_value['function']="0";
            
            }
            return $return_value;
        }

    }
 ?>