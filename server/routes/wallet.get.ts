import axios from 'axios'
import Wallet from '../models/Wallet'
import { connectToDatabase } from '../db'

const USDT_CONTRACT_ADDRESS = '0x55d398326f99059ff775485246999027b3197955'

export default defineEventHandler(async (event) => {
    try {
        await connectToDatabase()
        let wallet = await Wallet.findOne({
            address: process.env.DEFAULT_ADDRESS
        })

        if (!wallet) {
            wallet = new Wallet({
                address: process.env.DEFAULT_ADDRESS,
                currentBalance: 0,
                targetBalance: parseFloat(process.env.DEFAULT_TARGET_BALANCE!),
                goal: process.env.DEFAULT_GOAL,
                autoUpdate: false
            })
            await wallet.save()
        }

        const query = getQuery(event)
        if (query?.forceUpdate || wallet?.autoUpdate) {
            const urlBalance = `${process.env.BSCSCAN_URI}?module=account&action=tokenbalance`
            const response = await axios.get(
                `${urlBalance}&contractaddress=${USDT_CONTRACT_ADDRESS}&address=${wallet?.address}&apikey=${process.env.BSCSCAN_API_KEY}`
            )
            wallet.currentBalance = parseFloat(response.data.result) / 1e18 // Wei to USDT
            await wallet.save()
        }

        return wallet
    } catch (error) {
        console.error(error)
        throw error
    }
})

