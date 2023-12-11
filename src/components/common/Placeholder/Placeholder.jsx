export function Placeholder({ styling }) {
  let stylingdata = {
    width: styling.width,
    height: styling.height,
    marginTop: styling.padding,
    marginRight: styling.marginRight,
    borderRadius: styling.borderRadius,
    marginLeft: styling.marginLeft,
    minHeight: styling.minHeight,
  };
  return (
    <>
      <div className="placeholder-glow" style={{ display: `${styling.display ? styling.display : "block"}` }}>
        <p className="placeholder bg-secondary" style={stylingdata}></p>
      </div>
    </>
  );
}
