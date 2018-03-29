class management_show_login_page extends ActionHandler{
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
                  <form class="form-signin" id="form">
                    <h2 class="form-signin-heading">管理者登入畫面</h2>
                    <input type="text" id="inputAccount" class="form-control" placeholder="Account" required autofocus>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                    <button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
                    <button class="btn btn-lg btn-primary btn-block" id="member">切換成會員登入畫面</button>
                  </form>

                </div>
               `;
        $("#"+this.position_id).html(str);
        this.loadModuleScript(this.module, "do_login_action");
        this.loadModuleScript(this.module, "show_management_page");
        $("#form").submit(function(e){
            e.preventDefault();
            (new management_do_login_action('management','do_login_action','Main-body')).run();
          });
        $('#member').click((e)=>{
          e.preventDefault();
          (new member_show_login_page('member','show_login_page','Main-body')).run();
          alert('切換成會員登入畫面');
        });
        }

    }