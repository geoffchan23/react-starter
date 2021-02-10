import { useState, useEffect } from 'react'
import './App.css'
import Header from "./Header"
import axios from "axios"
import { AsYouType } from "libphonenumber-js";

/**
 * TODO:
 * - frame out the rest of the form
 * - Use an API from this list to pre-fill the form data https://github.com/public-apis/public-apis (you can change the inputs to match the API you decide to use)
 * - Pre-populate the data using the useEffect hook
 * - Validate the inputs (e.g. email/phone must be valid format) and display a warning if it is not valid
 * - Create a button to save the form
 * - Create a button to clear the form data
 */

const defaultProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: new AsYouType("US").input(""),
  gender: "male",
  dob: "",
}

const genderOptions = [
  "male",
  "female",
  "X",
]

function App() {
  const [profile, setProfile] = useState(defaultProfileData)
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    getUser();
  }, [])
  
  const getUser = async () => {
    const response = await axios.get("https://randomuser.me/api/?nat=CA")
    console.log(response.data.results[0]);

    const {
      phone,
      email,
      gender,
      name,
    } = response.data.results[0]

    const {
      first,
      last,
    } = name

    setProfile({
      firstName: first,
      lastName: last,
      phone: new AsYouType("US").input(phone),
      email,
      gender,
    })
  }

  const handleFirstNameChange = (e) => {
    setProfile({
      ...profile,
      firstName: e.target.value
    })
  }

  const handleLastNameChange = (e) => {
    setProfile({
      ...profile,
      lastName: e.target.value
    })
  }

  const handleEmailChange = (e) => {
    setEmailValid(validateEmail(e.target.value))
    setProfile({
      ...profile,
      email: e.target.value,
    })
  }

  const handlePhoneChange = (e) => {
    const nextValue = e.target.value
  
    if (nextValue.length >= 15 && nextValue.slice(0, 1) !== "1") {
      return false
    } else {
      let newVal

      if (profile.phone && profile.phone.indexOf(")") === profile.phone.length - 1) {
        newVal = nextValue
      } else {
        newVal = new AsYouType("US").input(nextValue)
      }

      setPhoneValid(validatePhoneNumber(newVal))
      setProfile({
        ...profile,
        phone: newVal,
      })
    }
  }

  const handleGenderChange = (e) => {
    setProfile({
      ...profile,
      gender: e.target.value,
    })
  }

  const handleSubmit = () => {
    console.log(profile)
  }

  const clearForm = () => {
    setProfile(defaultProfileData)
    setPhoneValid(false)
  }

  return (
    <div className="App">
      <Header title={"React Starter Form"} />
      <form>
        <input
          autoComplete="off"
          placeholder="First Name" 
          value={profile.firstName} 
          onChange={handleFirstNameChange} 
          className={profile.firstName === "" ? "invalid" : "valid"} 
        />
        <input
          autoComplete="off"
          placeholder="Last Name" 
          value={profile.lastName} 
          onChange={handleLastNameChange} 
          className={profile.lastName === "" ? "invalid" : "valid"} 
        />
        <input
          autoComplete="off"
          placeholder="Email" 
          value={profile.email} 
          onChange={handleEmailChange} 
          className={emailValid ? "valid" : "invalid"} 
        />
        <input
          autoComplete="off"
          placeholder="Phone Number" 
          value={profile.phone} 
          onChange={handlePhoneChange} 
          className={phoneValid ? "valid" : "invalid"} 
        />
        <select onChange={handleGenderChange} value={profile.gender}>
          {
            genderOptions.map(gender => <option key={gender} value={gender}>
              {gender}
            </option>)
          }
        </select>
      </form>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <button onClick={handleSubmit} style={{ marginRight: 10, backgroundColor: "lightblue" }}>
          Submit
        </button>
        <button onClick={clearForm}>
          Clear
        </button>
      </div>
    </div>
  )
}

function validatePhoneNumber(phoneNumber) {
  if (
    (phoneNumber.length === 14 && phoneNumber.slice(0, 1) !== "1") ||
    phoneNumber.length === 16
  ) {
    return true
  } else {
    return false
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default App;
