    const chat = document.getElementById("chat");

    // Predefined conversation
    const conversation = [
      { sender: "user", text: "Tell me about yourself." },
      { sender: "bot", text: "I’m Emre Gökcek, a CS student at Heinrich-Heine University Düsseldorf. I’m passionate about AI and currently work in Data Science, focusing on semantic search and retrieval-augmented generation." },
      { sender: "user", text: "What are your main technologies and skills?" },
      { sender: "bot", text: "I mainly work with Python, Data Science, Deep Learning, and Reinforcement Learning. I also have experience with JavaScript and modern web technologies." },
      { sender: "user", text: "What experience do you have?" },
      { sender: "bot", text: "I’ve worked as a Data Science Working Student at FoxBase, focusing on AI-driven solutions. I’ve also freelanced for Outlier, where I worked on LLM evaluation and prompt engineering. On top of that, I’m writing my thesis on deep reinforcement learning for quadruped locomotion." },
      { sender: "user", text:"What do you like to do in your free time?"},
      { sender: "bot", text: "I actively train BJJ multiple times a week and also compete in tournaments a couple of times a year. I also like to code projects that don’t exist yet but I want to use. I love Japanese culture, so I’ve been learning the language for 2 years (currently A2). In the evenings, I mostly read Russian, German, and French novels from before 1950." },
      { sender: "user", text: "Where can I contact you?" },
      { sender: "bot", text: "You can reach me here:" }
    ];

    // Typing speeds
    const botSpeed = 20;   // ms per character
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