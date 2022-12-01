<?php

include 'connect_db.php';

$id_story = $_GET['id_story'];

$sql = "SELECT id_situation FROM situation WHERE id_story = '" + $id_story + "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) { // Pour chaque id_situation

    echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();

?>