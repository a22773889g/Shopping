class member_do_order_delete_action extends ActionHandler{
    constructor(module, action, position_id,order_id){
        super(module, action);
        this.position_id = position_id;
        this.order_id = order_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('order_id', this.order_id);
    }
    ajax_success(xhttp){     
            status=xhttp.responseText;
            if(status==1){
                alert('訂單已取消');
                (new member_show_order_page('member','show_order_page','Main-body')).run();
            }else{
                 alert('取消失敗');
            }
    }
}
