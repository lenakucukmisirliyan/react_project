import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async ({ query, lang, freeOnly, orderBy, page = 1 }) => {
        const startIndex = (page - 1) * 20;
        const q = freeOnly ? `${query} free-ebooks` : query;
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes`,
            {
                params: {
                    q: query,
                    langRestrict: lang || undefined,
                    startIndex,
                    maxResults: 20,
                    printType: "books",
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
        hasMore: true,
        rawBooks: [],
    },
    reducers: {
        setSortedBooks(state, action) {
            if (action.payload === "az") {
                state.books = [...state.rawBooks].sort((a, b) =>
                    a.volumeInfo.title.localeCompare(b.volumeInfo.title)
                );
            } else if (action.payload === "za") {
                state.books = [...state.rawBooks].sort((a, b) =>
                    b.volumeInfo.title.localeCompare(a.volumeInfo.title)
                );
            } else {
                // önerilen
                state.books = [...state.rawBooks];
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                const isFirstPage = action.meta.arg.page === 1;  // createAsyncThunk’a gönderdiğimiz parametredeki page'i alıyor
                const newBooks = action.payload;

                if (isFirstPage) {
                    state.rawBooks = newBooks;
                } else {
                    state.rawBooks = [...state.rawBooks, ...newBooks];
                }

                state.hasMore = newBooks.length > 0;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const { setSortedBooks } = booksSlice.actions;
export default booksSlice.reducer;