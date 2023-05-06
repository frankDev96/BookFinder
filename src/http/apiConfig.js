import { Platform } from "react-native"

const ENV = 'Development'
const urls = {
    Development: "https://www.googleapis.com/",
    Production: "https://www.googleapis.com/"
}

const baseUrl = urls[ENV]
const apiUrl = `${baseUrl}books/v1/`

const url = {
    baseUrl,
    apiUrl,
}
const urlEndPoints = {
    searchBooks: ({ text, startIndex = 0, maxResults, id }) => {
        let url = `volumes`
        if (text)
            url = `${url}?q=${text}&`
        if (startIndex)
            url = `${url}?startIndex=${startIndex}&`
        if (maxResults)
            url = `${url}?maxResults=${maxResults}&`
        if (id)
            url = `${url}/${id}`
        return url
    },
    userProfile: "users/profile-details",
    likes: (likeable_type = "event", likeable_id = 1) => {
        let url = `likes?`
        if (likeable_type)
            url = `${url}likeable_type=${likeable_type}&`
        if (likeable_id)
            url = `${url}likeable_id=${likeable_id}`
        return url
    },


}
export {
    url,
    urlEndPoints,
}