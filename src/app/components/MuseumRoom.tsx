import { motion } from "motion/react";
import { useState } from "react";
import { Star, Sparkles, Moon, Orbit, Zap, Stars, Circle, Plus } from "lucide-react";
import { StoryPanel } from "./StoryPanel";
import { CreateStoryForm, NewStory, CosmicObjectType } from "./CreateStoryForm";

interface CosmicObject {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: { x: string; y: string };
  label: string;
  size: string;
  color: string;
  story: {
    title: string;
    person: string;
    memory: string;
    emotion: string;
    imagePrompt: string;
  };
}

const cosmicObjects: CosmicObject[] = [
  {
    id: "star-1",
    name: "Bright Star",
    icon: <Star className="w-12 h-12" />,
    position: { x: "15%", y: "20%" },
    size: "w-12 h-12",
    color: "#c8ddf5",
    label: "The Guiding Star",
    story: {
      title: "The Guiding Star",
      person: "Elena, 72",
      memory: "My grandmother and I used to watch the stars from her porch every summer night. She'd point to the North Star and say, 'No matter how lost you feel, there's always something constant.' After she died, I couldn't look at the stars for years. Last week, my granddaughter asked me to teach her the constellations. I pointed to the North Star first.",
      emotion: "The cyclical nature of grief becoming guidance, loss transforming into legacy.",
      imagePrompt: "A bright star in deep space surrounded by soft nebula clouds, cosmic dust particles, ethereal glow, dreamy and nostalgic atmosphere, space photography with vintage film grain"
    }
  },
  {
    id: "nebula-1",
    name: "Pink Nebula",
    icon: <Sparkles className="w-16 h-16" />,
    position: { x: "70%", y: "30%" },
    size: "w-16 h-16",
    color: "#4d4177",
    label: "The Dream Cloud",
    story: {
      title: "The Dream Cloud",
      person: "Marcus, 34",
      memory: "I used to dream in color every night. Vivid, impossible worlds. Then the accident happened, and the medication stopped the dreams entirely. For three years, sleep was just darkness. Last month, I dreamed again—a purple nebula where my brother and I were kids, floating through space, laughing. I woke up crying, but I was grateful.",
      emotion: "The fragile beauty of memory returning after years of numbness.",
      imagePrompt: "A swirling purple and pink nebula cloud in deep space, soft ethereal light, dreamy and emotional atmosphere, cosmic dust and stars, deep field space photography"
    }
  },
  {
    id: "planet-1",
    name: "Blue Planet",
    icon: <Circle className="w-14 h-14" />,
    position: { x: "45%", y: "55%" },
    size: "w-14 h-14",
    color: "#3a60a0",
    label: "The Home World",
    story: {
      title: "The Home World",
      person: "Amara, 31",
      memory: "I left my country when I was nineteen. I can never go back. Sometimes I close my eyes and try to remember the exact shade of blue in the sky, the smell of rain on the street where I grew up, my mother's voice saying my name. The memories feel like a planet I used to live on—still out there, still real, but impossibly far away.",
      emotion: "The astronaut's paradox: homesick for a place you can see but never touch again.",
      imagePrompt: "A distant blue planet viewed from space, soft atmospheric glow, stars in background, lonely and beautiful, sense of longing and distance, cinematic space photography"
    }
  },
  {
    id: "comet-1",
    name: "Comet",
    icon: <Zap className="w-10 h-10" />,
    position: { x: "80%", y: "60%" },
    size: "w-10 h-10",
    color: "#88a5e0",
    label: "The Passing Light",
    story: {
      title: "The Passing Light",
      person: "Sarah, 28",
      memory: "My father and I saw Hale-Bopp together when I was a baby. He took photos. He'd show them to me every year on my birthday and say, 'You won't see it again in your lifetime, but we saw it together.' He died last year. The comet won't return until 2061. I'll be seventy-three. I hope I make it. I want to look up and remember him.",
      emotion: "The strange comfort of celestial time—grief measured in orbits and returns.",
      imagePrompt: "A bright comet with glowing tail streaking across a starfield, sense of motion and fleeting beauty, nostalgic and bittersweet mood, long exposure astrophotography"
    }
  },
  {
    id: "constellation-1",
    name: "Constellation",
    icon: <Stars className="w-12 h-12" />,
    position: { x: "25%", y: "65%" },
    size: "w-12 h-12",
    color: "#c8ddf5",
    label: "The Connected Points",
    story: {
      title: "The Connected Points",
      person: "Jin, 52",
      memory: "My daughter was born the same night my mother died. Different hospitals, three miles apart. I drove between them all night—saying goodbye, saying hello. When I finally stepped outside at dawn, I saw Orion setting in the west. I realized: we're all just points of light, and love is the line we draw between them. The pattern stays even when the stars go dark.",
      emotion: "The constellation of family: separate lights, impossible distances, one shape.",
      imagePrompt: "A constellation pattern in the night sky with glowing connecting lines, stars of different brightness, sense of meaning and connection, contemplative and spiritual atmosphere, deep space astrophotography"
    }
  },
  {
    id: "galaxy-1",
    name: "Spiral Galaxy",
    icon: <Orbit className="w-14 h-14" />,
    position: { x: "55%", y: "25%" },
    size: "w-14 h-14",
    color: "#88a5e0",
    label: "The Spiral",
    story: {
      title: "The Spiral",
      person: "David, 45",
      memory: "I've been falling in and out of the same patterns my whole life. Therapy helped me see it—the spiral. I'm not going in circles. I'm moving through the same emotional territory, but each time I'm at a different height. The view changes. Last week my daughter made the same mistake I made at her age. I didn't get angry. I understood. The spiral had brought me somewhere new.",
      emotion: "The grace of recognizing your own patterns from a wiser altitude.",
      imagePrompt: "A beautiful spiral galaxy with glowing arms and bright core, cosmic dust and young stars, sense of cycles and growth, philosophical and contemplative mood, hubble deep field photography"
    }
  },
  {
    id: "black-hole-1",
    name: "Black Hole",
    icon: <Circle className="w-10 h-10" />,
    position: { x: "40%", y: "75%" },
    size: "w-10 h-10",
    color: "#0b1838",
    label: "The Absence",
    story: {
      title: "The Absence",
      person: "Thomas, 67",
      memory: "Grief is a black hole. After my wife died, I felt it pulling everything into itself—color, sound, meaning. For months, I was just orbiting the edge. But here's what they don't tell you about black holes: the gravity is so strong because the love was so dense. The absence is shaped exactly like what was there. Now when I feel the pull, I know what I'm feeling. I'm feeling the shape of her.",
      emotion: "The physics of loss: absence as evidence, gravity as measurement of what mattered.",
      imagePrompt: "A black hole with accretion disk and gravitational lensing effect, stars being pulled toward darkness, beautiful and terrifying, sense of absence and presence, scientific visualization with emotional depth"
    }
  },
  {
    id: "moon-1",
    name: "Crescent Moon",
    icon: <Moon className="w-12 h-12" />,
    position: { x: "10%", y: "45%" },
    size: "w-12 h-12",
    color: "#c8ddf5",
    label: "The Phases",
    story: {
      title: "The Phases",
      person: "Lucia, 41",
      memory: "I track my moods with the moon. My therapist thinks I'm being poetic, but I'm serious. Full moon weeks, I'm bright and productive and can't sleep. New moon weeks, I'm quiet, internal, resting. I used to fight it. Now I plan around it. I'm not broken. I'm just lunar. Some of us run on different cycles.",
      emotion: "The relief of accepting your own rhythms instead of forcing linear progress.",
      imagePrompt: "A glowing crescent moon in deep space with soft light illuminating cosmic dust, peaceful and introspective atmosphere, phases of the moon visible in sequence, celestial and meditative mood, space photography"
    }
  }
];

