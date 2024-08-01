import React, { useState } from 'react'
import ChatImage from '../assets/Support/chat.png'
import './Support.css'

const SupportPage = () => {
    let name, value;

    const [contactForm, setcontactForm] = useState({
        email: '', subject: '', message: ''
    });

    const handleInputChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setcontactForm({ ...contactForm, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log(contactForm);
    };

    return (
        <div className='supportPage w-fit mt-20 justify-center'>
            <img src={ChatImage} className='image sm:h-fit h-44' alt="Chat"></img>
            <div className='form h-fit outline outline-1 outline-gray-400 rounded-lg sm:w-fit w-9/12'>
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                        <form action="#" className="space-y-8">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                <input type="email" id="email" name='email' onChange={handleInputChange} value={contactForm.email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                                <input type="text" id="subject" name='subject' onChange={handleInputChange} value={contactForm.subject} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                                <textarea id="message" rows="6" name='message' onChange={handleInputChange} value={contactForm.message} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                            </div>
                            <button type="submit" onClick={handleSubmit} className="py-3 px-5 text-sm font-medium text-center rounded-lg bg-red-400 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-black">Send message</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SupportPage
