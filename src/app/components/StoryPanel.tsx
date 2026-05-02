import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, ArrowRight, Image as ImageIcon, Loader2, Pause, Play, Trash2, Volume2 } from "lucide-react";

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
  onDelete?: () => void;
}

type NarrationStatus = "idle" | "loading" | "ready" | "playing" | "error";
type ImageStatus = "idle" | "loading" | "ready" | "error";

export function StoryPanel({ story, onClose, onDelete }: StoryPanelProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<NarrationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageStatus, setImageStatus] = useState<ImageStatus>("idle");
  const [imageErrorMessage, setImageErrorMessage] = useState("");

  const narrationText = useMemo(() => {
    return [
      story.title,
      story.person,
      "The memory.",
      story.memory,
      "The feeling.",
      story.emotion,
    ].join("\n\n");
  }, [story]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setAudioUrl(null);
    setStatus("idle");
    setErrorMessage("");
    setImageUrl(null);
    setImageStatus("idle");
    setImageErrorMessage("");
  }, [story]);

  const handleNarrationToggle = async () => {
    if (status === "playing") {
      audioRef.current?.pause();
      setStatus("ready");
      return;
    }

    if (audioUrl && audioRef.current) {
      await audioRef.current.play();
      setStatus("playing");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/openai-tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: narrationText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not create audio narration.");
      }

      const nextAudioUrl = data.audioUrl || `data:${data.mimeType || "audio/mpeg"};base64,${data.audioBase64}`;
      setAudioUrl(nextAudioUrl);

      requestAnimationFrame(async () => {
        try {
          await audioRef.current?.play();
          setStatus("playing");
        } catch {
          setStatus("ready");
        }
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Could not create audio narration.");
    }
  };

  const narrationLabel = status === "loading"
    ? "Creating audio..."
    : status === "playing"
      ? "Pause narration"
      : "Listen to story";

  const handleGenerateImage = async () => {
    setImageStatus("loading");
    setImageErrorMessage("");

    try {
      const response = await fetch("/api/openai-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person: story.person,
          memory: story.memory,
          emotion: story.emotion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not create image.");
      }

      const nextImageUrl = data.imageBase64
        ? `data:${data.mimeType || "image/png"};base64,${data.imageBase64}`
        : data.imageUrl;

      if (!nextImageUrl) {
        throw new Error("Could not create image.");
      }

      setImageUrl(nextImageUrl);
      setImageStatus("ready");
    } catch (error) {
      setImageStatus("error");
      setImageErrorMessage(error instanceof Error ? error.message : "Could not create image.");
    }
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
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0b1838] via-[#1a2850] to-[#0b1838] border-2 border-[#88a5e0]/30 rounded-lg shadow-2xl"
        style={{
          boxShadow: '0 0 60px rgba(136, 165, 224, 0.3), inset 0 0 80px rgba(58, 96, 160, 0.1)'
        }}
      >
        {/* Delete button (only for user-created stories) */}
        {onDelete && (
          <button
            onClick={() => {
              if (window.confirm(`Delete "${story.title}"? This cannot be undone.`)) {
                onDelete();
              }
            }}
            aria-label="Delete this story"
            className="absolute top-4 right-16 z-10 p-2 rounded-full bg-[#0b1838]/90 border border-[#f6b8b8]/40 hover:bg-[#3a1a1a] hover:border-[#f6b8b8]/70 transition-all"
            style={{
              boxShadow: '0 0 12px rgba(246, 184, 184, 0.25)'
            }}
          >
            <Trash2 className="w-5 h-5 text-[#f6b8b8]" />
          </button>
        )}

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
          {/* Story title */}
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
            {story.person}
          </motion.h2>

          {/* Cosmic object title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#88a5e0]/90 mb-4 italic"
            style={{ fontSize: '0.95rem' }}
          >
            {story.title}
          </motion.p>

          {/* Accessible audio narration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mb-6 flex flex-col gap-3 rounded border border-[#88a5e0]/30 bg-[#0b1838]/60 p-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleNarrationToggle}
                disabled={status === "loading"}
                aria-label={narrationLabel}
                className="inline-flex min-h-10 items-center gap-2 rounded border border-[#88a5e0]/50 bg-[#3a60a0]/30 px-4 py-2 text-[#c8ddf5] transition-all hover:border-[#c8ddf5]/70 hover:bg-[#3a60a0]/50 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  boxShadow: '0 0 16px rgba(136, 165, 224, 0.18)'
                }}
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : status === "playing" ? (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
                <span style={{ fontSize: '0.9rem' }}>{narrationLabel}</span>
              </button>

              <div className="flex items-center gap-2 text-[#88a5e0]/80">
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                <span style={{ fontSize: '0.8rem' }}>AI-generated narration</span>
              </div>
            </div>

            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                controls
                className="w-full"
                onPlay={() => setStatus("playing")}
                onPause={() => setStatus("ready")}
                onEnded={() => setStatus("ready")}
              />
            )}

            {status === "error" && (
              <p className="text-[#f6b8b8]" role="alert" style={{ fontSize: '0.85rem' }}>
                {errorMessage}
              </p>
            )}
          </motion.div>

          {/* Generated image */}
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
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`AI-generated story image for ${story.person}: ${story.title}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {imageStatus === "loading" ? (
                  <Loader2 className="mb-4 h-14 w-14 animate-spin text-[#88a5e0]/70" aria-hidden="true" />
                ) : (
                  <ImageIcon className="w-16 h-16 text-[#4d4177]/60 mb-4" aria-hidden="true" />
                )}
                <button
                  type="button"
                  onClick={handleGenerateImage}
                  disabled={imageStatus === "loading"}
                  className="mb-4 inline-flex min-h-10 items-center gap-2 rounded border border-[#88a5e0]/50 bg-[#3a60a0]/30 px-4 py-2 text-[#c8ddf5] transition-all hover:border-[#c8ddf5]/70 hover:bg-[#3a60a0]/50 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    boxShadow: '0 0 16px rgba(136, 165, 224, 0.18)'
                  }}
                >
                  {imageStatus === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <ImageIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span style={{ fontSize: '0.9rem' }}>
                    {imageStatus === "loading" ? "Creating image..." : "Generate image"}
                  </span>
                </button>
                <p className="text-[#88a5e0]/60 text-center italic max-w-md" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                  The image will be generated from the story's events, setting, and emotional core.
                </p>
                {imageStatus === "error" && (
                  <p className="mt-3 text-center text-[#f6b8b8]" role="alert" style={{ fontSize: '0.85rem' }}>
                    {imageErrorMessage}
                  </p>
                )}
              </div>
            )}
            {imageUrl && (
              <button
                type="button"
                onClick={handleGenerateImage}
                disabled={imageStatus === "loading"}
                className="absolute bottom-4 right-4 inline-flex min-h-9 items-center gap-2 rounded border border-[#88a5e0]/50 bg-[#0b1838]/85 px-3 py-2 text-[#c8ddf5] backdrop-blur-sm transition-all hover:border-[#c8ddf5]/70 hover:bg-[#1a2850]/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {imageStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <ImageIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span style={{ fontSize: '0.8rem' }}>
                  {imageStatus === "loading" ? "Creating..." : "Regenerate"}
                </span>
              </button>
            )}
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
            <p className="whitespace-pre-line text-[#c8ddf5]/90 leading-relaxed" style={{ fontSize: '1.05rem', fontFamily: 'Georgia, serif' }}>
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
