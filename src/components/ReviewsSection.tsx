import React, { useState } from 'react';
import { Star, CheckCircle, Quote, ThumbsUp, ShieldCheck } from 'lucide-react';
import { CLINIC_REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filteredReviews = CLINIC_REVIEWS.filter(
    (r) => selectedTag === 'All' || r.tag === selectedTag
  );

  return (
    <section id="reviews" className="w-full max-w-[100vw] overflow-x-hidden py-24 relative">
      
      {/* 3D Ambient Lighting Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-orange-400 border border-orange-400/20 shadow-glow-sm">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
          <span>Verified Google Reviews</span>
        </div>
        
        <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-white break-words">
          Real Delhi Patient Stories.
          <br className="hidden sm:inline" />
          <span className="text-gradient"> 5-Star Rated Care.</span>
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">
          Over 5,000+ happy smiles transformed across Delhi NCR. Here is what our patients say about Dr. Sahil & the team.
        </p>

        {/* Filter tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {['All', 'Cosmetic', 'Emergency', 'Orthodontics', 'Implants', 'General'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                selectedTag === tag
                  ? 'orange-gradient text-[#1B0D05] border-transparent shadow-[0_0_20px_rgba(255,138,61,0.4)] scale-105'
                  : 'bg-white/5 text-white/65 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Glassmorphic Reviews Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {filteredReviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="gloss-card-3d group relative rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/50 flex flex-col justify-between"
          >
            {/* Top specular highlight */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

            <div>
              {/* Header: Google Rating badge + Stars + Tag */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {/* Google "G" Icon Badge */}
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shadow-md">
                    <svg className="w-full h-full" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex gap-0.5 text-orange-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>

                <span className="text-[11px] font-bold text-orange-300 bg-orange-400/15 border border-orange-400/30 px-2.5 py-0.5 rounded-full shadow-sm">
                  {review.tag}
                </span>
              </div>

              {/* Quote text */}
              <div className="relative mt-5">
                <Quote className="w-8 h-8 text-orange-400/20 absolute -top-3 -left-2 pointer-events-none" />
                <p className="relative z-10 leading-relaxed text-sm sm:text-base text-white/90 font-normal">
                  “{review.comment}”
                </p>
              </div>
            </div>

            {/* Author Profile Footer */}
            <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {review.avatarUrl ? (
                  <img
                    src={review.avatarUrl}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-orange-400/50 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full orange-gradient text-[#1B0D05] font-bold flex items-center justify-center text-sm shadow">
                    {review.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{review.author}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Verified Google Patient" />
                  </div>
                  <div className="text-[11px] text-white/60">{review.location || 'Delhi Patient'}</div>
                  <div className="text-[11px] text-orange-300 font-medium mt-0.5">{review.service}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-white/50 block">{review.date}</span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 justify-end mt-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aggregate Score Bar */}
      <div className="mt-12 rounded-3xl gloss-card-3d p-6 sm:p-7 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white">4.9</span>
              <div className="flex flex-col">
                <div className="flex text-orange-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <span className="text-xs text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" /> 100% Recommended
                </span>
              </div>
            </div>
            <div className="text-xs text-white/60 mt-1">Based on 1,248+ verified Google reviews in Delhi NCR</div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="tel:+919953239674"
            className="flex-1 sm:flex-none rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition text-center shadow-md"
          >
            Call +91 9953239674
          </a>
          <a
            href="#appointment"
            className="flex-1 sm:flex-none orange-gradient rounded-xl px-5 py-2.5 text-xs font-bold text-[#1B0D05] shadow-[0_0_25px_rgba(255,138,61,0.4),inset_0_1px_0_rgba(255,255,255,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,138,61,0.6)] text-center border border-white/20"
          >
            Book Appointment
          </a>
        </div>
      </div>

      </div>
    </section>
  );
};
