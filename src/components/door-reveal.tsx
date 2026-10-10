import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import backdrop from "@/assets/door-invitation-backdrop.webp.asset.json";
import leftDoor from "@/assets/door-left-door.webp.asset.json";
import rightDoor from "@/assets/door-right-door.webp.asset.json";
import leftCurtain from "@/assets/door-left-curtain.webp.asset.json";
import rightCurtain from "@/assets/door-right-curtain.webp.asset.json";

export function DoorReveal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => { window.scrollTo({ top: 0 }); setOpen(false); };

  return (
    <div className={`dr${open ? " is-open" : ""}`}>
      <section className="dr-invitation" aria-label="Wedding invitation" inert={!open}>
        <div className="dr-scene" aria-hidden="true"><img src={backdrop.url} alt="" fetchPriority="high" /></div>
        <header className="dr-top">
          <button type="button" className="dr-replay" onClick={close} aria-label="Close invitation"><RotateCcw size={13} /> <span>Close</span></button>
        </header>
        <div className="dr-main">
          <p className="dr-eyebrow arabic-ligature" lang="ar" dir="rtl">﷽</p>
          <p className="dr-rule" aria-hidden="true"><span>♥</span></p>
          <h1 className="dr-couple">
            <span className="dr-person"><span className="dr-name">Daughter of</span><span className="dr-parent">Mrs &amp; Mr Abdul Kaleem Mujahid</span></span>
            <span className="dr-amp" aria-hidden="true">&amp;</span>
            <span className="dr-person"><span className="dr-name">Mohammed Omer Farooq Taj</span><span className="dr-parent">son of Mohammed Sultan Taj Sahab</span></span>
          </h1>

        </div>
      </section>
      <div className="dr-curtains" aria-hidden="true">
        <div className="dr-curtain dr-curtain-left"><img src={leftCurtain.url} alt="" /></div>
        <div className="dr-curtain dr-curtain-right"><img src={rightCurtain.url} alt="" /></div>
      </div>
      <div className="dr-doors" aria-hidden={open}>
        <div className="dr-door dr-door-left"><img src={leftDoor.url} alt="" fetchPriority="high" /></div>
        <div className="dr-door dr-door-right"><img src={rightDoor.url} alt="" fetchPriority="high" /></div>
        <div className="dr-caption"><p>A little door to our forever.</p><span>A wedding invitation</span></div>
        <button type="button" className="dr-trigger" aria-label="Tap to open wedding invitation" onClick={() => setOpen(true)} tabIndex={open ? -1 : 0} />
      </div>
    </div>
  );
}
