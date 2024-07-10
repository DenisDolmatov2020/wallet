import { eventHandler } from 'h3'
import Wallet from '../models/Wallet'

export default eventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { address, currentBalance, targetBalance, goal, autoUpdate } = body

        let updatedWallet = await Wallet.findOneAndUpdate(
            { address: address },
            { currentBalance, targetBalance, goal, autoUpdate },
            { new: true }
        )

        if (!updatedWallet) {
            updatedWallet = new Wallet({
                address,
                currentBalance,
                targetBalance,
                goal,
                autoUpdate
            })
            await updatedWallet.save()
        }

        return updatedWallet
    } catch (error) {
        console.error('Error updating wallet:', error)
        throw error
    }
})
