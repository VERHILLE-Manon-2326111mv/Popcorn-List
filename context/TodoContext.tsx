import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TodoContextProps {
    watchList: Movie[];
    setWatchList: React.Dispatch<React.SetStateAction<Movie[]>>;
    wishList: Movie[];
    setWishList: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [watchList, setWatchList] = useState<Movie[]>([]);
    const [wishList, setWishList] = useState<Movie[]>([]);
    const [ratingList, setRatingList] = useState([]);
    const [commentList, setCommentList] = useState([]);


    return (
        <TodoContext.Provider value={{ watchList, setWatchList, wishList, setWishList , ratingList, setRatingList, commentList, setCommentList}}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};