export const point0 = [
  {
    text: (
      <p>
        MusicDex values your privacy and treats privacy seriously. We recognize
        the importance of maintaining the confidentiality of personal
        information.
      </p>
    ),
  },
  {
    text: (
      <p>
        This Privacy Policy applies to any and all services, applications,
        platforms, websites, or other affiliated ventures offered by MusicDex.
        Throughout this Policy, “MusicDex” and “We” refers to MusicDex.co
        managed by Seven2seven Ventures Ltd. and its affiliates.
      </p>
    ),
  },
  {
    text: (
      <p>
        Seven2seven Ventures Ltd. is the controller for the purposes of the
        General Data Protection Regulation (the “GDPR”) in respect of
        MusicDex.co “You” or “Users” refers to you, our users and everyone who
        uses, subscribes to, publishes through, joins, or visits MusicDex.co
      </p>
    ),
  },
  {
    text: (
      <p>
        The “MusicDex Service” refers to the applications, platform, website and
        services controlled, operated or produced by MusicDex By using the
        MusicDex Service, you expressly consent to the information handling
        practices described in this Policy. Your use of the MusicDex Service and
        any personal information you provide through the MusicDex Service are
        subject at all times to this Privacy Policy and the Terms of Service.
      </p>
    ),
  },
];

const ListText = (textList) => {
  return (
    <ul style={{ marginLeft: 22, marginBottom: 10 }}>
      {textList.map((text, index) => {
        return <li key={index.toString()}>{text}</li>;
      })}
    </ul>
  );
};

