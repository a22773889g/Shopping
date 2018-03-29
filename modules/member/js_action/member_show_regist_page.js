class member_show_regist_page extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
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
                    <form class="form-signin" id="regist">
                        <h2 class="form-signin-heading">以下欄位皆為必填</h2>
                        <ul class="list-group">
                            <li class="list-group-item">
                                姓名：
                                <input name="name" type="text" class="form-control" id="member_name" required/>
                                <span id="check"></span>                               
                            </li>
                            <li class="list-group-item">
                                帳號：
                                <input name="user" type="text" class="form-control" id="user" required />
                                <span id="check"></span>                               
                            </li>
                            <li class="list-group-item">
                                密碼：
                                <input name="pwd" type="password" maxlength="24" class="form-control" id="pwd" required />
                              <br/>
                            </li>
                        </ul> 
                        <br>
                         <button class="btn btn-lg btn-primary" type="submit"  id="next_btn" >確認</button>
                         <button class="btn btn-lg btn-primary" type="reset"   id="clear_btn">清除</button>          
                    </form>
                </div>
               `;
        $('#'+this.position_id).html(str);
        this.loadModuleScript(this.module, "do_regist_action");
         $("#regist").submit(function(e){
            e.preventDefault();
            (new member_do_regist_action('member','do_regist_action','Main-body')).run();
      })
    }
}