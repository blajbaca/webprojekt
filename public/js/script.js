document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.muscles-helper');
  const workoutList = document.getElementById('workoutList');
  const titleElement = document.getElementById('text-title');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', async () => {
      workoutList.innerHTML = '';
      titleElement.textContent = '';

      let selectedMuscle = null;

      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedMuscle = checkbox.nextElementSibling.textContent.trim();
        }
      });

      titleElement.textContent = `Workouts for: ${selectedMuscle}`;

      try {
        const response = await fetch(`/exercises/${selectedMuscle}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        data.forEach(workout => {
          const listItem = document.createElement('li');
          listItem.textContent = workout.name;

          const videoLink = document.createElement('a');
          videoLink.href = workout.exerciseLink;
          videoLink.textContent = 'Watch on YouTube';

          listItem.appendChild(videoLink);

          workoutList.appendChild(listItem);
        });
      } catch (error) {
        console.error('Fetch error:', error);
      }
    });
  });
});
