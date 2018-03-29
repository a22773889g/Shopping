class management_do_update_action extends ActionHandler{
    constructor(module, action, position_id,product_id){
        super(module, action);
        this.position_id = position_id;
        this.product_id= product_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('product_id', this.product_id);
        this.addArgs('product_name', $('#product_name').val());
        this.addArgs('price', $('#price').val());
        this.addArgs('stocks', $('#stocks').val());

    }
    ajax_success(xhttp){     
            status=xhttp.responseText;
            if(status==1){
                alert('修改成功');
                (new management_show_list_page('management','show_list_page','header')).run();
                
            }else{
                alert('修改失敗');
            } 
    }
}