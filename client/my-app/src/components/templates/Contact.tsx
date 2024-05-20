import React from 'react'

const Contact: React.FC = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </form>
    </div>
  )
}

export default Contact
