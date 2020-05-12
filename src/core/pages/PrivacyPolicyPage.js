import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  /**
   * The GDPR privacy policy page.
   */

  useEffect(() => {
    document.title = "Privacy Policy - stratako";
  });
  
  return (
    <div className="privacy-policy-page">
      <h1>stratako Privacy Policy</h1>
      <p>
        This is the privacy policy for stratako and associated apps.
      </p>
      <p><Link to="/">Back Home</Link></p>

      <h2>Your Data</h2>
      <p>
        In addition to the quantities you manage with Lytiko, Lytiko stores your
        email address, your name, the date you last logged in and the date you
        signed up.
      </p>
      <p>
        This data is never transferred to a third party for any reason. We do
        not sell or provide access to your data. Your data is stored on our
        servers in a secure fashion.
      </p>
      <p>
        We do not store copies of your data if you delete your account - if you
        want your data removed from our servers entirely, you may do this at any
        time.
      </p>

      <h2>Contacting You</h2>
      <p>
        We may use your email address to send you servive-critical emails, such
        as password resets, email verification, and so on.
      </p>
    </div>
  );
}

export default PrivacyPolicyPage;