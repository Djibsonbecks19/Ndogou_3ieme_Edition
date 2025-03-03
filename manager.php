<?php
require_once "assets/database.php";

        if (isset($_GET['action'])) {
            $action = $_GET['action'];
            if ($action == 'aPropos') {
                require_once "./ndogou/APropos.php"; 
            } 

            if ($action == 'listeParticipations') {
                require_once "./ndogou/liste.php"; 
            } 
            if ($action == 'addParticipation') {
                require_once "./ndogou/add.php"; 
            } 
            if ($_GET['action']=='deleteParticipation') {
                $id=$_GET['id'];
                $sql="DELETE FROM ndogou WHERE id=$id";
                mysqli_query($conn,$sql);
                header('location: index.php?action=listeParticipations');
            }
            if ($action == 'editParticipation') {
                require_once "./ndogou/edit.php"; 
            }
            if ($action == 'updateParticipation') {
                $id = $_GET['id'];
                $nom = $_POST['nom'];
                $prenom = $_POST['prenom'];
                $montant = $_POST['montant'];

                if (empty($nom) || empty($prenom) || empty($montant)) {
                    echo "<h5 class='text-danger'>Tous les champs sont obligatoires</h5>";
                } else {
                    $sql = "UPDATE ndogou SET nom = '$nom', prenom = '$prenom', montant = '$montant' WHERE id = $id";
                    mysqli_query($conn, $sql);
                    header('location: index.php?action=listeParticipations');
                }
            }
        } else {
            require_once "ndogou/liste.php"; 
        }
    require_once "index.html";
?>


