// Création de la galerie d'images

  const gallery = document.querySelector('.gallery');
  const filtres = document.querySelector('.filtres');
  
  function createWorkElement(works) {
    const workElement = document.createElement('figure');
    const imageElement = document.createElement('img');
    imageElement.src = works.imageUrl;
    const titleElement = document.createElement('figcaption');
    titleElement.textContent = works.title;
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
    return workElement;
  }

  // fonction afficher les projets 

  function afficherProjects() {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(projects => {
        gallery.innerHTML = "";
        projects.forEach(works => {
          const workElement = createWorkElement(works);
          gallery.appendChild(workElement);
        });
      });
  }

  // filtrer les projets par categorie

  function filtrerProjetsParCategorie(categorie) {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(data => {
        const projetsFiltres = data.filter(function (data) {
          return data.category.name === categorie;
        });
        gallery.innerHTML = "";
        projetsFiltres.forEach(works => {
          const workElement = createWorkElement(works);
          gallery.appendChild(workElement);
        });
      });
  }
  
  afficherProjects();

// création des boutons de filtres
  
  const categories = ['Objets', 'Appartements', 'Hotels & restaurants'];

  // creation du bouton Tous
  const boutonTous = document.createElement('button');
  boutonTous.innerHTML = 'Tous';
  filtres.appendChild(boutonTous);
  boutonTous.addEventListener("click", function () {
    afficherProjects();
  });
  // creation des boutons par categorie
  categories.forEach(categorie => {
    const boutonCategorie = document.createElement('button');
    boutonCategorie.innerText = categorie;
    filtres.appendChild(boutonCategorie);
    boutonCategorie.addEventListener("click", function () {
      filtrerProjetsParCategorie(categorie);
    });
  });
  



     

   
  
