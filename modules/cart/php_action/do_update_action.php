<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/cart/cart_model.php');
    require_once(__ROOT__ . '/modules/cart/Cart.php');
    class do_update_action implements action_listener{
        public function actionPerformed(event_message $em) {
            session_start();
            $cart =& $_SESSION['cart'];
            $post = $em->getPost();
            $id = $post['product_id'];
            $qty = $post['qty'];
            $model = new cart_model();
            $stocks=$model->check_stocks($id);
            if($qty<=$stocks['stocks']){
                foreach ($cart->items as $item=>$val) {
                    if($val['product_id']==$id){
                        $cart->itemqtys[$id]=$qty;
                        $result['status']=1;
                        return json_encode($result);
                    }
                }
            }else{
                $result['status']=0;
                $result['qty']=$stocks['stocks'];
                $cart->itemqtys[$id]=$stocks['stocks'];
                return json_encode($result);
            }
           
        }        
    }
?>