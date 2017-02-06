<?php

  $seshuser = $_POST['user'];
  $seshpass = sha1($_POST['pass']);
  $hour = time() + 21600; // 6 hours from now
  require_once 'dbConnection.php';

  try {
    $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
  }
  catch(PDOException $e) {
    echo $e->getMessage();
  }
  $sql = "SELECT * FROM users WHERE user = :seshuser";

  $statement = $connection->prepare($sql);
  $statement->bindParam(':seshuser', $seshuser, PDO::PARAM_STR);
  $statement->execute();

  $statement->setFetchMode(PDO::FETCH_ASSOC);
  $uservalid = false;

  while($rows = $statement->fetch()) {
    $uservalid = true;

    if ($seshpass != $rows['pass']) {
      echo json_encode('Incorrect username or password');
    } else {
      setcookie("user", $seshuser, $hour, "/");
      setcookie("pass", $seshpass, $hour, "/");
      setcookie("user_id", $rows['id'], $hour, "/");
      echo json_encode('cleared');
    }
  }

  if (!$uservalid) echo json_encode('Incorrect username or password');
  $connection = NULL;

?>
