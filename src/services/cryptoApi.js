import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
    'X-RapidAPI-Key': 'cf236d1cc4msh657e55acaba8fe0p1f9c4fjsna31514124c9b',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl='https://coinranking1.p.rapidapi.com/';

//const createRequest=(url)=>({url,headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl, headers: cryptoApiHeaders }),
    endpoints: (builder) => ({
      getCryptos: builder.query({
        query: (count) => `/coins?limit=${count}`,
      }),
      getCryptoDetails: builder.query({
        query: (coinId) => `/coin/${coinId}`,
      }),
      getCryptohistory: builder.query({
        query: ({ coinId, timePeriod }) => `/coin/${coinId}/history?timePeriod=${timePeriod}`
      }),
      getExchanges:builder.query({
        query:()=>`/exchanges`
      })
    })
  });

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptohistoryQuery,
    useGetExchangesQuery
}=cryptoApi;