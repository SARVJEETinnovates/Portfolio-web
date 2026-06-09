import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isLink?: boolean;
}

const contactDetails: ContactInfo[] = [
  {
    icon: <FaEnvelope className="w-6 h-6" />,
    label: 'Email',
    value: 'sarvjeetyadav2969@gmail.com',
    href: 'mailto:sarvjeetyadav2969@gmail.com',
    isLink: true,
  },
  {
    icon: <FaPhone className="w-6 h-6" />,
    label: 'Phone',
    value: '+91 9555167411',
    href: 'tel:+919999999999',
    isLink: true,
  },
  {
    icon: <FaMapMarkerAlt className="w-6 h-6" />,
    label: 'Location',
    value: 'Delhi NCR, India',
    isLink: false,
  },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/SARVJEETinnovates',
    icon: FaGithub,
    color: 'from-gray-700 to-gray-900 dark:from-gray-100 dark:to-gray-300',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sarvjeetyadav2969/',
    icon: FaLinkedin,
    color: 'from-blue-600 to-blue-800',
  },
];

const ContactInfoCard = memo(({ info, index }: { info: ContactInfo; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
        } else if (entry.boundingClientRect.top > 0) {
          element.classList.remove('in-view');
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  const content = (
    <div className="relative h-full backdrop-blur-sm bg-gradient-to-br from-background/40 to-background/20 border border-border/30 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 overflow-hidden group">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          {info.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            {info.label}
          </p>
          <p className="text-lg font-medium text-foreground break-words">
            {info.value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, margin: '0px 0px -50px 0px' }}
      className="scroll-animate slide-up"
    >
      {info.isLink && info.href ? (
        <a
          href={info.href}
          target={info.label !== 'Email' ? '_blank' : undefined}
          rel={info.label !== 'Email' ? 'noopener noreferrer' : undefined}
          className="block hover:no-underline"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
});

const SocialLink = memo(({ link, index }: { link: (typeof socialLinks)[0]; index: number }) => {
  const Icon = link.icon;

  return (
    <motion.a
      key={link.label}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: false }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm bg-gradient-to-br ${link.color} text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]`}
      aria-label={link.label}
    >
      <Icon className="w-7 h-7 relative z-10" />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {link.label}
      </span>
    </motion.a>
  );
});

const ContactInfoSection = memo(() => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
        } else if (entry.boundingClientRect.top > 0) {
          element.classList.remove('in-view');
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <section id="contact-info" className="relative py-20 overflow-hidden" aria-label="Contact Information">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="section-container max-w-5xl mx-auto relative">
        {/* Header */}
        <header ref={headerRef} className="mb-16 text-center scroll-animate slide-up">
          <span className="inline-block text-primary font-mono text-sm uppercase tracking-[0.3em] mb-4 backdrop-blur-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
            Contact Information
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
            Get In Touch With Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto backdrop-blur-sm bg-background/30 p-4 rounded-xl border border-border/30">
            Reach out through any of these channels. I'm always excited to discuss new projects and opportunities.
          </p>
        </header>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactDetails.map((info, index) => (
            <ContactInfoCard key={info.label} info={info} index={index} />
          ))}
        </div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: false, margin: '0px 0px -50px 0px' }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-8 text-lg font-medium">Connect with me on social media</p>
          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((link, index) => (
              <SocialLink key={link.label} link={link} index={index} />
            ))}
          </div>
        </motion.div>

        {/* CTA Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false }}
          className="mt-16 text-center backdrop-blur-sm bg-primary/10 border border-primary/30 rounded-xl p-6 md:p-8"
        >
          <p className="text-foreground text-lg">
            Whether you have a project in mind or just want to say hello, feel free to reach out!
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] transition-all duration-300 font-semibold"
          >
            Send a Message
          </button>
        </motion.div>
      </div>
    </section>
  );
});

export default ContactInfoSection;
