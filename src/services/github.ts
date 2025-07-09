const USER = 'facebook';
const PER_PAGE = 20;

const list = async (page = 1, query = '') => {
  let url: string;
  if (query.trim().length > 0) {
    const encoded = encodeURIComponent(`${query} in:name user:${USER}`);
    url = `https://api.github.com/search/repositories?q=${encoded}&per_page=${PER_PAGE}&page=${page}`;
  } else {
    url = `https://api.github.com/users/${USER}/repos?per_page=${PER_PAGE}&page=${page}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('GitHub API error');

  const data = await response.json();
  return Array.isArray(data) ? data : data.items;
};

export default { list }; 