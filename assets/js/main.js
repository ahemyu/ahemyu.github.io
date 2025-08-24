    const chat = document.getElementById("chat");

    // Predefined conversation
    const conversation = [
      { sender: "user", text: "Tell me about yourself." },
      { sender: "bot", text: "I am Emre Gökcek, a masters CS student at the FAU Erlangen. I got my bachelors in CS at the Heinrich-Heine university Düsseldorf, during which my interest in Machine Learning arose. I am extremely interested in the intersecion of AI and Robotics, mainly autonomous driving as I think that is one of the most high impact areas to work on in the coming years (until AGI frees us from the burden of occupation). That is why I chose to do a masters during which I hope to learn much more about Deep Reinforcement Learning and Robotics and hopefully participate in research, continuing what I already started during my bachelor thesis (Deep RL to train quadruped locomotion policies)"},
      { sender: "user", text: "What are your main technologies and skills?" },
      { sender: "bot", text: "I am most comfortable with Python but I also heavily used Java, Javascript, Typescript and C++ as well. I worked in areas such as Data Science (PyTorch, pandas, numpy, notebooks), Backend/AI-Engineer(FastAPI, AWS, pydantic, pydantic-ai, haystack, langchain) and Frontend (React, Next.js, Vue, Dash)." },
      { sender: "user", text: "What experience do you have?" },
      { sender: "bot", text: "During my bachelors I worked at Mitsubishi Electric, where I mainly did work on maintenance of the products database (MariaDB), as well as updates to the website of their webshop. Then I switched to CQSE, who develop and maintain a software quality analysis tool called Teamscale. There I mainly did frontend work in Typescript and React to improve accesibilty and design of the Test Coverage View of the tool as well as extensive testing with JUnit and Playwright. I started working at Foxbase in octobre 2024 as a full time intern for 3 months, and am working as a working student since january.  There my work included: Extending/maintaning the AI/Data side of the Product such as the RAG System, various data pipelines for proecessing/transforming data to and from our system for our clients, extending and improving the data analytics side of the product such as creating more efficient database tables to fetch aggregated data (e.g. daily user statistics) and polishimg the Dash dashboard used to present the data to our clients with nice graphs." },
      { sender: "user", text:"What do you like to do in your free time?"},
      { sender: "bot", text: "I actively train BJJ multiple times a week and also compete in tournaments a couple of times a year. I also like to code projects that don’t exist yet but I want to use myself. I love Japanese culture, so I’ve been learning the language for 2 years (currently A2). In the evenings, I mostly read Russian, German, or French novels from before 1950 or watch some anime." },
      { sender: "user", text: "Where can I contact you?" },
      { sender: "bot", text: "You can reach me here:" }
    ];

    // Typing speeds
    const botSpeed = 10;   // ms per character
    const userSpeed = 50;  // slower to mimic real typing

    async function playConversation() {
      for (let i = 0; i < conversation.length; i++) {
        const { sender, text } = conversation[i];

        if (sender === "bot") {
          // Show typing indicator
          const indicator = document.createElement("div");
          indicator.className = "typing-indicator";
          indicator.innerHTML = "<span></span><span></span><span></span>";
          chat.appendChild(indicator);
          chat.scrollTop = chat.scrollHeight;

          await new Promise(r => setTimeout(r, 800));
          chat.removeChild(indicator);
        }

        await typeMessage(sender, text, sender === "bot" ? botSpeed : userSpeed);

        // Add social icons after last bot message
        if (i === conversation.length - 1) {
          const links = document.createElement("div");
          links.className = "social-links";
          links.innerHTML = `
            <a href="https://www.linkedin.com/in/emre-g%C3%B6kcek-0928a625b/" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com/ahemyu" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
            <a href="https://twitter.com/ahemyu1" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          `;
          chat.lastChild.appendChild(links);
        }
      }
    }

    function typeMessage(sender, text, speed) {
      return new Promise(resolve => {
        const msg = document.createElement("div");
        msg.className = `message ${sender}`;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;

        let i = 0;
        const interval = setInterval(() => {
          msg.textContent += text[i];
          i++;
          chat.scrollTop = chat.scrollHeight;
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      });
    }

    // Start conversation on load
    playConversation();