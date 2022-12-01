<?php
$servername = "137.74.198.245";
$username = "IUT-NDI-SEXINFO";
$password = "IUTIUT.";
$db = "Iut_Ndi_SexInfo";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>