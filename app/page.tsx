'use client';

import React, { useState, useEffect, FC, ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform, Variants, AnimatePresence } from 'framer-motion';

// --- TIPE DATA ---

interface SocialLink {
  href: string;
  'aria-label': string;
  icon: ReactNode;
}

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
}

interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
}

interface Education {
    name: string;
    major: string;
}

interface SectionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
    className?: string;
}

// --- PUSAT DATA & TEKS UI ---

const uiTexts = {
  header: {
    name: "Taufik Hidayat.",
    navItems: [
      { label: "About", id: "about" },
      { label: "Experience", id: "experience" },
      { label: "Projects", id: "projects" },
      { label: "Skills", id: "skills" },
      { label: "Contact", id: "contact" },
    ],
    cvButton: "View CV",
    cvLink: "https://drive.google.com/file/d/1sx71DFX9A4yrko-_hJ13nxuG_CDGxvJ6/view?usp=drive_link",
  },
  hero: {
    title: "Hi, I’m Taufik Hidayat",
    subtitle: "stay humble to the core of the earth.",
    profilePicture: "/pp.jpg",
  },
  about: {
    title: "About Me",
    intro: "A lifelong learner dedicated to bridging the gap between human needs and technology through thoughtful design and robust development.",
    journeyTitle: "My Journey",
    journeyP1: "My journey into the world of technology began at SMK Negeri 1 Tempilang, majoring in Multimedia. This foundational experience fueled my passion for the digital sector.",
    journeyP2: "Currently, I am developing my knowledge of Informatics Engineering at the Atma Luhur Institute of Science and Business.",
    educationTitle: "Educational Background",
  },
  experience: {
    title: "Work Experience",
  },
  projects: {
    title: "My Recent Work",
  },
  skills: {
    title: "Professional Skillset",
  },
  contact: {
    title: "Get In Touch",
    description: "I'm currently open to new opportunities and collaborations. Feel free to reach out!",
    button: "Say Hello",
    email: "taufiktgniur@gmail.com",
  },
  footer: {
    copyright: "Taufik Hidayat. Designed & Built with Passion.",
  },
};

const socialLinks: SocialLink[] = [
    {
        href: "https://www.linkedin.com/in/taufik-hidayat-809081290/",
        'aria-label': "LinkedIn Profile",
        icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    },
    {
        href: "https://github.com/fikshii",
        'aria-label': "GitHub Profile",
        icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.109-.778.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    },
    {
        href: `mailto:${uiTexts.contact.email}`,
        'aria-label': "Email Address",
        icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
    }
];

const projects: Project[] = [
  {
    title: 'Bangka Hire',
    category: 'job vacancy website',
    description: 'job vacancy website specifically for Bangka Belitung.',
    tags: ['UX Design', 'UI Design'],
    imageUrl: '/bhire.png',
    liveUrl: 'https://www.figma.com/proto/5szyZv2qK4CScjk19fBTp3/EcoGo?node-id=3028-6036&p=f&t=IOgSos8g0rryQVxi-1&scaling=scale-down&content-scaling=fixed&page-id=3007%3A16795&starting-point-node-id=3028%3A6033&show-proto-sidebar=1',
  },
  {
    title: 'OneTik',
    category: 'Mobile Apps',
    description: 'to make it easier for users to buy concert tickets and donate.',
    tags: ['UX Design', 'UI Design'],
    imageUrl: '/onetik.png',
    liveUrl: 'https://www.figma.com/proto/DsOFpJoanYrx2MnFxbevgl/OneTik?t=GbFT5DKZzWrnCcDB-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=3-2&starting-point-node-id=3%3A2',
  },
  {
    title: 'Ecogo',
    category: 'Mobile Apps',
    description: 'environmentally friendly transportation application.',
    tags: ['UX Design', 'UI Design'],
    imageUrl: '/ecogo.png',
    liveUrl: 'https://www.figma.com/proto/dZqblcwpsKdC9TEUA9rxub/Bangka-Hire?node-id=122-401&p=f&t=o3ryd9r1IiOYYR85-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=122%3A401&show-proto-sidebar=1',
  },
];

const experiences: Experience[] = [
    {
        role: "Design (Intern)",
        company: "Bawaslu Kota Pangkalpinang.",
        period: "sep 2024 - Dec 2024",
        description: "contribute to completing Bawaslu's content needs up to the regional election stage."
    },
    {
        role: "UI/UX Botcamp",
        company: "GreatEdu",
        period: "Feb 2024 - Jun 2024",
        description: "Mentee Independent Study UI/UX Designer MSIB Batch 6."
    }
];

const educationData: Education[] = [
    { name: "ISB Atma Luhur", major: "Teknik Informatika, 2021 – 2025" },
    { name: "SMK Negeri 1 Siak Hulu", major: "Multimedia, 2017 – 2020" },
];

