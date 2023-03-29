document.addEventListener('DOMContentLoaded', function () {
  const validerBouton = document.querySelector('.valider-Bouton');
  const ajoutPhotoTitle = document.querySelector('[name="photo-title"]');
  const ajoutPhotoCategorie = document.querySelector('[name="photo-categorie"]');
  const inputAjoutPhoto = document.querySelector('.inputphoto');

  if (validerBouton) {
    validerBouton.addEventListener('click', function (event) {
      event.preventDefault();
      if (ajoutPhotoTitle.value == '') {
        alert('le titre est obligatoire');
        return;
      }
      if (ajoutPhotoCategorie.value == '') {
        alert('la catégorie est obligatoire');
        return;
      }
      if (inputAjoutPhoto.value == '') {
        alert('la photo est obligatoire');
        return;
      }
      let formData = new FormData();
      formData.append("image", inputAjoutPhoto.files[0]);
      formData.append("title", ajoutPhotoTitle.value);
      formData.append("category", ajoutPhotoCategorie.value);

      fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('erreur lors du transfert');
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });

    });
  }
});
 