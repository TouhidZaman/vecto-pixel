import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import app from "../../../../firebase.init";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

const auth = getAuth(app);

const SignUp = () => {
   const [user, setUser] = useState({});
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [validated, setValidated] = useState(false);

   const provider = new GoogleAuthProvider();

   //Getting user from google database
   const handleGoogleSignUp = () => {
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user;
            console.log(user);
            setUser(user);
         })
         .catch((error) => {
            console.error("Error", error);
         });
   };

   //handleFacebookSignUp
   const handleFacebookSignUp = () => alert("facebook sign-up is not set yet");

   //handleFacebookSignUp
   const handleGitHubSignUp = () => alert("github sign-up is not set yet");


   //Getting user email from email input
   const handleEmailInput = (event) => {
      console.log(event.target.value);
      setEmail(event.target.value);
   };

   //Getting user password from password input
   const handlePasswordInput = (event) => {
      console.log(event.target.value);
      setPassword(event.target.value);
   };

   //Handling Form submit
   const handleFormSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
         event.stopPropagation();
      } else {
         createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
               // Signed in
               const userInfo = result.user;
               console.log(userInfo);
               setUser(userInfo);
            })
            .catch((error) => {
               const errorMessage = error.message;
               console.error("error: ", errorMessage);
            });
      }
      setValidated(true);
      // console.log("form submitted");
   };



   return (
      <section id="sign-up" className={`container py-3 p-md-5`}>
         <div className="shadow rounded p-4 p-md-5 col-12 col-md-8 col-lg-6 mx-auto">
            <h2 className="mb-4 text-center">Please Sign-Up !!!</h2>
            <div className="social-media-signup">
               <h5 className="my-4 text-secondary">
                  Choose one of the following sign-up methods
               </h5>
               <div className="d-flex flex-column flex-md-row justify-content-between">
                  <button
                     className="btn btn-lite shadow-sm px-3 py-2 rounded-pill fw-bold text-primary"
                     onClick={handleGoogleSignUp}
                  >
                     <FontAwesomeIcon className="me-2" icon={faGoogle} size="lg" />
                     Google
                  </button>
                  <button
                     className="btn btn-lite shadow-sm my-3 my-md-0 px-3 py-2 rounded-pill fw-bold text-primary"
                     onClick={handleFacebookSignUp}
                  >
                     <FontAwesomeIcon className="me-2" icon={faFacebook} size="lg" />
                     Facebook
                  </button>
                  <button
                     className="btn btn-lite shadow-sm px-3 py-2 rounded-pill fw-bold text-primary"
                     onClick={handleGitHubSignUp}
                  >
                     <FontAwesomeIcon className="me-2" icon={faGithub} size="lg" />
                     GitHub
                  </button>
               </div>
            </div>
            <div className="manual-signup mt-4">
               <hr />
               <h5 className="my-4 text-secondary">Or, sign-up using email address</h5>
               <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Control
                        onBlur={handleEmailInput}
                        required
                        className="rounded-pill py-2 shadow-sm"
                        type="email"
                        placeholder="Enter your email"
                     />
                     <Form.Control.Feedback type="invalid" className="ps-2">
                        Email is required!
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Control
                        onBlur={handlePasswordInput}
                        required
                        className="rounded-pill py-2 shadow-sm"
                        type="password"
                        placeholder="Enter your password"
                     />
                     <Form.Control.Feedback type="invalid" className="ps-2">
                        Password is required!
                     </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 ps-2" controlId="formBasicCheckbox">
                     <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button
                     variant="primary"
                     className="px-5 fw-bold rounded-pill shadow-sm col-12"
                     type="submit"
                  >
                     Sign-Up
                  </Button>
               </Form>
            </div>
         </div>
      </section>
   );
};

export default SignUp;
