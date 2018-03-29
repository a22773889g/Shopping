<?php 
    require_once 'include/php/model.php';
    class cart_model extends model{
        var $items = array();
        var $itemqtys = array();
        public function __construct() {
            parent::__construct();
        }

        public function search_product($id)
        { 
            $stmt = $this->conn -> prepare("SELECT * From product WHERE product_id = :id") ;
            $stmt -> execute(array(':id' => $id));
            $result= $stmt -> fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        public function check_stocks($id)
        { 
            $stmt = $this->conn -> prepare("SELECT stocks From product WHERE product_id = :id") ;
            $stmt -> execute(array(':id' => $id));
            $result= $stmt -> fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        public function add_order($product,$user,$total_price,$phone,$addr)
        { 
            try {
                $stmt = $this->conn -> prepare("SELECT member_id From member WHERE member_name = :name") ;
                $stmt -> execute(array(':name' => $user));
                $member_id = $stmt -> fetch(PDO::FETCH_ASSOC);
                $uid=uniqid();
                $insert =$this->conn->prepare("INSERT INTO member_order (member_id ,name,phone,address, entrust_date,start_date,end_date,order_total,uid) VALUES (?,?,?,?,?,?,?,?,?)");
                $insert -> execute(array($member_id['member_id'], $user, $phone,$addr, date("Y-m-d"), null,null, $total_price,$uid));

                $search = $this->conn -> prepare("SELECT member_order_id From member_order WHERE uid = :uid ");
                $search -> execute(array(':uid' => $uid));
                $member_order_id= $search -> fetch(PDO::FETCH_ASSOC) ;

                foreach ($product as $item) {     
                $order =$this->conn->prepare("INSERT INTO member_order_detail (member_order_id , product_name,price,quantity,total) VALUES (?,?,?,?,?)");
                $order -> execute(array($member_order_id['member_order_id'],  $item['product_name'], $item['price'],$item['quantity'],$item['quantity']*$item['price']));
                }
                foreach ($product as $item) {
                    $qty=$item['quantity'];
                    $sql = "UPDATE product SET stocks = stocks - $qty WHERE product_name = :product_name";
                    $prepStatement = $this->conn-> prepare( $sql );
                    $prepStatement -> execute(array(':product_name' => $item['product_name']));
                }
                return 1;
            }catch (Exception $e) {
                echo $e -> getMessage();
            }  
        }

    }
 ?>