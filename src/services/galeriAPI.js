import axios from 'axios'

const API_URL = "https://unhzbwdpoyjmjowjrlqp.supabase.co/rest/v1/galeri_media"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuaHpid2Rwb3lqbWpvd2pybHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjg5NDcsImV4cCI6MjA2NDYwNDk0N30.2ymSTiPj3rQwjW1dQks2nC1GfJbOaNyJP39u3nEoUmE"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const galeriAPI = {
    async fetchGaleri() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createGaleri(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },
    async deleteGaleri(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },
    async updateGaleri(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
        return response.data;
    }
}