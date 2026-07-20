'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Clock, GraduationCap, Users, BookOpen, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

interface Masterclass {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  price: number;
  currency: string;
  duration: string;
  level: string;
  lessons: number;
  enrolled: number;
}

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-amber-100 text-amber-800',
  advanced: 'bg-red-100 text-red-800',
};

export function MasterclassPage() {
  const { setView } = useAppStore();
  const [courses, setCourses] = useState<Masterclass[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Masterclass | null>(null);

  useEffect(() => {
    fetch('/api/masterclass').then(r => r.json()).then(setCourses);
  }, []);

  return (
    <div className="bg-cream pt-24 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Learn from the Master</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal">Akpaka Academy</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Master the art of bespoke shoemaking through our structured courses, 
            taught by Prince Sunday Achase and his team of artisans.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${levelColors[course.level]}`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" /> {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {course.enrolled}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="font-serif text-2xl font-bold text-gold">₦{course.price.toLocaleString()}</span>
                  </div>
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-charcoal hover:bg-charcoal/90 text-gold font-semibold text-sm"
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Learn With Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-charcoal text-white rounded-xl p-8 sm:p-12"
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold mb-3">Why Akpaka Academy?</h2>
            <p className="text-white/60">Learn directly from Nigeria&apos;s most talked-about shoemaker</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: 'Expert Instruction', desc: 'Learn directly from Prince Achase with years of mastery' },
              { icon: BookOpen, title: 'Structured Curriculum', desc: 'Progressive lessons from basics to advanced techniques' },
              { icon: Users, title: 'Community Access', desc: 'Join a community of aspiring and established shoemakers' },
              { icon: CheckCircle2, title: 'Certification', desc: 'Receive an Akpaka Academy certificate upon completion' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enrollment Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCourse(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">{selectedCourse.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{selectedCourse.duration} &middot; {selectedCourse.lessons} lessons &middot; {selectedCourse.level}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{selectedCourse.description}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-2xl font-bold text-gold">₦{selectedCourse.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">{selectedCourse.enrolled} students enrolled</span>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-gold hover:bg-gold-light text-charcoal font-semibold h-12">
                Enroll Now
              </Button>
              <a
                href={`https://wa.me/2348180474183?text=Hello%20AkpakaNG!%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedCourse.title)}%20course.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 h-12">
                  Inquire on WhatsApp
                </Button>
              </a>
            </div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-charcoal"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
