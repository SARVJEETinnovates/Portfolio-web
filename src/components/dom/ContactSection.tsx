import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [emailValid, setEmailValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const validateEmail = (value: string) => {
    setEmailValid(emailRegExp.test(value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailValid) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      if (serviceId === 'YOUR_SERVICE_ID' || !serviceId) {
        toast.error('Email service not configured. Please contact me at sarvjeetyadav2969@gmail.com');
        setIsSubmitting(false);
        return;
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'sarvjeetyadav2969@gmail.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setEmailValid(true);
    } catch (error) {
      console.error('Email send error:', error);
      toast.error('Failed to send message. Please try again or email me directly at sarvjeetyadav2969@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/SARVJEETinnovates', 
      icon: FaGithub,
      color: 'hover:text-[#333] dark:hover:text-white'
    },
    { 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/sarvjeetyadav2969/', 
      icon: FaLinkedin,
      color: 'hover:text-[#0077b5]'
    },
    { 
      label: 'Email', 
      href: 'mailto:sarvjeetyadav2969@gmail.com', 
      icon: FaEnvelope,
      color: 'hover:text-[#EA4335]'
    },
  ];

  return (
    <section id="contact" className="section-container relative overflow-hidden py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-mono text-sm uppercase tracking-[0.3em] mb-4 backdrop-blur-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-md bg-card/50 rounded-2xl p-8 md:p-10 shadow-2xl border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            {/* Error Message */}
            <div className="min-h-[2rem] mb-4">
              {!emailValid && formData.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm text-center bg-destructive/10 py-2 px-4 rounded-lg border border-destructive/30"
                >
                  Please enter a valid email address.
                </motion.p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <fieldset className="space-y-6">
                <legend className="text-2xl font-display font-bold text-foreground mb-8 text-center">
                  Send me a message
                </legend>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-base bg-background/50 backdrop-blur-sm border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-3 text-base bg-background/50 backdrop-blur-sm border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all ${
                      !emailValid && formData.email
                        ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                        : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 text-base bg-background/50 backdrop-blur-sm border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-muted-foreground backdrop-blur-sm bg-background/50 px-2 py-1 rounded">
                    {formData.message.length} / 500
                  </span>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !emailValid}
                    className="group relative px-10 py-4 text-base bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-bold hover:shadow-[0_0_40px_rgba(204,255,0,0.7)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.svg
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </motion.svg>
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Sending...
                          </motion.span>
                        </>
                      ) : (
                        <>
                          <motion.span
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Send Message
                          </motion.span>
                          <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    {/* Pulse effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      initial={{ boxShadow: '0 0 0 0 rgba(204, 255, 0, 0.7)' }}
                      whileHover={{ boxShadow: ['0 0 0 0 rgba(204, 255, 0, 0.7)', '0 0 0 20px rgba(204, 255, 0, 0)'] }}
                      transition={{ duration: 0.6 }}
                    />
                  </button>
                </div>
              </fieldset>
            </form>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center gap-6"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative w-14 h-14 rounded-xl backdrop-blur-sm bg-card/50 border border-border/50 hover:border-primary/50 flex items-center justify-center text-muted-foreground transition-all duration-300 ${link.color}`}
                aria-label={link.label}
              >
                <Icon className="w-6 h-6 relative z-10" />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
