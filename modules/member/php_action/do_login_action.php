<?php session_start();
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/member/member_model.php');
    class do_login_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $user = $post['Account'];
            $pwd = $post['Password'];
            $member_model = new member_model();
            $result = $member_model->login($user,$pwd);
            if($result){
                $_SESSION['user'] = $result['member_name'];
            	return 1;
            }
            else{
            	return 0;
            }
        }        
    }
?>