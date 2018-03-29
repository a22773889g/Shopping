class management_show_management_page extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = false;
    }
    showResult(xhttp){
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
                          <th scope="col"><button class="btn btn-lg btn-primary btn-block" id="order" onclick="(new management_show_order_page('management','show_order_page','header')).run()">訂單管理</button></th>
                          <th scope="col"><button class="btn btn-lg btn-primary btn-block" id="product" onclick="(new management_show_product_page('management','show_product_page','header')).run()">商品管理</button></th>
                        </tr>
                      </thead>
                    </table>
                    <br/>
                    <table class="table" >
                      <thead class="thead-dark">
                        <tr id="header">

                        </tr>
                      </thead>
                      <tbody id='content'>
                        
                      </tbody>
                    </table>

                </div>
               `;
        $('#'+this.position_id).html(str);
        this.loadModuleScript('management', "show_order_page");
        this.loadModuleScript('management', "show_product_page");
    }
}