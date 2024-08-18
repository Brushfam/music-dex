import { DocsTextList } from "@/components/DocsTextList/DocsTextList";

export const introductionEN = [
  {
    text: (
      <p>
        MusicDex respects your privacy and is committed to collecting,
        maintaining, and using personal information about you responsibly.
      </p>
    ),
  },
  {
    text: (
      <p>
        Please read this policy carefully to be clear on how we will treat your
        personal information as you use our website.
      </p>
    ),
  },
  {
    text: (
      <p>
        LIMITED LIABILITY COMPANY “MUSICDEX” is a legal entity incorporated and
        existing under the laws of Ukraine, identification code 45327185, having
        its registered office at 01104, Ukraine, Kyiv city, Bolsunovska street,
        building 13-15 (collectively, “MusicDex,” “we,” or “our”). MusicDex is a
        controller of your data. If you have any questions about your privacy or
        this policy, please contact us at{" "}
        <span style={{ color: "white" }}>musicdex.inc@gmail.com</span>.
      </p>
    ),
  },
];

export const introductionUK = [
  {
    text: (
      <p>
        MusicDex поважає вашу конфіденційність і зобов&#39;язується збирати,
        зберігати і використовувати особисту інформацію про вас відповідально.
      </p>
    ),
  },
  {
    text: (
      <p>
        Будь ласка, уважно прочитайте цю політику, щоб зрозуміти, як ми будемо
        поводитися з вашою особистою інформацією під час користування нашим
        сайтом.
      </p>
    ),
  },
  {
    text: (
      <p>
        ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ “MUSICDEX” є юридичною особою,
        створеною та діючою відповідно до законодавства України, код ЄДРПОУ
        45327185, що має юридичну адресу за адресою: 01104, Україна, м. Київ,
        вулиця Болсуновська, буд. 13-15 (разом – “MusicDex”, “ми” або “наш”).
        MusicDex є контролером ваших даних. Якщо у вас є будь-які питання щодо
        конфіденційності або цієї політики, будь ласка, звертайтеся до нас за
        адресою <span style={{ color: "white" }}>musicdex.inc@gmail.com</span>.
      </p>
    ),
  },
];

