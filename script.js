const apiKey = 'ab8e8451bddd02190ff5172433e112f4'; // Replace with your API key
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Function to fetch and display news
async function fetchNews(query = 'technology') {
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles.length === 0) {
      newsContainer.innerHTML = '<p>No news found. Try a different search term.</p>';
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
    console.error('Error fetching news:', error);
  }
}

// Function to render news cards
function displayNews(articles) {
  newsContainer.innerHTML = ''; // Clear previous content

  articles.forEach(article => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';

    newsCard.innerHTML = `
      <img src="${article.image || 'https://via.placeholder.com/300'}" alt="News Image">
      <h2>${article.title}</h2>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;

    newsContainer.appendChild(newsCard);
  });
}

// Search button event listener
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  } else {
    alert('Please enter a search term.');
  }
});

// Fetch default news on page load
fetchNews();
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    fetchNews(category);
  });
});
const resetBtn = document.getElementById('reset-btn');

// Event listener for the reset button
resetBtn.addEventListener('click', () => {
  // Reload the page to reset the content
  window.location.reload();
});

