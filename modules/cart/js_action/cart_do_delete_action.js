class cart_do_delete_action extends ActionHandler{
    constructor(module, action, position_id, product_id){
        super(module, action);
        this.position_id = position_id;
        this.product_id = product_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('product_id', this.product_id);
    }
    ajax_success(xhttp){
            const status = xhttp.responseText;
            if(status==1){
              (new cart_show_cart_page('cart','show_cart_page','Main-body')).run();
            }else{
              alert('刪除失敗');
            }

    }
}