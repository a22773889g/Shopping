class cart_do_update_action extends ActionHandler{
    constructor(module, action, position_id,product_id, qty){
        super(module, action);
        this.position_id = position_id;
        this.product_id = product_id;
        this.qty = qty;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('product_id', this.product_id);
        this.addArgs('qty', this.qty);
    }
    ajax_success(xhttp){
            const json_str = xhttp.responseText;
            const result =JSON.parse(json_str);
            if(result['status']==1){
              (new cart_show_cart_page('cart','show_cart_page','Main-body')).run();
            }else if(result['status']==0){
              alert(`庫存最多只能買${result['qty']}個`);
              (new cart_show_cart_page('cart','show_cart_page','Main-body')).run();
            }else{
              alert('修改失敗');
            }
    }
}