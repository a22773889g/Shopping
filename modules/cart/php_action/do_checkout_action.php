<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/cart/cart_model.php');
    require_once(__ROOT__ . '/modules/cart/Cart.php');
    class do_checkout_action implements action_listener{
        public function actionPerformed(event_message $em) {
            session_start();
            $cart =& $_SESSION['cart'];
            $post = $em->getPost();

            $model = new cart_model();
            $product = $cart->showCart();
            $status=$model->add_order($product,$_SESSION['user'],$post['total_price'],$post['phone'],$post['addr']);
            unset($_SESSION['cart']);
            return $status;
        }        
    }
?>