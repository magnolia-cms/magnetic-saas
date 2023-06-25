import Img from "../../components/Img";

function ContactForm(props) {
  const { title, buttonText } = props;

  return (
    <div className="Quote-wrapper">
      <div className="Quote">
        {title && (
          <div
            className="Quote__quote"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}

        <div className="form">
          <form action="" method="get" class="contactForm">
            <div>
              <label for="email">Your email: </label>
              <input type="email" name="email" id="email" required></input>
            </div>
            <div>
              <label for="subject">Your subject: </label>
              <input type="text" name="subject" id="subject" required></input>
            </div>
            <div>
              <label for="message">Message: </label>
              <textarea
                rows="10"
                cols="50"
                name="message"
                id="message"
                required
              ></textarea>
            </div>
            <div>
              <input type="submit" value={buttonText || "submit"}></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
