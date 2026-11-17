import "./PlaceholderPage.css";

function PlaceholderPage({ title, number }) {
  return (
    <section className="placeholder-page">
      <span>{number} / RKS ROYAL KINGS SECURITY</span>
      <h1>{title}</h1>
      <p>This page will be designed next.</p>
    </section>
  );
}

export default PlaceholderPage;