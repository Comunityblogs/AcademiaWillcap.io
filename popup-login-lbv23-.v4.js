    // Funciones para el modal de inicio de sesión
    function openLoginModal() {
        document.getElementById('loginModal').style.display = 'block';
      }
  
      function closeLoginModal() {
        document.getElementById('loginModal').style.display = 'none';
      }
  
      document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        // Validación segura (las credenciales no están expuestas)
        if (validateCredentials(username, password)) {
          alert('Inicio de sesión exitoso');
          closeLoginModal();
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      });