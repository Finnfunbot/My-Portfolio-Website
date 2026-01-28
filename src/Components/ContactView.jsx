import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Send, Clock, Globe } from 'lucide-react';

export default function ContactView() {
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#00416B]/10 rounded-full text-sm font-medium text-[#00416B] mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-[#00416B] mb-6">
            Let's Work Together
          </h1>
          <p className="text-[#00416B]/70 max-w-2xl mx-auto text-lg">
            Are you looking for an engineering intern? I'd love to hear about it!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Email Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00416B] to-[#00416B]/80 flex items-center justify-center shadow-lg shadow-[#00416B]/20">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#00416B] mb-1">Email</h3>
                  <p className="text-[#00416B]/60 text-sm mb-3">Preferred contact method</p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=gregory@simonefamily.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00416B] font-medium hover:underline"
                    title="Open in Gmail"
                  >
                    gregory@simonefamily.net
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#00416B] mb-1">Phone</h3>
                  <p className="text-[#00416B]/60 text-sm mb-3">Mon-Fri, 9AM-6PM EST</p>
                  <a
                    href="tel:+15085071526"
                    className="text-[#00416B] font-medium hover:underline"
                  >
                    +1 (508) 507-1526
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#00416B] mb-1">Location</h3>
                  <p className="text-[#00416B]/60 text-sm mb-3">Foxborough, Massachussetts</p>
                  <p className="text-[#00416B] font-medium">
                    Foxborough, MA 02035
                  </p>
                </div>
              </div>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.a
              href="https://www.linkedin.com/in/gregory-simone/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.02 }}
              className="block bg-[#00416B] rounded-3xl p-8 shadow-xl shadow-[#00416B]/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">LinkedIn</h3>
                    <p className="text-white/70 text-sm">Connect professionally</p>
                  </div>
                </div>
                <Send className="w-6 h-6 text-white/60" />
              </div>
            </motion.a>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Availability */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5">
              <h3 className="text-xl font-bold text-[#00416B] mb-6">Availability</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[#00416B]/80">Currently available for new projects</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[#00416B]/60" />
                  <span className="text-[#00416B]/80">Typical response time: 6-48 hours</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-[#00416B]/60" />
                  <span className="text-[#00416B]/80">Open to remote, hybrid, or on-site opportunities</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5">
              <h3 className="text-xl font-bold text-[#00416B] mb-6">How I Can Help</h3>
              <ul className="space-y-3">
                {[
                  'Lead Technical Sub-Teams',
                  'Design High-Performance Mechanical Parts',
                  'Finite Element Analysis',
                  'Prototype for Rapid Iteration',
                  'Design for Additive Manufacturing',
                  'Author Technical Documentation',
                ].map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00416B]" />
                    <span className="text-[#00416B]/80">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Message */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5">
              <h3 className="text-xl font-bold text-[#00416B] mb-4">Quick Message</h3>
              <p className="text-[#00416B]/70 mb-6">
                For internships or job opportunities, please reach out 
                via email and I will get back to you soon.
              </p>
              
              {/* UPDATED: Gmail Direct Link with Subject Line */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=gregory@simonefamily.net&su=Project%20Inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#00416B] text-white rounded-full font-medium hover:bg-[#00416B]/90 transition-all duration-300 shadow-lg shadow-[#00416B]/20"
                title="Send via Gmail"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
