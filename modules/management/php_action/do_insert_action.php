<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/management/management_model.php');
    class do_insert_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $product_name = $post['product_name'];
            $product_image = $post['product_image'];
            $price = $post['price'];
            $stocks = $post['stocks'];
            $product_image=str_replace(' ','+',$product_image);
            $management_model = new management_model();
            $result = $management_model->insert($product_name,$product_image,$price,$stocks);
            if($result==1){
                return 1;
            }
            else{
                return 0;
            }
        }        
    }
?>