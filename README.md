# ionic_login_register_MySql_PHP
first!! You need to create the first folder. 
The directory structure is shown below.
c:\project folder(ex: ionproject)
     |
     |------- ionic folder(ex: jkwork) 
     |
     |------- php folder(ex: serve_api)
  
 there is a ionic code in ionic folder and php code  in php folder.
 
 The files in the php folder are as follows.
 One is the config.php file and the other is the file_aksi.php file.
 As a result, you need to create a config.php file and a file_aksi.php in your php folder.
 ###in config.php
<?php

define('DB_NAME', 'jkwork');
define('DB_USER', 'root');
define('DB_PASSWORD', '1234');
define('DB_HOST', 'localhost');

$connect = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if (!$connect){
    die("Error in connection" . mysqli_connect_error()) ;
 } 
?>


###in file_aksi.php
<?php
//file_aksi.php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; Charset=utf-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['aksi']=="add_register"){
    // $qry = "INSERT INTO master_user (full_name, phone_number, username, password) VALUES('$postjson[full_name]','$postjson[phone_number]','$postjson[username]','$postjson[password]'
    // )";
	$query=mysqli_query($connect, "SELECT * FROM master_user WHERE username = '$postjson[username]'");
    $check = mysqli_num_rows($query);
	if($check>0){
		//
		$result = json_encode(array('success'=>false, 'msg'=>'error, It is already registered Username.'));
	}
	else
	{
		$query=mysqli_query($connect, "INSERT INTO master_user SET
		   full_name = '$postjson[full_name]',
		   phone_number = '$postjson[phone_number]',
		   username = '$postjson[username]',
		   userpasswd = '$postjson[userpasswd]'    
		");
		
		if($query) $result = json_encode(array('success'=>true));
		else $result = json_encode(array('success'=>false, 'msg'=>'error, please try again'));
	
	}

    //if($query) $result = json_encode(array('success'=>true));
    //else $result = json_encode(array('success'=>false, 'msg'=>'error, please try again'));

    echo $result;
}

elseif($postjson['aksi']=="login"){
    $query=mysqli_query($connect, "SELECT * FROM master_user WHERE username = '$postjson[username]' AND  userpasswd = '$postjson[userpasswd]'");
    $check = mysqli_num_rows($query);

    if($check>0){
        $data = mysqli_fetch_array($query);
        $datauser = array(
            'user_id' => $data['user_id'],
            'full_name' => $data['full_name'],
            'phone_number' => $data['phone_number'],
            'username' => $data['username'],
            'userpasswd' => $data['userpasswd']
        );
        
        if($query) $result = json_encode(array('success'=>true, 'result'=>$datauser));
        else $result = json_encode(array('success'=>false, 'msg'=>'error, please try again'));

    }else{
        $result = json_encode(array('success'=>false, 'msg'=>'unregister account'));
    }
    echo $result;
}

elseif($postjson['aksi']=="profile"){

    $profile = array();
    $query=mysqli_fetch_array(mysqli_query($connect, "SELECT * FROM master_user WHERE user_id = '$postjson[user_id]'"));
    //$check = mysqli_num_rows($query);

    //if($check>0){
        //$data = mysqli_fetch_array($query);
        $profile[] = array(
         'user_id' => $query['user_id'],
         'full_name' => $query['full_name'],
         'phone_number' => $query['phone_number'],
         'username' => $query['username'],
         'userpasswd' => $query['userpasswd']
     );

     if($query) $result = json_encode(array('success'=>true, 'profiles'=>$profile));
     else $result = json_encode(array('success'=>false));

    //}else{
    //    $result = json_encode(array('success'=>false, 'msg'=>'error,unregister account'));
    //}
    echo $result;
}

elseif($postjson['aksi']=="update_profile"){

    // $profile = array();
    // $query=mysqli_fetch_array(mysqli_query($connect, "SELECT * FROM master_user WHERE user_id = '$postjson[user_id]'"));
    // //$check = mysqli_num_rows($query);

    // //if($check>0){
    //     //$data = mysqli_fetch_array($query);
    //     $profile[] = array(
    //      'user_id' => $query['user_id'],
    //      'full_name' => $query['full_name'],
    //      'phone_number' => $query['phone_number'],
    //      'username' => $query['username'],
    //      'userpasswd' => $query['userpasswd']
    //  );
     $query =  mysqli_query($connect, "UPDATE master_user SET
               full_name = '$postjson[full_name]',
               phone_number = '$postjson[phone_number]',
			   username = '$postjson[username]',
			   userpasswd = '$postjson[userpasswd]'
               WHERE user_id = '$postjson[user_id]'");  
     if($query) $result = json_encode(array('success'=>true));
     else $result = json_encode(array('success'=>false));

    //}else{
    //    $result = json_encode(array('success'=>false, 'msg'=>'error,unregister account'));
    //}
    echo $result;
}
?>

### data table : master_user, table structure
DESCRIBE `master_user`
############################
user_id	     int(11)	      NO	PRI	  NULL 	auto_increment	
full_name	   varchar(50)	  NO	      NULL		
phone_number	varchar(50)	  NO        NULL		
username	    varchar(50)	  NO  UNI	  NULL		
userpasswd	  varchar(250)	NO	      NULL
###########################	
user_id primary key, username unique index key

 
