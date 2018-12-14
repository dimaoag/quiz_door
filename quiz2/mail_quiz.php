<?php

$project_name = "My site";
//$admin_email = "dimaoag@gmail.com";
$admin_email = "vin.doors.house@gmail.com";
$form_subject = "Заявка с сайта door.in.ua";




function debug($array, $die = false){
    if ($die){
        echo '<pre>';
        var_dump($array);
        echo '<pre>';
    } else {
        echo '<pre>';
        print_r($array);
        echo '<pre>';
        die();
    }
}


function adopt($text){
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}



$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: ' . adopt($project_name) . ' <' . $admin_email . '>' . PHP_EOL .
    'Reply-To: ' . $admin_email . '' . PHP_EOL;



$phone = str_replace(" ", "", $_POST['phone']);
$type_door = htmlspecialchars($_POST['type-door']);
$messenger = htmlspecialchars($_POST['messenger']);
$questions = [];
$answers = [];


$out =   '<br><p><span style="color: #777777;">Телефон  </span> '.$phone.'<p>'
        .'<p><span style="color: #777777;">Тип дверей  </span> '.$type_door.'<p>'
        .'<p><span style="color: #777777;">Мессенджер  </span> '.$messenger.'<p>'
        ;


foreach ($_POST['question'] as $key_q => $value_q){
    $questions[$key_q] = htmlspecialchars($value_q);
    if (is_array($_POST['answer'][$key_q])){
        foreach ($_POST['answer'][$key_q] as $key_a => $value_a){
            $answers[$key_q][$key_a] = htmlspecialchars($value_a);
        }
    } else {
        $answers[$key_q] = htmlspecialchars($_POST['answer'][$key_q]);
    }
}

$out .= '<h2>Вопросы - ответы</h2>';

foreach ($questions as $key_q => $value_q){
    $out .= '<p><b>'.$questions[$key_q].'</b></p>';
    if (is_array($answers[$key_q])){
        $out .= '<ul>';
        foreach ($answers[$key_q] as $key_a => $value_a){
            $out .= '<li>' .$answers[$key_q][$key_a]. '</li>' ;
        }
        $out .= '</ul>';
    } else {
        $out .= '<ul><li>' .$answers[$key_q] .'</li></ul>';
    }
}


//echo $out;



 if (mail($admin_email, adopt($form_subject), $out, $headers)){
     header("Location: " .$_SERVER['HTTP_ORIGIN'] . "?status=1");
 } else {
     echo 'Error!';
 }
