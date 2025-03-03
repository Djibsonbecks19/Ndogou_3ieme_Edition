<?php
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM ndogou WHERE id = $id";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
}
?>

<h3 class="section-title">
    <i class="fas fa-edit me-2"></i> Modifier Cotisation
</h3>
<div class="card">
    <div class="card-body">
        <form method="POST" action="?action=updateParticipation&id=<?php echo $row['id']; ?>">
            <div class="mb-3">
                <label for="nom" class="form-label"><i class="fas fa-user me-2"></i> Nom</label>
                <input type="text" name="nom" id="nom" class="form-control" value="<?php echo $row['nom']; ?>" required>
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label"><i class="fas fa-user-tag me-2"></i> Prénom</label>
                <input type="text" name="prenom" id="prenom" class="form-control" value="<?php echo $row['prenom']; ?>" required>
            </div>
            <div class="mb-3">
                <label for="montant" class="form-label"><i class="fas fa-coins me-2"></i> Montant</label>
                <div class="input-group">
                    <input type="number" name="montant" id="montant" class="form-control" value="<?php echo $row['montant']; ?>" required>
                    <span class="input-group-text">FCFA</span>
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">
                <i class="fas fa-save me-2"></i> Mettre à jour
            </button>
        </form>
    </div>
</div>
