"use client";

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

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 3000; // 3 seconds

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
  //       <div className="w-32 h-32 bg-[#FF6B6B] rounded-full flex items-center justify-center mb-8 animate-[spin_1.5s_linear_infinite]">
  //         <span className="text-white font-bold text-4xl">G1</span>
  //       </div>
  //       <div className="w-64 h-4 bg-white rounded-full overflow-hidden">
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
        .logo-circle {
          animation: rotate 10s linear infinite;
        }
      `}</style>
      <div className="background-animation"></div>
      <header className="fixed top-0 left-0 right-0 bg-[#FAE9DA] bg-opacity-90 z-50 p-4 flex justify-between items-center">
        <div className="logo flex items-center">
          <div className="logo-circle w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center mr-2">
            <span className="text-white font-bold text-xl">G1</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">
            Group 1
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => scrollToSection("project-management")}
                className="hover:text-[#FF6B6B]"
              >
                Project Management
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("ideation")}
                className="hover:text-[#FF6B6B]"
              >
                Ideation
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("research")}
                className="hover:text-[#FF6B6B]"
              >
                Research
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("design")}
                className="hover:text-[#FF6B6B]"
              >
                Design
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="">
        <section className="min-h-screen  flex flex-col justify-center items-center p-8 animate-fadeInUp">
          <h1 className="text-7xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">
            Welcome!
          </h1>
          <div className="flex justify-center items-end space-x-8 mb-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="text-center"
                style={{ "--index": index }}
              >
                <div className="w-20 h-20 bg-[#FF6B6B] rounded-full flex items-center justify-center mb-2 team-member overflow-hidden">
                  <Image
                    src={member.photoSrc}
                    alt={`${member.photoSrc}'s profile picture`}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <p className="font-semibold">{member.name}</p>
              </div>
            ))}
          </div>
          <p>
            Innovating together to create impactful solutions and drive success.
          </p>
        </section>
        <section
          id="project-management"
          className="section min-h-screen flex flex-col justify-center items-center p-8"
        >
          <h2 className="text-5xl font-bold mb-4 text-center prose">
            Project Management
          </h2>
          <p className="text-xl max-w-2xl text-center italic">
            Efficiently coordinating tasks and timelines to ensure smooth
            project execution.
          </p>
          <p className="text-xl max-w-2xl text-center mt-4">
            As a team, we have chosen to streamline our Product Management
            process with Jira. This tool will enable us to implement the SCRUM
            agile methodology, allowing us to create tickets and issues, set
            deadlines, maintain Confluence documentation, and centralize all our
            resources. By focusing on sprints, we aim to keep deadlines on track
            and work towards our unified goals.
          </p>
        </section>

        <section
          id="ideation"
          className="section min-h-screen flex flex-col justify-center items-center p-8"
        >
          <h2 className="text-5xl font-bold mb-4 text-center prose">
            Ideation
          </h2>
          <p className="text-xl max-w-2xl text-center">
            Brainstorming innovative solutions and creative approaches to
            problem-solving.
          </p>
        </section>

        <section
          id="research"
          className="section min-h-screen flex flex-col justify-center items-center p-8"
        >
          <h2 className="text-5xl font-bold mb-4 text-center prose">
            Market Research & Analysis
          </h2>
          <p className="text-xl max-w-2xl text-center">
            Gathering and interpreting data to inform strategic decisions and
            identify opportunities.
          </p>
        </section>

        <section
          id="design"
          className="section min-h-screen flex flex-col justify-center items-center p-8"
        >
          <h2 className="text-5xl font-bold mb-4 text-center prose">Design</h2>
          <p className="text-xl max-w-2xl text-center">
            Crafting compelling narratives and visuals to showcase our ideas and
            value proposition.
          </p>
        </section>
      </main>
    </div>
  );
}
