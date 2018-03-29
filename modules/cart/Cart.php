<?php 
    class Cart{
        public function __construct() {
            $this->items=array();
            $this->itemqtys=array();
            $this->count=0;
        }
         public function showCart() { 
            if($this->count!=0){
                $product=array();
                foreach ($this->items as $item) {
                    $product[]=array(
                        'product_id'=>$item['product_id'],
                        'product_name'=>$item['product_name'],
                        'product_image'=>$item['product_image'],
                        'price'=>$item['price'],
                        'quantity'=>$this->itemqtys[$item['product_id']]
                    );
                }
                return $product;
            }else{
                return 0;
            }
        }


        public function add_item($result,$id)
        { 
            if(isset($this->itemqtys[$id]) && $this->itemqtys[$id]>0)
            { 
                $this->itemqtys[$id] = 1 + $this->itemqtys[$id];
            } 
            else {
                $this->items[]= array('product_id'=>$result['product_id'],'product_name'=>$result['product_name'],'product_image'=>$result['product_image'],'price'=>$result['price']);
                $this->itemqtys[$id] = 1;
                $this->count++;
            }
            return 1;
        }


    }
 ?>