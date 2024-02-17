import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://eshop-deve.herokuapp.com/api/v2',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAF fnPldd8QzWvgVQ'
        // 'Authorization': import.meta.env.VITE_APP_API_TOKEN
    }
})

export default axiosInstance
