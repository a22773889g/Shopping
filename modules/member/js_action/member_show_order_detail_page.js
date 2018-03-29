class member_show_order_detail_page extends ActionHandler{
    constructor(module, action, position_id, order_id){
        super(module, action);
        this.position_id = position_id;
        this.order_id = order_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('order_id', this.order_id);
    }
    ajax_success(xhttp){
        const json_str = xhttp.responseText;
        let str=`
            <header>
              <div class="navbar navbar-dark bg-dark">
                <div class="container d-flex justify-content-between">
                  <a href="javascript:window.onload=(new home_show_index_page('home','show_index_page','Main-body')).run()" class="navbar-brand">首頁</a>
                </div>
              </div>
            </header>
            <br/>
                <div class="container">
                   <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">產品名稱</th>
                          <th scope="col">金額</th>
                          <th scope="col">數量</th>
                          <th scope="col">小計</th>
                          <th scope="col">出貨狀態</th>
                          <th scope="col">出貨日期</th>
                        </tr>
                      </thead>
                      <tbody id='content'>
                        
                      </tbody>
                    </table>
                    <br/>
                      <button class="btn btn-primary" onclick="(new member_show_order_page('member','show_order_page','Main-body')).run()">訂單首頁</button>
                </div>
               `;
        $('#'+this.position_id).html(str);
        if(json_str!=0){
        const obj = JSON.parse(json_str);
         obj['product'].forEach((order)=>{
            const tr =  $('<tr></tr>');
            const name= $('<td></td>').text(order['product_name']);
            const price=$('<td></td>').text(order['price']);
            const quantity=$('<td></td>').text(order['quantity']);
            const subtotal=$('<td></td>').text(order['price']*order['quantity']);
            const status=$('<td></td>')
            const date=$('<td></td>')
            if(obj['start_date']){
              status.text('已出貨');
              date.text(obj['start_date']);
            }else{
              status.text('待出貨');
              date.text('---');
            }
            tr.append(name,price,quantity,subtotal,status,date);
            $('#content').append(tr);
          });
       }

    }
}