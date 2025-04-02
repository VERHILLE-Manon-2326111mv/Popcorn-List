import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [ratingList, setRatingList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    const saveData = async () => {
        try {
            const data = JSON.stringify({ watchList, wishList, ratingList, commentList });
            await AsyncStorage.setItem('movieData', data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const loadData = async () => {
        try {
            const data = await AsyncStorage.getItem('movieData');
            if (data) {
                const parsedData = JSON.parse(data);
                setWatchList(parsedData.watchList || []);
                setWishList(parsedData.wishList || []);
                setRatingList(parsedData.ratingList || []);
                setCommentList(parsedData.commentList || []);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const resetStorage = async () => {
        try {
            await AsyncStorage.removeItem('movieData');
            setWatchList([]);
            setWishList([]);
            setRatingList([]);
            setCommentList([]);
        } catch (error) {
            console.error("Erreur lors de la réinitialisation des données :", error);
        }
    };


    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        saveData();
    }, [watchList, wishList, ratingList, commentList]);

    return (
        <MovieContext.Provider value={{ watchList, setWatchList, wishList, setWishList, language, setLanguage, ratingList, setRatingList, commentList, setCommentList, resetStorage}}>
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