import { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";

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
  phone: "",
  gender: "",
}

function App() {
  const [profile, setProfile] = useState(defaultProfileData);

  useEffect(() => {
    getProfileAccess();
  }, [])

  useEffect(() => {
    validateProfileData(profile);
  }, [profile])
  
  const getProfileAccess = async () => {
    try {
      const data = await ProfileService.getProfileAccess();
    } catch(err) {
      console.error(err)
    }
    const isValid = await ProfileService.validateProfileData(data);
  }

  const handleFirstNameChange = (e) => {
    const newProfile = {
      ...profile,
      firstName: e.target.value
    };
    setProfile(newProfile);
  }
  const handleLastNameChange = (e) => {

  }
  const handleEmailChange = (e) => {

  }
  const handlePhoneChange = (e) => {

  }
  return (
    <div className="App">
      <Header title={"React Starter Form"} />
      <form>
        <input value={profile.firstName} onChange={handleFirstNameChange} />
        <input value={profile.lastName} onChange={handleLastNameChange} />
        <input value={profile.email} onChange={handleEmailChange} />
        <input value={profile.phone} onChange={handlePhoneChange} />

        <div style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <label>Male</label>
          <input type="radio" name="gender" />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <label>Female</label>
          <input type="radio" name="gender" />
        </div>
      </form>
    </div>
  );
}

export default App;
