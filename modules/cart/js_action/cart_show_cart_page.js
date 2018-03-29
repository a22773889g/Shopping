class cart_show_cart_page extends ActionHandler{
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
                <div class="container" id="cart">
                   <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">商品圖</th>
                          <th scope="col">商品名稱</th>
                          <th scope="col">商品售價</th>
                          <th scope="col">數量</th>
                          <th scope="col">小計</th>
                          <th scope="col">變更</th>
                        </tr>
                      </thead>
                      <tbody id='content'>
                        
                      </tbody>
                    </table>
                </div>
               `;  

        $('#'+this.position_id).html(str);
        const obj = JSON.parse(json_str);
        let total_price=0,total_qty=0;
        if(obj['product']!=0){
          obj['product'].forEach((product)=>{
            const tr =  $('<tr></tr>');
            const image= $('<td></td>').append($('<img height="150" width="150">').attr('src',product['product_image']));
            const name= $('<td></td>').text(product['product_name']);
            const price= $('<td></td>').text(product['price']);

            const input=$('<input type="text" maxlength="2" style="width:27px;">').val(product['quantity']);
            const qty= $('<td></td>').append(input);


            const subtotal=$('<td></td>').text(product['quantity']*product['price']);
            const button=$('<button class="btn btn-danger"></button>').text('取消');
            const change=$('<td></td>').append(button);
            tr.append(image,name,price,qty,subtotal,change);
            $('#content').append(tr);

            input.blur(()=>{
              (new cart_do_update_action('cart','do_update_action','Main-body',product['product_id'],input.val())).run();
            });

            button.click(()=>{
              (new cart_do_delete_action('cart','do_delete_action','Main-body',product['product_id'])).run();
            });

            total_price+= product['quantity']*product['price'];
            total_qty+=product['quantity'];
          });

           const div = $('#cart');
           const table = $('<table class="table"></table>');
           const thead = $('<thead class="thead-default"></thead>');
           const tr = $('<tr></tr>');
           tr.append($('<th></th>').text(`目前購買商品總計${total_qty}個，小計：NT ${total_price} 元`),$('<th></th>').append($('<button id="show_checkout" class="btn btn-primary"></button>').text('前往結帳')));
           thead.append(tr);
           table.append(thead);
           div.append(table);
           $('#show_checkout').click(()=>{
              if(obj['status']==1){
              (new cart_show_checkout_page('cart','show_checkout_page','Main-body',total_price)).run();
            }else{
              alert('請先登入會員');
              (new member_show_login_page('member','show_login_page','Main-body')).run();
            }
           })

           this.loadModuleScript('cart', "show_checkout_page");
           this.loadModuleScript('cart', "do_delete_action");
           this.loadModuleScript('cart', "do_update_action");
       }
    }
}