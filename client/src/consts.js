const BaseUrl = process.env.BASE_URL || 'https://localhost:3000';

export const URLS = {
    BaseUrl,
    getMovies: '/movies/get',
    CreateMovie: '/movies/add',
    LikeMovie: '/movies/like',
};
