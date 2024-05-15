import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";
const CryptoNewsHeaders={
    'X-RapidAPI-Key': 'a7d46e9decmsh3becb87f49601acp178c60jsn7ffe5c3b69f7',
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