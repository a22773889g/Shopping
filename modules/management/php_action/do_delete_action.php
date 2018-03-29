<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/management/management_model.php');
    class do_delete_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $product_id = $post['product_id'];
            $management_model = new management_model();
            $result = $management_model->delete($product_id);
            if($result==1){
            	return 1;
            }
            else{
            	return 0;
            }
        }        
    }
?>