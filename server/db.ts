import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || '' // Замените на ваш URI

export async function connectToDatabase() {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(MONGO_URI, {})
            console.warn('Connected to MongoDB')
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

