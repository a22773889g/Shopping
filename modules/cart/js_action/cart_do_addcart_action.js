class cart_do_addcart_action extends ActionHandler{
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
            const json_str = xhttp.responseText;
            const result =JSON.parse(json_str);
            if(result['status']==1){
              alert('加入成功');
            }else if(result['status']==2){
              alert('存貨不足，請購買其他項');
            }else if(result['status']==3){
                alert(`存貨不足，最多只能買${result['qty']}個`);
            }else{
                alert('加入失敗');
            }

    }
}