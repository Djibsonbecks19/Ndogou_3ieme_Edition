<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $montant = $_POST['montant'];

    $sql = "INSERT INTO ndogou (nom, prenom, montant) VALUES ('$nom', '$prenom', '$montant')";
    
    if ($conn->query($sql) === TRUE) {
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    } else {
        echo "<div class='alert alert-danger'>Error: " . $conn->error . "</div>";
    }
}
?>
<h3 class="section-title">
    <i class="fas fa-edit me-2"></i> Nouvelle Cotisation
</h3>
<div class="card">
    <div class="card-body">
        <form method="POST">
            <div class="mb-3">
                <label for="nom" class="form-label"><i class="fas fa-user me-2"></i> Nom</label>
                <input type="text" name="nom" id="nom" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label"><i class="fas fa-user-tag me-2"></i> Prénom</label>
                <input type="text" name="prenom" id="prenom" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="montant" class="form-label"><i class="fas fa-coins me-2"></i> Montant</label>
                <div class="input-group">
                    <input type="number" name="montant" id="montant" class="form-control" required>
                    <span class="input-group-text">FCFA</span>
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">
                <i class="fas fa-save me-2"></i> Enregistrer la Cotisation
            </button>
        </form>
    </div>
</div>
