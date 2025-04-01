import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MovieContextProps {
    watchList: Movie[];
    setWatchList: React.Dispatch<React.SetStateAction<Movie[]>>;
    wishList: Movie[];
    setWishList: React.Dispatch<React.SetStateAction<Movie[]>>;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    ratingList: any[];
    setRatingList: React.Dispatch<React.SetStateAction<any[]>>;
    commentList: any[];
    setCommentList: React.Dispatch<React.SetStateAction<any[]>>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
    const [watchList, setWatchList] = useState<Movie[]>([]);
    const [wishList, setWishList] = useState<Movie[]>([]);
    const [language, setLanguage] = useState("fr");
    const [ratingList, setRatingList] = useState<any[]>([]);
    const [commentList, setCommentList] = useState<any[]>([]);
    return (
        <MovieContext.Provider value={{ watchList, setWatchList, wishList, setWishList, language, setLanguage, ratingList, setRatingList, commentList, setCommentList }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};