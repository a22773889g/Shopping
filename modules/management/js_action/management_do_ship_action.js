class management_do_ship_action extends ActionHandler{
    constructor(module, action, position_id,order_id){
        super(module, action);
        this.position_id = position_id;
        this.order_id= order_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('order_id', this.order_id);
    }
    ajax_success(xhttp){     
            status=xhttp.responseText;
            if(status==1){
                alert('出貨成功');
                (new management_show_order_page('management','show_order_page','header')).run();
                
            }else{
                alert('出貨失敗');
            } 
    }
}