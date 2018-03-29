class home_show_index_page extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = true;
    }
    ajax_success(xhttp){
            const json_str = xhttp.responseText;
            const obj = JSON.parse(json_str);
            const str=`
                <header>
                  <div class="navbar navbar-dark bg-dark">
                    <div class="container d-flex justify-content-between">
                      <a href="javascript:window.onload=(new home_show_index_page('home','show_index_page','Main-body')).run()" class="navbar-brand">首頁</a>
                      <h1 style="color:white;">MVC_Project</h1>
                       <div id="name" class="navbar-brand" >
                       ${obj['message']}
                        <button id="login" class="btn btn-primary" >${obj['status']}</button>
                       </div>
                    </div>
                  </div>
                </header>
                <main role="main">

                  <div class="album text-muted">
                    <div class="container">
                      <div id="product" class="row">
                        
                      </div>
                    </div>
                  </div>
                </main>
                <script type="text/javascript">
                        `;

                $('#'+this.position_id).html(str);

                obj['product'].forEach((product)=>{
                  const div= $('<div class="card"></div>');
                  const img= $('<img>').attr('src', product['product_image']);
                  const price= $('<p></p>').text('價格: '+product['price']); 
                  const button= $('<button class="btn btn-primary"></button>').text('加入購物車');
                  button.click(()=>(new cart_do_addcart_action('cart','do_addcart_action','Main-body',product['product_id'])).run());
                  div.append(img,price,button);
                  $('#product').append(div);
                });

                if(obj['function']=="1"){
                    const order= $('<button id="order" class="btn btn-primary" style="margin-right:5px;">訂單查詢</button>');
                    order.click(()=>(new member_show_order_page('member','show_order_page','Main-body')).run());
                    $('#name').append(order);
                    $('#login').click(()=>(new member_do_logout_action('member','do_logout_action','Main-body')).run());
                }
                else{
                    const regist= $('<button id="regist" class="btn btn-primary"  style="margin-right:5px">註冊</button>');
                    regist.click(()=>(new member_show_regist_page('member','show_regist_page','Main-body')).run());
                    $('#name').append(regist);
                    $('#login').click(()=>(new member_show_login_page('member','show_login_page','Main-body')).run());
                }
                 const cart = $('<button id="cart" class="btn btn-primary">購物車</button>');
                 cart.click(()=>(new cart_show_cart_page('cart','show_cart_page','Main-body')).run());
                  $('#name').append(cart);

                 this.loadModuleScript('member', "show_order_page");
                 this.loadModuleScript('member', "show_login_page");
                 this.loadModuleScript('member', "do_logout_action");
                 this.loadModuleScript('member', "show_regist_page");
                 this.loadModuleScript('cart', "do_addcart_action");
                 this.loadModuleScript('cart', "show_cart_page");
    }
  }