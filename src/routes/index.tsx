import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Heart, MapPin, Moon, Utensils, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeddingScratchCard } from "@/components/wedding-scratch-card";
import { WeddingCountdown } from "@/components/wedding-countdown";
import { DoorReveal } from "@/components/door-reveal";
import welcome from "@/assets/royal-grace-welcome-bg.jpg.asset.json";
import general from "@/assets/royal-grace-general-bg.jpg.asset.json";
import end from "@/assets/royal-grace-end-bg.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "A Blessed Journey | Nikah & Valima Invitation" },
    { name: "description", content: "With your presence and duas, celebrate our Nikah on 1 November 2026 and Valima on 3 November 2026." },
    { property: "og:title", content: "A Blessed Journey | Nikah & Valima Invitation" },
    { property: "og:description", content: "You are warmly invited to celebrate our Nikah on 1 November and Valima on 3 November 2026." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [showNames, setShowNames] = useState(false);
  return (
    <main className="invitation">
      <DoorReveal />
      <section className="floral-section welcome-section">
        <img className="floral-background" src={welcome.url} alt="" />
        <p className="invitation-eyebrow">Together with our families</p>
        <h1 className="invitation-title">As they begin this blessed journey of marriage, we would be honoured by your presence at this joyous occasion.</h1>
        <div className="ornament" aria-hidden="true"><Heart size={18} strokeWidth={1} /></div>
        <p className="invitation-copy">Your presence and duas will make this celebration truly meaningful to us.</p>
        <p className="invitation-blessing">InshaAllah, we look forward to celebrating with you.</p>
        <div className="ornament" aria-hidden="true"><span>✧</span></div>
        <Button variant="ghost" className="compliments-button" aria-expanded={showNames} aria-controls="compliment-names" onClick={() => setShowNames(!showNames)}>
          With best compliments from <ChevronDown className={showNames ? "rotate-180" : ""} />
        </Button>
        {showNames && <ul id="compliment-names" className="compliment-names">
          {["dadu", "nanu", "Mr Abdul Aleem mujahid", "Mr Rafiuddin shreef", "Mr Zakiuddin shareef", "Mr Lateefuddin shareef", "Mr Shafiuddin shareef", "Mr Mohammed Faheem", "Mr Mohammed Ismail", "Mr Syed Abdul Qayum", "Mr Mohammed Akram muneer uddin"].map(name => <li key={name}>{name}</li>)}
        </ul>}
      </section>
      <section className="floral-section dates-section">
        <img className="floral-background" src={general.url} alt="" loading="lazy" />
        <p className="invitation-eyebrow">Two days. One blessed beginning.</p>
        <h2 className="section-title">You're invited</h2>
        <p className="section-subtitle">A celebration close to our hearts</p>
        <WeddingScratchCard />
        <p className="scratch-hint">With love, we await your presence</p>
        <WeddingCountdown />
        <p className="nikah-date">Sunday, 1 November 2026</p>
        <div className="ornament" aria-hidden="true"><Heart size={18} strokeWidth={1} /></div>
      </section>
      <section className="floral-section celebration-section" aria-labelledby="nikah-timeline-heading">
        <img className="floral-background" src={general.url} alt="" loading="lazy" />
        <p className="invitation-eyebrow">The wedding celebration</p>
        <h2 className="section-title" id="nikah-timeline-heading">Nikah</h2>
        <p className="section-subtitle">1 November 2026</p>
        <ol className="wedding-timeline">
          <li><Moon size={21} strokeWidth={1} aria-hidden="true" /><span>After Maghrib</span></li>
          <li><Utensils size={21} strokeWidth={1} aria-hidden="true" /><span>Dinner follows</span></li>
          <li><Clock size={21} strokeWidth={1} aria-hidden="true" /><span>Ceremony: 1AM</span></li>
        </ol>
        <div className="venue-details">
          <p className="venue-label">Wedding venue</p>
          <h3 className="venue-name">Sudarshan Convention</h3>
          <Button variant="link" asChild><a href="https://share.google/a4djyRf3YFNQsHYt6" target="_blank" rel="noopener noreferrer" aria-label="Open Sudarshan Convention location in Google Maps"><MapPin aria-hidden="true" />Google Maps</a></Button>
        </div>
        <div className="ornament" aria-hidden="true"><Heart size={18} strokeWidth={1} /></div>
        <div className="venue-details">
          <p className="venue-label">Reception venue · 3 November 2026</p>
          <h3 className="venue-name">Mahboob pride palace</h3>
          <Button variant="link" asChild><a href="https://maps.app.goo.gl/GsbLfTwoLLTKbRiQA" target="_blank" rel="noopener noreferrer" aria-label="Open Mahboob pride palace location in Google Maps"><MapPin aria-hidden="true" />Google Maps</a></Button>
        </div>
      </section>
      <section className="floral-section sanchak-section" aria-labelledby="sanchak-heading">
        <img className="floral-background" src={general.url} alt="" loading="lazy" />
        <p className="invitation-eyebrow">Pre-wedding celebration</p>
        <h2 className="section-title" id="sanchak-heading">Sanchak</h2>
        <p className="section-subtitle">2:00PM</p>
        <div className="venue-details">
          <p className="venue-label">Sanchak venue</p>
          <h3 className="venue-name">Unqiue palace</h3>
          <Button variant="link" asChild><a href="https://share.google/kydG58p4KC3VtXHqM" target="_blank" rel="noopener noreferrer" aria-label="Open Unqiue palace location in Google Maps"><MapPin aria-hidden="true" />Google Maps</a></Button>
        </div>
      </section>
      <section className="floral-section closing-section">
        <img className="floral-background" src={end.url} alt="" loading="lazy" />
        <h2 className="section-title">A few notes for you</h2>
        <div className="info-boxes">
          <div className="info-box">
            <h3 className="info-box-title">Transportation</h3>
            <p className="info-box-copy">provided accordingly</p>
          </div>
          <div className="info-box">
            <h3 className="info-box-title">Host Contacts</h3>
            <p className="info-box-copy"><a href="tel:+918790858515">+91 8790858515</a><br /><a href="tel:+917396308824">+91 7396308824</a></p>
          </div>
        </div>
        <p className="made-by">Made by - Bhootnath :)</p>
      </section>
    </main>
  );
}
