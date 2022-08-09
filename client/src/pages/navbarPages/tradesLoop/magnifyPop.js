import "../../../style/cardPopup.css";

function MagPopUp(props) {
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

export default MagPopUp;
