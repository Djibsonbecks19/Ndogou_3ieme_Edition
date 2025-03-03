document.addEventListener('DOMContentLoaded', () => {
    loadList();
});

function loadList() {
    const content = document.getElementById('content');
    const participations = JSON.parse(localStorage.getItem('participations')) || [];
    let html = '<h2>Liste des Cotisations</h2>';
    if (participations.length > 0) {
        html += '<table class="table table-striped"><thead><tr><th>Nom</th><th>Prénom</th><th>Téléphone</th><th>Montant</th><th>Actions</th></tr></thead><tbody>';
        participations.forEach((participation, index) => {
            html += `<tr>
                        <td>${participation.nom}</td>
                        <td>${participation.prenom}</td>
                        <td>${participation.telephone}</td>
                        <td>${participation.montant}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editParticipation(${index})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteParticipation(${index})">Delete</button>
                        </td>
                    </tr>`;
        });
        html += '</tbody></table>';
    } else {
        html += '<p>Aucune cotisation enregistrée.</p>';
    }
    content.innerHTML = html;
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
                <label for="telephone" class="form-label">Téléphone</label>
                <input type="text" class="form-control" id="telephone" required>
            </div>
            <div class="mb-3">
                <label for="montant" class="form-label">Montant</label>
                <input type="number" class="form-control" id="montant" required>
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
    const telephone = document.getElementById('telephone').value;
    const montant = document.getElementById('montant').value;

    const participation = { nom, prenom, telephone, montant };
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
                <label for="telephone" class="form-label">Téléphone</label>
                <input type="text" class="form-control" id="telephone" value="${participation.telephone}" required>
            </div>
            <div class="mb-3">
                <label for="montant" class="form-label">Montant</label>
                <input type="number" class="form-control" id="montant" value="${participation.montant}" required>
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
    const telephone = document.getElementById('telephone').value;
    const montant = document.getElementById('montant').value;

    const participation = { nom, prenom, telephone, montant };
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