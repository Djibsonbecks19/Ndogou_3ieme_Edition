<?php
require_once "assets/database.php";
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Cotisation App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <!-- Title with moon icon -->
        <a class="navbar-brand d-flex align-items-center" href="#">
            <i class="fas fa-moon me-2"></i> 
            Gestion Cotisation<br>
             Ndogou 3ème Edition
        </a>
        
        <!-- Navbar toggler for smaller screens -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto"> <!-- Aligning links to the right -->
                <li class="nav-item">
                    <a class="nav-link active" href="?action=listeParticipations">
                        <i class="fas fa-list-ul me-2"></i> Liste des Cotisations
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="?action=addParticipation">
                        <i class="fas fa-plus-circle me-2"></i> Ajouter Cotisation
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="?action=aPropos">
                        <i class="fas fa-plus-circle me-2"></i> A Propos
                    </a>
                </li>
            </ul>
        </div>
    </div>
    </nav>

    <div class="container mt-4">
        <!-- Title and Circular Image -->
        <div class="container text-center my-4">
        <div class="badge text-bg-secondary bg-dark py-4 px-4">
                <h1 class="display-4 mb-0">One for All 🤝 All for One</h1>
            </div>
        </div>
        <?php
        
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
                header('location: index.html?action=listeParticipations');
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
                    header('location: index.html?action=listeParticipations');
                }
            }
        } else {
            require_once "ndogou/liste.php"; 
        }
        ?>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