export const points = [
  {
    title: <p>1. Collection of the Information</p>,
    point: [
      {
        text: (
          <p>
            Your privacy is important to us and We have taken steps to ensure
            that We do not collect more information from You than is necessary
            for us to provide You with our services and to protect your account.
          </p>
        ),
      },
      {
        text: (
          <p>
            Information You Provide: You may provide to MusicDex certain
            information (often called “personally identifiable” information),
            such as Your name, email address, social media link, company name
            and zone of its interest. By providing us with your CV through our
            website form, you give us consent to collect the information we need
            from there, including the information mentioned above. You may
            provide us with this information if you use certain services or
            products from the MusicDex Service, enter contests or conferences,
            or otherwise use the features and functionality of the MusicDex
            Service.
          </p>
        ),
      },
      {
        text: (
          <p>
            If You contact our contact center, We may record Your conversation
            with us and collect additional information to verify Your identity.
          </p>
        ),
      },
      {
        text: (
          <p>
            In connection with any transaction and payment services,
            information, including but not limited to, virtual currency
            addresses, bank account numbers, billing and delivery information,
            credit/debit card numbers, expiration dates and security code and
            tracking information from cheques or money orders may be collected.
          </p>
        ),
      },
      {
        text: (
          <p>
            We record details of users’ activities with the Service. We log
            technical information about Your use of the Services, including the
            type of browser and version You use, the most recent IP address used
            to access the web pages or sites that You visit just before or just
            after You use the MusicDex Service, the pages or other content You
            view or otherwise interact with on the MusicDex Service, and the
            dates and times that You visit, access, or use the MusicDex Service.
          </p>
        ),
      },
      {
        text: (
          <p>
            We also may use these technologies to collect information regarding
            Your interaction with e-mail messages, such as whether You opened,
            clicked on, or forwarded a message. This information is gathered
            from all users, and may be connected with other information about
            You.
          </p>
        ),
      },
      {
        text: (
          <p>
            Third Party Web Beacons and Third Party Buttons: We may display
            third-party content on the MusicDex.co, including third-party
            advertising. Third-party content may use cookies, web beacons, or
            other mechanisms for obtaining data in connection with Your viewing
            of the third party content on the MusicDex Service. Additionally, We
            may implement third party buttons that may function as web beacons
            even when You do not interact with the button. Information collected
            through third-party web beacons and buttons is collected directly by
            these third parties, not by MusicDex. Information collected by a
            third party in this manner is subject to that third party’s own data
            collection, use, and disclosure policies.
          </p>
        ),
      },
      {
        text: (
          <p>
            Information from Other Sources: We may obtain information from third
            parties and sources other than the MusicDex Service, such as our
            partners and advertisers.
          </p>
        ),
      },
      {
        text: (
          <p>
            From time to time, we collect information about our users and
            prospective users during trade shows, industry events and other
            functions. The information We may collect at these events includes,
            but not limits to, user name, address, phone number and email
            address.{" "}
          </p>
        ),
      },
    ],
  },

  {
    title: <p>2. Use of the Information</p>,
    point: [
      {
        text: (
          <p>
            MusicDex collects and processes personal information about You only
            where We have a legal basis for doing so under applicable data
            protection law, including under the GDPR. The legal bases will
            depend on the purpose for which We process Your personal
            information. This means We collect and use Your personal information
            only where:{" "}
          </p>
        ),
      },
      {
        text: ListText([
          "We need it to provide the Services, and personalized features and to protect the safety and security of the Services; ",
          "It satisfies a legitimate interest (which is not overridden by Your rights and interests), such as for research and development, to market and promote the Services and to protect our legal rights and interests;",
          "You give us consent to do so for a specific purpose;",
          "We need to process Your personal information to comply with a legal obligation.",
        ]),
      },
      {
        text: (
          <p>
            We may use Your e-mail address or mobile number for administrative
            communications such as notifying You of major MusicDex Service
            updates, and to send privacy or security related notices. MusicDex
            uses all of the information that We collect to understand the usage
            trends and preferences of our Users, to improve the way the MusicDex
            Service works and looks, to create new features and functionality.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>3. Your Rights</p>,
    point: [
      {
        text: (
          <p>
            If You have consented to our use of personal information about You
            for a specific purpose, You have the right to change Your consent at
            any time. In certain circumstances, You have rights under the GDPR
            in relation to Your personal information.{" "}
          </p>
        ),
      },
      {
        text: ListText([
          "Request access to Your personal information. You may have the right to request access to any personal information We hold about You as well as related information, including the purposes for processing the personal information, the recipients or categories of recipients with whom the personal information has been shared, where possible, the period for which the personal information will be stored, the source of personal information, and the existence of any automated decision making. ",
          "Request correction of Your personal information. You may have the right to obtain without undue delay the rectification of any inaccurate personal information We hold about You. ",
          "Request erasure of Your personal information. You may have the right to request that personal information held about You is deleted.",
          "Request restriction of processing Your personal information. You may have the right to prevent or restrict processing of Your personal information. ",
          "Request transfer of Your personal information. You may have the right to request transfer of personal information directly to a third party where this is technically feasible. ",
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
    ],
  },

  {
    title: <p>4. Disclosure of the Information</p>,
    point: [
      {
        text: (
          <p>
            MusicDex does not share personally identifiable information about
            You with other organizations for their marketing or promotional uses
            without Your prior express consent. Please be aware, however, that
            any personally identifiable information that You voluntarily choose
            to display on any publicly available portion of the MusicDex
            Service, becomes publicly available and may be collected and used by
            others without restriction.{" "}
          </p>
        ),
      },
      {
        text: (
          <p>
            MusicDex may disclose automatically collected and other aggregate
            non-personally-identifiable information (such as non-identifiable
            User usage data, referring / exit pages and URLs, platform types,
            number of clicks, etc.) with interested third parties to assist
            those parties in understanding the usage and demographic patterns
            for certain content, services, advertisements, promotions, or other
            functionality on the MusicDex Service.{" "}
          </p>
        ),
      },
      {
        text: (
          <p>
            We may disclose some limited User information to affiliated
            companies or other businesses or persons to:
          </p>
        ),
      },
      {
        text: ListText([
          "provide website hosting, maintenance, and security services;",
          "conduct data analysis and create reports;",
          "offer certain functionality;",
          "assist MusicDex in improving our Service and creating new services features.",
        ]),
      },
      {
        text: (
          <p>
            We generally contractually require that these parties process such
            information in compliance with this Privacy Policy, authorize only a
            limited use of such information, and require these parties to use
            reasonable confidentiality measures.
          </p>
        ),
      },
      {
        text: (
          <p>
            MusicDex may disclose User information if required to do so by law
            or in the good-faith belief that such action is necessary to comply
            with state and federal laws or respond to a court order, judicial or
            other government orders. We shall require any third party, including
            without limitation any government or enforcement entity, seeking
            access to data We hold to have obtained a court order, or proof they
            are statutorily empowered to access Your data and that their request
            is valid and within their power.
          </p>
        ),
      },
      {
        text: (
          <p>
            MusicDex also reserves the right to disclose User information that
            We believe, in good faith, is appropriate or necessary:
          </p>
        ),
      },
      {
        text: ListText([
          "to take precautions against liability;",
          "protect MusicDex from fraudulent, abusive, or unlawful uses;",
          "to investigate and defend ourselves against third-party claims or allegations; to assist government enforcement agencies; ",
          "to protect the security or integrity of the MusicDex Service; ",
          "to protect the rights, property, or personal safety of MusicDex, our Users, or others.",
        ]),
      },
      {
        text: (
          <p>
            In the event that MusicDex is acquired by or merged with a
            third-party entity, We may transfer or assign the information that
            We have collected from Users as part of that merger, acquisition,
            sale, or other change of control.{" "}
          </p>
        ),
      },
    ],
  },

  {
    title: <p>5. Your Choices and Access to Your Personal Information</p>,
    point: [
      {
        text: (
          <p>
            If You decline to share Your personally-identifiable information
            with MusicDex, We may not be able to provide to You some of the
            features and functionality found on the MusicDex Service. You may
            view, update, correct, or delete Your user information and
            preferences by contacting{" "}
            <span style={{ color: "white" }}>markian@musicdex.co</span>.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>6. Advertisers and Third Parties</p>,
    point: [
      {
        text: (
          <p>
            MusicDex allows other companies, including third-party ad servers or
            ad networks, to serve advertisements within the MusicDex Service.
            These third-party ad servers or ad networks may use technology to
            send, directly to Your browser, the advertisements that appear
            within the MusicDex Service and they automatically receive Your IP
            Address and other log file information when this happens. Such
            third-party ad servers may also use other technologies (such as
            cookies, javascript, or web beacons) to measure the effectiveness of
            their
          </p>
        ),
      },
      {
        text: (
          <p>
            MusicDex does not provide Your personally identifiable information
            to these third-party ad servers or ad networks without Your consent.
            However, please note that if an advertiser asks MusicDex to show an
            advertisement to a certain audience or audience segment and You
            respond to that advertisement, the advertiser or ad-server may
            conclude that You fit the description of the audience that they were
            trying to reach.
          </p>
        ),
      },
      {
        text: (
          <p>
            You should consult the respective privacy policies of these
            third-party ad servers or ad networks. This Privacy Policy does not
            apply to, and We cannot control the activities of, such other
            advertisers or web sites. MusicDex reserves the right to add or
            remove third-party ad networks or ad servers in its discretion and
            We may not at all times list such updated ad network or ad server
            partners in this Privacy Policy.
          </p>
        ),
      },
      {
        text: (
          <p>
            Except as otherwise expressly provided otherwise, this document
            addresses only the use and disclosure of information We collect from
            You or that You disclose to us. If You disclose Your information to
            others besides MusicDex, whether they are users of the MusicDex
            Service or on other sites or services, different rules may apply to
            their use or disclosure of the information You disclose to them.
            MusicDex does not control the privacy policies of third parties, and
            You are subject to the privacy policies of those third parties where
            applicable. We encourage You to ask questions before You disclose
            Your personal information to others.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>7. Data Security</p>,
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
    title: <p>8. Retention of the Information</p>,
    point: [
      {
        text: (
          <p>
            We retain the data You provide to us for as long as You may have
            questions or a claim in relation to our services, notwithstanding
            any superior retention period that We may be obliged to observe in
            accordance with legal requirements applicable to us. Except where
            prohibited by law, this period may be extended beyond the end of the
            particular relationship with us but only for so long as We are
            contractually bound to do so, or so far as is necessary for audit or
            other accounting purposes. In some circumstances You can ask us to
            delete Your data as set out below.
          </p>
        ),
      },
      {
        text: (
          <p>
            When Personal Data are no longer needed We have procedures either to
            destroy, delete, erase or convert it to an anonymous form. After You
            have terminated Your use Services, We may store Your information in
            an aggregated and anonymized format.{" "}
          </p>
        ),
      },
    ],
  },

  {
    title: <p>9. Minors</p>,
    point: [
      {
        text: (
          <p>
            Protecting the privacy of young children is especially important.
            For that reason, MusicDex does not knowingly collect or maintain
            personally identifiable information from persons under 18
            years-of-age. If MusicDex learns that personally-identifiable
            information of persons less than 18- years-of-age has been collected
            on or through the MusicDex Service, then MusicDex will take the
            appropriate steps to delete this information. If You are the parent
            or legal guardian of a child under 18 who has become a MusicDex
            Service member, then please contact MusicDex at{" "}
            <span style={{ color: "white" }}>markian@musicdex.co </span>
            to have that child&#39;s account terminated and information deleted.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>10. Сookies</p>,
    point: [
      {
        text: (
          <p>
            Cookies and Automatically Collected Information: We may track Your
            activities using cookies and similar technologies. MusicDex may use
            automatically collected information and cookies to:
          </p>
        ),
      },
      {
        text: ListText([
          "remember Your information so that You will not have to re-enter it during Your visit or the next time You access the MusicDex Service;",
          "provide customized third-party advertisements, content and information;",
          "monitor and report on the effectiveness of third-party marketing campaigns;",
          "monitor and report aggregate usage metrics such as total number of visitors and pages accessed;",
          "track Your entries, submissions, and status in any promotions or other activities.",
        ]),
      },
      {
        text: (
          <p>
            If You want to delete any cookies that are already on Your computer,
            please refer to the help and support area on Your Internet browser
            for instructions on how to locate the file or directory that stores
            cookies.
          </p>
        ),
      },
      {
        text: (
          <p>
            Please note that by deleting our cookies or disabling future cookies
            You may not be able to access certain areas or features of Services.
            Please note that refusing cookies does not mean You will no longer
            receive online advertising. It means that the company or companies
            from which You opted out will no longer deliver adverts tailored to
            Your web preferences and usage patterns.{" "}
          </p>
        ),
      },
    ],
  },

  {
    title: <p>11. International Transfer</p>,
    point: [
      {
        text: (
          <p>
            If You reside in the EU, MusicDex stores Your Personal Data at
            secure locations in the EU. Our business may require us to transfer
            and store Your Personal Data to countries outside of the European
            Economic Area (“EEA”), including to countries that may not provide
            the same level of data protection as Your home country such as the
            United States and China. We take appropriate steps to ensure that
            recipients of Your Personal Data are bound to duties of
            confidentiality and We implement appropriate measures to ensure Your
            Personal Data will remain protected in accordance with this Privacy
            Policy, such as standard contractual clauses. When transferring
            personal information, We rely on different adequacy measures, where
            the recipient is not established in a country ensuring an adequate
            level of protection within the meaning of Regulation (EU) 2016/679,
            such as the United States, the transfers will be covered by the
            standard data protection clauses adopted by the European Commission
            or by another appropriate safeguard mechanism such as the Privacy
            Shield Framework.
          </p>
        ),
      },
    ],
  },

  {
    title: <p>12. Changes and Updates to this Privacy Policy</p>,
    point: [
      {
        text: (
          <p>
            This Privacy Policy may be revised periodically without further
            notice to You and this will be reflected by the “LAST UPDATED” date
            found at the top of this page. Please revisit this page to stay
            aware of any changes. Your continued use of the MusicDex Service
            constitutes Your agreement to this Privacy Policy and any future
            revisions.{" "}
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
            to such information.{" "}
          </p>
        ),
      },
    ],
  },

  {
    title: <p>13. MusicDex Contact Information</p>,
    point: [
      {
        text: (
          <p style={{ textIndent: 0 }}>
            For any questions, inquiries, or complaints, please contact us at
            <span style={{ color: "white" }}> markian@musicdex.co</span>.
          </p>
        ),
      },
    ],
  },
];
