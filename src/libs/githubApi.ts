import axios from 'axios';

export async function fetchGitHubUserData(username: string) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return {
      name: response.data.name,
      bio: response.data.bio,
      avatarUrl: response.data.avatar_url,
      publicRepos: response.data.public_repos,
      followers: response.data.followers,
      following: response.data.following
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
}