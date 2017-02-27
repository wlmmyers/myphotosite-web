<?php
  require_once 'dbConnection.php';

  $hour = time() + 21600; // 6 hours

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  } catch(PDOException $e) {
    echo $e->getMessage();
  }

  if(isset($_COOKIE['user'])) {
    $user = $_COOKIE['user'];
    $pass = $_COOKIE['pass'];

    $sql = "SELECT * FROM users WHERE user = :user AND pass = :pass";

    $statement = $connection->prepare($sql);

    $statement->bindParam(':user', $user, PDO::PARAM_STR);
    $statement->bindParam(':pass', $pass, PDO::PARAM_STR);

    $statement->execute();

    if (!!$statement->fetchColumn()) {
      //renew cookie
      setcookie("user", $user, $hour, "/");
      setcookie("pass", $pass, $hour, "/");
      setcookie("sessionid", $_COOKIE['sessionid'], $hour, "/");

      $sessionid = sha1(microtime().$_SERVER['REMOTE_ADDR']);
      $time = time();
      setcookie("sessionid" , $sessionid, $hour, "/");

      $statement2 = $connection->prepare("INSERT INTO sessions (id, time) VALUES ('".$sessionid."', '".$time."' ) ");
      $statement2 -> execute();

      echo json_encode( (object) array("message" => "cleared") );
    } else {
      echo json_encode( (object) array("message" => "illegal") );
    }

  } else {
    echo json_encode( (object) array("message" => "Failed") );
  }

  $connection = NULL;
?>
