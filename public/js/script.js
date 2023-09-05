document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.muscles-helper');
  const workoutList = document.getElementById('workoutList');
  let selectedMuscle = null; // Initialize selectedMuscle to null.

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      workoutList.innerHTML = '';

      // Check which checkbox is checked and set selectedMuscle accordingly.
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedMuscle = checkbox.nextElementSibling.textContent.trim();
        }
      });

      if (!selectedMuscle) {
        workoutList.innerHTML = '<p>No muscle selected.</p>';
        return;
      }

      fetch(`/exercises/${selectedMuscle}`)
        .catch((error) => {
          console.error('Fetch error:', error);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          data.forEach((workout) => {
            const listItem = document.createElement('li');
            listItem.textContent = workout.name;
            workoutList.appendChild(listItem);
          });
        });
    });
  });
});
