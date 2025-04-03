import {Genre} from "@/type/Genre";

export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_API_TMDB_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TMDB_KEY}`,
    },
};

export const fetchMovies = async ({
                                      query,
                                      language,
                                      genreId
                                  }: {
    query: string;
    language: string;
    genreId?: number | null;
}): Promise<Movie[]> => {
    let endpoint;

    if (genreId !== null) {
        endpoint = query
            ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=${language}&with_genres=${genreId}`
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=${language}`;
    } else {
        endpoint = query
            ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=${language}`
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&language=${language}`;
    }

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
};

export const fetchGenres = async (): Promise<Genre[]> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/genre/movie/list?language=fr-FR`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch genres: ${response.statusText}`);
    }

    const data = await response.json();
    return data.genres;
};

export const fetchMovieDetail = async (movieId: string, language : string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}&language=${language}`, {
                method: "GET",
                headers: TMDB_CONFIG.headers,
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch movie details: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};
