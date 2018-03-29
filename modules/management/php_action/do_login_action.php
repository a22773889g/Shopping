<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/management/management_model.php');
    class do_login_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $user = $post['Account'];
            $pwd = $post['Password'];
            $management_model = new management_model();
            $result = $management_model->login($user,$pwd);
            if($result){
            	return 1;
            }
            else{
            	return 0;
            }
        }        
    }
?>