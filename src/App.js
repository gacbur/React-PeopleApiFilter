import React, { useState, useEffect } from 'react';
import Modal from './components/Modal'
import './App.css';

function App() {

  const [users, setUsers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [currentInspectedUser, setCurrentInspectedUser] = useState()
  const [searchNumber, setSearchNumber] = useState(1)
  const [enterSearchNumber, setEnterSearchNumber] = useState(false)

  const handleGetUsersData = async (searchNumber) => {
    const API = `https://randomuser.me/api/?results=${searchNumber}`

    const response = await fetch(API)
    if (response.ok) {
      const responseJson = await response.json()
      setUsers(responseJson.results)
    }
    else {
      console.log("połączenie nie przebiegło prawidłowo")
    }
  }

  useEffect(() => {
    handleGetUsersData(searchNumber)
  }, [enterSearchNumber])

  const handleShowModal = (user) => {
    setOpenModal(true)
    setCurrentInspectedUser(user)
  }

  const handleShowUsers = (e) => {
    e.preventDefault()
    setEnterSearchNumber(prevState => !prevState)
  }

  return (
    <div className="app-cnt">
      <div className="search-section">
        <h5>Enter how many users to display: (max 50!)</h5>
        <form onSubmit={handleShowUsers}>
          <input
            min="1"
            max="50"
            type="number"
            placeholder="Users number"
            value={searchNumber}
            onChange={(e) => setSearchNumber(e.target.value)}
            required
          ></input>
          <button>Enter</button>
        </form>
      </div>
      <div className="display-section">
        {users.map(user => (
          <>
            {openModal ? <Modal currentInspectedUser={currentInspectedUser} modalOff={() => setOpenModal(false)} user={user} /> : null}
            <div className="user-card" key={user.login.uuid}>
              <div className="user-profile-pic">
                <img src={user.picture.large} alt="person"></img>
              </div>
              <div className="user-content">
                <p>Name: <strong>{user.name.first}</strong></p>
                <p>Surname: <strong>{user.name.last}</strong></p>
                <p>Age: <strong>{user.dob.age}</strong></p>
              </div>
              <button onClick={() => handleShowModal(user)} className="user-btn">See details</button>
            </div>
          </>
        ))}

      </div>
    </div>
  );
}

export default App;
