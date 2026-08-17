import { useState, useEffect, useCallback } from 'react';
import { MUSEUM_CONFIG, type ArtworkPlacard, type ArchivalMemory } from './data/museumContent';
import { NavigationHUD } from './components/NavigationHUD';
import { FloorMapModal } from './components/FloorMapModal';
import { ExhibitionCatalogModal } from './components/ExhibitionCatalogModal';
import { ArtworkModal } from './components/ArtworkModal';
import { ArchivalViewerModal } from './components/ArchivalViewerModal';
import { CustomCursor } from './components/CustomCursor';
import { soundEngine } from './utils/soundEngine';

// Rooms
import { Room00_Entrance } from './rooms/Room00_Entrance';
import { Room01_Lobby } from './rooms/Room01_Lobby';
import { Room02_TheMind } from './rooms/Room02_TheMind';
import { Room03_HerSpirit } from './rooms/Room03_HerSpirit';
import { Room04_TheFunnyOne } from './rooms/Room04_TheFunnyOne';
import { Room05_TheLivingArchive } from './rooms/Room05_TheLivingArchive';
import { Room06_TheLittleThings } from './rooms/Room06_TheLittleThings';
import { Room07_TheWomanSheIs } from './rooms/Room07_TheWomanSheIs';
import { Room08_TheFutureWing } from './rooms/Room08_TheFutureWing';
import { Room09_TheLetter } from './rooms/Room09_TheLetter';
import { Room10_TheFinalRoom } from './rooms/Room10_TheFinalRoom';

export function App() {
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0);
  const [isFloorMapOpen, setIsFloorMapOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [inspectedArtwork, setInspectedArtwork] = useState<ArtworkPlacard | null>(null);
  const [inspectedArchivalItem, setInspectedArchivalItem] = useState<ArchivalMemory | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const totalRooms = MUSEUM_CONFIG.rooms.length;

  const navigateToRoom = useCallback((index: number) => {
    if (index < 0 || index >= totalRooms || index === currentRoomIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRoomIndex(index);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setIsTransitioning(false);
    }, 450);
  }, [currentRoomIndex, totalRooms]);

  // Keyboard navigation for seamless museum walkthrough
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        if (currentRoomIndex < totalRooms - 1) {
          e.preventDefault();
          soundEngine.playFootstep();
          navigateToRoom(currentRoomIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentRoomIndex > 0) {
          e.preventDefault();
          soundEngine.playFootstep();
          navigateToRoom(currentRoomIndex - 1);
        }
      } else if (e.key === 'm' || e.key === 'M') {
        setIsFloorMapOpen((prev) => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        setIsCatalogOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsFloorMapOpen(false);
        setIsCatalogOpen(false);
        setInspectedArtwork(null);
        setInspectedArchivalItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRoomIndex, totalRooms, navigateToRoom]);

  return (
    <div className="relative min-h-screen bg-[#F7F5F1] text-[#1C1C1C] overflow-x-hidden font-sans selection:bg-[#B89A57]/30 selection:text-[#0D0D0D]">
      
      {/* Precision Gallery Reticle Cursor */}
      <CustomCursor />

      {/* Persistent Museum Navigation HUD */}
      <NavigationHUD
        currentRoomIndex={currentRoomIndex}
        onSelectRoom={navigateToRoom}
        onOpenFloorMap={() => setIsFloorMapOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />

      {/* Spatial Camera Transition Overlay */}
      <div 
        className={`fixed inset-0 z-50 pointer-events-none bg-[#0D0D0D] transition-opacity duration-500 ease-in-out ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Main Room Rendering with Continuous Curatorial Architecture */}
      <main className="relative z-10">
        {currentRoomIndex === 0 && (
          <Room00_Entrance onEnter={() => navigateToRoom(1)} />
        )}
        {currentRoomIndex === 1 && (
          <Room01_Lobby
            onNext={() => navigateToRoom(2)}
            onOpenCatalog={() => setIsCatalogOpen(true)}
            onOpenFloorMap={() => setIsFloorMapOpen(true)}
          />
        )}
        {currentRoomIndex === 2 && (
          <Room02_TheMind
            onInspectArtwork={(art) => setInspectedArtwork(art)}
            onNext={() => navigateToRoom(3)}
          />
        )}
        {currentRoomIndex === 3 && (
          <Room03_HerSpirit
            onInspectArtwork={(art) => setInspectedArtwork(art)}
            onNext={() => navigateToRoom(4)}
          />
        )}
        {currentRoomIndex === 4 && (
          <Room04_TheFunnyOne
            onInspectArtwork={(art) => setInspectedArtwork(art)}
            onNext={() => navigateToRoom(5)}
          />
        )}
        {currentRoomIndex === 5 && (
          <Room05_TheLivingArchive
            onInspectArchivalItem={(item) => setInspectedArchivalItem(item)}
            onNext={() => navigateToRoom(6)}
          />
        )}
        {currentRoomIndex === 6 && (
          <Room06_TheLittleThings
            onInspectArtwork={(art) => setInspectedArtwork(art)}
            onNext={() => navigateToRoom(7)}
          />
        )}
        {currentRoomIndex === 7 && (
          <Room07_TheWomanSheIs
            onInspectArtwork={(art) => setInspectedArtwork(art)}
            onNext={() => navigateToRoom(8)}
          />
        )}
        {currentRoomIndex === 8 && (
          <Room08_TheFutureWing
            onNext={() => navigateToRoom(9)}
          />
        )}
        {currentRoomIndex === 9 && (
          <Room09_TheLetter
            onNext={() => navigateToRoom(10)}
          />
        )}
        {currentRoomIndex === 10 && (
          <Room10_TheFinalRoom
            onRestart={() => navigateToRoom(0)}
            onOpenCatalog={() => setIsCatalogOpen(true)}
          />
        )}
      </main>

      {/* Architectural Floor Map Modal */}
      <FloorMapModal
        isOpen={isFloorMapOpen}
        onClose={() => setIsFloorMapOpen(false)}
        currentRoomIndex={currentRoomIndex}
        onSelectRoom={navigateToRoom}
      />

      {/* Exhibition Booklet & Downloadable Catalog Modal */}
      <ExhibitionCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />

      {/* Detailed Artwork Inspection Modal */}
      <ArtworkModal
        artwork={inspectedArtwork}
        onClose={() => setInspectedArtwork(null)}
      />

      {/* Living Archive Full-Screen Viewer Modal */}
      <ArchivalViewerModal
        item={inspectedArchivalItem}
        onClose={() => setInspectedArchivalItem(null)}
      />

    </div>
  );
}

export default App;
