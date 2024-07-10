import mongoose, { Document, Schema } from 'mongoose'

interface IWallet extends Document {
    address: string
    currentBalance: number
    targetBalance: number
    goal: string
    autoUpdate: boolean
}

const walletSchema: Schema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    currentBalance: {
        type: Number,
        default: 0,
    },
    targetBalance: {
        type: Number,
        required: true,
    },
    goal: {
        type: String,
        default: ''
    },
    autoUpdate: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model<IWallet>('Wallet', walletSchema)
