class member_do_regist_action extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('name', $('#member_name').val());
        this.addArgs('account', $('#user').val());
        this.addArgs('pwd', $('#pwd').val());
    }
    ajax_success(xhttp){     
            status=xhttp.responseText;
            if(status==2){
                alert('註冊成功');
                (new member_show_login_page('member','show_login_page','Main-body')).run();
            }else if(status==1){
                alert('此帳號已註冊過，請重新輸入');
            }else{
                alert('此名稱已註冊過，請重新輸入');
            }
    }
}