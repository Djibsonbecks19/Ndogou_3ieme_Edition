document.addEventListener('DOMContentLoaded', () => {
    loadList(); 
    lookUp();  
});

function loadList() {
    const content = document.getElementById('content');
    const participations = JSON.parse(localStorage.getItem('participations')) || [];
    let html = `<h2>Liste des Cotisations</h2>
                <input type="text" class="form-control" id="lookup" placeholder="Search...">
                <button class="btn btn-primary mt-3 mb-5" onclick="loadAddForm()">Ajouter Des informations</button>
    `;
    if (participations.length > 0) {
        html += `<table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Montant</th>
                            <th>Taille</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>`;
        participations.forEach((participation, index) => {
            html += `<tr>
                        <td>${participation.nom}</td>
                        <td>${participation.prenom}</td>
                        <td>${participation.montant}</td>
                        <td>${participation.taille}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editParticipation(${index})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteParticipation(${index})">Delete</button>
                        </td>
                    </tr>`;
        });
        html += `</tbody>
                </table>`;
    } else {
        html += '<p class="mt-5">Aucune cotisation enregistrée.</p>';
    }
    content.innerHTML = html;

    lookUp();
}
function loadAddForm() {
    const content = document.getElementById('content');
    const html = `
        <h2>Ajouter une Cotisation</h2>
        <form onsubmit="addParticipation(event)">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" required>
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" required>
            </div>
            <div class="mb-3">
                <label for="montant" class="form-label">Montant</label>
                <input type="number" class="form-control" id="montant" required>
            </div>
            <div class="mb-3">
                <label for="taille" class="form-label">Taille</label>
                <select class="form-control" id="taille" required>
                    <option value="XXL">XXL</option>
                    <option value="XL">XL</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="S">S</option>
                    <option value="XS">XS</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
    `;
    content.innerHTML = html;
}

function addParticipation(event) {
    event.preventDefault();
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const montant = document.getElementById('montant').value;
    const taille = document.getElementById('taille').value;

    const participation = { 
        nom, 
        prenom, 
        montant, 
        taille 
    };
    const participations = JSON.parse(localStorage.getItem('participations')) || [];
    participations.push(participation);
    localStorage.setItem('participations', JSON.stringify(participations));
    loadList();
}

function editParticipation(index) {
    const participations = JSON.parse(localStorage.getItem('participations'));
    const participation = participations[index];
    const content = document.getElementById('content');
    const html = `
        <h2>Modifier une Cotisation</h2>
        <form onsubmit="updateParticipation(event, ${index})">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" value="${participation.nom}" required>
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" value="${participation.prenom}" required>
            </div>
            <div class="mb-3">
                <label for="montant" class="form-label">Montant</label>
                <input type="number" class="form-control" id="montant" value="${participation.montant}" required>
            </div>
            <div class="mb-3">
                <label for="taille" class="form-label">Taille</label>
                <select class="form-control" id="taille" required>
                    <option value="XXL" ${participation.taille === 'XXL' ? 'selected' : ''}>XXL</option>
                    <option value="XL" ${participation.taille === 'XL' ? 'selected' : ''}>XL</option>
                    <option value="L" ${participation.taille === 'L' ? 'selected' : ''}>L</option>
                    <option value="M" ${participation.taille === 'M' ? 'selected' : ''}>M</option>
                    <option value="S" ${participation.taille === 'S' ? 'selected' : ''}>S</option>
                    <option value="XS" ${participation.taille === 'XS' ? 'selected' : ''}>XS</option>


                </select>
            </div>
            <button type="submit" class="btn btn-primary">Modifier</button>
        </form>
    `;
    content.innerHTML = html;
}

function updateParticipation(event, index) {
    event.preventDefault();
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const montant = document.getElementById('montant').value;
    const taille = document.getElementById('taille').value;

    const participation = { 
        nom, 
        prenom, 
        montant, 
        taille 
    };
    const participations = JSON.parse(localStorage.getItem('participations'));
    participations[index] = participation;
    localStorage.setItem('participations', JSON.stringify(participations));
    loadList();
}

function deleteParticipation(index) {
    const participations = JSON.parse(localStorage.getItem('participations'));
    participations.splice(index, 1);
    localStorage.setItem('participations', JSON.stringify(participations));
    loadList();
}

function loadAbout() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>A Propos</h2><p>Informations sur l\'application de gestion des cotisations.</p>';
}

function lookUp() {
    document.getElementById("lookup").addEventListener("input", function () {
        /* 
            Extraction de la valeur recherchée en lowercase et extraction 
            de toutes les lignes aussi
        */
        const lookupValue = this.value.trim().toLowerCase();
        const tableRows = document.querySelectorAll("table tbody tr");

        tableRows.forEach((row) => {
            /* 
                transforme la collection html en array en prennant chaque colonne 
                de la ligne et transforme en String contenant toute les valeurs de la ligne
            */
            const rowText = Array.from(row.cells)
                .map(cell => cell.textContent.trim().toLowerCase())
                .join(" ");

            /* 
                Si le String contenant les colonnes de la ligne contient une colonne typique 
                à la valeur recherchée ou contanent une partie de cette valeur recherchée
                cette ligne reste afficher sinon elle est cachée
            */    
            row.style.display = rowText.includes(lookupValue) ? "" : "none";
        });
    });
}





















