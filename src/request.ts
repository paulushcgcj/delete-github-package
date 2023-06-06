import axios from 'axios';

export const getProjectPackages = async (
  owner: string,
  repo: string
): Promise<string[]> => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/packages`
    );
    const packages = response.data.map((pkg: any) => pkg.name);
    return packages;
  } catch (error) {
    console.error('Error fetching packages:', error.message);
    return [];
  }
};

// Replace 'owner' and 'repo' with your specific project details
const owner = 'bcgov';
const repo = 'nr-forest-client-commons';

getProjectPackages(owner, repo)
  .then((packages) => {
    console.log('Packages:', packages);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
