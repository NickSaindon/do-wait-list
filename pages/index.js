import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { ToastContainer, toast, Slide } from "react-toastify";

export default function Home() {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const [phone, setPhone] = useState("");

  async function onSubmitForm(values) {
    let config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };
    const response = await axios(config);

    try {
      if (response.status == 200) {
        reset();
        toast.success("Success! We will reachout as soon as the product is here.", {
          theme: "colored"
        });
      }
    } catch(err) {
      if (response.status == 500) {
        toast.error("Opps, something went wrong.  Please try again!", {
          theme: "colored"
        });
      }
    }
  }
  
  return (
    <div className="landing-container">
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={8000}
        hideProgressBar={true}
        className="toast-alert"
      />
      <header className="masthead">
        <div className="container">
            <div className="masthead-subheading">
              <Image src="/images/do-logo.png" width={140} height={200} alt="..." />
            </div>
            <div className="masthead-heading text-uppercase">Coming Soon!</div>
            <p>
              Be the first to experience Dragon Organics revolutionary Kratom products! Join our exclusive waitlist now and get priority access to our products, and an amazing launch discount.
            </p>
        </div>
      </header>
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              <div className="wrapper">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="contact-wrap">
                      <h3 className="mb-4 text-center">Don't Wait To Try It Out</h3>
                      <p>
                        At Dragon Organics, we bring you the freshest, highest-quality Kratom straight from our farms in Thailand to your table. Grown with care and harvested 
                        at peak potency, our Kratom delivers unmatched purity and a taste that's as authentic as the land it comes from. Experience the difference—farm-fresh, 
                        better-tasting, and worth the wait.                      
                      </p>
                      <p>
                        <b>*</b> This information is only used for the purpose of Dragon Organics wait list.
                      </p>
                      <form onSubmit={handleSubmit(onSubmitForm, phone, setPhone)} id="contactForm" name="contactForm" className="contactForm" noValidate>                        
                        <div className="row gy-3">
                          <div className="col-md-12">
                            <div className="form-group">
                              <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: true,
                                  minLength: 2,
                                  pattern: /^[\u0E00-\u0E7Fa-zA-Z\s]*$/,
                                }}
                                render={({ field }) => (
                                  <input 
                                    type="text" 
                                    className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                    id="name" 
                                    placeholder="Full Name" 
                                    {...field}
                                  />
                                )}
                              />
                              <div className="invalid-feedback">
                                {
                                  errors.name
                                    ? errors.name.type === 'minLength'
                                      ? 'Name must be longer than 1 character.'
                                        ? errors.name.type === 'pattern'
                                      : 'Name required'
                                        : 'No numbers or special symbols are allowed.'
                                    : ''
                                }
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: true,
                                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                }}
                                render={({ field }) => (
                                  <input 
                                    type="email" 
                                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                    id="email" 
                                    placeholder="Email" 
                                    {...field}
                                  />
                                )}
                              />
                              <div className="invalid-feedback">
                                {errors.email
                                    ? errors.email.type === 'pattern'
                                        ? 'Invalid email'
                                        : 'Email required'
                                    : ''
                                }
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <Controller 
                                name="phone"
                                control={control}
                                rules={{
                                  required: true,
                                  pattern: /^\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b$/,
                                }}
                                render={({ field: {name, onChange = (e) => setPhone(e.target.value), value = phone}}) => (
                                  <NumberFormat
                                    format="(###) ###-####"
                                    name={name}
                                    className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                                    value={value}
                                    id="phone" 
                                    placeholder="Phone Number" 
                                    onChange={onChange}
                                  />
                                )}
                              />
                              <div className="invalid-feedback">
                                {errors.phone
                                  ? errors.phone.type === 'pattern'
                                    ? 'Phone number is not completed'
                                    : 'Phone number is required'
                                  : ''
                                }
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group text-end">
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-black">
        <div className="container">
          <div className="row g-4 py-5"> 
            <div className="col-lg-6 col-md-12">
              <div className="text-center g-4 py-3">
                <Image src="/images/do-logo.png" width={125} height={174} alt="Computer and mobile devices"/>
              </div>
              <p>
                Must be of legal age to purchase these products. The manufacturer and distributors of these products assume 
                no liability for the misuse or misrepresentation of these products. Keep out of reach of children and pets. Avoid 
                contact with eyes. We do not ship to the following US states, counties, and cities where kratom is banned: Alabama, 
                Arkansas, Indiana, Rhode Island, Vermont, Wisconsin, Sarasota County (FL), Union County (NC), Denver (CO), and San Diego (CA).
              </p>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="footer-contact">
                <div className="social-media">
                  <ul>
                    <li>
                      <Link href="https://www.facebook.com/Dragon-Organics-61552383274313" passHref>
                        <a target="_blank" rel="noopener noreferrer">
                          <i className="bi bi-facebook" />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.instagram.com/dragonorganics?igshid=NzZlODBkYWE4Ng" passHref>
                        <a target="_black" rel="noopener noreferrer">
                          <i className="bi bi-instagram" />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.youtube.com/@DragonOrganics" passHref>
                        <a target="_black" rel="noopener noreferrer">
                          <i className="bi bi-youtube" />
                        </a> 
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="contact-info">
                  <div className="call-contact">
                    <h5>MON - FRI 9 AM - 5PM EST</h5>
                    <p>Contact Us:</p>
                    <Link href="https://dragon-organics.com/contact" passHref>
                      <a target="_black" rel="noopener noreferrer"className="btn btn-primary">Contact</a>
                    </Link>
                  </div>
                  <div className="email-contact">
                    <h5>Need Help With An Online Order?</h5>
                    <p>Email Us At:</p>
                    <p className="text-primary">dragonorganics.tm@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copy-right bg-primary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col text-center">
              <p>© 2025 Dragon Organics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
