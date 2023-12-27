document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsContainer = document.getElementById('appointments');
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');
    const userIdInput = document.getElementById('userId');
    const submitButton = document.getElementById('submitButton');

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const date = dateInput.value;
        const userId = userIdInput.value;

        if (userId) {
            // Edit existing appointment
            const appointment = { name, date };
            editAppointment(userId, appointment);
        } else {
            // Add new appointment
            if (name && date) {
                const appointment = { name, date };
                addAppointment(appointment);
                appointmentForm.reset();
            } else {
                alert('Please fill in all fields');
            }
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
                    div.innerHTML = `
                        <span>${appointment.name} - ${appointment.date}</span>
                        <span class="edit-icon" data-id="${appointment._id}">✏️</span>
                        <span class="delete-icon" data-id="${appointment._id}">❌</span>
                    `;
                    appointmentsContainer.appendChild(div);

                    const editIcons = document.querySelectorAll('.edit-icon');
                    editIcons.forEach(icon => {
                        icon.addEventListener('click', () => {
                            const appointmentId = icon.getAttribute('data-id');
                            populateFormForEdit(appointmentId);
                        });
                    });

                    const deleteIcons = document.querySelectorAll('.delete-icon');
                    deleteIcons.forEach(icon => {
                        icon.addEventListener('click', () => {
                            const appointmentId = icon.getAttribute('data-id');
                            deleteAppointment(appointmentId, div);
                        });
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

    function populateFormForEdit(appointmentId) {
        axios.get(`https://crudcrud.com/api/YOUR_CRUDCRUD_API_ENDPOINT/${appointmentId}`)
            .then(response => {
                const appointment = response.data;
                nameInput.value = appointment.name;
                dateInput.value = appointment.date;
                userIdInput.value = appointmentId;
                submitButton.textContent = 'Edit Appointment';
            })
            .catch(error => console.error('Error fetching appointment for edit:', error));
    }

    function editAppointment(appointmentId, appointment) {
        axios.put(`https://crudcrud.com/api/YOUR_CRUDCRUD_API_ENDPOINT/${appointmentId}`, appointment)
            .then(() => {
                userIdInput.value = '';
                submitButton.textContent = 'Add Appointment';
                fetchAppointments();
            })
            .catch(error => console.error('Error editing appointment:', error));
    }

    fetchAppointments();
});
