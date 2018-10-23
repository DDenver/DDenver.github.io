<?php

header('Content-Type: application/json');

$name = $_POST['name'];
$phone = $_POST['phone'];
$street = $_POST['street'];
$house = $_POST['house'];
$corps = $_POST['corps'];
$flat = $_POST['flat'];
$floor = $_POST['floor'];
$comment = $_POST['comment'];
$radio = $_POST['radio'];
$check = $_POST['check'];
if ($radio == 'card') {
	$radiobox = 'Оплата по карте';
} else {
	$radiobox = 'Потребуется сдача';
};

if ($check == 'callback') {
	$checkobox = 'Не презванивать';
} else {
	$checkbox = 'Перезванивать';
};

$message = "Сообщение от пользователя: $name;\r\n"
						."Номер телефона: $phone;\r\n"
						."Улица: $street;\r\n"
						."Дом: $house;\r\n"
						."Корпус: $corps;\r\n"
						."Квартира: $flat;\r\n"
						."Этаж: $floor;\r\n"
						."Комментарий: $comment;\r\n"
						."Сдача: $radiobox;\r\n"
						."Обратный звонок: $checkbox;\r\n";


$result = mail('den107620@gmail.com', 'Тема письма Lending', $message);

echo json_encode(array(
	'status' => $result 
));