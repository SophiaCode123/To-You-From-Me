import { motion } from "motion/react";
import { X, Star, Sparkles, Moon, Orbit, Zap, Stars, Circle, Plus } from "lucide-react";
import { useState } from "react";

interface CreateStoryFormProps {
  onClose: () => void;
  onSubmit: (story: NewStory) => void;
}

export interface NewStory {
  personName: string;
  storyTitle: string;
  background: string;
  fullStory: string;
  memoryFragments: string;
  imagePrompt: string;
  cosmicObjectType: CosmicObjectType;
}

export type CosmicObjectType =
  | "star"
  | "nebula"
  | "planet"
  | "comet"
  | "constellation"
  | "galaxy"
  | "black-hole"
  | "moon";

interface CosmicOption {
  type: CosmicObjectType;
  icon: React.ReactNode;
  label: string;
  emotion: string;
  color: string;
  size: string;
}

const cosmicOptions: CosmicOption[] = [
  {
    type: "star",
    icon: <Star className="w-8 h-8" />,
    label: "Star",
    emotion: "Hope, guidance, inspiration",
    color: "#c8ddf5",
    size: "w-12 h-12"
  },
  {
    type: "nebula",
    icon: <Sparkles className="w-8 h-8" />,
    label: "Nebula",
    emotion: "Change, healing, becoming",
    color: "#4d4177",
    size: "w-16 h-16"
  },
  {
    type: "black-hole",
    icon: <Circle className="w-8 h-8" />,
    label: "Black Hole",
    emotion: "Grief, loss, mystery",
    color: "#0b1838",
    size: "w-10 h-10"
  },
  {
    type: "planet",
    icon: <Circle className="w-8 h-8" />,
    label: "Planet",
    emotion: "Home, identity, belonging",
    color: "#3a60a0",
    size: "w-14 h-14"
  },
  {
    type: "comet",
    icon: <Zap className="w-8 h-8" />,
    label: "Comet",
    emotion: "Escape, movement, transformation",
    color: "#88a5e0",
    size: "w-10 h-10"
  },
  {
    type: "constellation",
    icon: <Stars className="w-8 h-8" />,
    label: "Constellation",
    emotion: "Connection, family, memory",
    color: "#c8ddf5",
    size: "w-12 h-12"
  },
  {
    type: "galaxy",
    icon: <Orbit className="w-8 h-8" />,
    label: "Galaxy",
    emotion: "Wonder, legacy, vast experience",
    color: "#88a5e0",
    size: "w-14 h-14"
  },
  {
    type: "moon",
    icon: <Moon className="w-8 h-8" />,
    label: "Moon",
    emotion: "Cycles, rhythm, acceptance",
    color: "#c8ddf5",
    size: "w-12 h-12"
  }
];

