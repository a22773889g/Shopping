<?php
    require_once 'event_message.php';
    interface Module{
        public function doAction(event_message $em);
    }
?>