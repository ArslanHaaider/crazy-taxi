"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { Clock, MapPin, Globe, Shield } from "lucide-react";
import { useTranslations } from 'next-intl';

const Services = () => {
  const t = useTranslations('services');

  const features = [
    {
      icon: Clock,
      title: t('feature1_title'),
      description: t('feature1_description')
    },
    {
      icon: Shield,
      title: t('feature2_title'), 
      description: t('feature2_description')
    },
    {
      icon: Globe,
      title: t('feature3_title'),
      description: t('feature3_description')
    },
    {
      icon: MapPin,
      title: t('feature4_title'),
      description: t('feature4_description')
    }
  ];

  return (
    <section className="relative z-10 w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Headline */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                {t('heading').split('Frankfurt')[0]}
                <span className="text-yellow-400">Frankfurt</span>
                {t('heading').split('Frankfurt')[1] || ''}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-300 font-medium"
              >
                {t('subtitle')}
              </motion.p>
            </div>

            {/* Feature Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-slate-900" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>


          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-3xl"></div>
              
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 border border-slate-600/50">
                <Image
                  src="/services1.jpg"
                  alt={t('image_alt')}
                  width={600}
                  height={400}
                  className="rounded-2xl w-full h-auto object-cover shadow-2xl"
                  priority
                />
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -top-4 -right-4 bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-2xl shadow-lg"
                >
                  {t('badge_text')}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
