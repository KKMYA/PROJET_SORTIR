import axios from 'axios'

const baseUrl = 'http://localhost:8000'

const getParticipantsById = async(idParticipants, idSortie) => {
    const url = baseUrl + '/participants/sortie/'+idSortie;
    const data = {
        idSortie: idSortie,
        idParticipants: idParticipants // Supposant que ceci est un tableau ou un objet
    };
    try {
        const response = await axios.post(url, data);
        let participants = response.data;
        return participants;
    } catch(error){
        console.error(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
}

export default {getParticipantsById};