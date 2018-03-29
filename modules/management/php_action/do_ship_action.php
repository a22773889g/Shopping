<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/management/management_model.php');
    class do_ship_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $order_id = $post['order_id'];
            $management_model = new management_model();
            $result = $management_model->ship($order_id);
            if($result==1){
            	return 1;
            }
            else{
            	return 0;
            }
        }        
    }
?>