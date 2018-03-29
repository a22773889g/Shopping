class member_show_order_page extends ActionHandler{
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
            <header>
              <div class="navbar navbar-dark bg-dark">
                <div class="container d-flex justify-content-between">
                  <a href="javascript:window.onload=(new home_show_index_page('home','show_index_page','Main-body')).run()" class="navbar-brand">首頁</a>
                </div>
              </div>
            </header>
            <br/>
                <div class="container">
                  <main role="main">
                    <div class="jumbotron">
                      <div class="col-sm-8 mx-auto">
                        <h1>訂單資料</h1>
                        <p>親愛的 會員 您好，</br> 這是您的交易記錄清單：<br/>本頁面提供您的訂單消費記錄，如需更詳細的消費記錄，請點選查詢明細，可查詢訂單明細</p>            
                      </div>
                    </div>
                  </main>
                  <br/>
                   <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">訂單編號</th>
                          <th scope="col">訂購日期</th>
                          <th scope="col">結帳金額</th>
                          <th scope="col">取貨方式</th>
                          <th scope="col">訂單明細</th>
                          <th scope="col">取消訂單</th>
                        </tr>
                      </thead>
                      <tbody id='content'>
                        
                      </tbody>
                    </table>
                </div>
               `;
        $('#'+this.position_id).html(str);
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
            const cancel=$('<button class="btn btn-danger"></button>')
            const change=$('<td></td>').append(cancel);
            tr.append(id,entrust_date,order_total,method,detail,change);
            $('#content').append(tr);
            search.click(()=>{
               (new member_show_order_detail_page('member','show_order_detail_page','Main-body',order['member_order_id'])).run();
            });
            if(order['start_date']){
                cancel.text('---');
            }else{
                cancel.text('取消');
                cancel.click(()=>{
                  (new member_do_order_delete_action('member','do_order_delete_action','Main-body',order['member_order_id'])).run();
                });
            }


          });
         this.loadModuleScript('member', "show_order_detail_page");
         this.loadModuleScript('member', "do_order_delete_action");
       }

    }
}