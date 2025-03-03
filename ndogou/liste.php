<?php
$result = $conn->query("SELECT * FROM ndogou");
$total = 0;
?>

<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <h3 class="section-title">
                <i class="fas fa-list-alt me-2"></i> Liste des Cotisations
            </h3>
            <div class="table-responsive">
                <table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th><i class="fas fa-user me-2"></i> Nom</th>
                            <th><i class="fas fa-user-tag me-2"></i> Prénom</th>
                            <th><i class="fas fa-coins me-2"></i> Montant</th>
                            <th class="">Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $result = $conn->query("SELECT * FROM ndogou");
                            $total = 0;
                            while ($row = $result->fetch_assoc()) {
                                $total += $row['montant'];
                                echo "<tr>";
                                echo  "<td>".$row['nom']."</td>";
                                echo  "<td>".$row['prenom']."</td>"; 
                                echo "<td><span >" . $row['montant'] . " FCFA</span></td>";
                                echo "<td>";
                                ?>
                                    <a type="button" href="?action=editParticipation&id=<?php echo $row['id'] ?>" class="btn btn-warning">M</a>
                                    <a tupe="button" href="?action=deleteParticipation&&id=<?php echo $row['id'] ?>" class="btn btn-danger">S</a>
                                <?php
                                echo "</td>";
                                echo "</tr>";
                            }
                        ?>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="2" class="text-end">Total</th>
                            <th><span><?php echo $total; ?> FCFA</span></th>
                            <th class="d-none d-sm-table-cell"></th> <!-- Hide on small screens -->
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</div>
