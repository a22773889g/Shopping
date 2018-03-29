<?php 
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/cart/cart_model.php');
    require_once(__ROOT__ . '/modules/cart/Cart.php');
    class show_cart_page implements action_listener{
        public function actionPerformed(event_message $em) {
            session_start();
            $cart =& $_SESSION['cart'];
            if(!is_object($cart)){
                $cart=new Cart();
            }
            $product['product']=$cart->showCart();
            if(isset($_SESSION['user'])){
                $product['status']=1;
            }else{
                $product['status']=0;
            }
            return json_encode($product);
        }        
    }
?>