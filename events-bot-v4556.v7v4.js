    // Funciones para el chatbot
    function toggleChatbot() {
        const chatbotContainer = document.getElementById('chatbotContainer');
        chatbotContainer.style.display = chatbotContainer.style.display === 'block' ? 'none' : 'block';
      }
  
      const messages = document.getElementById('chatbotMessages');
      const input = document.getElementById('chatbotInput');
  
      function sendMessage() {
        const userMessage = input.value.trim();
        if (!userMessage) return;
  
        // Mostrar mensaje del usuario
        addMessage('user', userMessage);
  
        // Procesar respuesta del chatbot
        const botResponse = getBotResponse(userMessage);
        addMessage('bot', botResponse);
  
        // Limpiar input
        input.value = '';
      }
  
      function addMessage(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = sender === 'user' ? `Tú: ${message}` : `Bot: ${message}`;
        messageElement.style.color = sender === 'user' ? '#333' : '#4CAF50';
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
      }
  
      function getBotResponse(message) {
        const commands = {
          ayuda: "Comandos disponibles: ayuda, videos, contacto, horario, precios.",
          videos: "Aquí tienes acceso a nuestros videos educativos sobre matemáticas.",
          contacto: "Puedes contactarnos a través de nuestras redes sociales o por correo electrónico.",
          horario: "Nuestro horario de atención es de 8:00 AM a 6:00 PM.",
          precios: "Consulta nuestros precios en la sección de contacto."
        };
  
        return commands[message.toLowerCase()] || "No entendí tu pregunta. Escribe 'ayuda' para ver los comandos disponibles.";
      }