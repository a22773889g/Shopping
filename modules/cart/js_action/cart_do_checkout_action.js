class cart_do_checkout_action extends ActionHandler{
    constructor(module, action, position_id,total_price,phone,addr){
        super(module, action);
        this.position_id = position_id;
        this.total_price = total_price;
        this.phone = phone;
        this.addr = addr;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('total_price',this.total_price);
        this.addArgs('phone',this.phone);
        this.addArgs('addr',this.addr);
    }
    ajax_success(xhttp){
            const status = xhttp.responseText;
            if(status==1){
              alert('訂單成功');
              (new home_show_index_page('home','show_index_page','Main-body')).run();
            }else{
              alert('訂單失敗');
            }

    }
}