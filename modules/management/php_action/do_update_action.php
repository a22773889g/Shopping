<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/management/management_model.php');
    class do_update_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $product_id = $post['product_id'];
            $product_name = $post['product_name'];
            $price = $post['price'];
            $stocks = $post['stocks'];
            $management_model = new management_model();
            $result = $management_model->update($product_id,$product_name,$price,$stocks);
            if($result==1){
                return 1;
            }
            else{
                return 0;
            }
        }        
    }
?>