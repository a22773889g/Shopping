<?php
    require_once 'include/php/model.php';
    class management_model extends model{
        public function __construct() {
            parent::__construct();
        }


        public function login($user,$pwd){
            $select = $this->conn-> prepare("SELECT * From employee WHERE user = :acc AND password = :pw");
            $select -> execute(array(':acc' => $user,':pw' => $pwd));
            $result = $select -> fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        public function order() { 
            $select = $this->conn-> prepare("SELECT * From member_order");
            $select -> execute();
            $result = $select -> fetchAll(PDO::FETCH_ASSOC) ;
            return $result;
        }

        public function order_detail($order_id) { 
            $select = $this->conn-> prepare("SELECT * From member_order_detail WHERE member_order_id = :order_id ");
            $select -> execute(array(':order_id' => $order_id));
            $result = $select -> fetchAll(PDO::FETCH_ASSOC) ;
            return $result;
        }

         public function ship($order_id) { 
            $select = $this->conn-> prepare("UPDATE member_order set start_date = :day WHERE member_order_id = :order_id ");
            $select -> execute(array(':day'=> date("Y-m-d"),':order_id' => $order_id));
            return 1;
        }

        public function isship($order_id) { 
            $select = $this->conn-> prepare("SELECT start_date From member_order WHERE member_order_id = :order_id ");
            $select -> execute(array(':order_id' => $order_id));
            $result = $select -> fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        public function list_prodcut() { 
            $select = $this->conn-> prepare("SELECT * From product");
            $select -> execute();
            $result = $select -> fetchAll(PDO::FETCH_ASSOC) ;
            return $result;
        }

        public function update($product_id,$product_name,$price,$stocks) { 
            $select = $this->conn-> prepare("UPDATE product set product_name =:product_name ,price=:price,stocks = :stocks WHERE product_id = :product_id ");
            $select -> execute(array(':product_name' => $product_name,':price' => $price,':stocks' => $stocks,':product_id' => $product_id));
            return 1;
        }

        public function insert($product_name,$product_image,$price,$stocks) { 
            try {
                 $insert =$this->conn->prepare("INSERT INTO product (product_name,product_image,price,stocks) VALUES (?,?,?,?)");
            $insert -> execute(array($product_name, $product_image, $price,$stocks));
                
            } catch (Exception $e) {
                echo $e->getMessage();
            }
           
            return 1;

        }

         public function delete($product_id) { 
            $select = $this->conn-> prepare("DELETE FROM product WHERE product_id= :product_id");
            $select -> execute(array(':product_id' => $product_id));
            return 1;
        }

    }
 ?>