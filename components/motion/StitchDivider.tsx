export function StitchDivider({ label = "piega · cucitura · piega", id = "00" }: { label?: string; id?: string }) {
  return (
    <div className="stitch-divider">
      <span>fold · {id}</span>
      <span className="notch" />
      <span>{label}</span>
      <span className="notch" />
      <span>fold · {id}</span>
    </div>
  );
}

export function Selvedge() {
  return <div className="selvedge" aria-hidden="true" />;
}
