import axios from "axios"
import { API_URL, DEMO_WALLET } from '../config';

export const play = async (wallet: string, token: string, amount: string) => {

    try {
        const res = await axios.post(`${API_URL}/play`, {
            wallet: wallet,
            token: token,
            score: amount
        })
        return res.data
    } catch (error) {
        console.log(error)
    }

}

export const depositFund = async (
    address: string,
    DEMO_WALLET: string,
    txHash: string,
    nebula_balance: number,
    dum_balance: number,
    konda_balance: number,
    ada_balance: number,
    snek_balance: number,
) => {
    try {
        const res = await axios.post(`${API_URL}/deposit`, {
            address,
            DEMO_WALLET,
            txHash,
            nebula_balance,
            dum_balance,
            konda_balance,
            ada_balance,
            snek_balance
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const withdrawFund = async (
    wallet: string,
    nebula: number,
    dum: number,
    konda: number,
    ada: number,
    snek: number
) => {
    try {
        const res = await axios.post(`${API_URL}/withdrawFund`, {
            wallet,
            nebula,
            dum,
            konda,
            ada,
            snek
        })
        console.log(res);
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getAmount = async (wallet: string) => {
    if(wallet === undefined) return null
    try {
        const res = await axios.post(`${API_URL}/getAmount`, { wallet })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const getRankingData = async () => {
    try {
        const res = await axios.post(`${API_URL}/getRanking`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

// export const getTransaction = async (wallet: string) => {
//     if(wallet === undefined) return null
//     try {
//         const res = await axios.post(`${API_URL}/getTransaction`, {wallet})
//         return res.data
//     } catch (error) {
//         console.log(error)
//     }
// }