// Helper function to get icon and properties based on cosmic type
const getCosmicProperties = (type: CosmicObjectType) => {
  const props = {
    star: { icon: <Star className="w-12 h-12" />, size: "w-12 h-12", color: "#c8ddf5" },
    nebula: { icon: <Sparkles className="w-16 h-16" />, size: "w-16 h-16", color: "#4d4177" },
    planet: { icon: <Circle className="w-14 h-14" />, size: "w-14 h-14", color: "#3a60a0" },
    comet: { icon: <Zap className="w-10 h-10" />, size: "w-10 h-10", color: "#88a5e0" },
    constellation: { icon: <Stars className="w-12 h-12" />, size: "w-12 h-12", color: "#c8ddf5" },
    galaxy: { icon: <Orbit className="w-14 h-14" />, size: "w-14 h-14", color: "#88a5e0" },
    "black-hole": { icon: <Circle className="w-10 h-10" />, size: "w-10 h-10", color: "#0b1838" },
    moon: { icon: <Moon className="w-12 h-12" />, size: "w-12 h-12", color: "#c8ddf5" },
  };
  return props[type];
};

// Generate random position that doesn't overlap with existing objects
const generateRandomPosition = (existingPositions: { x: string; y: string }[]): { x: string; y: string } => {
  const minDistance = 15; // Minimum distance between objects in percentage
  let attempts = 0;
  const maxAttempts = 50;

  while (attempts < maxAttempts) {
    const x = Math.random() * 70 + 15; // Between 15% and 85%
    const y = Math.random() * 60 + 20; // Between 20% and 80%

    const tooClose = existingPositions.some(pos => {
      const existingX = parseFloat(pos.x);
      const existingY = parseFloat(pos.y);
      const distance = Math.sqrt(Math.pow(x - existingX, 2) + Math.pow(y - existingY, 2));
      return distance < minDistance;
    });

    if (!tooClose) {
      return { x: `${x}%`, y: `${y}%` };
    }
    attempts++;
  }

  // If we couldn't find a good position, just return a random one
  return { x: `${Math.random() * 70 + 15}%`, y: `${Math.random() * 60 + 20}%` };
};

