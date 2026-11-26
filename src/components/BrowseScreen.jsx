// src/components/BrowseScreen.jsx
import { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { profiles, rowsByProfile, heroByProfile, findItem } from "../data/content";
import { useProfile } from "../context/ProfileContext";
import Header from "./Header";
import Hero from "./Hero";
import Row from "./Row";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import DetailModal from "./DetailModal";
import ContactModal from "./ContactModal";

export default function BrowseScreen() {
  const { profileId } = useParams();
  const profile = profiles.find((p) => p.id === profileId);
  const { setActiveProfile } = useProfile();
  const musicRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      setActiveProfile(profile);
      document.title = `Tanay Sinha · ${profile.name}`;
      window.scrollTo(0, 0);
    }
  }, [profile, setActiveProfile]);

  if (!profile) return <Navigate to="/" replace />;

  const rows = rowsByProfile[profile.id] || [];
  const hero = heroByProfile[profile.id];

  const openItem = (item) => {
    // Videos have their own sound — pause the background song.
    if (item?.video || item?.youtube) musicRef.current?.pause();
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-netflixBlack text-white">
      <Header profile={profile} />
      <Hero
        key={profile.id}
        profile={profile}
        hero={hero}
        onOpen={(id) => openItem(findItem(id))}
        onContact={() => setContactOpen(true)}
      />

      <main className="relative z-10 -mt-16 md:-mt-24 pb-6">
        {rows.map((row) => (
          <Row key={row.title} title={row.title} items={row.data} variant={row.variant} onCardClick={openItem} />
        ))}
      </main>

      <Footer onContact={() => setContactOpen(true)} />

      <MusicPlayer key={profile.id} ref={musicRef} song={hero.song} cover={hero.photo} />
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onMediaPlay={() => musicRef.current?.pause()} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
