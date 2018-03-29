class management_show_update_page extends ActionHandler{
    constructor(module, action, position_id,product_id,product_name,price,stocks){
        super(module, action);
        this.position_id = position_id;
        this.product_id=product_id;
        this.product_name=product_name;
        this.price=price;
        this.stocks=stocks;
    }
    prepareArgs(){
        this.php = false;
    }
    showResult(xhttp){
        const tr =  $('<tr></tr>');
        const id= $('<td></td>').text(this.product_id);
        const name=$('<td></td>').append($(`<input type=text id="product_name">`).val(this.product_name));
        const price=$('<td></td>').append($(`<input type=text id="price">`).val(this.price));
        const stocks=$('<td></td>').append($(`<input type=text id="stocks">`).val(this.stocks));
        tr.append(id,name,price,stocks);    
        $('#'+this.position_id).html(tr);
        const update=$('<button class="btn btn-lg btn-secondary btn-block"></button>');

        $('#'+this.position_id).append($('<br/>'),update.text('修改'));

        update.click(()=>{
            (new management_do_update_action('management','do_update_action','Main-body',this.product_id)).run();
        });
        this.loadModuleScript('management', "do_update_action");
       }
}