export function MuseumRoom() {
  const [selectedObject, setSelectedObject] = useState<CosmicObject | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [userStories, setUserStories] = useState<CosmicObject[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateStory = (newStory: NewStory) => {
    const existingPositions = [...cosmicObjects, ...userStories].map(obj => obj.position);
    const position = generateRandomPosition(existingPositions);
    const cosmicProps = getCosmicProperties(newStory.cosmicObjectType);

    const newCosmicObject: CosmicObject = {
      id: `user-${Date.now()}`,
      name: newStory.storyTitle,
      icon: cosmicProps.icon,
      position,
      label: newStory.storyTitle,
      size: cosmicProps.size,
      color: cosmicProps.color,
      story: {
        title: newStory.storyTitle,
        person: newStory.personName,
        memory: newStory.fullStory,
        emotion: newStory.memoryFragments,
        imagePrompt: newStory.imagePrompt,
      },
    };

    setUserStories([...userStories, newCosmicObject]);
  };

  const allCosmicObjects = [...cosmicObjects, ...userStories];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0b1838]">
      {/* Deep space background with stars */}
      <div className="absolute inset-0">
        {/* Large stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [Math.random() * 0.7 + 0.3, Math.random() * 0.4 + 0.6, Math.random() * 0.7 + 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Nebula clouds */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #4d4177 0%, transparent 70%)',
            left: '20%',
            top: '30%',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #3a60a0 0%, transparent 70%)',
            right: '15%',
            top: '20%',
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #88a5e0 0%, transparent 70%)',
            left: '50%',
            bottom: '10%',
          }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-10"
      >
        <h1 className="text-[#c8ddf5] tracking-[0.4em] text-center" style={{
          fontSize: '2rem',
          fontFamily: 'Georgia, serif',
          textShadow: '0 0 20px rgba(200, 221, 245, 0.5), 0 0 40px rgba(136, 165, 224, 0.3)'
        }}>
          COSMIC STORIES
        </h1>
        <p className="text-[#88a5e0]/80 text-center mt-2 tracking-widest" style={{ fontSize: '0.75rem' }}>
          Click the cosmic objects to explore memory galaxies
        </p>
      </motion.div>

      {/* Add Story Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setShowCreateForm(true)}
        className="fixed bottom-8 right-8 z-20 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#3a60a0]/70 to-[#4d4177]/70 border border-[#88a5e0]/50 rounded-full hover:from-[#3a60a0]/90 hover:to-[#4d4177]/90 hover:border-[#c8ddf5]/70 transition-all group"
        style={{
          boxShadow: '0 0 30px rgba(136, 165, 224, 0.4)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5 text-[#c8ddf5] group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-[#c8ddf5] tracking-wide" style={{ fontSize: '0.9rem' }}>
          Add Your Story
        </span>
      </motion.button>

      {/* Interactive Cosmic Objects */}
      {allCosmicObjects.map((obj, index) => (
        <motion.div
          key={obj.id}
          className="absolute cursor-pointer"
          style={{
            left: obj.position.x,
            top: obj.position.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            delay: index * 0.15 + 0.5,
            type: "spring",
            stiffness: 150,
            y: {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          whileHover={{
            scale: 1.3,
            rotate: [0, -8, 8, -8, 0],
            transition: {
              rotate: { duration: 0.6 },
              scale: { duration: 0.2 }
            }
          }}
          onHoverStart={() => setHoveredId(obj.id)}
          onHoverEnd={() => setHoveredId(null)}
          onClick={() => setSelectedObject(obj)}
        >
          <div className="relative">
            <motion.div
              style={{ color: obj.color }}
              animate={{
                filter: hoveredId === obj.id
                  ? `drop-shadow(0 0 16px ${obj.color}) drop-shadow(0 0 8px ${obj.color})`
                  : `drop-shadow(0 0 8px ${obj.color})`,
              }}
            >
              {obj.icon}
            </motion.div>

            {/* Sparkle effect on hover */}
            {hoveredId === obj.id && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{
                    background: `radial-gradient(circle, ${obj.color} 0%, transparent 70%)`,
                  }}
                />
              </>
            )}

            {/* Hover label */}
            {hoveredId === obj.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <div className="bg-[#0b1838]/95 backdrop-blur-md px-4 py-2 rounded border border-[#88a5e0]/40"
                     style={{
                       boxShadow: `0 0 20px ${obj.color}40`
                     }}>
                  <span className="text-[#c8ddf5] tracking-wide" style={{ fontSize: '0.75rem' }}>
                    {obj.label}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Story Panel */}
      {selectedObject && (
        <StoryPanel
          story={selectedObject.story}
          onClose={() => setSelectedObject(null)}
        />
      )}

      {/* Create Story Form */}
      {showCreateForm && (
        <CreateStoryForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateStory}
        />
      )}
    </div>
  );
}
