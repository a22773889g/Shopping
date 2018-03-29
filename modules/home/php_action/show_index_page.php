<?php
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/home/home_model.php');
    class show_index_page implements action_listener{
        public function actionPerformed(event_message $em) {
            $home = new home_model();
            $return = $home->check();
            $return['product'] = $home->show();
            return json_encode($return);
        }
    }
?>