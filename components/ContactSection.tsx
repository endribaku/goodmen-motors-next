export default function ContactSection() {
  const contactInfo = [
    {
      icon: '/helper-icons/contact us/tabler-icon-map-pin-2.svg',
      title: 'ADRESA',
      lines: ['Rruga e Kosovarëve, Tiranë, Shqipëri'],
    },
    {
      icon: '/helper-icons/contact us/tabler-icon-phone.svg',
      title: 'TELEFONI',
      lines: ['+355 68 229 6290', '+355 68 938 8587'],
    },
    {
      icon: '/helper-icons/contact us/tabler-icon-mail.svg',
      title: 'EMAIL',
      lines: ['sales@goodmen.al'],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-1 text-[24px] font-normal text-black michroma">Na kontaktoni</h2>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-8 text-lg text-gray-700">
              Jeni gati të porosisni makinën tuaj të ëndrrave?
            </p>
            <a
              href="https://wa.me/355682296290"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-10 inline-flex items-center gap-2 headline bg-[#25D366] px-6 py-2 text-base font-normal tracking-[0.15em] text-[15px] text-white"
            >
              <img src="/helper-icons/contact us/whatsapp.svg" alt="" className="h-4 w-4" />
              KONTAKTO NË WHATSAPP
              <img src="/helper-icons/navbar/stroke(white).svg" alt="" className="" />
            </a>
            <div className="space-y-4">
              {contactInfo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <img src={item.icon} alt="" className="h-5 w-5 text-blue-500" />
                  <div className="mb-3">
                    <p className="font-normal text-[#4E4E4E] headline text-[15px] tracking-[0.07em]">
                      {item.title}
                    </p>

                    {item.lines.map((line, i) => (
                      <p key={i} className="mb-1 text-black text-[20px] font-normal headline">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-96 w-full overflow-hidden rounded-lg bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.160378694226!2d19.810948876455782!3d41.314125900535664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031aaacadf00f%3A0xebaebb708a954f13!2sPremium%20Logistics!5e1!3m2!1sen!2s!4v1764195873473!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