const skills: string[] = [
  'HTML', 'CSS', 'Figma', 'UI Design'
];


// --- KOMPONEN UI ---

const SocialIcon: FC<SocialLink> = ({ href, 'aria-label': ariaLabel, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-slate-500 hover:text-sky-500 transition-colors duration-300"
    whileHover={{ scale: 1.2, y: -2 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
  >
    {icon}
  </motion.a>
);

const Section: FC<SectionProps> = ({ children, id, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id={id} ref={ref} className={`py-20 md:py-28 px-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
};

const ProjectCard: FC<ProjectCardProps> = ({ project, className = '' }) => {
    // State untuk mengontrol visibilitas overlay di mobile dan desktop
    const [isHovered, setIsHovered] = useState(false);

    const overlayVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`w-full ${className}`}
        >
            {/* Mengganti whileHover dengan event handler manual untuk mobile & desktop */}
            <motion.div
                className="relative overflow-hidden rounded-xl group shadow-lg h-full"
                data-hover
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onTap={() => setIsHovered(!isHovered)} // Toggle untuk sentuhan di mobile
            >
                {/* Kembali menggunakan tag <img> standar */}
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                />
                
                {/* Mengontrol animasi overlay menggunakan state */}
                <motion.div 
                  className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent" 
                  variants={overlayVariants}
                  initial="hidden"
                  animate={isHovered ? "visible" : "hidden"}
                >
                    <div className='flex justify-between items-start'>
                        <div>
                            <motion.span variants={itemVariants} className={`inline-block text-sm font-semibold mb-2 px-3 py-1 rounded-full bg-white/20 text-white w-fit`}>
                                {project.category}
                            </motion.span>
                            <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {project.title}
                            </motion.h3>
                        </div>
                        <motion.div variants={itemVariants} className="flex gap-4">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="text-white/80 hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                </a>
                            )}
                        </motion.div>
                    </div>
                    <motion.p variants={itemVariants} className="text-white/90 text-sm md:text-base leading-relaxed mb-3 max-w-lg mt-auto">
                        {project.description}
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                            <span key={tag} className="text-xs text-white bg-white/20 px-2 py-1 rounded-md">{tag}</span>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEvent = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        setIsHovering(!!target.closest('a, button, [data-hover]'));
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseEvent);
    document.addEventListener('mouseout', handleMouseEvent);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseEvent);
      document.removeEventListener('mouseout', handleMouseEvent);
    };
  }, []);

  return (
    <motion.div
      className="hidden lg:block fixed top-0 left-0 z-50 pointer-events-none"
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 1.5 : 1,
        opacity: isHovering ? 0.7 : 1,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
    >
      <div
        className={`w-6 h-6 rounded-full transition-transform duration-300 ${
          isHovering ? 'bg-sky-500/50 scale-150' : 'bg-sky-500'
        }`}
        style={{ transform: `translate(-50%, -50%)` }}
      />
    </motion.div>
  );
};

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-sky-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    aria-label="Kembali ke atas"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};


// --- BAGIAN-BAGIAN HALAMAN (SECTIONS) ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navContainerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.1,
        }
    }
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.button onClick={() => scrollTo('hero')} className="text-xl font-bold text-slate-800" data-hover initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}>
          {uiTexts.header.name}
        </motion.button>
        <motion.nav 
            className="hidden md:flex items-center gap-6 text-sm font-medium"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
        >
          {uiTexts.header.navItems.map(item => (
            <motion.button key={item.id} onClick={() => scrollTo(item.id)} className="text-slate-600 hover:text-sky-500 transition-colors" data-hover variants={navItemVariants}>
              {item.label}
            </motion.button>
          ))}
        </motion.nav>
        <motion.a 
          href={uiTexts.header.cvLink}
          target="_blank" 
          rel="noopener noreferrer" 
          className="hidden md:inline-block bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-500 transition-colors shadow-sm"
          data-hover
          variants={navItemVariants}
        >
          {uiTexts.header.cvButton}
        </motion.a>
      </div>
    </motion.header>
  );
};

const HeroSection = () => {
    const title = uiTexts.hero.title.split(" ");
    const subtitle = uiTexts.hero.subtitle.split(" ");

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <section id="hero" className="min-h-screen flex items-center bg-slate-50 relative overflow-hidden px-6">
            <div className="absolute inset-0 -z-0 opacity-50">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12 z-10 w-full">
                <div className="text-center lg:text-left">
                    <motion.h1 
                      className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 leading-tight"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                        {title.map((word, index) => (
                            <motion.span key={index} variants={itemVariants} className="inline-block mr-3">
                                {word === "Taufik" || word === "Hidayat" ? <span className="text-sky-500">{word}</span> : word}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <motion.p 
                      className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                         {subtitle.map((word, index) => (
                            <motion.span key={index} variants={itemVariants} className="inline-block mr-1.5">
                               {word}
                            </motion.span>
                        ))}
                    </motion.p>
                    <motion.div 
                      className="mt-10 flex justify-center lg:justify-start gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                        {socialLinks.map(link => <SocialIcon key={link.href} {...link} />)}
                    </motion.div>
                </div>
                <motion.div 
                    className="hidden lg:flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                >
                    <div className="relative w-80 h-80 md:w-96 md:h-96" data-hover>
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-300 to-blue-500 rounded-full blur-xl opacity-70"></div>
                        <motion.img
                            src={uiTexts.hero.profilePicture}
                            alt="Foto Taufik Hidayat"
                            className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        />
                    </div>
                </motion.div>
            </div>
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
            >
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </motion.div>
        </section>
    );
};

const AboutSection = () => (
  <Section id="about" className="bg-white">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">{uiTexts.about.title}</h2>
      <p className="text-center text-slate-600 md:text-lg mb-12 max-w-3xl mx-auto">
        {uiTexts.about.intro}
      </p>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-700">{uiTexts.about.journeyTitle}</h3>
          <p className="text-slate-600 leading-relaxed">{uiTexts.about.journeyP1}</p>
          <p className="text-slate-600 leading-relaxed">{uiTexts.about.journeyP2}</p>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-700">{uiTexts.about.educationTitle}</h3>
          <div className="space-y-4">
            {educationData.map(edu => (
                <motion.div 
                    key={edu.name} 
                    className="p-4 bg-slate-50 rounded-lg border border-slate-200" 
                    data-hover
                    whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.05)"}}
                    transition={{ duration: 0.3 }}
                >
                    <h4 className="font-bold text-slate-800">{edu.name}</h4>
                    <p className="text-sm text-slate-500">{edu.major}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const ExperienceSection = () => {
    return (
        <Section id="experience" className="bg-slate-50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-16">{uiTexts.experience.title}</h2>
                <div className="relative border-l-2 border-sky-200">
                    <div className="space-y-16">
                        {experiences.map((exp, index) => (
                            <motion.div 
                                key={index} 
                                className="relative pl-10"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-sky-500 rounded-full border-4 border-slate-50"></div>
                                
                                <p className="text-sm font-medium text-sky-600 mb-1">{exp.period}</p>
                                <h3 className="text-xl font-bold text-slate-800">{exp.role}</h3>
                                <p className="text-md text-slate-600 mb-3">{exp.company}</p>
                                <p className="text-slate-500 leading-relaxed">{exp.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

const ProjectsSection = () => (
  <Section id="projects" className="bg-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">{uiTexts.projects.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => {
          const isLastAndOdd = projects.length % 2 !== 0 && index === projects.length - 1;
          return (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              className={isLastAndOdd ? 'md:col-span-2' : ''}
            />
          );
        })}
      </div>
    </div>
  </Section>
);

const SkillsSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Section id="skills" className="bg-slate-800">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{uiTexts.skills.title}</h2>
        <motion.div 
          className="flex flex-wrap gap-3 md:gap-4 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skills.map(skill => (
            <motion.span
              key={skill}
              className="bg-slate-700 text-white px-4 py-2 text-sm md:text-base font-medium rounded-lg shadow-sm cursor-default"
              variants={itemVariants}
              whileHover={{ scale: 1.1, backgroundColor: '#0ea5e9' }}
              transition={{ type: 'spring', stiffness: 300 }}
              data-hover
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

const ContactSection = () => (
  <Section id="contact" className="bg-slate-50">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{uiTexts.contact.title}</h2>
      <p className="text-slate-600 md:text-lg mb-8 max-w-xl mx-auto">{uiTexts.contact.description}</p>
      <motion.a 
        href={`mailto:${uiTexts.contact.email}`}
        className="inline-block bg-sky-500 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-sky-600 transition-all duration-300 ease-in-out"
        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px rgba(14, 165, 233, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        data-hover
      >
        {uiTexts.contact.button}
      </motion.a>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="bg-white py-8 px-6">
    <div className="max-w-7xl mx-auto text-center text-slate-500">
      <div className="flex justify-center gap-6 mb-4">
        {socialLinks.map(link => <SocialIcon key={link.href} {...link} />)}
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()} {uiTexts.footer.copyright}</p>
    </div>
  </footer>
);


// --- KOMPONEN UTAMA APLIKASI ---

export default function App() {
  return (
    <>
      <style>
        {`
          html::-webkit-scrollbar {
            display: none;
          }

          html {
            scrollbar-width: none;
            -ms-overflow-style: none; /* Untuk IE dan Edge */
          }
        `}
      </style>
      <div className="bg-white text-slate-800 font-sans antialiased overflow-x-hidden">
        <CustomCursor />
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
}
