<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/member/member_model.php');
    class do_order_delete_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();

            $member_model = new member_model();
            $result = $member_model->order_delete($post['order_id']);
            return $result;
        }        
    }
?>