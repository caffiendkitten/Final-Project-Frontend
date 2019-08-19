import React from 'react'


const AboutUs = () => {
    return <div>
        <h4>This web app was developed as part of the final project for my Flatiron School Bootcamp. </h4>
        <p>Before I started I developed an interest in cryptography and took this as an opportunity to learn more about it and encryption/decryption of data.</p>
        <p>It is not meant to be a super secure password manager but a learning tool to build off of and grow with.</p>
        <br></br>
        
        <h4>This project currently uses Bcrypt to encrypt each users login credentials.</h4>
            <span className="text-indent">
                <p>Bcrypt is a password hashing function that is based on the Blowfish cipher.</p>
                <p>Besides incorporating a salt to protect against rainbow table attacks, Bcrypt is adaptive and will increase its 
                    iterative count over time to become slower and more difficult to brute-force attack.</p>
                <p>The bcrypt algorithm is the result of encrypting the text "OrpheanBeholderScryDoubt" 64 times using Blowfish.</p>
            </span>
        <h4>This project also encrypts each user created credential with </h4>
        
        <h5>Check out some of my resources for more information</h5>
            <span className='text-indent'>
                <a href="https://en.wikipedia.org/wiki/Bcrypt">Becypt Wiki</a><br></br>
                <a href="https://medium.com/@tpstar/password-digest-column-in-user-migration-table-871ff9120a5">Password-digest with Brcypt</a>
            </span>
        
    </div>       
}
        
export default AboutUs