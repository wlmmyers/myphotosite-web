<?php
        require_once 'dbConnection.php';

        $hour = time() + 21600; //6 hours

        try {
            $connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
        }
        catch(PDOException $e) {
            echo $e->getMessage();
        }

        if(isset($_COOKIE['user']))
    {
        $user = $_COOKIE['user'];
        $pass = $_COOKIE['pass'];

        $sql = "SELECT * FROM admins WHERE user = :user AND pass = :pass";

                $statement = $connection->prepare($sql);

                $statement->bindParam(':user', $_COOKIE['user'], PDO::PARAM_STR);
                $statement->bindParam(':pass', $_COOKIE['pass'], PDO::PARAM_STR);

                $statement->execute();

                if ($statement->fetchColumn() > 0) {
                        //renew cookie
              setcookie("user", $_COOKIE['user'], $hour, "/");
              setcookie("pass", $_COOKIE['pass'], $hour, "/");
                        setcookie("sessionid", $_COOKIE['sessionid'], $hour, "/");
            echo json_encode("cleared");
                }

                else echo json_encode("illegal");


    }
    else
    {
          echo json_encode("failed");
    }

        $errorCode = 0;

        if(!isset($_COOKIE['sessionid'])){
            do{
                $sessionid = sha1(microtime().$_SERVER['REMOTE_ADDR']);
                $time = time();
                setcookie("sessionid" , $sessionid, $hour, "/");

                $statement2 = $connection->prepare("INSERT INTO sessions (id, time) VALUES ('".$sessionid."', '".$time."' ) ");
                $statement2 -> execute();

                $errorCode = $statement2 -> errorCode();
            } while($errorCode != 0);
        }

        $connection = NULL;
?>
