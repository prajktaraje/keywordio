import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'register/',
                    method: 'POST',
                    body: user,
                    header: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),

        loginUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'login/',
                    method: 'POST',
                    body: user,
                    header: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),

        studentview: builder.mutation({
            query: (user) => {
                return {
                    url: 'book_list/',
                    method: 'GET',
                    body: user,
                    header: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),

        addBook: builder.mutation({
            query: (user) => {
                return {
                    url: 'add_into_book_list/',
                    method: 'POST',
                    body: user,
                    header: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),



    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation, useLoginUserMutation, useStudentviewMutation, useAddBookMutation } = userAuthApi