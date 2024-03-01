import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";
const CryptoNewsHeaders={
        'X-RapidAPI-Key': 'cf236d1cc4msh657e55acaba8fe0p1f9c4fjsna31514124c9b',
        'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
}

const baseUrl='https://cryptocurrency-news2.p.rapidapi.com/v1';


const createRequest=(url)=>({url,headers:CryptoNewsHeaders})

export const cryptoNewsApi= createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoNews: builder.query({
            query:({count})=> createRequest('/coindesk'),
        }) 
    })
})


export const {
    useGetCryptoNewsQuery,
}=cryptoNewsApi;