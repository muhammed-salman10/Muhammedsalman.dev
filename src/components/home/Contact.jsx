"use client";
import Image from "next/image";
import Link from "next/link";
import FormSubmission from "../common/contact-form/FormSubmission";
import SocialMediaIcons from "../common/social-media/SocialMediaIcons";
export default function Contact() {
  return (
    <section className=" py-16 lg:py-10">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-[24px] md:text-4xl font-[700] mb-6 text-secondary font-primary">
          Let’s Work Together
        </h2>

        <p className="text-primary text-[15px] md:text-[18px] font-secondary leading-relaxed mb-8 mt-4 px-4 lg:px-0">
          Have an idea, project, or collaboration in mind? I’d love to hear from
          you. Share your thoughts and I’ll get back to you as soon as possible.
        </p>
      </div>
      <div className="min-h-screen flex items-center justify-center lg:px-4 px-4 ">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT SIDE GLASS FORM */}
          <div
            className="
                w-full md:w-[75%] order-2 md:order-1
                p-8 sm:p-10
                rounded-3xl
                bg-white/60 
                backdrop-blur-2xl
                border border-white/40
                shadow-2xl
                relative
              "
          >
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-black/10 rounded-full blur-2xl" />

            <h2 className="lg:text-3xl text-[22px] font-semibold mb-4 font-primary text-secondary">
              Let’s Talk !
            </h2>

            <p className="text-secondary mb-8 font-secondary lg:text-[18px] text-[14px]">
              Have a project in mind? Feel free to send a message.
            </p>
            <FormSubmission />
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative w-full md:w-[45%] h-[450px] md:h-[450px] order-1 md:order-2">
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-black/10 rounded-full blur-3xl" />

            <div className="absolute top-0 right-0 md:right-20 w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/contact.png"
                alt="Contact"
                fill
                className="object-cover hover:scale-105 transition duration-700 "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl sm:text-2xl font-semibold font-primary">
                  Let’s Build Something Amazing
                </h3>

                <p className="text-sm opacity-80 mt-2 font-secondary">
                  Clean design. Modern development.
                </p>

                {/* Social Media Icons */}
                <div className="flex gap-4 mt-4">
                  <SocialMediaIcons />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
