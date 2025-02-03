<?php

$servername = "arenda56";
$username = "root"; 
$password = ""; 
$dbname = "arenda56"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$phone = $_POST['phone'];
$room_type = $_POST['car'];


$sql = "INSERT INTO bookings (phone, car) VALUE ('$phone', '$room_type')";


if (mysqli_query($conn, $sql)) {
    echo "Заявка успешно отправлена!";
} else {
    echo "Ошибка: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>
