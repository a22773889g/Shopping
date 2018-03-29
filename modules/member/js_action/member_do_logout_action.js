class member_do_logout_action extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = true;
    }
    ajax_success(xhttp){     
            status=xhttp.responseText;
            if(status==1){
                alert('登出成功');
                (new home_show_index_page('home','show_index_page','Main-body')).run();
            }else{

                alert('Bug');
            }

    }
}