import axios from "axios"
import { API_URL, DEMO_WALLET } from '../config';

export const play = async (wallet: string, token: string, amount: string) => {

    try {
        console.log("api data", wallet, token, amount)
        const res = await axios.post(`${API_URL}/play`, {
            wallet: wallet,
            token: token,
            score: amount
        })
        console.log("backend api res:", res.data);
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
) => {
    try {
        console.log("get data>>>>", address, nebula_balance, dum_balance,  konda_balance, ada_balance)
        const res = await axios.post(`${API_URL}/deposit`, {
            address,
            DEMO_WALLET,
            txHash,
            nebula_balance,
            dum_balance,
            konda_balance,
            ada_balance
        })
        console.log("deposit resutl", res);
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
    ada: number
) => {
    try {
        const res = await axios.post(`${API_URL}/withdrawFund`, {
            wallet,
            nebula,
            dum,
            konda,
            ada
        })
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}
export const getAmount = async (wallet: string) => {
    if(wallet === undefined) return null
    try {
        console.log("get amount wallet:", wallet);
        const res = await axios.post(`${API_URL}/getAmount`, { wallet })
        console.log("==========================================")
        console.log("get amount res", res, wallet);
        return res.data

    } catch (error) {
        console.log(error)
    }
}

