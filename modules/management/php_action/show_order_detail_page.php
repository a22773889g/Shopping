<?php 
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/management/management_model.php');
    class show_order_detail_page implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $management_model = new management_model();
            $result['product'] = $management_model->order_detail($post['order_id']);
            $check= $management_model->isship($post['order_id']);
            if($check['start_date']){
                $result['start_date']=$check['start_date'];
            }else{
                $result['start_date']=0;
            }
            if($result['product']){
                return json_encode($result);
            }else{
                return 0;
            }
            
        }        
    }
?>