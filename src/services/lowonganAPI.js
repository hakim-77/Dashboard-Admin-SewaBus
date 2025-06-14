import axios from 'axios'

const API_URL = "https://zrsoqernuagviwcstnda.supabase.co/rest/v1/job"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyc29xZXJudWFndml3Y3N0bmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxODkyODgsImV4cCI6MjA2NDc2NTI4OH0.VsRyFUWPhKWFx0ETSpSRu0KJOc92vaKVoaZaLPCmj-o"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const lowonganAPI = {
    async fetchLowongan() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createLowongan(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },
    async deleteLowongan(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },
    async updateLowongan(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
        return response.data;
    }
}