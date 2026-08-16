import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { CLINIC_REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filteredReviews = CLINIC_REVIEWS.filter(
    (r) => selectedTag === 'All' || r.tag === selectedTag
  );

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 relative">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none"></div>

      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
          Patient Stories
        </div>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
          Care people remember.
        </h2>
        <p className="mt-4 text-base text-white/55">
          Real stories from over 5,000+ patients who found comfort, confidence, and radiant health at DENTAL+.
        </p>

        {/* Filter tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {['All', 'Cosmetic', 'Emergency', 'Orthodontics', 'Implants', 'General'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition border ${
                selectedTag === tag
                  ? 'orange-gradient text-[#1B0D05] border-transparent shadow'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {filteredReviews.map((review) => (
          <blockquote
            key={review.id}
            className="glass rounded-3xl p-7 border border-white/10 flex flex-col justify-between hover:border-orange-400/30 transition hover:-translate-y-1 relative"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-orange-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-white/40 bg-white/5 px-2.5 py-0.5 rounded-full">
                  {review.tag}
                </span>
              </div>

              <p className="mt-5 leading-relaxed text-sm sm:text-base text-white/75">
                “{review.comment}”
              </p>
            </div>

            <footer className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>{review.author}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xs text-white/40 mt-0.5">{review.service}</div>
              </div>
              <span className="text-xs text-white/30">{review.date}</span>
            </footer>
          </blockquote>
        ))}
      </div>

      {/* Aggregate Score Bar */}
      <div className="mt-12 rounded-3xl glass p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-extrabold text-white">4.9</div>
          <div>
            <div className="flex text-orange-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange-400" />
              ))}
            </div>
            <div className="text-xs text-white/50 mt-1">Based on 1,248 Google & Yelp patient reviews</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-white/60 text-right hidden sm:block">
            <div className="font-semibold text-white">Ready for your visit?</div>
            <div>Schedule in under 60 seconds</div>
          </div>
          <a
            href="#appointment"
            className="orange-gradient rounded-xl px-5 py-2.5 text-xs font-bold text-[#1B0D05] shadow transition hover:-translate-y-0.5"
          >
            Book Appointment
          </a>
        </div>
      </div>

    </section>
  );
};
