class management_show_list_page extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = true;
    }
    ajax_success(xhttp){
        const json_str = xhttp.responseText;
        let str=`
                <th scope="col">產品編號</th>
                <th scope="col">產品名稱</th>
                <th scope="col">產品售價</th>
                <th scope="col">存貨</th>
               `;
        $('#'+this.position_id).html(str);
        $('#content').html('');
        if(json_str!=0){
             const obj = JSON.parse(json_str);
             obj.forEach((order)=>{
                const tr =  $('<tr></tr>');
                const input = $(`<input type="radio" name="select" >`).val(order['product_id']);
                const id= $('<td></td>').append(input,order['product_id']);
                const name=$('<td></td>').text(order['product_name']);
                const price=$('<td></td>').text(order['price']);
                const stocks=$('<td></td>').text(order['stocks']);
                tr.append(id,name,price,stocks);
                $('#content').append(tr);
              });
             const tr =  $('<tr></tr>');
             const update = $('<button class="btn btn-lg btn-secondary btn-block"></button>');
             const del = $('<button class="btn btn-lg btn-secondary btn-block"></button>');
             update.text('修改商品');
             del.text('刪除商品');
             tr.append($('<td></td>').append(update),$('<td></td>').append(del));
             $('#content').append(tr);


             update.click(()=>{
                const selected = $("input[type='radio'][name='select']:checked");
                if (selected.length > 0) {
                    obj.forEach((order)=>{
                        if(order['product_id']==selected.val()){
                            (new management_show_update_page('management','show_update_page','content',order['product_id'],order['product_name'],order['price'],order['stocks'])).run();
                        }
                      });

                }else{
                  alert('請點選取需修改的商品');
                }
             });

             del.click(()=>{
                const selected = $("input[type='radio'][name='select']:checked");
                if (selected.length > 0) {
                    (new management_do_delete_action('management','do_delete_action','content',selected.val())).run();
                }else{
                    alert('請點選取需修改的商品');
                }

             });

             this.loadModuleScript('management', "show_update_page");
             this.loadModuleScript('management', "show_order_detail_page");
             this.loadModuleScript('management', "do_ship_action");
             this.loadModuleScript('management', "do_delete_action");
       }

    }
}