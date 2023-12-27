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
            div.innerHTML = `<strong>${appointment.name}</strong> - ${appointment.date}`;
            appointmentsContainer.appendChild(div);
          });
        })
        .catch(error => console.error('Error fetching appointments:', error));
    }
  
    fetchAppointments();
  });
  