export const pointsEN = [
  {
    title: <p>1. Collection of the information</p>,
    point: [
      {
        text: (
          <p>
            We may collect different kinds of personal information about you in
            the course of our business, including through your use of our
            website, when you contact or request information from us, when you
            engage in our services, or as a result of your relationship with one
            or more of our staff and clients.
          </p>
        ),
      },
      {
        text: <p>The personal information that we process includes:</p>,
      },
      {
        text: DocsTextList([
          "basic information, such as your first name, middle name, maiden name, last name, marital status, title, date of birth, passport number, photographic identification, and gender;",
          "contact information, such as your postal address, email address, and telephone number;",
          "financial information, such as your billing address, bank account, and payment card details, your crypto wallet address;",
          "technical information, such as information from your visits to our website or applications or concerning materials and communications we send to you electronically;",
          "professional information, such as your job title, the name of your employer, your previous positions, and professional experience;",
          "services information, such as payments to and from you and other details of services you have purchased from us;",
          "marketing and communications information, such as information you provide to us to attend meetings and events, your marketing and communication preferences, and your feedback and survey responses;",
          "any other information relating to you that you may provide to us.",
        ]),
      },
    ],
  },

  {
    title: <p>2. How is information collected?</p>,
    point: [
      {
        text: (
          <p>
            We use different methods to collect personal information from and
            about you, including through the channels below.
          </p>
        ),
      },
      {
        text: DocsTextList([
          "Direct interactions: we gather information about you when you interact with us directly (i) by corresponding with us by email or post, (ii) by speaking to us in person or over the telephone, and (iii) through electronic portals and platforms, or (iv) by filling in forms on our website.",
          "Website: when you visit our websites, we automatically collect, store and use technical information about your equipment and interaction with our website. We collect this personal data using cookies, server logs, and other similar technologies. " +
            "The personal data includes your preferences, operating systems, browser software, IP addresses, and the URL clickstreams to, through, and from our website, including location, date, and time. " +
            "If you want to block cookies, you may be able to do this through the settings in your browser for each browser you use and each device you use to access the internet. However, please be aware that some areas of our website may not work if your browser does not accept cookies.",
          "Third-party sources: we may receive personal information about you from third parties when we provide our client with services or other parties send us your data to enable the provision of those services; we conduct our “know your customer” and further background checks; " +
            "you provide your data to a third party to share it with us; we interact with governmental or regulatory bodies or other about you or on your behalf.",
          "Publicly available sources: we may collect information about you from public registers and databases, online social media, and social networking services.",
        ]),
      },
    ],
  },

  {
    title: <p>3. Use of information</p>,
    point: [
      {
        text: (
          <p>
            We will only use your personal information reasonably and where we
            have a lawful reason to do so. We will, therefore, only use your
            data to:
          </p>
        ),
      },
      {
        text: DocsTextList([
          "consider whether we can pursue specific business development initiatives;",
          "comply with our legal obligations to identify and verify the identity of our clients and their beneficial owners and to identify and assess the risks of money laundering and terrorist financing which may apply to our business;",
          "deliver our services to you and the organization you work for if you are a client;",
          "run our business (e.g., carry out administrative or operational processes, including recruitment);",
          "maintain and develop our business relationship with you;",
          "improve our services and products to you if you or the organization you work for are a client or prospective client;",
          "identify services you may be interested in;",
          "send you marketing and invite you to events;",
          "monitor and analyze our business; or",
          "process and respond to requests, inquiries, or complaints received from you.",
        ]),
      },
      {
        text: <p>We use your personal information on the following basis:</p>,
      },
      {
        text: DocsTextList([
          "it is necessary for the performance of a contract with you or the organization you work for;",
          "it is necessary to comply with legal and regulatory obligations;",
          "you have provided your consent to processing your data; or",
          "if we (or a third party) have a legitimate interest, provided that your fundamental rights do not override such interests.  The legitimate interests include providing our  services described in MusicDex`s Terms and Conditions, running our business, and marketing relevant services directly to you.",
        ]),
      },
    ],
  },

  {
    title: <p>4. Retention of the Information</p>,
    point: [
      {
        text: (
          <p>
            We will only retain your personal information for as long as is
            necessary for the purpose for which it was collected, including to
            comply with any legal, regulatory, accounting, or reporting
            requirements.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>5. Your Rights</p>,
    point: [
      {
        text: (
          <p>
            If You have consented to our use of personal information about You
            for a specific purpose, You have the right to change Your consent at
            any time. In certain circumstances, You have rights under the GDPR
            in relation to Your personal information.
          </p>
        ),
      },
      {
        text: DocsTextList([
          "Request access to Your personal information. You may have the right to request access to any personal information We hold about You as well as related information, " +
            "including the purposes for processing the personal information, the recipients or categories of recipients with whom the personal information has been shared, where possible, " +
            "the period for which the personal information will be stored, the source of personal information, and the existence of any automated decision making.",
          "Request correction of Your personal information. You may have the right to obtain without undue delay the rectification of any inaccurate personal information We hold about You.",
          "Request erasure of Your personal information. You may have the right to request that personal information held about You is deleted.",
          "Request restriction of processing Your personal information. You may have the right to prevent or restrict processing of Your personal information.",
          "Request transfer of Your personal information. You may have the right to request transfer of personal information directly to a third party where this is technically feasible.",
        ]),
      },
      {
        text: (
          <p>
            These data privacy rights do not apply to MusicDex where We process
            Your personal information as a data processor on behalf of our
            partners. Where this is the case, any request to exercise Your
            European data privacy rights should be directed to our partners
            (i.e. the data controllers).
          </p>
        ),
      },
      {
        text: (
          <p>
            In the limited circumstances where you may have provided your
            consent to collect, process, and transfer your personal information
            for a specific purpose, you have the right to withdraw your consent
            for that specific processing at any time. Once we have received
            notification that you have withdrawn your consent, we will no longer
            process your information for the purposes you originally agreed to
            unless we have another legitimate basis for doing so in law. If you
            would like to exercise any of these rights, please get in touch with
            us at <span style={{ color: "white" }}>musicdex.inc@gmail.com</span>
            . Before assessing your request, we may request additional
            information to identify you. If you do not provide the requested
            information and, as a result, we are not in a position to identify
            you, we may refuse to action your request.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>6. Disclosure of the information</p>,
    point: [
      {
        text: <p>We may share your personal information with:</p>,
      },
      {
        text: DocsTextList([
          "our professional advisers and auditors;",
          "third parties engaged in the course of the services we provide to clients, such as local counsel, mediators, consultants, or experts;",
          "suppliers to whom we outsource certain support services such as word processing, translation, photocopying, and document review;",
          "service providers including IT, cloud storage, data room, case management service providers, and event organizers; or",
          "regulatory authorities, courts, tribunals, government agencies, law enforcement agencies, and any other third party to honor a legal, regulatory or professional obligation.",
        ]),
      },
    ],
  },

  {
    title: <p>7. Data protection</p>,
    point: [
      {
        text: (
          <p>
            We protect your data and implement appropriate technical and
            organizational security measures to protect it from unauthorized
            access, improper use or disclosure, unauthorized modification or
            unlawful destruction, or accidental loss. All partners, staff, and
            third-party service providers who have access to confidential
            information (including personal information) are subject to
            confidentiality obligations. However, the transmission of
            information via the internet is not completely secure. Therefore,
            although we take appropriate and proportionate steps to manage the
            risks posed, we cannot guarantee the security of your information
            transmitted to our email systems and online services.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>8. International Transfer</p>,
    point: [
      {
        text: (
          <p>
            To provide our services, we may need to transfer your personal
            information to locations outside the jurisdiction in which you
            provide it or where you are viewing this website for the purposes
            set out in this privacy policy. This may entail a transfer of your
            information from a location outside the European Economic Area (the
            “EEA”) to a location within the EEA, within locations within the
            EEA, from a location within the EEA to a location outside the EEA,
            or within locations outside the EEA. The level of information
            protection in countries outside the EEA may be less than that
            offered within the EEA. Where this is the case, we will take
            reasonable steps to ensure that your information is treated securely
            and that the means of transfer provide adequate safeguards.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>9. Data Security</p>,
    point: [
      {
        text: (
          <p>
            MusicDex uses commercially reasonable physical, managerial, and
            technical safeguards intended to preserve the integrity and security
            of Your personal information. We audit our procedures and security
            measures regularly to ensure they are being properly administered
            and remain effective and appropriate. Our Service has security
            measures in place to protect against the loss, misuse and
            unauthorized alteration of the information under our control.
          </p>
        ),
      },
      {
        text: (
          <p>
            Please be aware that no security measures are perfect or
            impenetrable. No data transmission over the internet or any wireless
            network can be guaranteed to be perfectly secure. As a result, while
            We try to protect the information We hold for You, We cannot
            guarantee the security of any information You transmit to us and You
            do so at Your own risk. We cannot and do not guarantee that
            information about You will not be accessed, disclosed, altered, or
            destroyed by breach of any of our physical, technical, or managerial
            safeguards.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>10. Google Analytics and cookies</p>,
    point: [
      {
        text: (
          <p>
            To offer and provide a customized website experience, MusicDex may
            use cookies to store and help track information about you. Where
            required by applicable law, We will acquire consent from you prior
            to using certain cookies during your MusicDex website experience
            and/or will offer you the opportunity to choose which types of
            cookies to enable or disable. Cookies are simply small pieces of
            data that are sent to your browser from a web server and stored on
            your computer&#39;s hard drive. MusicDex uses cookies to help remind
            us who you are and to help you navigate our sites during your
            visits. Cookies enable us to save preferences and shopping cart
            contents for you so you will not have to re-enter them each time you
            visit.
          </p>
        ),
      },
      {
        text: (
          <p>
            We also use cookies and ad pixels (a piece of code) to determine
            relevant interest-based advertisements to serve the user.
          </p>
        ),
      },
      {
        text: (
          <p>
            We use Google Analytics to optimise our web page optimisation
            traffic as necessary. Google Analytics is a service offered by
            Google Inc. (&#34;Google&#34;) that generates detailed statistics
            about website traffic and traffic sources, and evaluates conversions
            and sales. GoogleAnalytics uses cookies that are stored on your
            computer and enable it to analyse how users use our website.
          </p>
        ),
      },
      {
        text: (
          <p>
            The information collected by the cookie about your use of our
            website, including your IP address, is anonymized by using the
            appropriate settings and transmitted to Google servers in the United
            States of America.
          </p>
        ),
      },
      {
        text: (
          <p>
            On our behalf, Google will use the information generated by the
            cookie to evaluate your use of our website, compiling reports on
            website activity for website operators and providing these reports
            to us for analysis purposes.
          </p>
        ),
      },
      {
        text: (
          <p>
            Google may also transfer this information to third parties if we are
            under a legal obligation to do so or if the third party processes
            the data on behalf of Google. Under no circumstances will Google
            combine or associate your IP address with other data stored by
            Google.
          </p>
        ),
      },
      {
        text: (
          <p>
            You can prevent or stop the installation and storage of cookies by
            adjusting your browser settings. Please be advised that if you do
            so, you may not be able to use the full functionality of our
            website.
          </p>
        ),
      },
      {
        text: (
          <p>
            By using our website, you consent to the processing of any personal
            data that Google will collect about you in the course of your use
            and for the purposes set out above.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>11. Changes and Updates to this Privacy Policy</p>,
    point: [
      {
        text: (
          <p>
            This Privacy Policy may be revised periodically without further
            notice to You and this will be reflected by the “LAST UPDATED” date
            found at the top of this page. Please revisit this page to stay
            aware of any changes. Your continued use of the MusicDex Service
            constitutes Your agreement to this Privacy Policy and any future
            revisions.
          </p>
        ),
      },
      {
        text: (
          <p>
            For revisions to this Privacy Policy that may be materially less
            restrictive on our use or disclosure of personal information You
            have provided to us, We will make reasonable efforts to notify You
            and obtain Your consent before implementing revisions with respect
            to such information.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>12. MusicDex Contact Information</p>,
    point: [
      {
        text: (
          <p>
            For any questions, inquiries, or complaints, please contact us at:
            <span style={{ color: "white" }}> musicdex.inc@gmail.com</span>.
          </p>
        ),
      },
    ],
  },
];

export const pointsUK = [
  {
    title: <p>1. Збір інформації</p>,
    point: [
      {
        text: (
          <p>
            Ми можемо збирати різні види особистої інформації про вас у процесі
            нашої діяльності, в тому числі під час використання вами нашого
            веб-сайту, коли ви зв&#39;язуєтеся з нами або запитуєте у нас
            інформацію, коли ви користуєтеся нашими послугами, або в результаті
            ваших відносин з одним або декількома нашими співробітниками та
            клієнтами.
          </p>
        ),
      },
      {
        text: <p>Особиста інформація, яку ми обробляємо, включає в себе:</p>,
      },
      {
        text: DocsTextList([
          "базова інформація, така як ваше ім'я, по батькові, дівоче прізвище, прізвище, сімейний стан, псевдонім, дата народження, номер паспорта, ідентифікація фотографією та стать;",
          "контактна інформація, така як ваша поштова адреса, електронна адреса та номер телефону;",
          "фінансова інформація, така як ваша адреса для оплати, номер банківського рахунку та деталі платіжної картки, ваша адреса крипто гаманця;",
          "технічна інформація, така як інформація про ваше відвідування нашого веб-сайту або додатку, а також про матеріали та повідомлення, які ми надсилаємо вам в електронному вигляді;",
          "професійну інформацію, таку як ваша посада, назва вашого роботодавця, ваші попередні посади та професійний досвід;",
          "інформація про послуги, наприклад, платежі до вас і від вас та інші дані про послуги, які ви придбали у нас;",
          "інформація з маркетингу та комунікації, така як дані, які ви надаєте нам для участі у зустрічах та подіях, ваші уподобання щодо маркетингу та комунікацій, а також ваші відгуки та результати опитувань;",
          "будь-яка інша інформація, що стосується вас, яку ви нам надаєте.",
        ]),
      },
    ],
  },

  {
    title: <p>2. Способи збирання інформації</p>,
    point: [
      {
        text: (
          <p>
            Ми використовуємо різні методи для збору особистої інформації про
            вас, включаючи наступні канали:
          </p>
        ),
      },
      {
        text: DocsTextList([
          "Прямі взаємодії: ми збираємо інформацію про вас, коли ви взаємодієте з нами безпосередньо (i) шляхом листування з нами по електронній пошті або звичайною поштою, (ii) спілкуючись з нами особисто чи за допомогою телефону, " +
            "(iii) через електронні портали та платформи, або (iv) заповнюючи форми на нашому веб-сайті.",
          "Веб-сайт: під час вашого відвідування нашого веб-сайту ми автоматично збираємо, зберігаємо та використовуємо технічну інформацію про ваше обладнання та взаємодію з нашим веб-сайтом. Ми отримуємо ці особисті дані за допомогою файлів cookies, " +
            "серверних журналів та інших подібних технологій. Ця інформація включає ваші уподобання, операційні системи, програмне забезпечення браузера, IP-адреси та URL-потоки кліків на та з нашого веб-сайту, включаючи місцезнаходження, дату та час. " +
            "Якщо ви хочете заблокувати файли cookies, ви матимете можливість це зробити через налаштування вашого браузера для кожного браузера, який ви використовуєте, та для кожного пристрою, який ви використовуєте для доступу до Інтернету. " +
            "Однак будьте уважні, що деякі частини нашого веб-сайту можуть не працювати, якщо ваш браузер не приймає файли cookies.",
          "Від третіх сторін: ми можемо отримувати вашу особисту інформацію від третіх сторін, коли ми надаємо нашим клієнтам послуги або інші сторони надсилають нам ваші дані для надання цих послуг; " +
            "ми здійснюємо KYC “перевірку клієнта” та додаткові перевірки стосовно вашої особи; ви надаєте свої дані третій стороні для їх подальшого надання нам; ми взаємодіємо з урядовими або органами регулювання чи іншими стосовно вас або від вашого імені.",
          "Загальнодоступні джерела: Ми можемо збирати інформацію про вас з доступних для загального перегляду реєстрів та баз даних, онлайн-соціальних мереж та сервісів онлайн-спілкування.",
        ]),
      },
    ],
  },

  {
    title: <p>3. Використання інформації</p>,
    point: [
      {
        text: (
          <p>
            Ми будемо використовувати вашу особисту інформацію тільки в розумних
            межах і тільки тоді, коли у нас є на це законні підстави. Таким
            чином, ми будемо використовувати ваші дані лише для того, щоб:
          </p>
        ),
      },
      {
        text: DocsTextList([
          "розглянути, чи можемо ми реалізувати конкретні ініціативи з розвитку бізнесу",
          "дотримання наших юридичних зобов'язань щодо ідентифікації та перевірки особи наших клієнтів та їхніх бенефіціарних власників, а також виявлення та оцінки ризиків відмивання грошей та фінансування тероризму, які можуть стосуватися нашого бізнесу",
          "надавати наші послуги вам та організації, в якій ви працюєте, якщо ви є клієнтом;",
          "ведення нашого бізнесу (наприклад, здійснення адміністративних або операційних процесів, включаючи підбір персоналу)",
          "підтримувати та розвивати наші ділові відносини з вами;",
          "покращення наших послуг та продуктів для вас, якщо ви або організація, в якій ви працюєте, є клієнтом або потенційним клієнтом;",
          "визначати послуги, які можуть вас зацікавити;",
          "надсилати вам маркетингові матеріали та запрошувати вас на заходи;",
          "для моніторингу та аналізу нашого бізнесу; або",
          "обробляти та відповідати на запити, звернення або скарги, отримані від вас.",
        ]),
      },
      {
        text: (
          <p>
            Ми використовуємо вашу особисту інформацію на наступних підставах:
          </p>
        ),
      },
      {
        text: DocsTextList([
          "це необхідно для виконання контракту з вами або організацією, в якій ви працюєте;",
          "це необхідно для дотримання правових та регуляторних зобов'язань;",
          "ви надали згоду на обробку ваших даних; або",
          "якщо ми (або третя сторона) маємо законний інтерес, за умови, що ваші основні права не переважають над такими інтересами.  Законні інтереси включають надання наших послуг, " +
            "описаних в Умовах та положеннях MusicDex, ведення нашого бізнесу і маркетинг відповідних послуг безпосередньо для вас.",
        ]),
      },
    ],
  },

  {
    title: <p>4. Збереження інформації</p>,
    point: [
      {
        text: (
          <p>
            Ми зберігатимемо вашу особисту інформацію лише стільки, скільки це
            необхідно для цілей, для яких вона була зібрана, в тому числі для
            дотримання будь-яких законодавчих, нормативних, бухгалтерських або
            звітних вимог.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>5. Ваші права</p>,
    point: [
      {
        text: (
          <p>
            Якщо Ви дали згоду на використання нами Вашої особистої інформації з
            певною метою, Ви маєте право змінити свою згоду в будь-який час. За
            певних обставин Ви маєте права, передбачені GDPR щодо Вашої
            особистої інформації.
          </p>
        ),
      },
      {
        text: DocsTextList([
          "Запит на доступ до Вашої особистої інформації. Ви маєте право вимагати доступ до будь-якої особистої інформації, яку ми зберігаємо про Вас, а також до пов'язаної з нею інформації, " +
            "включаючи цілі обробки особистої інформації, одержувачів або категорій одержувачів, яким було передано особисту інформацію, де це можливо, період, протягом якого буде зберігатися особиста інформація, " +
            "джерело особистої інформації та наявність будь-якого автоматизованого прийняття рішень.",
          "Запит на виправлення Вашої особистої інформації. Ви маєте право без невиправданої затримки отримати виправлення будь-якої неточної особистої інформації, яку ми зберігаємо про вас.",
          "Запит на видалення Вашої особистої інформації. Ви маєте право вимагати видалення особистої інформації, що зберігається про Вас.",
          "Запит на обмеження обробки Вашої особистої інформації. Ви маєте право запобігти або обмежити обробку вашої особистої інформації.",
          "Запит на передачу Вашої особистої інформації. Ви маєте право на запит щодо передачі особистої інформації безпосередньо третій стороні, якщо це технічно можливо.",
        ]),
      },
      {
        text: (
          <p>
            Ці права на конфіденційність даних не поширюються на MusicDex, де ми
            обробляємо Вашу особисту інформацію як процесор даних від імені
            наших партнерів. У такому випадку будь-який запит щодо реалізації
            Ваших європейських прав на конфіденційність даних повинен бути
            спрямований нашим партнерам (тобто контролерам даних).
          </p>
        ),
      },
      {
        text: (
          <p>
            В окремих випадках, коли ви надали згоду на збір, обробку та
            передачу вашої особистої інформації для конкретної цілі, у вас є
            право в будь-який час відкликати цю згоду для такої конкретної
            обробки. Після того, як ми отримаємо повідомлення про відкликання
            вашої згоди, ми більше не будемо обробляти вашу інформацію для
            цілей, на які ви спочатку згодилися, якщо у нас немає іншої законної
            підстави для цього. Якщо ви хочете скористатися будь-якими з цих
            прав, будь ласка, зв&#39;яжіться з нами за адресою
            <span style={{ color: "white" }}> musicdex.inc@gmail.com</span>.
            Перед оцінкою вашого запиту ми можемо запросити додаткову інформацію
            для вашої ідентифікації. Якщо ви не надаєте запрошену інформацію і,
            відповідно, ми не зможемо вас ідентифікувати, ми можемо відмовити у
            виконанні вашого запиту.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>6. Розголошення інформації</p>,
    point: [
      {
        text: <p>Ми можемо передавати вашу особисту інформацію:</p>,
      },
      {
        text: DocsTextList([
          "нашим професійним консультантам і аудиторам;",
          "третім сторонам, які беруть участь у наданні послуг нашим клієнтам, наприклад: нашим радникам, посередникам, консультантам або експертам;",
          "постачальникам, яким ми передаємо певні послуги підтримки, такі як обробка тексту, переклад, копіювання та перегляд документів;",
          "постачальникам послуг, включаючи ІТ, хмарне сховище, простір для даних, постачальників послуг з управління справами та організаторів подій; або",
          "нормативним органам, судам, трибуналам, урядовим агентствам, правоохоронним органам та будь-якій іншій третій стороні для виконання юридичних, нормативних або професійних обов'язків.",
        ]),
      },
    ],
  },

  {
    title: <p>7. Захист даних</p>,
    point: [
      {
        text: (
          <p>
            Ми захищаємо ваші дані та впроваджуємо відповідні технічні та
            організаційні заходи безпеки, щоб захистити їх від несанкціонованого
            доступу, неналежного використання або розголошення, несанкціонованої
            модифікації, незаконного знищення або випадкової втрати. Усі
            партнери, співробітники та сторонні постачальники послуг, які мають
            доступ до конфіденційної інформації (включаючи особисту інформацію),
            зобов&#39;язані дотримуватися зобов&#39;язань щодо її
            конфіденційності. Однак передача інформації через Інтернет не є
            повністю безпечною. Тому, хоча ми вживаємо належних і пропорційних
            заходів для управління ризиками, ми не можемо гарантувати безпеку
            вашої інформації, переданої до наших систем електронної пошти та
            онлайн-сервісів.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>8. Міжнародна передача даних</p>,
    point: [
      {
        text: (
          <p>
            Для надання наших послуг нам може знадобитися передати вашу особисту
            інформацію в місця за межами юрисдикції, в якій ви її надали або де
            ви переглядаєте цей веб-сайт, для цілей, викладених у цій політиці
            конфіденційності. Це може передбачати передачу вашої інформації з
            місця за межами Європейської економічної зони (&#34;ЄЕЗ&#34;) до
            місця в межах ЄЕЗ, з місця в межах ЄЕЗ до місця за межами ЄЕЗ.
            Рівень захисту інформації в країнах за межами ЄЕЗ може бути нижчим,
            ніж у країнах ЄЕЗ. У такому випадку ми вживатимемо розумних заходів
            для забезпечення безпечного поводження з вашою інформацією та
            адекватних засобів її передачі.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>9. Безпека даних</p>,
    point: [
      {
        text: (
          <p>
            MusicDex використовує комерційно обґрунтовані фізичні, управлінські
            та технічні засоби захисту, призначені для збереження цілісності та
            безпеки Вашої особистої інформації. Ми регулярно перевіряємо наші
            процедури і заходи безпеки, щоб переконатися, що вони застосовуються
            належним чином і залишаються ефективними і доцільними. Наш Сервіс
            має заходи безпеки для захисту від втрати, неправильного
            використання та несанкціонованої зміни інформації, що знаходиться
            під нашим контролем.
          </p>
        ),
      },
      {
        text: (
          <p>
            Проте, будьте уважні, що жодні заходи безпеки не є ідеальними або
            неприступними. Жодна передача даних через Інтернет або будь-яку
            бездротову мережу не може мати повних гарантій щодо безпеки. Як
            наслідок, хоча ми намагаємося захистити інформацію, яку ми
            зберігаємо для Вас, ми не можемо гарантувати безпеку будь-якої
            інформації, яку Ви передаєте нам, і Ви робите це на свій страх і
            ризик. Ми не можемо і не гарантуємо, що інформація про Вас не буде
            доступна, розкрита, змінена або знищена в результаті порушення
            будь-яких наших фізичних, технічних або управлінських гарантій.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>10. Google Analytics і файли cookies</p>,
    point: [
      {
        text: (
          <p>
            Для надання та забезпечення персоналізованого досвіду використання
            веб-сайту, MusicDex може використовувати файли cookies для
            зберігання та відстеження інформації про вас. Де це необхідно згідно
            з чинним законодавством, Ми будемо отримувати вашу згоду перед
            використанням певних файлів cookies під час вашого візиту на
            веб-сайт MusicDex та/або пропонувати вам можливість вибрати, які
            типи файлів cookies включити або виключити. Файли cookies - це
            просто невеликі фрагменти даних, які надсилаються вашому браузеру з
            веб-сервера і зберігаються на жорсткому диску вашого комп&#39;ютера.
            MusicDex використовує файли cookies, щоб нагадати нам, хто ви є, і
            допомогти вам орієнтуватися на наших сайтах під час вашого візиту.
            Файли cookies дозволяють нам зберігати ваші уподобання та вміст
            кошика для того, щоб вам не довелося вводити їх кожен раз повторно
            під час відвідування.
          </p>
        ),
      },
      {
        text: (
          <p>
            Також ми використовуємо файли cookies та пікселі реклами (фрагмент
            коду), для визначення релевантної реклами на основі інтересів
            користувача.
          </p>
        ),
      },
      {
        text: (
          <p>
            Ми використовуємо Google Analytics для оптимізації трафіку наших
            веб-сторінок за необхідності. Google Analytics - це сервіс, що
            пропонується компанією Google Inc. (&#34;Google&#34;), який генерує
            детальну статистику про відвідуваність веб-сайту та джерела трафіку,
            а також оцінює конверсії та продажі. GoogleAnalytics використовує
            файли cookie, які зберігаються на вашому комп&#39;ютері і дозволяють
            аналізувати, як користувачі використовують наш веб-сайт.
          </p>
        ),
      },
      {
        text: (
          <p>
            Інформація, що збирається за допомогою файлу cookies про ваше
            використання нашого веб-сайту, включаючи вашу IP-адресу, залишаються
            анонімними за допомогою відповідних налаштувань і передається на
            сервери Google в Сполучених Штатах Америки.
          </p>
        ),
      },
      {
        text: (
          <p>
            Від нашого імені Google буде використовувати інформацію, зібрану
            файлом cookies, для оцінки вашого використання нашого веб-сайту,
            складання звітів про активність на веб-сайті для операторів
            веб-сайтів та надання цих звітів нам для аналізу.
          </p>
        ),
      },
      {
        text: (
          <p>
            Google також може передавати цю інформацію третім сторонам, якщо ми
            зобов&#39;язані це зробити згідно з законодавством або якщо третя
            сторона обробляє дані від імені Google. У жодному випадку Google не
            буде комбінувати або об’єднувати вашу IP-адресу з іншими даними, які
            зберігаються Google.
          </p>
        ),
      },
      {
        text: (
          <p>
            Ви можете запобігти або припинити встановлення та зберігання файлів
            cookies, налаштувавши параметри вашого браузера. Зверніть увагу, що,
            якщо ви це зробите, ви, можливо, не зможете використовувати повний
            функціонал нашого веб-сайту.
          </p>
        ),
      },
      {
        text: (
          <p>
            Використовуючи наш веб-сайт, ви погоджуєтеся на обробку будь-яких
            особистих даних, які Google збиратиме про вас у процесі використання
            та для вищезазначених цілей.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>11. Зміни та оновлення цієї Політики конфіденційності</p>,
    point: [
      {
        text: (
          <p>
            Ця Політика конфіденційності може бути періодично переглянута без
            додаткового повідомлення про це Вам. Про внесені зміни буде
            повідомлено оновленням дати &#34;ВОСТАННЄ ОНОВЛЕНО&#34; на початку
            цієї сторінки. Будь ласка, переглядайте цю сторінку, щоб бути в
            курсі будь-яких змін. Ваше подальше використання сервісу MusicDex
            підтверджує вашу згоду з цією Політикою конфіденційності та
            будь-якими майбутніми змінами.
          </p>
        ),
      },
      {
        text: (
          <p>
            У разі внесення змін до цієї Політики конфіденційності, які можуть
            суттєво зменшити обмеження на використання або розкриття особистої
            інформації, яку Ви нам надали, ми докладемо розумних зусиль, щоб
            повідомити Вас і отримати Вашу згоду, перш ніж впроваджувати зміни,
            що стосуються такої інформації.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>12. Контактна інформація MusicDex</p>,
    point: [
      {
        text: (
          <p>
            Для будь-яких питань, запитів чи скарг, будь ласка, зв&#39;яжіться з
            нами за адресою:{" "}
            <span style={{ color: "white" }}>musicdex.inc@gmail.com</span>.
          </p>
        ),
      },
    ],
  },
];
