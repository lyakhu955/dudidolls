import { Fragment } from "react";

const ITEMS = [
  "fatto a mano",
  "cucito una alla volta",
  "edizione unica",
  "consegnato in 24h",
  "made in sudtirolo",
  "pezzi numerati",
];

function Row() {
  return (
    <span>
      {ITEMS.map((t, i) => (
        <Fragment key={i}>
          {t}
          <span className="dot" />
        </Fragment>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
