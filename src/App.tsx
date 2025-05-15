import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaWindows, FaTerminal, FaBitcoin } from 'react-icons/fa'
import { SiPython, SiLinux, SiDocker, SiAnsible } from 'react-icons/si'
import { GiNetworkBars, GiSwordman } from 'react-icons/gi'
import { BsShieldLock } from 'react-icons/bs'
import emailjs from '@emailjs/browser'

import './App.css'

function App() {
  const [isEnglish, setIsEnglish] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Matteo',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        message: ''
      })

      alert('Message envoyé avec succès !')
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-900 fixed inset-0">
      <main className="w-full min-h-screen text-white overflow-y-auto">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Matteo
              </div>
              <div className="flex items-center space-x-6">
                <a href="#about" className="hover:text-blue-400 transition-colors">{isEnglish ? 'About' : 'À propos'}</a>
                <a href="#experience" className="hover:text-blue-400 transition-colors">{isEnglish ? 'Experiences' : 'Expériences'}</a>
                <a href="#skills" className="hover:text-blue-400 transition-colors">{isEnglish ? 'Skills' : 'Compétences'}</a>
                <a href="#projects" className="hover:text-blue-400 transition-colors">{isEnglish ? 'Projects' : 'Projets'}</a>
                <a href="#contact" className="hover:text-blue-400 transition-colors">{isEnglish ? 'Contact' : 'Contact'}</a>
                <button
                  onClick={() => setIsEnglish(!isEnglish)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  {isEnglish ? '🇫🇷' : '🇬🇧'}
                </button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex items-center justify-center px-4 pt-20"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent glitch"
            >
              Matteo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-gray-300 mb-8"
            >
              {isEnglish ? 'Student @Oteria & @Murex' : 'Etudiant @Oteria & @Murex'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center space-x-4"
            >
              <button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 border-2 border-transparent bg-clip-padding p-[2px] bg-gradient-to-r from-purple-600 to-blue-600"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {isEnglish ? 'Contact Me' : 'Me Contacter'}
              </button>
              <a
                href="/CV_Matteo_Floirat.pdf"
                download
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <FaDownload className="mr-2" /> {isEnglish ? 'Download my CV' : 'Télécharger mon CV'}
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* À propos */}
        <motion.section
          id="about"
          style={{ opacity, scale }}
          className="py-20 bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {isEnglish ? 'About Me' : 'À propos de moi'}
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                {isEnglish
                  ? 'Cybersecurity apprentice at Murex, passionate about offensive and defensive cybersecurity. Experience in network architecture, security management, and automation.'
                  : 'Étudiant en 4ème année d\'un Master à Oteria et en alternance chez Murex, je dispose de compétences en cybersécurité offensive et défensive.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg flex items-center"
                >
                  <GiNetworkBars className="text-blue-400 mr-2 text-xl" /> Sécurité Réseau
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg flex items-center"
                >
                  <BsShieldLock className="text-blue-400 mr-2 text-xl" /> SIEM & Threat Intelligence
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg flex items-center"
                >
                  <SiPython className="text-blue-400 mr-2 text-xl" /> Automatisation & Scripting
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg flex items-center"
                >
                  <GiSwordman className="text-blue-400 mr-2 text-xl" /> Pentest & Cryptographie
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg flex items-center"
                >
                  <FaBitcoin className="text-blue-400 mr-2 text-xl" /> Web3 Security et Veille Technologique
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg flex items-center"
                >
                  <FaWindows className="text-blue-400 mr-2 text-xl" /> Sécurité Windows
                </motion.div>

              </div>
            </div>
          </div>
        </motion.section>

        {/* Expérience */}
        <motion.section
          id="experience"
          style={{ opacity, scale }}
          className="py-20 bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {isEnglish ? 'Professional Experience' : 'Expérience Professionnelle'}
            </h2>
            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mb-8"
                onClick={() => {
                  window.open('https://www.murex.com/', '_blank');
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{isEnglish ? 'Murex – Cybersecurity Apprentice' : 'Murex – Alternant en cybersécurité'}</h3>
                <p className="text-gray-400 mb-4">{isEnglish ? 'Since September 2024' : 'Depuis Septembre 2024'}</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>{isEnglish ? 'Network architecture and secure access management' : 'Gestion de l\'architecture réseau et des accès sécurisés'}</li>
                  <li>{isEnglish ? 'Security log monitoring and analysis (Sentinel, Umbrella)' : 'Surveillance et analyse des logs de sécurité (Sentinel, Umbrella)'}</li>
                  <li>{isEnglish ? 'Firewall management (Palo Alto, security policies)' : 'Gestion des pare-feu (Palo Alto, stratégies de sécurité)'}</li>
                  <li>{isEnglish ? 'Task automation with Python and PowerShell' : 'Automatisation de tâches avec Python et PowerShell'}</li>
                  <li>{isEnglish ? 'Network anomaly investigation and management' : 'Investigation et gestion des anomalies réseau'}</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mb-8"
                onClick={() => {
                  window.open('https://www.imerys.com/', '_blank');
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{isEnglish ? 'Imerys – Intership IT Support' : 'Imerys – Stage Support IT'}</h3>
                <p className="text-gray-400 mb-4">{isEnglish ? 'September 2023 - August 2024' : 'Septembre 2023 - Août 2024'}</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>{isEnglish ? 'IT support and troubleshooting' : 'Support et résolution des problèmes IT'}</li>
                  <li>{isEnglish ? 'Deployment and configuration of new machines and smartphones' : 'Déploiement et configuration des nouvelles machines et des téléphones portables'}</li>
                  <li>{isEnglish ? 'Management of the IT fleet' : 'Gestion du parc informatique'}</li>
                  <li>{isEnglish ? 'Application of security rules' : 'Application des règles de sécurité'}</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mb-8"
                onClick={() => {
                  window.open('https://www.madeformed.com/', '_blank');
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{isEnglish ? 'MadeForMed – Intership Solution Architect' : 'MadeForMed – Stage Architecte Solutions'}</h3>
                <p className="text-gray-400 mb-4">{isEnglish ? 'June 2023 - August 2023' : 'Juin 2023 - Août 2023'}</p>

                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>{isEnglish ? 'Implementation of a backup system and business continuity plan' : 'Mise en production d’un système de sauvegarde et plan de reprise d’activité'}</li>
                  <li>{isEnglish ? 'Responsible for the technical architecture' : 'Responsable de l\'architecture technique'}</li>
                  <li>{isEnglish ? 'Installation of applications in the cloud' : 'Installation d\'applications dans le cloud'}</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Technologies */}
        <motion.section
          id="skills"
          style={{ opacity, scale }}
          className="py-20 bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {isEnglish ? 'Technologies & Tools' : 'Technologies & Outils'}
            </h2>
            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <SiLinux className="text-blue-400 mr-2 text-xl" />
                    <FaWindows className="text-blue-400 mr-2 text-xl" />
                    <h3 className="font-bold">{isEnglish ? 'Operating Systems' : 'Systèmes d\'exploitation'}</h3>
                  </div>
                  <p className="text-gray-300">{isEnglish ? 'Linux (Kali, Debian), Windows Server' : 'Linux (Kali, Debian), Windows, Windows Server, MacOS'}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <GiNetworkBars className="text-blue-400 mr-2 text-xl" />
                    <h3 className="font-bold">{isEnglish ? 'Network Security' : 'Sécurité Réseau'}</h3>
                  </div>
                  <p className="text-gray-300">{isEnglish ? 'Firewalls (Palo Alto, Umbrella DNS), IDS/IPS' : 'Firewalls (Palo Alto, Umbrella), IDS/IPS'}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <GiSwordman className="text-blue-400 mr-2 text-xl" />
                    <h3 className="font-bold">{isEnglish ? 'Pentest & Forensic' : 'Pentest & Forensic'}</h3>
                  </div>
                  <p className="text-gray-300">{isEnglish ? 'Metasploit, Volatility, Wireshark' : 'Metasploit, Volatility, Wireshark, Burp Suite'}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <BsShieldLock className="text-blue-400 mr-2 text-xl" />
                    <h3 className="font-bold">{isEnglish ? 'SIEM & Logs' : 'SIEM & Logs'}</h3>
                  </div>
                  <p className="text-gray-300">{isEnglish ? 'Azure Sentinel, Splunk, Sysmon' : 'Azure Sentinel, Splunk, Sysmon'}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <SiPython className="text-blue-400 mr-2 text-xl" />
                    <FaTerminal className="text-blue-400 mr-2 text-xl" />
                    <h3 className="font-bold">{isEnglish ? 'Development' : 'Développement'}</h3>
                  </div>
                  <p className="text-gray-300">{isEnglish ? 'Python, Bash, PowerShell, C, JavaScript, TypeScript' : 'Python, Bash, PowerShell, C, JavaScript, TypeScript'}</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-4 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <SiDocker className="text-blue-400 mr-2 text-xl" />
                    <SiAnsible className="text-blue-400 mr-2 text-xl" />
                    <h3 className="font-bold">{isEnglish ? 'Automation' : 'Automatisation'}</h3>
                  </div>
                  <p className="text-gray-300">{isEnglish ? 'Ansible, Docker, Terraform' : 'Ansible, Docker, Terraform'}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projets */}
        <motion.section
          id="projects"
          style={{ opacity, scale }}
          className="py-20 bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {isEnglish ? 'My Projects' : 'Mes Projets'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/20 border border-gray-700"
                onClick={() => {
                  window.open('https://github.com/mattft0/embassy-map', '_blank');
                }}
              >
                <h3 className="text-xl font-bold mb-4">{isEnglish ? 'Cybersecurity Technology Watch' : 'Veille Technologique en Cybersécurité'}</h3>
                <p className="text-gray-300">{isEnglish ? 'Development of an RSS feed aggregator to follow cybersecurity news' : 'Développement d\'un agrégateur de flux RSS pour suivre l\'actualité cyber'}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/20 border border-gray-700"
                onClick={() => {
                  window.open('https://github.com/mattft0/volinux', '_blank');
                }}
              >
                <h3 className="text-xl font-bold mb-4">{isEnglish ? 'Volinux' : 'Volinux'}</h3>
                <p className="text-gray-300">{isEnglish ? 'Python script to detect Linux kernel version and generate a Volatility profile' : 'Script Python pour détecter la version du noyau Linux et générer un profil Volatility'}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/20 border border-gray-700"
              >
                <h3 className="text-xl font-bold mb-4">{isEnglish ? 'HomeLab' : 'HomeLab'}</h3>
                <p className="text-gray-300">{isEnglish ? 'HomeLab with Proxmox, pfSense, and a Windows Server' : 'HomeLab avec Proxmox, pfSense et un Windows Server, monitoring avec Wazuh'}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/20 border border-gray-700"
                onClick={() => {
                  window.open('https://github.com/mattft0/webshield', '_blank');
                }}
              >
                <h3 className="text-xl font-bold mb-4">{isEnglish ? 'WebShield' : 'WebShield'}</h3>
                <p className="text-gray-300">{isEnglish ? 'Development of a browser extension to protect users from malicious websites' : 'Développement d\'une extension de navigateur pour protéger les utilisateurs des sites web malveillants'}</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          id="contact"
          style={{ opacity, scale }}
          className="py-20 bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {isEnglish ? 'Contact Me' : 'Contactez-moi'}
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-300 mb-2">{isEnglish ? 'Name' : 'Nom'}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 h-32"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 border-2 border-transparent bg-clip-padding p-[2px] bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {isEnglish ? 'Send' : 'Envoyer'}
                </button>
              </form>
              <div className="mt-8 flex justify-center space-x-6">
                <a href="https://www.linkedin.com/in/floiratmatteo/" className="text-gray-300 hover:text-blue-400 transition-colors text-2xl">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/mattft0" className="text-gray-300 hover:text-blue-400 transition-colors text-2xl">
                  <FaGithub />
                </a>
                <a href="mailto:matteofloirat112440@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors text-2xl">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-400">
          <p>© 2025 Matteo. Tous droits réservés.</p>
        </footer>
      </main>
    </div>
  )
}

export default App
