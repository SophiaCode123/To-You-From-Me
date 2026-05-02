import { motion } from "motion/react";
import { X, ArrowRight, Image as ImageIcon } from "lucide-react";

interface Story {
  title: string;
  person: string;
  memory: string;
  emotion: string;
  imagePrompt: string;
}

interface StoryPanelProps {
  story: Story;
  onClose: () => void;
}

export function StoryPanel({ story, onClose }: StoryPanelProps) {
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
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0b1838] via-[#1a2850] to-[#0b1838] border-2 border-[#88a5e0]/30 rounded-lg shadow-2xl"
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

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#c8ddf5] mb-2 tracking-wide"
            style={{
              fontSize: '2rem',
              fontFamily: 'Georgia, serif',
              textShadow: '0 0 20px rgba(200, 221, 245, 0.4)'
            }}
          >
            {story.title}
          </motion.h2>

          {/* Person */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#88a5e0]/90 mb-6 italic"
            style={{ fontSize: '0.95rem' }}
          >
            {story.person}
          </motion.p>

          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative mb-6 rounded overflow-hidden border-2 border-[#3a60a0]/50 bg-[#0b1838]/80"
            style={{
              aspectRatio: '16/10',
              boxShadow: '0 0 30px rgba(58, 96, 160, 0.2), inset 0 0 40px rgba(136, 165, 224, 0.05)'
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <ImageIcon className="w-16 h-16 text-[#4d4177]/60 mb-4" />
              <p className="text-[#88a5e0]/60 text-center italic max-w-md" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                AI Image Prompt: {story.imagePrompt}
              </p>
            </div>
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#88a5e0]/50" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#88a5e0]/50" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#88a5e0]/50" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#88a5e0]/50" />
          </motion.div>

          {/* Memory */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 p-5 bg-[#0b1838]/60 rounded border border-[#3a60a0]/40"
            style={{
              boxShadow: '0 0 20px rgba(58, 96, 160, 0.15)'
            }}
          >
            <h3 className="text-[#88a5e0] mb-3 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
              THE MEMORY
            </h3>
            <p className="text-[#c8ddf5]/90 leading-relaxed" style={{ fontSize: '1.05rem', fontFamily: 'Georgia, serif' }}>
              {story.memory}
            </p>
          </motion.div>

          {/* Emotion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6 p-5 bg-[#0b1838]/60 rounded border border-[#3a60a0]/40"
            style={{
              boxShadow: '0 0 20px rgba(58, 96, 160, 0.15)'
            }}
          >
            <h3 className="text-[#88a5e0] mb-3 tracking-wide" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
              THE FEELING
            </h3>
            <p className="text-[#c8ddf5]/90 leading-relaxed italic" style={{ fontSize: '1rem' }}>
              {story.emotion}
            </p>
          </motion.div>

          {/* Next room button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={onClose}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#3a60a0]/30 to-[#4d4177]/30 border border-[#88a5e0]/40 rounded hover:from-[#3a60a0]/50 hover:to-[#4d4177]/50 hover:border-[#c8ddf5]/60 transition-all group"
            style={{
              boxShadow: '0 0 20px rgba(136, 165, 224, 0.2)'
            }}
          >
            <span className="text-[#c8ddf5] tracking-wide" style={{ fontSize: '1rem' }}>
              Return to the Cosmos
            </span>
            <ArrowRight className="w-5 h-5 text-[#88a5e0] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
