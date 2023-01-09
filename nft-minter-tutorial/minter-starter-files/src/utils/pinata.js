require("dotenv").config()
const key = "647e679db8bf17a8ec81"
const secret = "4873b69f8db628a5aedef39a44603be67160c0813777c926217aa204d168d649"

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    //making axios POST request to Pinata ⬇️
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            },
        })
        .then(function (response) {
            return {
                success: true,
                pinataUrl:
                    "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
            }
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
        })
}