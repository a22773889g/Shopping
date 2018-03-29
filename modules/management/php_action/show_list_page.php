<?php 
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/management/management_model.php');
    class show_list_page implements action_listener{
        public function actionPerformed(event_message $em) {
            $management_model = new management_model();
            $result = $management_model->list_prodcut();
            if($result){
                return json_encode($result);
            }else{
                return 0;
            }
            
        }        
    }
?>