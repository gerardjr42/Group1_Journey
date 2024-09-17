"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  {
    name: "Alex",
    photoSrc:
      "https://ca.slack-edge.com/TCVA3PF24-U0646TW264B-dde2addf28b2-512",
  },
  {
    name: "Eric",
    photoSrc:
      "https://ca.slack-edge.com/TCVA3PF24-U06471DTBDY-08b366aced14-512",
  },
  {
    name: "Lynnette",
    photoSrc:
      "https://ca.slack-edge.com/TCVA3PF24-U063SF3T8QP-18065f45177e-512",
  },
  {
    name: "Mike",
    photoSrc:
      "https://ca.slack-edge.com/TCVA3PF24-U0649EJ0UDS-a1b8cec07d0e-512",
  },
  {
    name: "Gerardo",
    photoSrc:
      "https://ca.slack-edge.com/TCVA3PF24-U064W1APKS4-be83538ebf43-512",
  },
];

export function PageJs() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const observerRef = useRef(null);
  const teamScrollRef = useRef(null);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 1500; // 1.5 seconds

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setLoadingProgress(Math.round(progress));

      if (progress === 100) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 200); // Short delay to show 100%
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".section").forEach((section) => {
        observerRef.current.observe(section);
      });

      return () => observerRef.current.disconnect();
    }
  }, [loading]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (teamScrollRef.current) {
        e.preventDefault();
        teamScrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const teamSection = document.getElementById("team");
    if (teamSection) {
      teamSection.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (teamSection) {
        teamSection.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-[#FAE9DA] flex flex-col items-center justify-center">
  //       <style jsx global>{`
  //         @keyframes spin {
  //           0% {
  //             transform: rotate(0deg);
  //           }
  //           100% {
  //             transform: rotate(360deg);
  //           }
  //         }
  //       `}</style>
  //       <div className="w-32 h-32 animate-[spin_1.5s_linear_infinite]">
  //         <svg
  //           width="128"
  //           height="128"
  //           viewBox="0 0 40 40"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <circle cx="20" cy="20" r="20" fill="#FF6B6B" />
  //           <path
  //             d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28"
  //             stroke="white"
  //             strokeWidth="3"
  //             strokeLinecap="round"
  //           />
  //           <circle cx="20" cy="20" r="4" fill="white" />
  //         </svg>
  //       </div>
  //       <div className="w-64 h-4 bg-white rounded-full overflow-hidden mt-8">
  //         <div
  //           className="h-full bg-[#FF6B6B] transition-all duration-100 ease-out"
  //           style={{ width: `${loadingProgress}%` }}
  //         ></div>
  //       </div>
  //       <p className="mt-4 text-xl font-semibold">
  //         Loading... {loadingProgress}%
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-[#FAE9DA] text-[#333] font-sans overflow-hidden">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        html {
          scroll-behavior: smooth;
        }
        .section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .background-animation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          background: linear-gradient(45deg, #fae9da, #f8d5b5);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .logo {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      <div className="background-animation"></div>
      <header className="fixed top-0 left-0 right-0 bg-[#FAE9DA] bg-opacity-90 z-50 p-4 flex justify-between items-center">
        <div className="logo flex items-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="20" fill="#FF6B6B" />
            <path
              d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="4" fill="white" />
          </svg>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => scrollToSection("project-management")}
                className="hover:text-[#FF6B6B] transition-colors duration-300"
              >
                Project Management
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("ideation")}
                className="hover:text-[#FF6B6B] transition-colors duration-300"
              >
                Ideation
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("research")}
                className="hover:text-[#FF6B6B] transition-colors duration-300"
              >
                Research
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("design")}
                className="hover:text-[#FF6B6B] transition-colors duration-300"
              >
                Design
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("team")}
                className="hover:text-[#FF6B6B] transition-colors duration-300"
              >
                Team
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="">
        <section className="min-h-screen flex flex-col justify-center items-center p-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]"
          >
            Welcome!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mb-12 italic text-2xl"
          >
            Innovating together to create impactful solutions and drive success.
          </motion.p>
        </section>

        <section
          id="project-management"
          className="section min-h-screen flex flex-col justify-start items-center p-8 pt-24"
        >
          <div className="w-full max-w-6xl">
            <h2 className="text-5xl font-bold mb-4 text-center sticky top-24">
              Project Management
            </h2>
            <p className="text-xl max-w-2xl mx-auto italic mb-12 text-center">
              Efficiently coordinating tasks and timelines to ensure smooth
              project execution.
            </p>
            {/* Jira */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-24">
              <div className="md:w-1/2 prose">
                <p className="text-3xl font-bold text-center prose mb-0">
                  Jira
                </p>
                <p className="text-xl mb-4 prose mt-4">
                  As a team, we have chosen to streamline our Product Management
                  process with Jira. This tool will enable us to implement the
                  SCRUM agile methodology, allowing us to create tickets and
                  issues, set deadlines, maintain Confluence documentation, and
                  centralize all our resources.
                </p>
                <p className="text-xl prose">
                  By focusing on sprints, we aim to keep deadlines on track and
                  work towards our unified goals.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/images/jira_board.png"
                  alt="Jira Board"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            {/* Group Norms */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="md:w-1/2 prose">
                <p className="text-3xl font-bold text-center prose mb-0">
                  Group Norms
                </p>
                <p className="text-xl mb-4 prose mt-4">
                  Group norms are essential for fostering a productive and
                  harmonious team environment. They help set clear expectations,
                  promote effective communication, and ensure that everyone is
                  aligned towards common goals.
                </p>
                <p className="text-xl prose">
                  Adhering to these norms will enable us to work efficiently,
                  support each other, and achieve our objectives successfully.
                </p>
              </div>
              <div className="md:w-1/2 mt-[50px]">
                <div className="grid grid-cols-2 gap-8">
                  <ul className="list-none pl-5 text-xl space-y-4">
                    {[
                      "Act Professionally",
                      "Stay Organized",
                      "Open Communication",
                      "Seek Support",
                      "Embrace Feedback",
                    ].map((norm, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2 text-[#FF6B6B]">•</span>
                        {norm}
                      </li>
                    ))}
                  </ul>
                  <ul className="list-none pl-5 text-xl space-y-4">
                    {[
                      "Group Decision Making",
                      "Constructive Feedback",
                      "Continuous Learning",
                      "Respect Deadlines",
                      "Prioritize Quality",
                    ].map((norm, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2 text-[#FF6B6B]">•</span>
                        {norm}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="ideation"
          className="section min-h-screen flex flex-col justify-start items-center p-8 pt-24"
        >
          <div className="w-full max-w-6xl">
            <h2 className="text-5xl font-bold mb-4 text-center sticky top-24">
              Ideation
            </h2>
            <p className="text-xl max-w-2xl mx-auto italic mb-12 text-center">
              Brainstorming innovative solutions and creative approaches to
              problem-solving.
            </p>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/2 prose">
                <p className="text-3xl font-bold text-center prose mb-6">
                  Brainstorming
                </p>
                <p className="text-xl mb-6">
                  Initially, we needed to generate three ideas. During the
                  ideation phase, we ensured our problem and hypothesis were
                  robust, and chose the best idea by following various product
                  management methodologies, such as:
                </p>
              </div>
              <div className="md:w-1/2 mt-[4rem]">
                <ul className="list-none text-xl space-y-4 mb-6">
                  {[
                    {
                      name: "Proof of Concept (PoC) Method",
                      description: (
                        <>
                          <p>
                            A Proof of Concept (PoC) is a small-scale experiment
                            or prototype designed to test whether a certain
                            concept or idea is feasible. It helps you determine
                            if your project idea can be turned into a reality
                            and if it will work as intended. Key steps include:
                          </p>
                          <ol className="list-decimal pl-6 mt-2 prose">
                            <li>
                              <span className="text-[#FF6B6B]">
                                Feasibility Testing:
                              </span>{" "}
                              User Research & Interviews
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">
                                Validation:
                              </span>{" "}
                              RICE & PURSUIT Method
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">
                                Risk Reduction:
                              </span>{" "}
                              Identify Risks and Uncertainties
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">
                                StakeHolder Buy-In:
                              </span>{" "}
                              Monetization & Communication
                            </li>
                          </ol>
                        </>
                      ),
                    },
                    {
                      name: "P.U.R.S.U.I.T Method",
                      description: (
                        <>
                          <p>
                            The P.U.R.S.U.I.T Method is a structured approach in
                            product management and project development, ensuring
                            comprehensive planning and execution. Each letter in
                            the acronym represents a specific step or principle.
                            Here's a breakdown for a beginner software engineer:
                          </p>
                          <ol className="list-decimal pl-6 mt-2 prose">
                            <li>
                              <span className="text-[#FF6B6B]">P</span>
                              roblem Definition: Identify the problem
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">U</span>
                              ser: Conduct surveys and interviews to understand
                              how users currently manage tasks.
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">R</span>
                              ationale: Be able to clearly answer: Why does
                              solving this problem matter?
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">S</span>
                              olution: Form a hypothesis, test it, embrace
                              mistakes, and prioritize the MVP test and iterate
                              cycle.
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">U</span>
                              ncertanties: Identify failure modes and weak
                              assumptions to guide your test plan, focusing on
                              key risks.
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">I</span>
                              nsight: Analyze your research, data, and marketing
                              teams to validate your solution idea.
                            </li>
                            <li>
                              <span className="text-[#FF6B6B]">T</span>
                              est-Metrics: Evaluate your solution's
                              effectiveness, aligning with company mission,
                              feature adoption, or quality tracking.
                            </li>
                          </ol>
                        </>
                      ),
                    },
                    {
                      name: "R.I.C.E Method",
                      description:
                        "A prioritization framework that considers Reach, Impact, Confidence, and Effort.",
                    },
                  ].map((method, index) => (
                    <li key={index} className="flex flex-col items-start">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="flex items-center cursor-pointer focus:outline-none"
                      >
                        <span className="mr-2 text-[#FF6B6B]">•</span>
                        {method.name}
                        <svg
                          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                            openDropdown === index ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {openDropdown === index && (
                        <div className="mt-2 ml-6 text-base text-gray-600">
                          {method.description}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="research"
          className="section min-h-screen flex flex-col justify-start items-center p-8 pt-24"
        >
          <div className="w-full max-w-6xl">
            <h2 className="text-5xl font-bold mb-4 text-center sticky top-24">
              User & Market Research
            </h2>
            <p className="text-xl max-w-2xl mx-auto italic mb-12 text-center">
              Gathering and interpreting data to inform strategic decisions and
              identify opportunities.
            </p>
          </div>
        </section>

        <section
          id="design"
          className="section min-h-screen flex flex-col justify-start items-center p-8 pt-24"
        >
          <div className="w-full max-w-6xl">
            <h2 className="text-5xl font-bold mb-4 text-center sticky top-24">
              Design
            </h2>
            <p className="text-xl max-w-2xl mx-auto italic mb-12 text-center">
              Crafting compelling narratives and visuals to showcase our ideas
              and value proposition.
            </p>
          </div>
        </section>
        <section
          id="team"
          className="section min-h-screen flex flex-col justify-start items-center p-8 pt-24"
        >
          <div className="w-full max-w-6xl">
            <h2 className="text-5xl font-bold mb-4 text-center sticky top-24">
              Meet the Team
            </h2>
            <p className="text-xl max-w-2xl mx-auto italic mb-12 text-center">
              Our diverse and talented team is the driving force behind our
              success.
            </p>
            <div
              ref={teamScrollRef}
              className="flex overflow-x-auto space-x-8 pb-8 w-full"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="flex-none w-80 h-96 rounded-lg overflow-hidden shadow-lg"
                  style={{ scrollSnapAlign: "center" }}
                >
                  <Image
                    src={member.photoSrc}
                    alt={`${member.name}'s profile picture`}
                    width={320}
                    height={320}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4 bg-gray-600">
                    <h3 className="text-2xl font-bold text-center text-white">
                      {member.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
