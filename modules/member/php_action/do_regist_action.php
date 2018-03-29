<?php session_start();
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/member/member_model.php');
    class do_regist_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $name = $post['name'];
            $user = $post['account'];
            $pwd  = $post['pwd'];
            $member_model = new member_model();
            $result = $member_model->regist($name,$user,$pwd);
            return $result;
        }        
    }
?>