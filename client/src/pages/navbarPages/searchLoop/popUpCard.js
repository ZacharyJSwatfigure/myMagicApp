import "../../../style/cardPopup.css";

function CardPopup(props) {
  return props.trigger ? (
    <section className="popUp">
      <button className="close-btn" onClick={() => props.setTrigger(false)}>
        X
      </button>
      {props.children}
    </section>
  ) : (
    ""
  );
}

export default CardPopup;
