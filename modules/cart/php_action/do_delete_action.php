<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/cart/cart_model.php');
    require_once(__ROOT__ . '/modules/cart/Cart.php');
    class do_delete_action implements action_listener{
        public function actionPerformed(event_message $em) {
            session_start();
            $cart =& $_SESSION['cart'];
            $post = $em->getPost();
            $id = $post['product_id'];
            foreach ($cart->items as $item=>$val) {
                if($val['product_id']==$id){
                    unset($cart->items[$item]);
                    unset($cart->itemqtys[$id]);
                    $cart->count--;
                    return 1;
                }
            }
           
        }        
    }
?>