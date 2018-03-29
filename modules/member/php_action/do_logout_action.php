<?php session_start();
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    
    class do_logout_action implements action_listener{
        public function actionPerformed(event_message $em) {
            unset($_SESSION['user']);
            return 1;
        }        
    }
?>