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