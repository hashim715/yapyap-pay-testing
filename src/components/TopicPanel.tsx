import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Topic {
  title: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  title: string;
  description: {
    overview: string;
    vocabulary: string[];
    starters: string[];
    examples: string[];
  };
}

interface TopicPanelProps {
  topics: Topic[];
  isHost: boolean;
  currentTopicIndex: number;
  selectedSubtopicIndex: number | null;
  onSubtopicSelect: (index: number) => void;
  completedTopics: number[];
  className?: string;
}

export const TopicPanel = ({
  topics,
  isHost,
  currentTopicIndex,
  selectedSubtopicIndex,
  onSubtopicSelect,
  completedTopics,
  className,
}: TopicPanelProps) => {
  const currentTopic = topics[currentTopicIndex];
  const selectedSubtopic =
    selectedSubtopicIndex !== null
      ? currentTopic.subtopics[selectedSubtopicIndex]
      : null;

  const allTopicsCompleted = completedTopics.length === topics.length;

  if (!isHost && selectedSubtopic) {
    return (
      <div className={cn("h-full bg-background flex flex-col", className)}>
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-border flex-shrink-0">
          <div className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">
            Topic {currentTopicIndex + 1} of {topics.length}
          </div>
          <h3 className="text-[14px] md:text-[15px] font-medium">
            {currentTopic.title}
          </h3>
          <div className="mt-2.5 md:mt-3 pt-2.5 md:pt-3 border-t border-border/60">
            <div className="text-[13px] font-medium text-foreground flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              {selectedSubtopic.title}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-4 md:pb-6">
          <div className="space-y-4 md:space-y-5 pt-3 md:pt-4">
            <div>
              <div className="text-[12px] text-muted-foreground uppercase tracking-wide mb-2">
                Overview
              </div>
              <p className="text-[13px] text-foreground leading-relaxed">
                {selectedSubtopic.description.overview}
              </p>
            </div>

            {selectedSubtopic.description.vocabulary.length > 0 && (
              <div className="pt-4 border-t border-border/60">
                <div className="text-[12px] text-muted-foreground uppercase tracking-wide mb-2">
                  Key Vocabulary
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSubtopic.description.vocabulary.map((word, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-muted/50 text-muted-foreground text-[11px] rounded"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedSubtopic.description.starters.length > 0 && (
              <div className="pt-4 border-t border-border/60">
                <div className="text-[12px] text-muted-foreground uppercase tracking-wide mb-2.5">
                  Conversation Starters
                </div>
                <div className="space-y-2.5">
                  {selectedSubtopic.description.starters.map((starter, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-[12px] font-medium text-primary/40 flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-[13px] text-foreground/80 leading-relaxed">
                        {starter}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full bg-background flex flex-col", className)}>
      {allTopicsCompleted ? (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-primary text-lg">✓</span>
            </div>
            <div className="text-[14px] font-medium text-foreground mb-1">
              All topics completed
            </div>
            <div className="text-[12px] text-muted-foreground">
              You've covered all 5 topics in this session.
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-border flex-shrink-0">
            <div className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">
              Topic {currentTopicIndex + 1} of {topics.length}
            </div>
            <h3 className="text-[14px] md:text-[15px] font-medium">
              {currentTopic.title}
            </h3>
            {selectedSubtopic && (
              <button
                onClick={() => onSubtopicSelect(-1)}
                className="mt-2.5 text-[11px] text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3 h-3" strokeWidth={2} />
                Change sub-topic
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-4 md:pb-6">
            {selectedSubtopic ? (
              <div className="pt-3 md:pt-4">
                <div className="mb-4 pb-3 border-b border-border/60">
                  <div className="text-[13px] font-medium text-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {selectedSubtopic.title}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-[12px] text-muted-foreground uppercase tracking-wide mb-2">
                      Overview
                    </div>
                    <p className="text-[13px] text-foreground leading-relaxed">
                      {selectedSubtopic.description.overview}
                    </p>
                  </div>

                  {selectedSubtopic.description.vocabulary.length > 0 && (
                    <div className="pt-4 border-t border-border/60">
                      <div className="text-[12px] text-muted-foreground uppercase tracking-wide mb-2">
                        Key Vocabulary
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSubtopic.description.vocabulary.map(
                          (word, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-muted/50 text-muted-foreground text-[11px] rounded"
                            >
                              {word}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {selectedSubtopic.description.starters.length > 0 && (
                    <div className="pt-4 border-t border-border/60">
                      <div className="text-[12px] text-muted-foreground uppercase tracking-wide mb-2.5">
                        Conversation Starters
                      </div>
                      <div className="space-y-2.5">
                        {selectedSubtopic.description.starters.map(
                          (starter, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-[12px] font-medium text-primary/40 flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="text-[13px] text-foreground/80 leading-relaxed">
                                {starter}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {selectedSubtopic.description.examples.length > 0 && (
                    <div className="pt-4 border-t border-border/60">
                      <div className="text-[12px] text-muted-foreground uppercase tracking-wide mb-2.5">
                        Example Angles
                      </div>
                      <div className="space-y-2">
                        {selectedSubtopic.description.examples.map(
                          (example, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-[12px] text-primary/40 flex-shrink-0 mt-0.5">
                                •
                              </span>
                              <p className="text-[13px] text-foreground/80 leading-relaxed">
                                {example}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="pt-3 md:pt-4">
                <div className="text-[12px] text-muted-foreground uppercase tracking-wide mb-3">
                  Choose a Sub-Topic
                </div>
                <div className="space-y-0">
                  {currentTopic.subtopics.map((subtopic, index) => (
                    <div key={index}>
                      <button
                        onClick={() => onSubtopicSelect(index)}
                        className="w-full py-2.5 px-3 flex items-center justify-between hover:bg-muted/50 transition-all rounded text-left group"
                      >
                        <span className="text-[13px] text-foreground/80 group-hover:text-foreground transition-colors">
                          {subtopic.title}
                        </span>
                        <ChevronRight
                          className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary/70 group-hover:translate-x-0.5 transition-all"
                          strokeWidth={2}
                        />
                      </button>
                      {index < currentTopic.subtopics.length - 1 && (
                        <div className="border-t border-border/60 my-0.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
