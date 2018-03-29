<?php 
    require_once 'include/php/model.php';
    class member_model extends model{
        public function __construct() {
            parent::__construct();
        }

        public function login($user,$pwd){
            $select = $this->conn-> prepare("SELECT member_name From member WHERE user = :acc AND password = :pw");
            $select -> execute(array(':acc' => $user,':pw' => $pwd));
            $result = $select -> fetch(PDO::FETCH_ASSOC);
            return $result;
        }

         public function regist($name,$user,$pwd) { 
            $check = $this->conn-> prepare("SELECT user,member_name From member WHERE user = :user OR member_name=:member_name");
            $check -> execute(array(':user' => $user,':member_name'=>$name));
            $result= $check -> fetch(PDO::FETCH_ASSOC);
            if(!$result){
                $select = $this->conn-> prepare("INSERT INTO member (member_name ,user, password) VALUES (?,?,?)");
                $select -> execute(array($name, $user , $pwd));
                return 2;
            }elseif($result['user']==$user){
                return 1;
            }else{
                return 0;
            }
        }

        public function order($user) { 
            $stmt = $this->conn -> prepare("SELECT member_id From member WHERE member_name = :user ");
            $stmt -> execute(array(':user' => $user));
            $member_id= $stmt -> fetch(PDO::FETCH_ASSOC) ;

            $select = $this->conn-> prepare("SELECT * From member_order WHERE member_id = :member_id ");
            $select -> execute(array(':member_id' => $member_id['member_id']));
            $result = $select -> fetchAll(PDO::FETCH_ASSOC) ;
            return $result;
        }

        public function order_detail($order_id) { 
            $select = $this->conn-> prepare("SELECT * From member_order_detail WHERE member_order_id = :order_id ");
            $select -> execute(array(':order_id' => $order_id));
            $result = $select -> fetchAll(PDO::FETCH_ASSOC) ;
            return $result;
        }

        public function order_delete($order_id) {
            $quantity = $this->conn-> prepare("SELECT product_name,quantity From member_order_detail WHERE member_order_id = :order_id ");
            $quantity -> execute(array(':order_id' => $order_id));
            $result = $quantity -> fetchAll(PDO::FETCH_ASSOC) ;
            foreach ($result as $item) {
                $update = $this->conn-> prepare("UPDATE product SET stocks=stocks+:qty where product_name = :name");
                $update -> execute(array(':qty'=>$item['quantity'],':name' => $item['product_name']));
            }

            $detail = $this->conn-> prepare("DELETE FROM member_order_detail WHERE member_order_id= :order_id");
            $detail -> execute(array(':order_id' => $order_id));

            $select = $this->conn-> prepare("DELETE FROM member_order WHERE member_order_id= :order_id");
            $select -> execute(array(':order_id' => $order_id));


            return 1;
        }

        public function isship($order_id) { 
            $select = $this->conn-> prepare("SELECT start_date From member_order WHERE member_order_id = :order_id ");
            $select -> execute(array(':order_id' => $order_id));
            $result = $select -> fetch(PDO::FETCH_ASSOC);
            return $result;
        }

    }
 ?>