class management_do_login_action extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = true;
        this.addArgs('Account', document.getElementById('inputAccount').value);
        this.addArgs('Password', document.getElementById('inputPassword').value);
    }
    ajax_success(xhttp){     
            status=xhttp.responseText;
            if(status==1){
                alert('登入成功');
                (new management_show_management_page('management','show_management_page','Main-body')).run();
            }else{
                alert('帳號或密碼錯誤');
            } 
    }
}