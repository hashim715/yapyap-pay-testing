import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-[800px] mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <header className="mb-12">
          <h1 className="text-3xl font-medium tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-[13px] text-muted-foreground">
            Effective date: December 1, 2025
          </p>
        </header>

        <div className="space-y-8 text-[14px] leading-relaxed">
          <p>
            At YapYap Pay, we take your privacy seriously. Please read this
            Privacy Policy to learn how we treat your personal data.
          </p>

          <p>
            Throughout this Privacy Policy, "we," "our," "us," and "YapYap Pay"
            refers to Zurons, Inc.
          </p>

          <p>
            By using or accessing our Services in any manner, you acknowledge
            that you accept the practices and policies outlined below, and you
            hereby consent that we will collect, use and disclose your
            information as described in this Privacy Policy.
          </p>

          <p>
            Remember that your use of YapYap Pay is at all times subject to our{" "}
            <a href="/terms-of-use" className="text-primary hover:underline">
              Terms of Use
            </a>
            , which incorporates this Privacy Policy. Any terms we use in this
            Policy without defining them have the definitions given to them in
            the Terms of Use.
          </p>

          <p>
            As we continually work to improve our Services, we may need to
            change this Privacy Policy from time to time. We will alert you of
            material changes by placing a notice on the YapYap Pay website, by
            sending you an email and/or by some other means. Please note that if
            you've opted not to receive legal notice emails from us (or you
            haven't provided us with your email address), those legal notices
            will still govern your use of the Services, and you are still
            responsible for reading and understanding them. If you use the
            Services after any changes to the Privacy Policy have been posted,
            that means you agree to all of the changes.
          </p>

          <section>
            <h2 className="text-xl font-medium mb-4">
              What this Privacy Policy Covers
            </h2>
            <p>
              This Privacy Policy covers how we treat Personal Data that we
              gather when you access or use our Services. "Personal Data" means
              any information that identifies or relates to a particular
              individual and also includes information referred to as
              "personally identifiable information" or "personal information" or
              "sensitive personal information" under applicable data privacy
              laws, rules or regulations. This Privacy Policy does not cover the
              practices of companies we don't own or control or people we don't
              manage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Personal Data</h2>

            <h3 className="text-lg font-medium mb-3">
              Categories of Personal Data We Collect
            </h3>
            <p className="mb-4">
              This chart details the categories of Personal Data that we collect
              and have collected over the past 12 months:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-border text-[13px]">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="border border-border p-3 text-left font-medium">
                      Category of Personal Data (and Examples)
                    </th>
                    <th className="border border-border p-3 text-left font-medium">
                      Business or Commercial Purpose(s) for Collection
                    </th>
                    <th className="border border-border p-3 text-left font-medium">
                      Categories of Third Parties With Whom We Disclose this
                      Personal Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3">
                      Profile or Contact Data such as first and last name and
                      email
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>
                          Providing, Customizing and Improving the Services
                        </li>
                        <li>Marketing the Services</li>
                        <li>Corresponding with You</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>Service Providers</li>
                        <li>Analytics Partners</li>
                        <li>Business Partners</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">
                      Payment Data such as financial account information,
                      payment card type, last 4 digits of payment card, and
                      billing address, phone number, and email.
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>
                          Providing, Customizing and Improving the Services
                        </li>
                        <li>Marketing the Services</li>
                        <li>Corresponding with You</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      Service Providers (specifically our payment processing
                      partner, currently Stripe (offered by Stripe, Inc.)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">
                      Commercial Data such as purchase history
                    </td>
                    <td className="border border-border p-3">
                      Purchase history
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>Service Providers</li>
                        <li>Analytics Partners</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">
                      Device/IP Data such as IP address and device ID.
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>
                          Providing, Customizing and Improving the Services
                        </li>
                        <li>Marketing the Services</li>
                        <li>Corresponding with You</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>Service Providers</li>
                        <li>Analytics Partners</li>
                        <li>Business Partners</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">
                      Web Analytics such as web page interactions, referring
                      webpage/source through which you accessed the Services,
                      and non-identifiable request IDs.
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>
                          Providing, Customizing and Improving the Services
                        </li>
                        <li>Marketing the Services</li>
                        <li>Corresponding with You</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>Service Providers</li>
                        <li>Analytics Partners</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">
                      Professional or Employment-Related Data such as Company
                      name and website.
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>
                          Providing, Customizing and Improving the Services
                        </li>
                        <li>Marketing the Services</li>
                        <li>Corresponding with You</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>Service Providers</li>
                        <li>Analytics Partners</li>
                        <li>Business Partners</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">
                      Geolocation Data such as IP-address-based location
                      information and GPS data.
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>
                          Providing, Customizing and Improving the Services
                        </li>
                        <li>Marketing the Services</li>
                        <li>Corresponding with You</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>Service Providers</li>
                        <li>Analytics Partners</li>
                        <li>Business Partners</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">
                      Sensory Data such as photos, videos, or recordings of you
                      and/or your environment.
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>
                          Providing, Customizing and Improving the Services
                        </li>
                        <li>Marketing the Services</li>
                        <li>Corresponding with You</li>
                      </ul>
                    </td>
                    <td className="border border-border p-3">
                      <ul className="list-none space-y-1">
                        <li>Service Providers</li>
                        <li>Analytics Partners</li>
                        <li>Business Partners</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mb-3">
              Our Commercial or Business Purposes for Collecting Personal Data
            </h3>

            <h4 className="text-base font-medium mb-2">
              Providing, Customizing and Improving the Services
            </h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Creating and managing your account or other user profiles.
              </li>
              <li>Processing orders or other transactions; billing.</li>
              <li>
                Providing you with the products, services or information you
                request.
              </li>
              <li>
                Meeting or fulfilling the reason you provided the information to
                us.
              </li>
              <li>Providing support and assistance for the Services.</li>
              <li>
                Improving the Services, including testing, research, internal
                analytics and product development.
              </li>
              <li>
                Personalizing the Services, website content and communications
                based on your preferences.
              </li>
              <li>Doing fraud protection, security and debugging.</li>
            </ul>

            <h4 className="text-base font-medium mb-2">
              Marketing the Services
            </h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Providing, Customizing and Improving the Services</li>
              <li>Marketing and selling the Services</li>
            </ul>

            <h4 className="text-base font-medium mb-2">
              Corresponding with You
            </h4>
            <p className="mb-4">
              Responding to correspondence that we receive from you, contacting
              you when necessary or requested, and sending you information about
              YapYap Pay or the Services.
            </p>

            <h4 className="text-base font-medium mb-2">
              Other Permitted Purposes for Processing Personal Data
            </h4>
            <p>
              In addition, each of the above referenced categories of Personal
              Data may be collected, used, and disclosed with the government,
              including law enforcement, or other parties to meet certain legal
              requirements and enforcing legal terms including: fulfilling our
              legal obligations under applicable law, regulation, court order or
              other legal process, such as preventing, detecting and
              investigating security incidents and potentially illegal or
              prohibited activities; protecting the rights, property or safety
              of you, YapYap Pay or another party; enforcing any agreements with
              you; responding to claims that any posting or other content
              violates third-party rights; and resolving disputes.
            </p>
            <p className="mt-4">
              We will not collect additional categories of Personal Data or use
              the Personal Data we collected for materially different, unrelated
              or incompatible purposes without providing you notice or obtaining
              your consent.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-3">
              Categories of Sources of Personal Data
            </h3>
            <p className="mb-3">
              We collect Personal Data about you from the following categories
              of sources:
            </p>

            <h4 className="text-base font-medium mb-2">You</h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>When you provide such information directly to us.</li>
              <li>
                When you create an account or use our interactive tools and
                Services.
              </li>
              <li>
                When you voluntarily provide information in free-form text boxes
                through the Services or through responses to surveys or
                questionnaires.
              </li>
              <li>When you send us an email or otherwise contact us.</li>
              <li>
                When you use the Services and such information is collected
                automatically.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    Through Cookies (defined in the "Tracking Tools, Advertising
                    and Opt-Out" section below).
                  </li>
                  <li>
                    If you download our mobile application or use a
                    location-enabled browser, we may receive information about
                    your location and mobile device, as applicable.
                  </li>
                  <li>
                    If you download and install certain applications and
                    software we make available, we may receive and collect
                    information transmitted from your computing device for the
                    purpose of providing you the relevant Services, such as
                    information regarding when you are logged on and available
                    to receive updates or alert notices.
                  </li>
                </ul>
              </li>
            </ul>

            <h4 className="text-base font-medium mb-2">
              Third-Party Credentials
            </h4>
            <p>
              If you provide your third-party account credentials, such as your
              social network account credentials, to us or otherwise sign in to
              the Services through a third-party site or service, some content
              and/or information in those accounts may be transmitted into your
              account with us.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-3">
              How We Disclose Your Personal Data
            </h3>
            <p className="mb-4">
              We disclose your Personal Data to the categories of service
              providers and other parties listed in this section. Depending on
              state laws that may be applicable to you, some of these
              disclosures may constitute a "sale" of your Personal Data. For
              more information, please refer to the state-specific sections
              below.
            </p>

            <h4 className="text-base font-medium mb-2">You</h4>
            <p className="mb-4">
              <strong>Service Providers.</strong> These parties help us provide
              the Services or perform business functions on our behalf. They
              include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Hosting, technology and communication providers.</li>
              <li>Analytics providers for web traffic or usage of the site.</li>
              <li>Security and fraud prevention consultants.</li>
              <li>Support and customer service vendors.</li>
              <li>Product fulfillment and delivery providers.</li>
              <li>
                Payment processors.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    Our payment processing partner Stripe, Inc. ("Stripe"),
                    collects your voluntarily-provided payment card information
                    necessary to process your payment.
                  </li>
                  <li>
                    Please see Stripe's terms of service and privacy policy for
                    information on its use and storage of your Personal Data.
                  </li>
                </ul>
              </li>
            </ul>

            <p className="mb-4">
              <strong>Analytics Partners.</strong> These parties provide
              analytics on web traffic or usage of the Services. They include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Companies that track how users found or were referred to the
                Services.
              </li>
              <li>
                Companies that track how users interact with the Services.
              </li>
            </ul>

            <p className="mb-4">
              <strong>Business Partners.</strong> These parties provide
              analytics on web traffic or usage of the Services. They include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Businesses that you have a relationship with.</li>
              <li>
                Companies that we partner with to offer joint promotional offers
                or opportunities.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-3">Legal Obligations</h3>
            <p>
              We may disclose any Personal Data that we collect with third
              parties in conjunction with any of the activities set forth under
              "Other Permitted Purposes for Processing Personal Data" section
              above.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-3">Business Transfers</h3>
            <p>
              All of your Personal Data that we collect may be transferred to a
              third party if we undergo a merger, acquisition, bankruptcy or
              other transaction in which that third party assumes control of our
              business (in whole or in part).
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-3">
              Data that is Not Personal Data
            </h3>
            <p>
              We may create aggregated, de-identified or anonymized data from
              the Personal Data we collect, including by removing information
              that makes the data personally identifiable to a particular user.
              We may use such aggregated, de-identified or anonymized data and
              disclose it with third parties for our lawful business purposes,
              including to analyze, build and improve the Services and promote
              our business, provided that we will not disclose such data in a
              manner that could identify you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">
              Tracking Tools, Advertising, and Opt-Out
            </h2>
            <p className="mb-4">
              The Services use cookies and similar technologies such as pixel
              tags, web beacons, clear GIFs and JavaScript (collectively,
              "Cookies") to enable our servers to recognize your web browser,
              tell us how and when you visit and use our Services, analyze
              trends, learn about our user base and operate and improve our
              Services. Cookies are small pieces of data– usually text files –
              placed on your computer, tablet, phone or similar device when you
              use that device to access our Services. We may also supplement the
              information we collect from you with information received from
              third parties, including third parties that have placed their own
              Cookies on your device(s).
            </p>
            <p className="mb-4">
              Please note that because of our use of Cookies, the Services do
              not support "Do Not Track" requests sent from a browser at this
              time.
            </p>
            <p className="mb-3">We use the following types of Cookies:</p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                <strong>Essential Cookies.</strong> Essential Cookies are
                required for providing you with features or services that you
                have requested. For example, certain Cookies enable you to log
                into secure areas of our Services. Disabling these Cookies may
                make certain features and services unavailable.
              </li>
              <li>
                <strong>Performance/Analytical Cookies.</strong>{" "}
                Performance/Analytical Cookies allow us to understand how
                visitors use our Services. They do this by collecting
                information about the number of visitors to the Services, what
                pages visitors view on our Services and how long visitors are
                viewing pages on the Services. Performance/Analytical Cookies
                also help us measure the performance of our advertising
                campaigns in order to help us improve our campaigns and the
                Services' content for those who engage with our advertising. For
                example, Google LLC ("Google") uses cookies in connection with
                its Google Analytics services. Google's ability to use and
                disclose information collected by Google Analytics about your
                visits to the Services is subject to the Google Analytics Terms
                of Use and the Google Privacy Policy. You have the option to
                opt-out of Google's use of Cookies by visiting the Google
                advertising opt-out page at www.google.com/privacy_ads.html or
                the Google Analytics Opt-out Browser Add-on at
                https://tools.google.com/dlpage/gaoptout/.
              </li>
              <li>
                <strong>Retargeting/Advertising Cookies.</strong>{" "}
                Retargeting/Advertising Cookies collect data about your online
                activity and identify your interests so that we can provide
                advertising that we believe is relevant to you. For more
                information about this, please see the section below titled
                "Information about Interest-Based Advertisements."
              </li>
            </ul>
            <p className="mb-4">
              You can decide whether or not to accept Cookies through your
              internet browser's settings. Most browsers have an option for
              turning off the Cookie feature, which will prevent your browser
              from accepting new Cookies, as well as (depending on the
              sophistication of your browser software) allow you to decide on
              acceptance of each new Cookie in a variety of ways. You can also
              delete all Cookies that are already on your device. If you do
              this, however, you may have to manually adjust some preferences
              every time you visit our website and some of the Services and
              functionalities may not work.
            </p>
            <p>
              To find out more information about Cookies generally, including
              information about how to manage and delete Cookies, please visit
              http://www.allaboutcookies.org/.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">
              Session Replay Technology
            </h2>
            <p>
              We may use session replay technology in order to identify and
              resolve customer issues, to monitor and analyze how you use our
              Services, to better understand user behavior, and to improve our
              Services. By continuing to use the Services, you consent to the
              use of session replay technology.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Data Security</h2>
            <p>
              We seek to protect your Personal Data from unauthorized access,
              use and disclosure using appropriate physical, technical,
              organizational and administrative security measures based on the
              type of Personal Data and how we are processing that data. You
              should also help protect your data by appropriately selecting and
              protecting your password and/or other sign-on mechanism; limiting
              access to your computer or device and browser; and signing off
              after you have finished accessing your account. Although we work
              to protect the security of your account and other data that we
              hold in our records, please be aware that no method of
              transmitting data over the internet or storing data is completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Data Retention</h2>
            <p className="mb-4">
              We retain Personal Data about you for as long as necessary to
              provide you with our Services or to perform our business or
              commercial purposes for collecting your Personal Data. When
              establishing a retention period for specific categories of data,
              we consider who we collected the data from, our need for the
              Personal Data, why we collected the Personal Data, and the
              sensitivity of the Personal Data. In some cases we retain Personal
              Data for longer, if doing so is necessary to comply with our legal
              obligations, resolve disputes or collect fees owed, or is
              otherwise permitted or required by applicable law, rule or
              regulation. We may further retain information in an anonymous or
              aggregated form where that information would not identify you
              personally.
            </p>
            <p className="mb-2">For example:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We retain your profile information and credentials for as long
                as you have an account with us.
              </li>
              <li>
                We retain your payment data for as long as we need to process
                your purchase or subscription.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">
              Personal Data of Children
            </h2>
            <p>
              As noted in the Terms of Use, we do not knowingly collect or
              solicit Personal Data from children under 18 years of age; if you
              are a child under the age of 18, please do not attempt to register
              for or otherwise use the Services or send us any Personal Data. If
              we learn we have collected Personal Data from a child under 18
              years of age, we will delete that information as quickly as
              possible. If you believe that a child under 18 years of age may
              have provided Personal Data to us, please contact us at{" "}
              <a
                href="mailto:support@yapyappay.com"
                className="text-primary hover:underline"
              >
                support@yapyappay.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">
              Other State Law Privacy Rights
            </h2>

            <h3 className="text-lg font-medium mb-3">
              California Resident Rights
            </h3>
            <p className="mb-4">
              Under California Civil Code Sections 1798.83-1798.84, California
              residents are entitled to contact us to prevent disclosure of
              Personal Data to third parties for such third parties' direct
              marketing purposes; in order to submit such a request, please
              contact us at{" "}
              <a
                href="mailto:support@yapyappay.com"
                className="text-primary hover:underline"
              >
                support@yapyappay.com
              </a>
              . Your browser may offer you a "Do Not Track" option, which allows
              you to signal to operators of websites and web applications and
              services that you do not wish such operators to track certain of
              your online activities over time and across different websites.
              Our Services do not support Do Not Track requests at this time. To
              find out more about "Do Not Track," you can visit
              www.allaboutdnt.com.
            </p>

            <h3 className="text-lg font-medium mb-3">Nevada Resident Rights</h3>
            <p>
              Please note that we do not currently sell your Personal Data as
              sales are defined in Nevada Revised Statutes Chapter 603A.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Contact Information</h2>
            <p className="mb-2">
              If you have any questions or comments about this Privacy Policy,
              please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Website:</strong> www.yapyappay.com
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@yapyappay.com"
                  className="text-primary hover:underline"
                >
                  support@yapyappay.com
                </a>
              </li>
              <li>
                <strong>Address:</strong> 131 Continental Dr, Suite 305, Newark,
                DE 19713 US
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
