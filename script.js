const apiKey = "ab8e8451bddd02190ff5172433e112f4"; // Your API key
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const categoryButtons = document.querySelectorAll(".category-btn");
const resetBtn = document.getElementById("reset-btn");

// Function to fetch and display news
async function fetchNews(query = "technology") {
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&token=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Debugging log

    // Fix: Safely handle case when articles are missing
    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = `<p>No news found for "${query}". Try another topic.</p>`;
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = "<p>Error fetching news. Please try again later.</p>";
    console.error("Error fetching news:", error);
  }
}

// Function to render news cards
function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = "";

  articles.forEach(article => {
    const card = `
      <div class="news-card">
        <img src="${article.image}" alt="">
        <div class="news-content">
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read More →</a>
        </div>
      </div>
    `;
    newsContainer.innerHTML += card;
  });
}

// Search news
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  } else {
    alert("Please enter a search term.");
  }
});

// Category buttons
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    fetchNews(category);
  });
});

// Reset news
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  fetchNews(); // Load default news again
});

// Load default news on page load
fetchNews();

});



