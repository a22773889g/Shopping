class management_show_insert_page extends ActionHandler{
    constructor(module, action, position_id){
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs(){
        this.php = false;
    }
    showResult(xhttp){     
        let str=`
                  <th scope="col">產品名稱</th>
                  <th scope="col">產品圖片</th>
                  <th scope="col">價格</th>
                  <th scope="col">數量</th>
               `;
        $('#'+this.position_id).html(str)
        const tr =  $('<tr></tr>');
        const name=$('<td></td>').append($(`<input type=text id="product_name" class="form-control" required>`));
        const image=$('<td></td>').append($('<img id="img" height="150" width="150">'),$(`<input type=file id="product_image" class="form-control" style="width:150px;" required>`));
        const price=$('<td></td>').append($(`<input type=text id="price" class="form-control" required>`));
        const stocks=$('<td></td>').append($(`<input type=text id="stocks" class="form-control" required>`));
        tr.append(name,image,price,stocks);
        $('#content').html(tr);

        const insert=$('<button type="submit" class="btn btn-lg btn-secondary btn-block"></button>');
        $('#content').append($('<br/>'),insert.text('新增'));

        let picCode;

        $('#product_image').change(function(){    
            if (this.files) { 
                 let FR= new FileReader(); 
                 FR.addEventListener("load", function(e) { 
                  picCode = e.target.result; 
                  $("#img").attr("src",picCode);
                 });  
                FR.readAsDataURL(this.files[0]);  
            }
        }); 

        insert.click((e)=>{
          e.preventDefault();
          if($('#product_name').val()=='' || $('#product_image').val()=='' || $('#price').val()=='' || $('#stocks').val()==''){
            alert('請全部填寫');
          }
          else{
            (new management_do_insert_action('management','do_insert_action','header')).run();
            }
        });

        this.loadModuleScript('management', "do_insert_action");

    }
}