import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Star, Sparkles, Moon, Orbit, Zap, Stars, Circle, Plus } from "lucide-react";
import { StoryPanel } from "./StoryPanel";
import { CreateStoryForm, NewStory, CosmicObjectType } from "./CreateStoryForm";

const USER_STORIES_STORAGE_KEY = "cosmic-stories:user-stories:v1";

interface CosmicObject {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: { x: string; y: string };
  label: string;
  size: string;
  color: string;
  cosmicType?: CosmicObjectType;
  story: {
    title: string;
    person: string;
    memory: string;
    emotion: string;
    imagePrompt: string;
  };
}

interface StoredUserStory {
  id: string;
  cosmicType: CosmicObjectType;
  position: { x: string; y: string };
  label: string;
  name: string;
  story: CosmicObject["story"];
}

const cosmicObjects: CosmicObject[] = [
  {
    id: "comet-yusra-mardini",
    name: "Rescue Comet",
    icon: <Zap className="w-10 h-10" />,
    position: { x: "18%", y: "28%" },
    size: "w-10 h-10",
    color: "#88a5e0",
    label: "The Rescue Comet",
    story: {
      title: "The Rescue Comet",
      person: "Yusra Mardini",
      memory: `I am Yusra Mardini.

I was born and raised in Daraya, a suburb of Damascus in Syria, where I lived with my sister Sara, my younger sister Shehad, and my parents, Ezzat and Mervat. My father was a swimming coach, and through him my sister Sara and I began training in swimming from a young age. I competed for Syria in international competitions and took part in events in countries such as Dubai and Turkey.

When the Syrian civil war began in March 2011, life in Daraya gradually became more difficult. Even as demonstrations and conflict increased, I continued training and competing. Over time, the situation worsened. There was heavy fighting and bombing in our area, and our home was eventually destroyed. My father was detained and injured during the conflict. At one point, an unexploded bomb landed in the pool where I trained.

By 2015, my family decided that Sara and I would leave Syria to try to reach Europe. We travelled first to Istanbul in Turkey and then arranged passage to Greece. We joined other refugees attempting to cross the Mediterranean Sea in a small rubber boat. The boat was overcrowded, carrying far more people than it was designed for, and it began its journey from the Turkish coast toward Greece.

Halfway across the Aegean Sea, the boat's motor stopped working. Water began entering the boat, and the situation became unsafe. At that point, Sara and I entered the water. We swam alongside the boat while helping to keep it moving toward land. We stayed in the sea for several hours until the boat reached the Greek island of Lesbos. All passengers survived the crossing.

After arriving in Greece, we continued our journey through several countries. We travelled by land through Europe, sometimes walking and sometimes using trains, until we reached Germany. We settled in Berlin.

In Berlin, I contacted a local swimming club near the refugee accommodation where I was staying. The coach, Sven Spannenkrebs, allowed me to train again. I resumed swimming at Wasserfreunde Spandau 04. After returning to training, I was selected for the first Refugee Olympic Team.

In 2016, I competed at the Rio Olympics as part of that team. I participated in the swimming events and competed in the 100-metre butterfly. I continued my athletic career and later also competed at the Tokyo Olympics.

Following the Olympics, I was appointed a Goodwill Ambassador for the United Nations High Commissioner for Refugees (UNHCR). I began speaking publicly about refugee experiences and meeting displaced people in different countries. I also worked with a management team and agreed to publish a memoir titled Outterfly, which was released in 2018.

Over time, I continued my involvement in both sport and advocacy. I built a public presence that included sharing my training, humanitarian work, and projects supporting refugees. I also established the Yusra Mardini Foundation, which focuses on providing access to swimming lessons and support for refugees. The foundation has worked on programs in locations including France and Lesbos, and has partnered with organizations to support refugee athletes and resettlement opportunities.

I have also visited refugee camps in different countries, including Jordan and Kenya, to meet displaced people and athletes. Through my work, I have supported initiatives aimed at improving access to sport and basic resources.

My experiences in Syria, the journey to Europe, and my career in swimming have continued to be part of my public work and advocacy.`,
      emotion: "A life moving like a comet through danger: survival becoming motion, motion becoming advocacy.",
      imagePrompt: "A bright comet crossing a dark ocean-like starfield, silver-blue trail, distant island lights, resilient and hopeful atmosphere, cinematic space photography"
    }
  },
  {
    id: "constellation-janae-brissett",
    name: "First-Gen Constellation",
    icon: <Stars className="w-12 h-12" />,
    position: { x: "72%", y: "34%" },
    size: "w-12 h-12",
    color: "#c8ddf5",
    label: "The First-Gen Constellation",
    story: {
      title: "The First-Gen Constellation",
      person: "Janae Brissett",
      memory: `My name is Janae Brissett, and I was born in Montego Bay, Jamaica. Neither of my parents graduated from high school; however, they built a very successful life for themselves, and a good life for their children, full of warmth and opportunity. The idea of being "first-generation" didn't exist to me; my world was already thriving.

That comfortable perspective vanished the day I migrated to Mississippi. Suddenly, my parents' lack of a diploma felt like a huge sign on my forehead. The instant I started meeting peers, the truth became too heavy to carry. When asked about my parents' schooling, I would immediately offer a protective lie. I'd tell them, "Mom went to college, and my dad went to trade school."

Why would I lie when they created such a good life for me? I guess if I'm being honest, I was just ashamed now that I was in a country that focused heavily on social capital. I guess it was instinct to try to blend in with people in a state where, at the time, traveling was so limited for them that their idea of Jamaica was Bob Marley and the movie Shottas.

Looking back, I am disappointed in my answers.

This identity crisis peaked during the college application process, especially with the form that will haunt every first-gen student forever: FAFSA. I went through this with two extremely wary parents who viewed the process as a potential government raid. They looked at that financial aid form like the university was asking for their bank vault combinations.

My mother's skepticism about handing over their Social Security number was palpable, as if they were secretly hiding the fortunes of the Crown Jewels.

"Why the school need all ah dis information, Janae? Dem think we Bill Gates or something?"

The joke was funny, but the reality was isolating. I had no guidance, only high-alert suspicion, constantly, about everything.

After I entered college, that's when the heavy burden of cultural approval and academic performance took hold. I wasn't just working toward my success; I was fighting for generational validation. I felt like I was wearing a target for my lineage, and the pressure was relentless. Nothing less than a 95 was acceptable, because anything lower was not just a poor grade, but a disappointment for someone getting schooling in "farrin."

Who do you call when you're supposed to be proofreading a thesis, and you're the first person in your entire family even to know what a thesis is? It was a lonely road where expectations were impossibly high and practical support was nonexistent. I was breaking the cycle, but I had to do it silently and perfectly.

Today, I stand as the door-opener. I am in the final stages of completing my doctorate and will be the first in my entire family to do so. I've become the accidental consultant, helping other family members through the same systems that baffled me.

I've also learned to give grace when I hear the classic Jamaican chorus: "Yuh still a write paper?" or "Yo nuh done wid school yet, my gosh!" They simply can't conceptualize a journey they've never been on. I have to be emotionally aware that my path is incomprehensible to them.

Being first-gen is an intense, hilarious, and defining privilege. We are the cycle-breakers, the new generation makers, and we use the maps we bled to create to guide everyone who comes next.`,
      emotion: "The pattern of becoming first: one bright point learning to draw a map for everyone after.",
      imagePrompt: "A constellation shaped like an open doorway and map lines, stars connected over the Caribbean and American South, luminous, intimate, hopeful, deep space illustration"
    }
  },
  {
    id: "moon-iby-knill",
    name: "Witness Moon",
    icon: <Moon className="w-12 h-12" />,
    position: { x: "40%", y: "58%" },
    size: "w-12 h-12",
    color: "#c8ddf5",
    label: "The Witness Moon",
    story: {
      title: "The Witness Moon",
      person: "Iby Knill",
      memory: `My name is Iby Knill. I was born in 1923 and grew up in an educated, cultured family. My brother Tomy and I spoke several languages, and religion played little part in my childhood. I even attended a German grammar school, where I flourished academically and socially.

When the pro-Nazi Slovak puppet regime introduced a version of the Nuremberg Laws in 1939, I was forced to transfer to a Jewish school.

After the German occupation of Czechoslovakia in late 1938, my life became increasingly restricted. Jewish people were no longer allowed to use public transport, and I hated wearing the yellow star, often covering it with a scarf on my way to school. My parents' business was "Aryanised," and we were forced out of our apartment when it was given to a German family. We were moved into a small flat on the outskirts of town.

At the end of January 1942, my mother was warned by a friend that young women were being rounded up by German authorities. I hid for several days at my grandparents' house while my parents arranged for my escape. We cycled part of the way and we then walked, it was February 1942, and everything was frozen and cold, and then crawled across no-man's-land into Hungary. I crossed no-man's-land into Hungary in the middle of the night. I was 18 and considered an illegal immigrant. I went to my aunt Bella in Budapest, but she refused to help me out of fear of repercussions. I then hid in the apartment of my cousin Marton for several weeks.

I later lived with a solicitor and his family. He was also part of the Hungarian resistance, and I agreed to help by using my knowledge of English to assist Allied airmen in escaping Hungary.

Eventually, the resistance group was caught. I spent a fortnight at a police station and three months in prison before being released. I was immediately re-arrested as an illegal immigrant and sent to a refugee camp to work as a farm labourer. During my various internments, I also volunteered as a nurse wherever I could.

In 1944, I was sent to Auschwitz-Birkenau. On arrival, I was shaved, showered, and given a prisoner uniform. My language skills meant I could communicate with German guards, which sometimes resulted in slightly better rations. However, I was not protected from suffering. I developed a hip condition and was sent to the camp hospital, where I was subjected to X-ray experiments.

I only remained in Auschwitz for six weeks. I volunteered to join a slave labour transport to an armament factory in Lippstadt, Germany. There, I was forced to work on armaments for the German war effort, and where possible, I and others tried to sabotage production. Eventually, I was put in charge of the camp hospital due to my German fluency and informal nursing experience.

In March 1945, the hospital unit was evacuated, and I was taken on a death march towards Bergen-Belsen. Anyone unable to keep up was shot. My hip infection returned, and I survived largely because friends carried me along the way. I was liberated by the American army on Easter Sunday 1945.

My mother and brother both survived the war and returned to Bratislava. I spent time recovering in hospital and then worked as a translator and interpreter for the Allied Military Government in Germany. In September 1946, I returned to live with my mother and brother in Bratislava. However, my father had been killed in Auschwitz.

While working for the British, I met Bert Knill, a British officer. We married in Bratislava in December 1946 and moved to England in March 1947. We raised two children, along with two stepsons from Bert's previous marriage.

Over the years, I worked in civil defence training, education, and later as a language tutor, translator, and textile designer. In 1973, I earned my BA, and in 2002, at the age of 79, I completed my MA. I also wrote two autobiographies about my experiences, The Woman Without a Number (2010) and The Woman with Nine Lives (2016).

I often spoke to young people about my experiences and what I believed they should learn from them: to teach young people to accept differences, to understand them and to honour them, and unless young people learn that, there is really no future for civilisation because genocide in one shape or another will take place.

In recognition of my work in Holocaust education and interfaith understanding, I was awarded the British Empire Medal in the Queen's Birthday Honours List in 2017. I also received an honorary doctorate from the University of Huddersfield in 2016 and an Honorary Fellowship from Leeds Trinity University in 2018.

I died in 2022, aged 99.`,
      emotion: "Witness as moonlight: a life carrying memory through darkness so others can see.",
      imagePrompt: "A pale moon over a dark European night sky, faint yellow star transformed into moonlight, solemn and dignified, historical memory, cinematic celestial portrait"
    }
  },
  {
    id: "planet-emma-gatewood",
    name: "Trail Planet",
    icon: <Orbit className="w-14 h-14" />,
    position: { x: "66%", y: "72%" },
    size: "w-14 h-14",
    color: "#3a60a0",
    label: "The Trail Planet",
    story: {
      title: "The Trail Planet",
      person: "Emma Gatewood",
      memory: `My name is Emma Gatewood, otherwise known as Grandma Gatewood. In 1955, I told my children that I was "going for a hike in the woods." In reality, I set out to walk the entire 2,190-mile Appalachian Trail, the longest hiking-only footpath in the world. I was 67 years old at the time, a mother of 11, a grandmother of 23, and a survivor of more than 30 years of domestic abuse. On September 25, 1955, when I reached Katahdin, I became the first woman to complete the Appalachian Trail alone in a single season.

I was born on October 25, 1887, on a farm in Gallia County, Ohio. I grew up in a difficult household. My father, Hugh Caldwell, a Civil War veteran who had lost a leg in the war, drank heavily and gambled. As a child, I was often responsible for hard manual work on the farm, and I shared a small log cabin with my 14 siblings. We slept in just four beds.

When I was 19, I married Perry Clayton Gatewood, a 26-year-old farmer. After our marriage, I worked building fences and mixing cement. For more than 30 years, I also endured physical abuse in that marriage.

Despite media attention after my Appalachian Trail hike in 1955, the full story of that abuse was not widely known until much later, when journalist Ben Montgomery published Grandma Gatewood's Walk in 2014. He is my great-great-grandnephew and spoke with my surviving children, who shared letters and journals describing my experiences.

I married Perry just three months before he first drew blood. The abuse continued for decades. At times, I was nearly killed. On one occasion, he broke a broom over my head. In 1939, after a particularly violent attack in which he broke my teeth and cracked a rib, I threw a sack of flour at him. When authorities arrived, I was arrested instead of him. I spent a night in jail until the mayor, seeing my condition, brought me to his home for protection. In 1940, after 33 years of marriage, I obtained a divorce, something rare for women at the time. I raised my remaining three children on my own.

In the 1950s, after my children had grown and left home, I read a National Geographic article about Earl Shaffer, the first person to thru-hike the Appalachian Trail. The idea that no woman had done it alone stood out to me. I had always found comfort in walking in the woods, often during my marriage. I decided to attempt the trail. As one of my daughters later said, I told her: "If those men can do it, I can do it."

My first attempt in 1953 began in Maine, but it did not succeed. I broke my glasses, became lost, and was eventually helped off the trail by rangers who told me to go home. Two years later, I tried again, this time starting in Georgia to avoid the same route. In neither case did I tell my children where I was going. I only said I was going for a hike.

When I set out on my successful attempt, I carried a homemade denim bag with very few items: a blanket, a shower curtain, a cup, a canteen, a small pot, a spoon, a Swiss Army knife, a first-aid kit, pins, a flashlight, rope, a raincoat, a warm coat, a change of clothes, and my Keds sneakers. I wore out seven pairs of Keds on the trail. I carried no sleeping bag, no tent, no compass, and no map. Instead, I relied on the kindness of people along the trail for food and shelter.

As I walked, I often slept on porches, under picnic tables, or on beds of leaves. I ate simple foods like canned Vienna sausages, raisins, nuts, and what I could find along the way. I had learned which plants were safe to eat before the journey. I became known in some towns, and newspapers followed my progress. My children eventually learned I was on the trail through a newspaper clipping.

The day before reaching Katahdin, I fell and broke my glasses again, the same thing that had happened during my first attempt. I also bruised my face and sprained my ankle. Despite this, I continued. After 146 days of hiking, I reached the summit of Katahdin on September 25, 1955. I sang "America the Beautiful" at the top.

I had averaged about 14 miles a day, often walking from sunrise until I could go no further. Some Boy Scouts and their leaders reported that they could not keep pace with me.

Two years later, I returned and hiked the entire Appalachian Trail again, becoming the first person to complete it twice. In 1964, I hiked it once more, this time in sections.

My journey helped open the Appalachian Trail to more women and older hikers. Over time, more women began attempting and completing the trail. When asked why I hiked it, my answer was simple: "Because I wanted to."`,
      emotion: "Endurance as orbit: each step making a new path possible for the people who follow.",
      imagePrompt: "A blue-green planet wrapped by a glowing mountain trail like an orbital ring, Appalachian ridgelines, dawn light, sturdy and triumphant mood"
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

function rehydrateUserStory(stored: StoredUserStory): CosmicObject {
  const props = getCosmicProperties(stored.cosmicType);
  return {
    id: stored.id,
    name: stored.name,
    icon: props.icon,
    position: stored.position,
    label: stored.label,
    size: props.size,
    color: props.color,
    cosmicType: stored.cosmicType,
    story: stored.story,
  };
}

function dehydrateUserStory(obj: CosmicObject): StoredUserStory | null {
  if (!obj.cosmicType) return null;
  return {
    id: obj.id,
    cosmicType: obj.cosmicType,
    position: obj.position,
    label: obj.label,
    name: obj.name,
    story: obj.story,
  };
}

function loadStoredUserStories(): CosmicObject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USER_STORIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredUserStory[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(rehydrateUserStory);
  } catch {
    return [];
  }
}

export function MuseumRoom() {
  const [selectedObject, setSelectedObject] = useState<CosmicObject | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [userStories, setUserStories] = useState<CosmicObject[]>(loadStoredUserStories);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dehydrated = userStories
      .map(dehydrateUserStory)
      .filter((entry): entry is StoredUserStory => entry !== null);
    window.localStorage.setItem(USER_STORIES_STORAGE_KEY, JSON.stringify(dehydrated));
  }, [userStories]);

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
      cosmicType: newStory.cosmicObjectType,
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
          COSMIC CONNECTIONS
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
                    {obj.story.person}
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
          onDelete={
            selectedObject.cosmicType
              ? () => {
                  setUserStories(userStories.filter(s => s.id !== selectedObject.id));
                  setSelectedObject(null);
                }
              : undefined
          }
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
