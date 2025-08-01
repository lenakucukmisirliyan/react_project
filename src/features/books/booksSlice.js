import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async ({ query, lang, page = 1 }) => {
        const startIndex = (page - 1) * 20;
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes`,
            {
                params: {
                    q: query,
                    langRestrict: lang,
                    startIndex,
                    maxResults: 20,
                }
            }
        );
        return response.data.items || [];
    }
)

const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: [],
        status: "idle",  // Henüz hiçbir istek yapılmadı anlamında
        error: null,
        hasMore: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                const isFirstPage = action.meta.arg.page === 1;  // createAsyncThunk’a gönderdiğimiz parametredeki page'i alıyor
                const newBooks = action.payload;

                state.books = isFirstPage
                    ? newBooks                  // Eğer bu 1. sayfa ise önceki kitapları sil sadece yenileri koy
                    : [...state.books, ...newBooks]; // Eğer bu bir scroll ile gelen 2., 3. sayfa gibi bir şeyse öncekilere ekle
                state.hasMore = newBooks.length > 0;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export default booksSlice.reducer;