export function CreateStoryForm({ onClose, onSubmit }: CreateStoryFormProps) {
  const [formData, setFormData] = useState<NewStory>({
    personName: "",
    storyTitle: "",
    background: "",
    fullStory: "",
    memoryFragments: "",
    imagePrompt: "",
    cosmicObjectType: "star"
  });

  const [selectedOption, setSelectedOption] = useState<CosmicOption>(cosmicOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleCosmicSelect = (option: CosmicOption) => {
    setSelectedOption(option);
    setFormData({ ...formData, cosmicObjectType: option.type });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0b1838] via-[#1a2850] to-[#0b1838] border-2 border-[#88a5e0]/30 rounded-lg shadow-2xl"
        style={{
          boxShadow: '0 0 60px rgba(136, 165, 224, 0.3), inset 0 0 80px rgba(58, 96, 160, 0.1)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0b1838]/90 border border-[#88a5e0]/40 hover:bg-[#1a2850] hover:border-[#c8ddf5]/60 transition-all"
          style={{
            boxShadow: '0 0 12px rgba(136, 165, 224, 0.3)'
          }}
        >
          <X className="w-5 h-5 text-[#c8ddf5]" />
        </button>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-[#c8ddf5] mb-2 tracking-wide" style={{
              fontSize: '2rem',
              fontFamily: 'Georgia, serif',
              textShadow: '0 0 20px rgba(200, 221, 245, 0.4)'
            }}>
              Add Your Story to the Cosmos
            </h2>
            <p className="text-[#88a5e0]/90" style={{ fontSize: '0.95rem' }}>
              Share a memory, experience, or emotion that becomes part of this galaxy
            </p>
          </motion.div>

          {/* Cosmic Object Selection */}
          <div className="mb-6">
            <label className="block text-[#88a5e0] mb-4 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
              CHOOSE YOUR COSMIC OBJECT
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cosmicOptions.map((option) => (
                <motion.button
                  key={option.type}
                  type="button"
                  onClick={() => handleCosmicSelect(option)}
                  className={`p-4 rounded border transition-all ${
                    selectedOption.type === option.type
                      ? 'border-[#c8ddf5]/70 bg-[#3a60a0]/30'
                      : 'border-[#3a60a0]/30 bg-[#0b1838]/60'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: selectedOption.type === option.type
                      ? `0 0 20px ${option.color}40`
                      : 'none'
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div style={{ color: option.color }}>
                      {option.icon}
                    </div>
                    <span className="text-[#c8ddf5] text-sm">{option.label}</span>
                    <span className="text-[#88a5e0]/70 text-xs text-center">{option.emotion}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {/* Person Name */}
            <div>
              <label htmlFor="personName" className="block text-[#88a5e0] mb-2 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                PERSON'S NAME
              </label>
              <input
                id="personName"
                type="text"
                required
                value={formData.personName}
                onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                placeholder="e.g., Maria, 45"
                className="w-full px-4 py-3 bg-[#0b1838]/80 border border-[#3a60a0]/40 rounded text-[#c8ddf5]/90 placeholder:text-[#4d4177] focus:outline-none focus:border-[#88a5e0]/70 focus:ring-2 focus:ring-[#88a5e0]/20 transition-all"
                style={{ fontSize: '0.95rem', boxShadow: '0 0 15px rgba(58, 96, 160, 0.1)' }}
              />
            </div>

            {/* Story Title */}
            <div>
              <label htmlFor="storyTitle" className="block text-[#88a5e0] mb-2 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                STORY TITLE
              </label>
              <input
                id="storyTitle"
                type="text"
                required
                value={formData.storyTitle}
                onChange={(e) => setFormData({ ...formData, storyTitle: e.target.value })}
                placeholder="Give your story a title"
                className="w-full px-4 py-3 bg-[#0b1838]/80 border border-[#3a60a0]/40 rounded text-[#c8ddf5]/90 placeholder:text-[#4d4177] focus:outline-none focus:border-[#88a5e0]/70 focus:ring-2 focus:ring-[#88a5e0]/20 transition-all"
                style={{ fontSize: '0.95rem', boxShadow: '0 0 15px rgba(58, 96, 160, 0.1)' }}
              />
            </div>

            {/* Background */}
            <div>
              <label htmlFor="background" className="block text-[#88a5e0] mb-2 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                SHORT BACKGROUND
              </label>
              <input
                id="background"
                type="text"
                value={formData.background}
                onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                placeholder="One sentence context"
                className="w-full px-4 py-3 bg-[#0b1838]/80 border border-[#3a60a0]/40 rounded text-[#c8ddf5]/90 placeholder:text-[#4d4177] focus:outline-none focus:border-[#88a5e0]/70 focus:ring-2 focus:ring-[#88a5e0]/20 transition-all"
                style={{ fontSize: '0.95rem', boxShadow: '0 0 15px rgba(58, 96, 160, 0.1)' }}
              />
            </div>

            {/* Full Story */}
            <div>
              <label htmlFor="fullStory" className="block text-[#88a5e0] mb-2 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                YOUR FULL STORY
              </label>
              <textarea
                id="fullStory"
                required
                value={formData.fullStory}
                onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
                placeholder="Tell your story in detail..."
                rows={6}
                className="w-full px-4 py-3 bg-[#0b1838]/80 border border-[#3a60a0]/40 rounded text-[#c8ddf5]/90 placeholder:text-[#4d4177] focus:outline-none focus:border-[#88a5e0]/70 focus:ring-2 focus:ring-[#88a5e0]/20 transition-all resize-none"
                style={{ fontSize: '0.95rem', fontFamily: 'Georgia, serif', boxShadow: '0 0 15px rgba(58, 96, 160, 0.1)' }}
              />
            </div>

            {/* Memory Fragments */}
            <div>
              <label htmlFor="memoryFragments" className="block text-[#88a5e0] mb-2 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                MEMORY FRAGMENTS / EMOTIONAL INSIGHT
              </label>
              <textarea
                id="memoryFragments"
                required
                value={formData.memoryFragments}
                onChange={(e) => setFormData({ ...formData, memoryFragments: e.target.value })}
                placeholder="The emotional essence of this story..."
                rows={3}
                className="w-full px-4 py-3 bg-[#0b1838]/80 border border-[#3a60a0]/40 rounded text-[#c8ddf5]/90 placeholder:text-[#4d4177] focus:outline-none focus:border-[#88a5e0]/70 focus:ring-2 focus:ring-[#88a5e0]/20 transition-all resize-none"
                style={{ fontSize: '0.95rem', fontFamily: 'Georgia, serif', boxShadow: '0 0 15px rgba(58, 96, 160, 0.1)' }}
              />
            </div>

            {/* AI Image Prompt */}
            <div>
              <label htmlFor="imagePrompt" className="block text-[#88a5e0] mb-2 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                AI IMAGE PROMPT
              </label>
              <textarea
                id="imagePrompt"
                required
                value={formData.imagePrompt}
                onChange={(e) => setFormData({ ...formData, imagePrompt: e.target.value })}
                placeholder="Describe the image that represents this story..."
                rows={3}
                className="w-full px-4 py-3 bg-[#0b1838]/80 border border-[#3a60a0]/40 rounded text-[#c8ddf5]/90 placeholder:text-[#4d4177] focus:outline-none focus:border-[#88a5e0]/70 focus:ring-2 focus:ring-[#88a5e0]/20 transition-all resize-none"
                style={{ fontSize: '0.95rem', boxShadow: '0 0 15px rgba(58, 96, 160, 0.1)' }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#3a60a0]/50 to-[#4d4177]/50 border border-[#88a5e0]/50 rounded hover:from-[#3a60a0]/70 hover:to-[#4d4177]/70 hover:border-[#c8ddf5]/70 transition-all"
            style={{
              boxShadow: '0 0 25px rgba(136, 165, 224, 0.3)'
            }}
          >
            <Plus className="w-5 h-5 text-[#c8ddf5]" />
            <span className="text-[#c8ddf5] tracking-wide" style={{ fontSize: '1rem' }}>
              Add Story to the Cosmos
            </span>
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
