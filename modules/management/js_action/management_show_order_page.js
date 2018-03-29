class management_show_order_page extends ActionHandler{
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
                <th scope="col">訂單編號</th>
                <th scope="col">訂購日期</th>
                <th scope="col">結帳金額</th>
                <th scope="col">取貨方式</th>
                <th scope="col">訂單明細</th>
                <th scope="col">變更狀態</th>
               `;
        $('#'+this.position_id).html(str);
        $('#content').html('');
        if(json_str!=0){
        const obj = JSON.parse(json_str);
         obj.forEach((order)=>{
            const tr =  $('<tr></tr>');
            const id= $('<td></td>').text(order['member_order_id']);
            const entrust_date=$('<td></td>').text(order['entrust_date']);
            const order_total=$('<td></td>').text(order['order_total']);
            const method=$('<td></td>').text('貨到付款');
            const search=$('<button class="btn btn-primary"></button>').text('查詢明細');
            const detail=$('<td></td>').append(search);
            const ship=$('<button class="btn btn-danger"></button>')
            if(order['start_date']){
              ship.text('---');
            }else{
               ship.text('出貨');
               ship.click(()=>{
                  (new management_do_ship_action('management','do_ship_action','Main-body',order['member_order_id'])).run();
              });
            }
            const change=$('<td></td>').append(ship);
            tr.append(id,entrust_date,order_total,method,detail,change);
            $('#content').append(tr);
            search.click(()=>{
               (new management_show_order_detail_page('management','show_order_detail_page','header',order['member_order_id'])).run();
            });
          });
         this.loadModuleScript('management', "show_order_detail_page");
         this.loadModuleScript('management', "do_ship_action");
       }

    }
}