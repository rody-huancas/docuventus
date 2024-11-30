import axios from 'axios';
import { URL_GITHUB } from '@/config';

export async function fetchGitHubUserData(username: string) {
  try {
    const url = `${URL_GITHUB}/${username}`
    
    const response = await axios.get(url);
    return {
      name       : response.data.name,
      bio        : response.data.bio,
      avatarUrl  : response.data.avatar_url,
      publicRepos: response.data.public_repos,
      followers  : response.data.followers,
      following  : response.data.following
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
}