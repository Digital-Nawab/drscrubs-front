import React from 'react'
import { lazy } from "react";
import './PrivacyPolicy.css';
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div
        className="counterup__banner--section counterup__banner__bg2"
        id="funfactId"
      >
        <img src="assets/img/privacy02.webp" width="100%" alt="" />
      </div>


      <div className="container">
        <div className='section-title'>
          <div className="row">
            <div className='col-md-1'></div>
            <div className="col-md-10">
              <div className='privacy-text'>

                <h2 className="mt-5 text-center">Privacy & Terms</h2>

                <h3 className="mt-5 mb-3">Privacy policy</h3>
                <p className='md-1-let'>
                  This Privacy Policy describes h   ow knyamed.com (the "Site" or "we") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.
                </p>
                <h3 className='mb-3'>Collecting Personal Information</h3>
                <p className='md-1-let'>When you visit the Site, we collect certain information about your device, your interaction with the Site, and the information necessary to process your purchases.
                  We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual as "Personal Information". See the list below for more information about what Personal Information we collect and why.
                </p>
                <h3 className='mb-3'>Device information</h3>
                <div className='md-1-let'>
                  <div>
                    Examples of Personal Information collected: version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.
                    <br />
                    <b>Purpose of collection:</b> to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.
                    <br />
                    <b>Source of collection: </b>Collected automatically when you access our Site using
                    cookies, log files, web beacons, tags, or pixels.
                    <br />
                    Disclosure for a business purpose: shared with our processor Shopify.
                  </div> <br />
                  <h3 className='mb-3'>Order information</h3>
                  <div>
                    Examples of Personal Information collected: name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.
                    <br />
                    Purpose of collection: to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
                    <br />
                    Source of collection: collected from you
                    <br />

                    Disclosure for a business purpose: shared with our processor Shopify or Any other vendors for sales channels, payment gateways, shipping and fulfillment apps etc.
                    <br />
                    <span>Customer support information</span>
                    <br />
                    Purpose of collection: to provide customer support.
                    <br />
                    Source of collection: collected from you.
                    <br />
                    Disclosure for a business purpose: [ADD ANY VENDORS USED TO PROVIDE CUSTOMER SUPPORT]
                    <h3 className='mt-4 mb-3'> Minors</h3>
                    <p>
                      We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us at the address below to request deletion.
                    </p>
                  </div><br />
                </div>
                <h3 className='mb-3'>Sharing Personal Information</h3>
                <p>
                  The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011
                </p>
                <p>
                  This is an organizational website belonging to Design Resource India Pvt Ltd and contains promoter, and discloses information of the company.
                </p>
                <p>
                  Further, in case of anyone visiting this website to read or download information, it must be known that DR Scrubs, his companies/ affiliates collected and stored a standard set of internet-related information, such as an Internet Protocol (IP) address, the date and time, the type of browser and operating system used, the pages(s) visited. All information is collected to help making this site more useful to its customer(s), stakeholders, investors etc. and only used for statistical purposes.
                </p>
                <p>
                  Except as set out in this privacy policy do not disclose any personally identifiable information without permission, unless legally entitled or required to do so or if believed that it is necessary to protect and/or defend its rights, property or personal safety etc.
                </p>
                <h3 className='mb-3'>Behavioural Advertising</h3>
                <p>
                  As described above, we use your Personal Information to provide you with advertisements or marketing communications we believe may be of interest. For example:
                </p>
                <div>
                  <p>
                  We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information <a href="https://policies.google.com/privacy.">https://policies.google.com/privacy.</a> You can also opt-out of Google Analytics <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>
                  </p>
                  <p>
                    You can opt out of targeted advertising by:
                  </p>
                  <div>
                    <p>
                      FACEBOOK - <a href="https://www.facebook.com/settings/?tab=ads">https://www.facebook.com/settings/?tab=ads</a>
                    </p>
                    <p>
                      GOOGLE - <a href="https://www.google.com/settings/ads/anonymous">https://www.google.com/settings/ads/anonymous</a>
                    </p>
                    <p>
                      BING -  <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads">https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</a>
                    </p>
                  </div>
                  <p>
                    Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: <a href="http://optout.aboutads.info/.">http://optout.aboutads.info/.</a>
                  </p>
                  <h3 className='mb-3'> Using Personal Information </h3>
                  <p className='md-1-let'>
                    We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.
                  </p>
                  <h3 className='mb-3'>Lawful basis</h3>
                  <p className='md-1-let'>
                    Pursuant to the General Data Protection Regulation ("GDPR"), if you are a resident of the European Economic Area ("EEA"), we process your personal information under the following lawful bases:
                  </p>
                  <ul className='lawful'>
                    <li> Your consent;</li>
                    <li> The performance of the contract between you and the Site;</li>
                    <li> Compliance with our legal obligations;</li>
                    <li> To protect your vital interests;</li>
                    <li> To perform a task carried out in the public interest;</li>
                    <li> To perform a task carried out in the public interest;</li>
                  </ul> <br />
                  <h3 className='mb-3'> Retention </h3>
                  <p>
                    When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the 'Your rights' section.
                  </p>
                  <h3 className='mb-3'>
                    Automatic decision-making
                  </h3>
                  <p>
                    If you are a resident of the EEA, you have the right to object to processing based solely on automated decision-making (which includes profiling), when that decision- making has a legal effect on you or otherwise significantly affects you.
                    <br />
                    We Do engage in fully automated decision-making that has a legal or otherwise significant effect using customer data.
                  </p>
                  <p>
                    Our processor Shopify uses limited automated decision-making to prevent fraud that does not have a legal or otherwise significant effect on you.
                  </p>
                  <p>
                    Services that include elements of automated decision-making include:
                  </p>
                  <ul>
                    <li>
                      ⦁	Temporary denylist of IP addresses associated with repeated failed transactions. This denylist persists for a small number of hours
                    </li>
                    <li>
                      ⦁	Temporary denylist of credit cards associated with denylisted IP addresses. This denylist persists for a small number of days.
                    </li>
                  </ul> <br />
                  <h3 className='mb-3'>
                    Change of Privacy Policy
                  </h3>
                  <p>
                    Knya Med reserve the full rights to change/alter/amend/modify the contents of the privacy policy from time to time without any prior notice or intimation.
                  </p>
                  <span>
                    Copyright © Dr Scrubs
                  </span>
                  <h4>
                    Your Rights
                  </h4  >
                  <p>
                    [INCLUDE FOLLOWING SECTION IF YOUR STORE IS LOCATED IN OR IF YOU HAVE CUSTOMERS IN EUROPE]
                  </p> <br />
                  <h3 className='mb-3'>
                    GDPR
                  </h3>
                  <p>
                    If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below
                  </p>
                  <h3 className='mb-3'>
                    Cookies
                  </h3>
                  <p>
                    A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use a number of different cookies, including
                    functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don't have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it's their first time visiting or if they are a frequent visitor. <br />
                    We use the following cookies to optimize your experience on our Site and to provide our services. <br />
                    The length of time that a cookie remains on your computer or mobile device depends on whether it is a “persistent” or “session” cookie. Session cookies last until you stop browsing and persistent cookies last until they expire or are deleted. Most of the cookies we use are persistent and will expire between 30 minutes and two years from the date they are downloaded to your device.
                    <br /> You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website may no longer be fully accessible.
                    <br /> Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls, often found in your browser’s “Tools” or “Preferences” menu. For more information on how to modify your browser settings or how to block, manage or filter cookies can be found in your browser’s help file or through such sites as  <a href="www.allaboutcookies.org.">www.allaboutcookies.org.</a>  <br /> Additionally, please note that blocking cookies may not completely prevent how we share information with third parties such as our advertising partners. To exercise your rights or opt-out of certain uses of your information by these parties, please follow the instructions in the “Behavioural Advertising” section above.
                  </p>

                  <h3 className='mb-3'>
                    Do Not Track
                  </h3>
                  <p>
                    Please note that because there is no consistent industry understanding of how to respond to "Do Not Track" signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.
                  </p>
                  <h3 className='mb-3'>
                    Changes
                  </h3>
                  <p>
                    We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
                  </p>
                  <h3 className='mb-3'>
                    Contact
                  </h3>
                  <p>
                    For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at [email address] or by mail using the details provided below: <br /> Support@drscrubs.in <a href="https://drscrubs.in/">https://drscrubs.in/</a>
                    <br />
                    Tapasya Corp Heights,<br />
                    Ground Floor, Sector 126, <br />
                    Uttar Pradesh, Noida, <br />

                    If you are not satisfied with our response to your complaint, you have the right to
                    lodge your complaint with the relevant data protection authority. You can contact
                    your local data protection authority, or our supervisory authority here.
                    <br />
                    Ask us anything at all & we'll find a way to help WhatsApp at +91 87429 11972
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

    <Footer />
    </>
  )
}

export default PrivacyPolicy