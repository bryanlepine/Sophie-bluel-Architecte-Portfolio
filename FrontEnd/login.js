
const loginForm = document.querySelector('form');
const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="psw"]');

// Écoute de l'événement de soumission du formulaire de connexion
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  const email = emailInput.value;
  const password = passwordInput.value;

  // Envoi des données d'identification à l'API pour vérification
  
    const response = fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur dans l’identifiant ou le mot de passe');
    }
    return response.json();
  })
  .then(data => {
    if (data.token) {
      // Stockage du token dans le stockage local
      localStorage.setItem('token', data.token);

      // Redirection vers la page d'accueil
      window.location.href = 'http://127.0.0.1:5500/FrontEnd/index.html';
    } else {
      throw new Error('Erreur lors de la connexion');
    }
  })
  .catch(error => {
    console.error('Erreur lors de la connexion:', error);
    alert(error.message);
  });
});