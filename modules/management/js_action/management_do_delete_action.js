class management_do_delete_action extends ActionHandler{
    constructor(module, action, position_id,product_id){
        super(module, action);
        this.position_id = position_id;
        this.product_id = product_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('product_id', this.product_id);

    }
    ajax_success(xhttp){     
            status=xhttp.responseText;
            if(status==1){
                alert('刪除成功');
                (new management_show_list_page('management','show_list_page','header')).run();
                
            }else{
                alert('刪除失敗');
            } 
    }
}