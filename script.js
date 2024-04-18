
document.addEventListener('DOMContentLoaded', () => {
  const colorForm = document.getElementById('colorForm');
  const colorResult = document.getElementById('colorResult');
  const clearHistoryButton = document.getElementById('clearHistory');
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  function displaySearchHistory() {
      colorResult.innerHTML = '';
      searchHistory.forEach(entry => {
          const div = document.createElement('div');
          div.style.backgroundColor = entry.hex;
          div.textContent = `${entry.date} - ${entry.hex}`;
          colorResult.appendChild(div);
      });
  }
  function saveToLocalStorage(history) {
      localStorage.setItem('searchHistory', JSON.stringify(history));
  }
  async function getColorOfTheDay(date) {
      try {
          const response = await fetch(`https://colors.zoodinkers.com/api?date=${date}`);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching color:', error);
      }
  }
  colorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const dateInput = document.getElementById('dateInput').value;
      const colorData = await getColorOfTheDay(dateInput);
      const div = document.createElement('div');
      div.style.backgroundColor = colorData.hex;
      div.textContent = `${colorData.date} - ${colorData.hex}`;
      colorResult.appendChild(div);
      searchHistory.push(colorData);
      saveToLocalStorage(searchHistory);
  }); 

  displaySearchHistory();
  clearHistoryButton.addEventListener('click', () => {
      searchHistory = [];
      saveToLocalStorage(searchHistory);
      colorResult.innerHTML = '';
  });
});
