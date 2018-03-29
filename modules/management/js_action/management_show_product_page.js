class management_show_product_page extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = false;
    }
    showResult(xhttp){
        let str=`
                <th scope="col"><button class="btn btn-lg btn-primary btn-block" onclick="(new management_show_list_page('management','show_list_page','header')).run()">產品清單</button></th>
                <th scope="col"><button class="btn btn-lg btn-primary btn-block" onclick="(new management_show_insert_page('management','show_insert_page','header')).run()">新增商品</button></th>
               `;
        $('#content').html("");
        $('#'+this.position_id).html(str);
        this.loadModuleScript('management', "show_list_page");
        this.loadModuleScript('management', "show_insert_page");
    }
}