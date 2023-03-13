const token = localStorage.getItem('token');

if (token !== ''){
const header = document.querySelector('.header-elements')
const boutonPublication = document.createElement('button');
const modeEdition = document.createElement('p')
boutonPublication.innerText = 'publier les changements';
modeEdition.innerText = 'Mode édition';
header.appendChild(modeEdition);
header.appendChild(boutonPublication);

const modifierTarget = document.querySelector('.titlewrapper .lienmodal');
modifierTarget.style.display = 'block'; 
let modal = null;
const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal); 
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

const galerie = document.querySelector('.gallery2');
    function afficherProjects() {
        fetch('http://localhost:5678/api/works')
          .then(response => response.json())
          .then(projects => {
            projects.forEach(works => {
                const workElement = document.createElement('figure');
                const imageElement = document.createElement('img');
                const titleElement = document.createElement('p')
                
                imageElement.src = works.imageUrl;
                titleElement.innerText = 'éditer';
                var imgSupprimerElement = document.createElement('img');
                imgSupprimerElement.src = 'assets/icons/trash-2-16.png';

                // Créer un élément de bouton et ajouter l'image SVG à l'intérieur
                var boutonSupprimer = document.createElement('button');
                boutonSupprimer.appendChild(imgSupprimerElement);

                // Ajouter le bouton au DOM
                
                galerie.appendChild(workElement);
              workElement.appendChild(imageElement);
              workElement.appendChild(titleElement);
              workElement.appendChild(boutonSupprimer);
              return workElement
            });
            
})};

afficherProjects()

const closeModal = function(e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal); // Correction de la casse de la méthode removeEventListener
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
};

const stopPropagation = function(e) {
    e.stopPropagation();
};

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});
}


const h2 = document.querySelector('.modal-wrapper h2');
const wrapperGalerie= document.querySelector('.wrapper-gallery');
const boutonsGalerie = document.querySelector('.bouttons')

// modal ajout photo
const ajouterPhoto = document.querySelector('.ajouter-photo');
const ajouterModal = document.querySelector('.modal-wrapper')

ajouterPhoto.addEventListener ( 'click', ajoutPhotoModal )

function ajoutPhotoModal () {
  // cacher les éléments
  h2.style.display= 'none';
  wrapperGalerie.style.display= 'none';
  boutonsGalerie.style.display= 'none'; 

  //bouton retour
  const selectBoutonRetour = document.querySelector ('.bouton-retour');
  selectBoutonRetour.style.visibility = 'visible';

  selectBoutonRetour.addEventListener('click', retourBoutonFunction)

  function retourBoutonFunction () {
    modalWrapperAjouter.style.display = 'none';
    h2.style.display= 'block';
  wrapperGalerie.style.display= 'flex';
  boutonsGalerie.style.display= 'flex';
  selectBoutonRetour.style.visibility = 'hidden';
  }

  // Création des éléments de la modal ajout de photo 
  const modalWrapperAjouter = document.createElement('div');
  modalWrapperAjouter.classList.add('modal-wrapper-ajouter');

  const titleModalPhoto = document.createElement('h3');
  titleModalPhoto.innerText= 'Ajout Photo';
  const wrapperAjoutPhoto = document.createElement('div');
  wrapperAjoutPhoto.classList.add('wrapper-ajout-photo');
  const inputAjoutPhoto = document.createElement('input');
  inputAjoutPhoto.classList.add('input')
  const boutonAjoutPhoto = document.createElement('button');
  boutonAjoutPhoto.classList.add('bouton-ajout-photo');
  boutonAjoutPhoto.innerText= '+ Ajouter photo';

  const divInputTitle = document.createElement('div');
  const ajoutPhotoTitle = document.createElement('input');
  const ajoutPhotoTitleP = document.createElement('p');
  ajoutPhotoTitleP.innerText = 'Titre';

  const divInputCategorie = document.createElement('div');
  const ajoutPhotoCategorie = document.createElement('input');
  const ajoutPhotoCategorieP = document.createElement('p');
  ajoutPhotoCategorieP.innerText = 'Catégorie';
  const validerBouton = document.createElement('button');
  validerBouton.classList.add('valider-Bouton');
  validerBouton.innerText = 'valider';


wrapperAjoutPhoto.appendChild(boutonAjoutPhoto);

divInputTitle.appendChild(ajoutPhotoTitleP);
divInputTitle.appendChild(ajoutPhotoTitle);

divInputCategorie.appendChild(ajoutPhotoCategorieP);
divInputCategorie.appendChild(ajoutPhotoCategorie);

modalWrapperAjouter.appendChild(titleModalPhoto);
modalWrapperAjouter.appendChild(wrapperAjoutPhoto);
modalWrapperAjouter.appendChild(divInputTitle);

modalWrapperAjouter.appendChild(divInputCategorie);

modalWrapperAjouter.appendChild(validerBouton);
ajouterModal.appendChild (modalWrapperAjouter);

}




