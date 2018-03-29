class cart_show_checkout_page extends ActionHandler{
    constructor(module, action, position_id, total_price){
        super(module, action);
        this.position_id = position_id;
        this.total_price = total_price;
    }
    prepareArgs(){
        this.php = false;
    }
    showResult(xhttp){
        var str=`
            <header>
              <div class="navbar navbar-dark bg-dark">
                <div class="container d-flex justify-content-between">
                  <a href="javascript:window.onload=(new home_show_index_page('home','show_index_page','Main-body')).run()" class="navbar-brand">首頁</a>
                </div>
              </div>
            </header>
                <div class="container">
                    <form class="form-signin" id="checkout">
                        <h2 class="form-signin-heading">以下欄位皆為必填</h2>
                        <ul class="list-group">
                            <li class="list-group-item">
                                收件人姓名：
                                <input name="name" type="text" class="form-control" id="name" required />
                                <span id="check"></span>                               
                            </li>
                            <li class="list-group-item">
                                連絡電話：
                                <input name="phone" type="text" class="form-control" id="phone" required/>
                                <span id="check"></span>                               
                            </li>
                            <li class="list-group-item">
                                住址：
                                <input name="addr" type="text" maxlength="24" class="form-control" id="addr" required />
                              <br/>
                            </li>
                            <li class="list-group-item">
                                付款方式：
                                貨到付款<input checked type="radio">
                              <br/>
                            </li>
                        </ul> 
                        <br>
                         <button class="btn btn-lg btn-primary form-control" type="submit" >確認結帳</button>         
                    </form>
                </div>
               `;
        $('#'+this.position_id).html(str);
        this.loadModuleScript(this.module, "do_checkout_action");
        const total=this.total_price;
         $("#checkout").submit(function(e){
            e.preventDefault();
           (new cart_do_checkout_action('cart','do_checkout_action','Main-body',total,$("#phone").val(),$("#addr").val())).run();
      });
    }
}