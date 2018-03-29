<?php 
    require_once(__ROOT__ . '/include/php/action_listener.php');
    require_once(__ROOT__ . '/include/php/event_message.php');
    require_once(__ROOT__ . '/modules/member/member_model.php');
    class show_order_detail_page implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $member_model = new member_model();
            $result['product'] = $member_model->order_detail($post['order_id']);
            $check=$member_model->isship($post['order_id']);
            if($check['start_date']){
                $result['start_date']=$check['start_date'];
            }else{
                $result['start_date']=0;
            }
            if($result){
                return json_encode($result);
            }else{
                return 0;
            }
            
        }        
    }
?>