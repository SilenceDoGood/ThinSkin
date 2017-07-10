<?php
  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  $dbh = new PDO('mysql:host=localhost; dbname=ThinSkin_Subscribers', "ThinDB_Admin", "Shotgun7");



  $input = $_POST;

  $data = array();
  $errors = array();
  $debug = array();

  if(empty($input['fName']))
        $errors['fName'] = 'First Name is required.';

  if(empty($input['lName']))
        $errors['lName'] = 'Last Name is required.';

  if(empty($input['email'])) {
    $errors['email'] = 'Email Address is required.';
  } else if(!filter_var($input['email'], FILTER_VALIDATE_EMAIL)){
    $errors['email'] = 'A valid email is required';
  }

  checkForErrors($errors);
  $input = cleanInputs($input);

  try {
        $stmt = $dbh->prepare("INSERT INTO Subscribers (FIRST_NAME, LAST_NAME, EMAIL, ENTRY_DATE)
        VALUES (:first, :last, :email, :date)");
        $stmt->execute(
          Array
          (
            "date" => gmdate("Y-m-d H:i:s"),
            "first" => $input['fName'],
            "last" => $input['lName'],
            "email" => $input["email"]
          )
        );
    } catch (PDOException $ex) {
      $debug["errors"]["PDO insert statement failure"];
      overrideResponse($debug);
    }

  sendResponse($debug);

  function checkForErrors($errors) {
      if(!empty($errors)) {
          $data['success'] = false;
          $data['errors'] = $errors;
          overrideResponse($data, 400);
      }
  }

  function sendResponse($data, $status = 200) {
      header("HTTP/1.1 " . $status . " " . requestStatus($status));
      echo json_encode($data);
  }

  function overrideResponse($data, $status = 400) {
      header("HTTP/1.1 " . $status . " " . requestStatus($status));
      echo json_encode($data);
      die();
  }

  function cleanInputs($data) {
        $clean_input = Array();
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $clean_input[$k] = cleanInputs($v);
            }
        } else {
            $clean_input = trim(strip_tags($data));
        }
        return $clean_input;
    }

    function requestStatus($code) {
        $status = array(
            200 => 'OK',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            410 => 'Gone',
            500 => 'Internal Server Error',
        );
        return ($status[$code]) ? $status[$code] : $status[500];
    }
