document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsContainer = document.getElementById('appointments');
  
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
  
      if (name && date) {
        const appointment = { name, date };
        addAppointment(appointment);
        appointmentForm.reset();
      } else {
        alert('Please fill in all fields');
      }
    });
  
    function addAppointment(appointment) {
      axios.post('https://crudcrud.com/api/YOUR_CRUDCRUD_API_ENDPOINT', appointment)
        .then(() => fetchAppointments())
        .catch(error => console.error('Error adding appointment:', error));
    }
  
    function fetchAppointments() {
      axios.get('https://crudcrud.com/api/YOUR_CRUDCRUD_API_ENDPOINT')
        .then(response => {
          appointmentsContainer.innerHTML = '';
          response.data.forEach(appointment => {
            const div = document.createElement('div');
            div.innerHTML = `<span>${appointment.name} - ${appointment.date}</span><button class="delete-btn" data-id="${appointment._id}">Delete</button>`;
            appointmentsContainer.appendChild(div);
          });
  
          const deleteButtons = document.querySelectorAll('.delete-btn');
          deleteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
              const appointmentId = btn.getAttribute('data-id');
              deleteAppointment(appointmentId, btn.parentNode);
            });
          });
        })
        .catch(error => console.error('Error fetching appointments:', error));
    }
  
    function deleteAppointment(appointmentId, appointmentElement) {
      axios.delete(`https://crudcrud.com/api/YOUR_CRUDCRUD_API_ENDPOINT/${appointmentId}`)
        .then(() => {
          appointmentElement.remove();
        })
        .catch(error => console.error('Error deleting appointment:', error));
    }
  
    fetchAppointments();
  });
  