import "../App.css";
import "../styles/policy.css"

function PrivacyPolicy() {
  return (
    <div className="ft-primary m-container">
      <h3 className="txt-primary">Privacy Policy</h3>
      <ol className="ft-sec-reg txt-secondary">
        <li>
          This privacy policy sets out how <a href="/">www.dwivedisarees.in</a>{" "}
          uses and protects any information that you give www.dwivedisarees.in
          when you use this website
        </li>
        <li>
          <a href="/">www.dwivedisarees.in</a>is committed to ensuring that your
          privacy is protected. Should we ask you to provide certain information
          by which you can be identified when using this website, then you can
          be assured that it will only be used in accordance with this privacy
          statement
        </li>
        <li>
          <a href="/">www.dwivedisarees.in</a> may change this policy from time
          to time by updating this page. You should check this page from time to
          time to ensure that you are happy with any changes. This policy is
          effective from 14/02/2024.
        </li>
      </ol>
      <h5 className="txt-secondary">
        We may collect the following information:
      </h5>
      <ol className="ft-sec-reg txt-secondary">
        <li>Name and Date of birth</li>
        <li>Contact information including email address</li>
        <li>
          Demographic information such as postcode, preferences and interests
        </li>
        <li>Other information relevant to customer surveys and/or offers</li>
      </ol>
      <br />
      <h5 className="txt-secondary">
        We require this information to understand your needs and provide you
        with a better service, and in particular for the following reasons
      </h5>
      <ol className="ft-sec-reg txt-secondary">
        <li>Internal record keeping</li>
        <li>We may use the information to improve our products and services</li>
        <li>
          We may periodically send promotional emails about new products,
          special offers or other information which we think you may find
          interesting using the email address which you have provided
        </li>
        <li>
          From time to time, we may also use your information to contact you for
          market research purposes. We may contact you by email, phone, fax or
          mail. We may use the information to customize the website according to
          your interests.
        </li>
      </ol>
      <h5 className="txt-secondary">Security :</h5>
      <p className="txt-secondary ft-sec-reg">
        We are committed to ensuring that your information is secure. In order
        to prevent unauthorized access or disclosure we have put in place
        suitable physical, electronic and managerial procedures to safeguard and
        secure the information we collect online.{" "}
      </p>
      <h5 className="txt-secondary">How we use cookies :</h5>
      <ol className="ft-sec-reg txt-secondary">
        <li>
          {
            "A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site"
          }
        </li>
        <li>
          {
            "Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences"
          }
        </li>
        <li>
          {
            "We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system"
          }
        </li>
        <li>
          {
            "Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us"
          }
        </li>
        <li>
          {
            "You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website"
          }
        </li>
      </ol>
    </div>
  );
}

export default PrivacyPolicy;
