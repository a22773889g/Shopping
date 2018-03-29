<?php 
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/member/member_model.php');
    class show_order_page implements action_listener{
        public function actionPerformed(event_message $em) {
            session_start();
            $user = $_SESSION['user'];
            $member_model = new member_model();
            $result = $member_model->order($user);
            if($result){
                return json_encode($result);
            }else{
                return 0;
            }
            
        }        
    }
?>