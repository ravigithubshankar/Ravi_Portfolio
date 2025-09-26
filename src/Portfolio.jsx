import { motion } from "framer-motion";
import { desc, link, title } from "framer-motion/client";
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Brain, Database, Wrench, Cloud, GraduationCap } from "lucide-react";
import { useRef, useEffect } from 'react';

const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`max-w-6xl mx-auto py-20 px-6 ${className}`}>
    <motion.h2
      className="text-4xl font-bold text-white mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `hsl(${Math.random() * 60 + 240}, 70%, ${Math.random() * 30 + 60}%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
    />
  );
};

const SkillCard = ({ icon: Icon, title, skills }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-lg"
  >
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-indigo-400 mr-3" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const EducationCard = ({ degree, university, period, details, gpa }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-lg"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{degree}</h3>
        <p className="text-indigo-400 text-sm mt-1">{university}</p>
      </div>
      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
        {period}
      </span>
    </div>
    <p className="text-gray-300 text-sm mb-3">{details}</p>
    {gpa && (
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>GPA: {gpa}</span>
      </div>
    )}
  </motion.div>
);

export default function Portfolio() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 min-h-screen relative overflow-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground />

      {/* Gradient Orbs */}
      <div className="fixed top-1/4 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-1/4 -right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Header / Nav */}
      <motion.header
        className="fixed top-0 w-full bg-gray-900/20 backdrop-blur-md z-50 border-b border-gray-700/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Ravi Bedadhala
          </motion.h1>
          <nav className="hidden md:flex space-x-8 text-sm">
            {['about', 'education', 'skills', 'projects', 'experience', 'opensource', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="capitalize hover:text-indigo-400 transition-colors duration-300 text-gray-300 hover:text-white"
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 pt-20">
        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ravi Shankar
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Bedadhala
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >

          </motion.p>
          <motion.p
            className="text-lg text-gray-400 max-w-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Passionate about building intelligent systems and transforming ideas into innovative solutions
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 text-gray-300 bg-gray-800/30 px-4 py-3 rounded-lg backdrop-blur-sm border border-gray-700/50">
              <Mail className="w-5 h-5 text-indigo-400" />
              <span>bedadhalaravi5@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 bg-gray-800/30 px-4 py-3 rounded-lg backdrop-blur-sm border border-gray-700/50">
              <Phone className="w-5 h-5 text-indigo-400" />
              <span>+91 9912914857</span>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a href="https://www.linkedin.com/in/ravi-shankar-bedadhala-581750217/" target="_blank" rel="noopener noreferrer" className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors backdrop-blur-sm">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/ravigithubshankar" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors backdrop-blur-sm border border-gray-700/50">
              <Github size={20} />
            </a>
          </motion.div>
        </section>

        {/* About */}
        <Section id="about" title="About Me">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              I'm a recent Computer Science graduate from Vignan University with a strong passion for
              Machine Learning and Software Development. During my academic journey, I've developed
              expertise in building intelligent systems and solving complex problems through innovative
              technological solutions.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My hands-on experience includes developing machine learning models, contributing to open-source
              projects, and building scalable applications. I'm eager to apply my skills in a professional
              setting and contribute to cutting-edge projects that make a real impact.
            </p>
          </motion.div>
        </Section>

        {/* Education */}
        <Section id="education" title="Education">
          <div className="max-w-4xl mx-auto">
            <EducationCard
              degree="Bachelor of Technology in Computer Science"
              university="Vignan University, Guntur"
              period="2021 - 2025"
              details="Specialized in Machine Learning, Artificial Intelligence, and Software Development. Completed coursework in Data Structures, Algorithms, Machine Learning and Deep Learning."
              gpa="7.8"
            />
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills & Technologies">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <SkillCard
              icon={Brain}
              title="Machine Learning"
              skills={["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "NLP"]}
            />
            <SkillCard
              icon={Code}
              title="Development & Databases"
              skills={["FastAPI", "Flask", "Django", "REST APIs", "MySql"]}
            />
            <SkillCard
              icon={Cloud}
              title="DevOps & Cloud"
              skills={["AWS", "Docker", "CI/CD", "Git"]}
            />
            <SkillCard
              icon={Wrench}
              title="Tools & Frameworks"
              skills={["Pandas", "Numpy", "Matplotlib"]}
            />
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Featured Projects">
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* First Row */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      Predicting Writing Quality from Typing Behavior
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Developed an advanced NLP model integrating keystroke logging features with ensemble neural networks, achieving a Top-100 ranking in a Kaggle competition.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "TensorFlow", "NLP", "Ensemble Learning", "Flask"].map((tech, techIdx) => (
                      <span key={techIdx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://github.com/ravigithubshankar/Linking-Writing-Quality-Inverted-Ensembiling-Modailites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-indigo-400 font-medium hover:text-indigo-300 transition-colors text-sm inline-flex items-center"
                >
                  View Project <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      GraphNeurons: Predicting AI Model Execution Time
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Built a graph-based AI system to predict model runtimes, improving prediction accuracy by 15%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Flask", "Keras", "Tensorflow XLA", "Python", "Git", "PyTorch"].map((tech, techIdx) => (
                      <span key={techIdx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://github.com/ravigithubshankar/GraphNeurons-Predict-ai-Model-runtime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-indigo-400 font-medium hover:text-indigo-300 transition-colors text-sm inline-flex items-center"
                >
                  View Project <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Second Row */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      Automated Grammar Assessment from Speech Data
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Built an ASR (Wav2Vec2) + BERT-BiLSTM pipeline to predict spoken grammar scores (1–5) from audio, achieving ~0.60 Pearson correlation on validation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "PyTorch", "Wav2Vec2", "BERT", "ASR", "NLP", "Speech Processing", "Regression Modeling"].map((tech, techIdx) => (
                      <span key={techIdx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://github.com/ravigithubshankar/Grammar-Scoring-Engine-for-Spoken-Data-Samples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-indigo-400 font-medium hover:text-indigo-300 transition-colors text-sm inline-flex items-center"
                >
                  View Project <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </motion.div>

            {/* View All Projects Button in the empty grid cell */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="https://github.com/ravigithubshankar?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-gray-800/30 hover:bg-gray-700/30 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/30 h-full w-full justify-center min-h-[200px]"
              >
                <div className="text-center">
                  <Github className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
                  <div className="text-lg font-semibold">View All Projects</div>
                  <div className="text-sm text-gray-400 mt-1">Explore more on GitHub</div>
                </div>
              </a>
            </motion.div>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Experience">
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                title: "Machine Learning Engineer Intern",
                company: "Ignitus",
                period: "Jul 2023 – Oct 2023",
                points: [
                  "Developed a Q&A chatbot using the Rasa framework, enhancing LMS user satisfaction by 20%.",
                  "Optimized machine learning models in PyTorch and TensorFlow, reducing training time by 20%",
                  "Collaborated cross-functionally with teams to align AI solutions with business objectives."
                ],
                tech: ["Python", "NLP", "PyTorch", "TensorFlow"]
              },
              {
                title: "Software Engineer Intern",
                company: "Gagan Apps Pvt. Ltd",
                period: "Apr 2020 – Jun 2020",
                points: [
                  "Built and fine-tuned Custom CNN models, improving accuracy from 80% to 93%",
                  "Deployed models on AWS cloud infrastructure using Docker for scalable production.",
                  "Optimized algorithms to improve efficiency, significantly reducing training times."
                ],
                tech: ["Python", "Deep Learning", "Docker", "AWS"]
              }
            ].map((job, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-lg"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                    <p className="text-indigo-400 text-sm">{job.company}</p>
                  </div>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm mt-2 md:mt-0">
                    {job.period}
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 mb-4">
                  {job.points.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech, techIdx) => (
                    <span key={techIdx} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Open Source */}
        <Section id="opensource" title="Open Source & Contributions">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Github className="w-5 h-5 mr-2 text-indigo-400" />
                Open Source Contributions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "scikit-learn",
                    desc: "Contributed to machine learning library improvements and bug fixes",
                    link: "https://github.com/scikit-learn/scikit-learn"
                  }
                ].map((repo, idx) => (
                  <a key={idx} href={repo.link} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg hover:bg-gray-700/30 transition-colors">
                    <div className="font-medium text-white">{repo.name}</div>
                    <div className="text-sm text-gray-400">{repo.desc}</div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-indigo-400" />
                Oritm‑AI Developer
              </h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                <li>Designed and implemented evaluation pipelines for model scoring</li>
                <li>Integrated Docker containerization with CI/CD deployment systems</li>
                <li>Developed metrics dashboards collaborating with cross-functional teams</li>
                <li>Optimized model evaluation workflows for scalability</li>
              </ul>
            </motion.div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Get In Touch">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-300 mb-8">
              As a recent graduate, I'm excited to begin my professional journey and contribute to
              innovative projects. I'm open to entry-level positions and opportunities where I can
              apply my skills and continue learning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <a href="mailto:bedadhalaravi5@gmail.com" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors bg-gray-800/30 px-4 py-3 rounded-lg backdrop-blur-sm border border-gray-700/50">
                <Mail className="w-5 h-5 text-indigo-400" />
                <span>bedadhalaravi5@gmail.com</span>
              </a>
              <a href="tel:+919912914857" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors bg-gray-800/30 px-4 py-3 rounded-lg backdrop-blur-sm border border-gray-700/50">
                <Phone className="w-5 h-5 text-indigo-400" />
                <span>+91 9912914857</span>
              </a>
            </div>
            <div className="flex justify-center space-x-6">
              <a href="https://www.linkedin.com/in/ravi-shankar-bedadhala-581750217/" target="_blank" rel="noopener noreferrer" className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors backdrop-blur-sm">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/ravigithubshankar" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors backdrop-blur-sm border border-gray-700/50">
                <Github size={20} />
              </a>
            </div>
          </motion.div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700/30 py-8 px-6 text-center relative z-10">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Ravi Shankar Bedadhala. Made with ❤️ and lots of coffee☕.
        </p>
      </footer>
    </div>
  );
}