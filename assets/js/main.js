// main.js

// Function to fetch repositories from GitHub API
async function fetchRepositories(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`Failed to fetch repositories for ${username}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
}

// Function to display repositories
async function displayRepositories(username) {
    const repositories = await fetchRepositories(username);

    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = ''; // Clear previous content

    repositories.forEach(repo => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        const projectName = document.createElement('h3');
        projectName.textContent = repo.name;

        const projectDescription = document.createElement('p');
        projectDescription.textContent = repo.description || 'No description provided';

        const projectLink = document.createElement('a');
        projectLink.href = repo.html_url;
        projectLink.textContent = 'View on GitHub';
        projectLink.target = '_blank';

        projectElement.appendChild(projectName);
        projectElement.appendChild(projectDescription);
        projectElement.appendChild(projectLink);

        projectsContainer.appendChild(projectElement);
    });
}

// Call displayRepositories with your GitHub username 'FlameClientDev'
displayRepositories('FlameClientDev');
