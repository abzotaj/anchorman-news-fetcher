import React, {useState, useEffect, useCallback, useMemo} from "react";
import axios from "axios";
import {NewsContextProvider} from "../contexts/NewsContext";
import Navbar from "./components/Navbar";
import NewsPage from "./components/News";
import AppInput from "./components/AppInput.jsx";
import { useForm } from 'react-hook-form';
import AppButton from "./components/AppButton.jsx";

const API_BASE_URL = "http://localhost:3000";

const App = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('jwt'));
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNewsItems, setFilteredNewsItems] = useState([]);

    const fetchNews = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/news`);
            setNewsItems(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const filteredNews = useMemo(() => {
        return newsItems.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [newsItems, searchQuery]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredNewsItems(filteredNews);
        } else {
            setFilteredNewsItems(newsItems);
        }
    }, [filteredNews, newsItems, searchQuery]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    if (!isLoggedIn) {
        return (
            <>
                <div className='ttg-signin-form-container'>
                    <form
                        className={'ttg-signin-form'}
                        onSubmit={handleSubmit()}
                        autoComplete='autocomplete_off_hack_xfr4!k'
                    >
                        <AppInput
                            {...register('email', {
                                required: true,
                                validate: (value) =>
                                    UtilityService.isValidEmail(value) || 'You must enter a valid email address',
                                maxLength: 96,
                            })}
                            data-ttg-max-length={96}
                            label={'Email address'}
                            containerClassName={'w-full'}
                            errors={errors}
                            onBlur={(e) => {
                                setValue('email', e.target.value.trim());
                            }}
                            id={'ttg-signin-email-id'}
                        />
                        <AppInput
                            label={'Password'}
                            type={'password'}
                            containerClassName={'w-full'}
                            errors={errors}
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <AppButton
                            type='submit'
                            className={'btn btn-primary w-full my-4'}
                            text={'Login'}
                            loading={isLoading}
                            id={'ttg-login-submit-btn'}
                        />
                    </form>
                </div>
            </>
        );
    }


    return (
        <NewsContextProvider
            value={{
                newsItems,
                setNewsItems,
                isLoading,
                setLoading,
                fetchNews,
                setSearchQuery,
                searchQuery,
                filteredNewsItems,
                setFilteredNewsItems,
            }}
        >
            <Navbar/>
            <NewsPage key={filteredNewsItems.length}/>
        </NewsContextProvider>
    );
};

export default App;
