import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  // "withCredentials: true" sends cookies
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        res.data
      })
      .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  getDecks() {
    return service
      .get('/decks')
      .then(res => res.data)
      .catch(errHandler)
  },

  getMyDecks() {
    return service
      .get('/users/my-decks')
      .then(res => res.data)
      .catch(errHandler)
  },

  getDeckDetail(id) {
    return service
      .get('/decks/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },

  updateDeck(id, body) {
    return service
      .put('/decks/'+id, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  postDecks(data) {
    return service
      .post('/decks', data)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteDeck(id) {
    return service
      .delete('/decks/'+id)
      .then(res => res.data)
      .catch(errHandler)
  },

//CARDS CALLS
getCards() {
  return service
    .get('/cards')
    .then(res => res.data)
    .catch(errHandler)
},

getCardDetail(id) {
  return service
    .get('/cards/'+id)
    .then(res => res.data)
    .catch(errHandler)
},

updateCard(id, body) {
  return service
    .put('/cards/'+id, body)
    .then(res => res.data)
    .catch(errHandler)
},

// postCards(data) {
//   return service
//     .post('/cards', data)
//     .then(res => res.data)
//     .catch(errHandler)
// },
copyCards(cardId, deckId) {
   console.log('DECKID',deckId)
   console.log('CARDID',cardId)
  return service
  .post(`/cards/${deckId}/copy-card/${cardId}`)
  .then(res => res.data)
  .catch(errHandler)
},

postCards(data, deckId) {
  return service
    .post(`/cards/${deckId}`, data)
    .then(res => res.data)
    .catch(errHandler)
},

deleteCard(id) {
  return service
    .delete('/cards/'+id)
    .then(res => res.data)
    .catch(errHandler)
},

//

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler)
  },

  //PROFILE CALLS

  getProfile() {
    return service
      .get('/users/profile')
      .then(res => res.data)
      .catch(errHandler)
  },
  

  editProfile(body) {
    return service
      .put('/users/profile', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteProfile() {
    return service
      .delete('/users/my-account')
      .then(res => res.data)
      .catch(errHandler)
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file)
    return service
      .post('/users/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },

//   getLoggedInUserSync() {
//     return JSON.parse(localStorage.getItem("user"));
//   },

//  getFollowing() {
//     return service
//       .get("/users/following")
//       .then(res => res.data)
//       .catch(errHandler);
//   },

//   getFollowers() {
//     return service
//       .get("/users/followers")
//       .then(res => res.data)
//       .catch(errHandler);
//   },

//   postFollowStatus(id) {
//     return service
//       .post(`/users/${id}/follow`)
//       .then(res => res.data)
//       .catch(errHandler);
//   },


  // addPicture(file) {
  //   const formData = new FormData()
  //   formData.append("picture", file)
  //   return service
  //     .post('/endpoint/to/add/a/picture', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },
}
