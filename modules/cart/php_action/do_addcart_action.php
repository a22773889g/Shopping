<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/cart/cart_model.php');
    require_once(__ROOT__ . '/modules/cart/Cart.php');
    class do_addcart_action implements action_listener{
        public function actionPerformed(event_message $em) {
            session_start();
            $cart =& $_SESSION['cart'];
            if(!is_object($cart)){
                $cart=new Cart();
            }
            $model = new cart_model();
            $post = $em->getPost();
            $id = $post['product_id'];
            $stocks=$model->check_stocks($id);
            if($stocks['stocks']==0){
                $result['status']=2;
                return json_encode($result);
            }
            if(isset($cart->itemqtys[$id])){
                if($cart->itemqtys[$id]==$stocks['stocks']){
                    $result['status']=3;
                    $result['qty']=$stocks['stocks'];
                    return json_encode($result);
                }
            }
            $prodcut = $model->search_product($id);
            $result['status']=$cart->add_item($prodcut,$id);
            return json_encode($result);
        }        
    }
?>