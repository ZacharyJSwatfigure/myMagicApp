import "../../../style/cardPopup.css";

function CardPopup(props) {
  return props.trigger ? (
    <section className="popUp">
      {props.children}
      <button className="close-btn" onClick={() => props.setTrigger(false)}>
        X
      </button>
    </section>
  ) : (
    ""
  );
}

export default CardPopup;
