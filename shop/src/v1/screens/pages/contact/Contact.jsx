import React from "react";
import ButtonComponent from "./../../../components/ui/ButtonComponent";

const Contact = () => {
  return (
    <div className="container mx-auto py-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] rounded-md overflow-hidden">
        <div className="overflow-hidden shadow h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31374.445360476428!2d106.78733249999999!3d10.5943616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175396fbeeef013%3A0x5c927f382e68b945!2zQuG6v24gUGjDoCBBbiBUaOG7m2kgxJDDtG5nIC0gSGnhu4dwIFBoxrDhu5tj!5e0!3m2!1svi!2s!4v1756019633861!5m2!1svi!2s"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="h-full  bg-neutral-100/70 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Information</h2>

          <div className="space-y-6 text-sm md:text-base">
            <div>
              <p className="font-medium text-neutral-800">Phone:</p>
              <a href="tel:+16662348888" className="mt-1 inline-block text-neutral-700 hover:text-black">
                +1 666 234 8888
              </a>
            </div>

            <div>
              <p className="font-medium text-neutral-800">Email:</p>
              <a href="mailto:themesflat@gmail.com" className="mt-1 inline-block text-neutral-700 hover:text-black">
                themesflat@gmail.com
              </a>
            </div>

            <div>
              <p className="font-medium text-neutral-800">Address:</p>
              <p className="mt-1 text-neutral-700">
                2163 Phillips Gap Rd, West Jefferson, North Carolina, United States
              </p>
            </div>

            <div>
              <p className="font-medium text-neutral-800">Open Time:</p>
              <ul className="mt-1 space-y-1 text-neutral-700">
                <li>Mon – Sat: 7:30am – 8:00pm PST</li>
                <li>Sunday: 9:00am – 5:00pm PST</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Form liên hệ --> */}
      <div className="mt-10">
        <div className=" text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold">Get In Touch</h2>
          <p className="mt-3 text-sm md:text-base text-neutral-600">
            Use the form below to get in touch with the sales team
          </p>
        </div>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <label className="block">
              <span className="sr-only">Your Name</span>
              <input
                type="text"
                placeholder="Your Name*"
                required
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none focus:border-neutral-400 focus:ring-0"
              />
            </label>

            <label className="block">
              <span className="sr-only">Your Email</span>
              <input
                type="email"
                placeholder="Your Email*"
                required
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none focus:border-neutral-400 focus:ring-0"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="sr-only">Your Message</span>
              <textarea
                rows={6}
                placeholder="Your Message*"
                required
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none focus:border-neutral-400 focus:ring-0"
              />
            </label>
          </div>

          <div className="mt-6">
            <ButtonComponent
              title="Send Message"
              color="black"
              className="inline-flex items-center rounded-full bg-black px-6 md:px-8 py-3 text-white text-base font-medium hover:opacity-95 active:opacity-90"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
