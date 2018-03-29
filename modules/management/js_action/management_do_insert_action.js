class management_do_insert_action extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('product_name', $('#product_name').val());
        this.addArgs('product_image', $('#img').attr('src'));
        this.addArgs('price', $('#price').val());
        this.addArgs('stocks', $('#stocks').val());

    }
    ajax_success(xhttp){     
            status=xhttp.responseText;
            if(status==1){
                alert('新增成功');
                (new management_show_list_page('management','show_list_page','header')).run();
                
            }else{
                alert('新增失敗');
            } 
    }
}