(function () {
  "use strict";

  /* ------------------------------------------------------------------------ */
  /* CONFIG                                                                    */
  /* ------------------------------------------------------------------------ */

  var API_BASE_URL = "https://fazarai.onrender.com";
  // var API_BASE_URL = "http://localhost:8000"; // local


  var CSS_URL = "https://fazarai.shivamkasaudhan.dev/assistant.css";
  // var CSS_URL = "http://localhost:5173/assistant.css"; // local

  var script = document.currentScript;

  if (!script) {
    var scripts = document.getElementsByTagName("script");
    script = scripts[scripts.length - 1];
  }

  var assistantId = script
    ? script.getAttribute("data-assistant-id")
    : null;

  var apiOverride = script
    ? script.getAttribute("data-api-url")
    : null;

  var cssOverride = script
    ? script.getAttribute("data-css-url")
    : null;

  if (apiOverride) {
    API_BASE_URL = apiOverride.replace(/\/$/, "");
  }


  /* ------------------------------------------------------------------------ */
  /* CSS                                                                       */
  /* ------------------------------------------------------------------------ */

  function ensureCss() {
    var href = cssOverride || CSS_URL;

    if (
      document.querySelector(
        'link[data-fazar-ai-css="true"]'
      )
    ) {
      return;
    }

    var link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = href;

    link.setAttribute(
      "data-fazar-ai-css",
      "true"
    );

    document.head.appendChild(link);
  }


  if (!assistantId) {
    console.error(
      "Fazar AI: data-assistant-id is missing from the script tag."
    );

    return;
  }

  ensureCss();


  /* ------------------------------------------------------------------------ */
  /* HELPERS                                                                   */
  /* ------------------------------------------------------------------------ */

  function createSvg(markup) {
    var wrapper =
      document.createElement("span");

    wrapper.innerHTML = markup;

    return wrapper.firstElementChild;
  }


  function getTheme(theme) {
    var allowedThemes = {
      dark: true,
      light: true,
      glass: true,
      midnight: true,
      ocean: true,
      aurora: true,
      sunset: true,
      cyber: true,
      emerald: true,
      rose: true,
      royal: true,
      ice: true,
      monochrome: true,
      cherry: true,
      lavender: true,
      neon: true
    };

    return allowedThemes[theme]
      ? theme
      : "dark";
  }


  function getMicIcon() {
    return createSvg(
      '<svg class="fazar-mic-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
        '<rect x="9" y="3" width="6" height="11" rx="3"></rect>' +
        '<path d="M5 11a7 7 0 0 0 14 0"></path>' +
        '<path d="M12 18v3"></path>' +
        '<path d="M9 21h6"></path>' +
      "</svg>"
    );
  }


  function getChatIcon() {
    return createSvg(
      '<svg class="fazar-launcher-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
        '<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 2 1.6-4A7.5 7.5 0 1 1 20 11.5Z"></path>' +
      "</svg>"
    );
  }


  function getCloseIcon() {
    return createSvg(
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
        '<path d="M6 6l12 12"></path>' +
        '<path d="M18 6L6 18"></path>' +
      "</svg>"
    );
  }


  /* ------------------------------------------------------------------------ */
  /* STATE                                                                     */
  /* ------------------------------------------------------------------------ */

  var state = {
    config: null,

    isOpen: false,

    isListening: false,

    isProcessing: false,

    isSpeaking: false,

    recognition: null
  };


  /* ------------------------------------------------------------------------ */
  /* LOAD ASSISTANT CONFIG                                                     */
  /* ------------------------------------------------------------------------ */

  async function fetchAssistant() {

    var url =
      API_BASE_URL +
      "/api/assistant/config/" +
      encodeURIComponent(
        assistantId
      );


    console.log(
      "Fazar AI: loading config:",
      url
    );


    var response =
      await fetch(
        url,
        {
          method: "GET",

          headers: {
            Accept:
              "application/json"
          }
        }
      );


    var data =
      await response
        .json()
        .catch(
          function () {
            return {};
          }
        );


    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to load assistant configuration (" +
          response.status +
          ")."
      );
    }


    var config =
      data.user ||
      data.assistant ||
      data;


    if (
      !config ||
      typeof config !==
        "object"
    ) {
      throw new Error(
        "Assistant configuration was not returned."
      );
    }


    state.config = {

      id:
        config._id ||
        assistantId,

      assistantName:
        config.assistantName ||
        "Fazar AI",

      bussinessName:
        config.bussinessName ||
        "",

      bussinessType:
        config.bussinessType ||
        "",

      bussinessDescription:
        config.bussinessDescription ||
        "",

      tone:
        config.tone ||
        "friendly",

      theme:
        getTheme(
          config.theme
        ),

      pages:
        Array.isArray(
          config.pages
        )
          ? config.pages
          : []
    };


    console.log(
      "Fazar AI: configuration loaded",
      state.config
    );


    return state.config;
  }


  /* ------------------------------------------------------------------------ */
  /* ASK ASSISTANT                                                             */
  /* ------------------------------------------------------------------------ */

  async function askAssistant(
    message
  ) {

    var response =
      await fetch(
        API_BASE_URL +
          "/api/assistant/ask",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json"
          },

          body:
            JSON.stringify(
              {
                message:
                  message,

                userId:
                  state.config.id,

                currentPath:
                  window.location.pathname
              }
            )
        }
      );


    var data =
      await response
        .json()
        .catch(
          function () {
            return {};
          }
        );


    if (!response.ok) {
      throw new Error(
        data.message ||
          "Assistant request failed."
      );
    }


    return data;
  }


  /* ------------------------------------------------------------------------ */
  /* TEXT TO SPEECH                                                            */
  /* ------------------------------------------------------------------------ */

  function speak(
    text,
    callback
  ) {

    if (
      !(
        "speechSynthesis"
        in window
      )
    ) {

      console.warn(
        "Fazar AI: speech synthesis unavailable."
      );

      state.isSpeaking =
        false;

      if (callback) {
        callback();
      }

      return;
    }


    window.speechSynthesis.cancel();


    var utterance =
      new SpeechSynthesisUtterance(
        text
      );


    utterance.rate =
      1;

    utterance.pitch =
      1;

    utterance.volume =
      1;


    utterance.onstart =
      function () {

        state.isSpeaking =
          true;
      };


    utterance.onend =
      function () {

        state.isSpeaking =
          false;

        if (callback) {
          callback();
        }
      };


    utterance.onerror =
      function (event) {

        console.error(
          "Fazar AI speech synthesis error:",
          event
        );

        state.isSpeaking =
          false;

        if (callback) {
          callback();
        }
      };


    window.speechSynthesis.speak(
      utterance
    );
  }


  /* ------------------------------------------------------------------------ */
  /* BUILD WIDGET                                                              */
  /* ------------------------------------------------------------------------ */

  function buildWidget(
    config
  ) {

    if (
      document.getElementById(
        "fazar-ai-root"
      )
    ) {
      return;
    }


    /* ---------------------------------------------------------------------- */
    /* ROOT                                                                    */
    /* ---------------------------------------------------------------------- */

    var root =
      document.createElement(
        "div"
      );

    root.id =
      "fazar-ai-root";

    root.setAttribute(
      "data-theme",
      config.theme
    );


    /* ---------------------------------------------------------------------- */
    /* LAUNCHER                                                                 */
    /* ---------------------------------------------------------------------- */

    var launcher =
      document.createElement(
        "button"
      );

    launcher.type =
      "button";

    launcher.className =
      "fazar-widget-launcher";

    launcher.setAttribute(
      "aria-label",
      "Open " +
        config.assistantName
    );

    launcher.setAttribute(
      "aria-expanded",
      "false"
    );

    launcher.appendChild(
      getChatIcon()
    );


    /* ---------------------------------------------------------------------- */
    /* PANEL                                                                    */
    /* ---------------------------------------------------------------------- */

    var panel =
      document.createElement(
        "section"
      );

    panel.className =
      "fazar-widget-panel";

    panel.setAttribute(
      "aria-label",
      config.assistantName +
        " assistant"
    );


    /* ---------------------------------------------------------------------- */
    /* OVERLAY                                                                  */
    /* ---------------------------------------------------------------------- */

    var overlay =
      document.createElement(
        "div"
      );

    overlay.className =
      "fazar-widget-overlay";


    /* ---------------------------------------------------------------------- */
    /* CONTENT                                                                  */
    /* ---------------------------------------------------------------------- */

    var content =
      document.createElement(
        "div"
      );

    content.className =
      "fazar-widget-content";


    /* ---------------------------------------------------------------------- */
    /* TOPBAR                                                                   */
    /* ---------------------------------------------------------------------- */

    var topbar =
      document.createElement(
        "div"
      );

    topbar.className =
      "fazar-widget-topbar";


    var closeButton =
      document.createElement(
        "button"
      );

    closeButton.type =
      "button";

    closeButton.className =
      "fazar-close-button";

    closeButton.setAttribute(
      "aria-label",
      "Close assistant"
    );

    closeButton.appendChild(
      getCloseIcon()
    );


    topbar.appendChild(
      closeButton
    );


    /* ---------------------------------------------------------------------- */
    /* ORB                                                                      */
    /* ---------------------------------------------------------------------- */

    var orb =
      document.createElement(
        "div"
      );

    orb.className =
      "fazar-orb";

    orb.setAttribute(
      "aria-hidden",
      "true"
    );


    /* ---------------------------------------------------------------------- */
    /* TITLE                                                                    */
    /* ---------------------------------------------------------------------- */

    var title =
      document.createElement(
        "h2"
      );

    title.className =
      "fazar-title";

    title.textContent =
      "Hello! I'm " +
      config.assistantName;


    /* ---------------------------------------------------------------------- */
    /* DESCRIPTION                                                              */
    /* ---------------------------------------------------------------------- */

    var description =
      document.createElement(
        "p"
      );

    description.className =
      "fazar-description";


    if (
      config.bussinessName
    ) {

      description.innerHTML =
        "Your smart voice assistant." +
        "<br>" +
        "Ask anything about " +
        config.bussinessName +
        ".";

    } else {

      description.innerHTML =
        "Your smart voice assistant." +
        "<br>" +
        "Ask anything about your website.";
    }


    /* ---------------------------------------------------------------------- */
    /* LISTENING                                                                */
    /* ---------------------------------------------------------------------- */

    var listening =
      document.createElement(
        "p"
      );

    listening.className =
      "fazar-listening";

    listening.textContent =
      "Listening...";


    /* ---------------------------------------------------------------------- */
    /* WAVEFORM                                                                 */
    /* ---------------------------------------------------------------------- */

    var waveform =
      document.createElement(
        "div"
      );

    waveform.className =
      "fazar-waveform";


    var heights = [
      8,
      17,
      27,
      16,
      23,
      12,
      7
    ];


    heights.forEach(
      function (
        height,
        index
      ) {

        var wave =
          document.createElement(
            "span"
          );

        wave.className =
          "fazar-wave";

        wave.style.height =
          height +
          "px";

        wave.style.animationDelay =
          (
            index *
            0.08
          ) +
          "s";


        waveform.appendChild(
          wave
        );
      }
    );


    /* ---------------------------------------------------------------------- */
    /* CONVERSATION                                                             */
    /* ---------------------------------------------------------------------- */

    var conversation =
      document.createElement(
        "div"
      );

    conversation.className =
      "fazar-conversation";


    /* ---------------------------------------------------------------------- */
    /* MIC                                                                      */
    /* ---------------------------------------------------------------------- */

    var micWrap =
      document.createElement(
        "div"
      );

    micWrap.className =
      "fazar-mic-wrap";


    var micGlow =
      document.createElement(
        "div"
      );

    micGlow.className =
      "fazar-mic-glow";


    var micButton =
      document.createElement(
        "button"
      );

    micButton.type =
      "button";

    micButton.className =
      "fazar-mic-button";

    micButton.setAttribute(
      "aria-label",
      "Start listening"
    );

    micButton.appendChild(
      getMicIcon()
    );


    /* ---------------------------------------------------------------------- */
    /* STATUS                                                                   */
    /* ---------------------------------------------------------------------- */

    var status =
      document.createElement(
        "p"
      );

    status.className =
      "fazar-status-message";

    status.textContent =
      "Tap the microphone to speak.";


    /* ---------------------------------------------------------------------- */
    /* BUILD EXACT LAYOUT ORDER                                                 */
    /* ---------------------------------------------------------------------- */

    micWrap.appendChild(
      micGlow
    );

    micWrap.appendChild(
      micButton
    );


    content.appendChild(
      topbar
    );

    content.appendChild(
      orb
    );

    content.appendChild(
      title
    );

    content.appendChild(
      description
    );

    content.appendChild(
      listening
    );

    content.appendChild(
      waveform
    );

    /*
     * Empty initially.
     * It only becomes visible after the user speaks.
     */
    content.appendChild(
      conversation
    );

    content.appendChild(
      micWrap
    );

    content.appendChild(
      status
    );


    panel.appendChild(
      overlay
    );

    panel.appendChild(
      content
    );


    root.appendChild(
      panel
    );

    root.appendChild(
      launcher
    );


    document.body.appendChild(
      root
    );


    /* ---------------------------------------------------------------------- */
    /* UI STATE                                                                 */
    /* ---------------------------------------------------------------------- */

    function updateUI() {

      waveform.classList.toggle(
        "is-active",
        state.isListening ||
          state.isSpeaking
      );


      micButton.classList.toggle(
        "is-listening",
        state.isListening
      );


      micButton.classList.toggle(
        "is-speaking",
        state.isSpeaking
      );


      if (
        state.isListening
      ) {

        listening.textContent =
          "Listening...";

        status.textContent =
          "Speak now.";

        return;
      }


      if (
        state.isProcessing
      ) {

        listening.textContent =
          "Thinking...";

        status.textContent =
          config.assistantName + " is thinking...";

        return;
      }


      if (
        state.isSpeaking
      ) {

        listening.textContent =
          "AI Speaking...";

        status.textContent =
          config.assistantName + " is speaking...";

        return;
      }


      listening.textContent =
        "Ready to listen you.";

      status.textContent =
        "Tap the microphone to speak.";
    }


    /* ---------------------------------------------------------------------- */
    /* ADD MESSAGE                                                             */
    /* ---------------------------------------------------------------------- */

    function addMessage(
      role,
      text
    ) {

      var message =
        document.createElement(
          "div"
        );

      message.className =
        "fazar-message " +
        (
          role === "You"
            ? "fazar-user-message"
            : "fazar-ai-message"
        );


      message.textContent =
        role +
        ": " +
        text;


      conversation.appendChild(
        message
      );


      conversation.scrollTop =
        conversation.scrollHeight;
    }


    /* ---------------------------------------------------------------------- */
    /* NAVIGATION                                                               */
    /* ---------------------------------------------------------------------- */

    function navigateTo(
      path
    ) {

      if (!path) {
        return;
      }


      if (
        /^https?:\/\//i.test(
          path
        )
      ) {

        window.location.href =
          path;

        return;
      }


      window.location.href =
        path.startsWith("/")
          ? path
          : "/" + path;
    }


    /* ---------------------------------------------------------------------- */
    /* SPEECH RECOGNITION                                                      */
    /* ---------------------------------------------------------------------- */

    function createRecognition() {

      var Recognition =
        null;


      /*
       * Standard API
       */
      if (
        typeof window.SpeechRecognition ===
        "function"
      ) {

        Recognition =
          window.SpeechRecognition;
      }


      /*
       * Chrome / Edge
       */
      else if (
        typeof window.webkitSpeechRecognition ===
        "function"
      ) {

        Recognition =
          window.webkitSpeechRecognition;
      }


      console.log(
        "Fazar AI SpeechRecognition:",
        Recognition
      );


      if (!Recognition) {

        status.classList.add(
          "fazar-error"
        );

        status.textContent =
          "Speech recognition is not available in this browser.";

        return null;
      }


      var recognition;


      try {

        recognition =
          new Recognition();

      } catch (
        error
      ) {

        console.error(
          "Fazar AI: failed to create recognition:",
          error
        );

        status.classList.add(
          "fazar-error"
        );

        status.textContent =
          "Could not initialize voice recognition.";

        return null;
      }


      recognition.continuous =
        false;

      recognition.interimResults =
        false;

      recognition.maxAlternatives =
        1;


      /*
       * Keep fixed so browser language
       * setting doesn't break recognition.
       */
      recognition.lang =
        "en-US";


      /* ------------------------------------------------------------------ */
      /* START                                                                */
      /* ------------------------------------------------------------------ */

      recognition.onstart =
        function () {

          console.log(
            "Fazar AI: recognition started"
          );


          state.isListening =
            true;

          state.isProcessing =
            false;


          status.classList.remove(
            "fazar-error"
          );


          updateUI();
        };


      /* ------------------------------------------------------------------ */
      /* RESULT                                                               */
      /* ------------------------------------------------------------------ */

      recognition.onresult =
        async function (
          event
        ) {

          console.log(
            "Fazar AI: speech result",
            event
          );


          var transcript =
            "";


          if (
            event.results &&
            event.results.length >
              0 &&
            event.results[0] &&
            event.results[0][0]
          ) {

            transcript =
              event.results[0][0]
                .transcript
                .trim();
          }


          state.isListening =
            false;


          if (!transcript) {

            status.textContent =
              "I didn't catch that. Try again.";

            updateUI();

            return;
          }


          console.log(
            "Fazar AI: user said:",
            transcript
          );


          /* -------------------------------------------------------------- */
          /* USER MESSAGE                                                    */
          /* -------------------------------------------------------------- */

          addMessage(
            "You",
            transcript
          );


          /* -------------------------------------------------------------- */
          /* BACKEND PROCESSING                                              */
          /* -------------------------------------------------------------- */

          state.isProcessing =
            true;


          updateUI();


          try {

            var result =
              await askAssistant(
                transcript
              );


            console.log(
              "Fazar AI response:",
              result
            );


            /* ---------------------------------------------------------- */
            /* NAVIGATION                                                  */
            /* ---------------------------------------------------------- */

            if (
              result.action ===
                "navigate" &&
              result.path
            ) {

              var navigationReply =
                result.response ||
                "Opening the page.";


              addMessage(
                "AI",
                navigationReply
              );


              state.isProcessing =
                false;

              state.isSpeaking =
                true;


              updateUI();


              speak(
                navigationReply,
                function () {

                  state.isSpeaking =
                    false;


                  updateUI();


                  setTimeout(
                    function () {

                      navigateTo(
                        result.path
                      );

                    },
                    150
                  );
                }
              );


              return;
            }


            /* ---------------------------------------------------------- */
            /* NORMAL AI RESPONSE                                          */
            /* ---------------------------------------------------------- */

            var reply =
              result.aiReply ||
              result.response;


            if (!reply) {

              throw new Error(
                "AI did not return a response."
              );
            }


            addMessage(
              "AI",
              reply
            );


            state.isProcessing =
              false;

            state.isSpeaking =
              true;


            updateUI();


            speak(
              reply,
              function () {

                state.isSpeaking =
                  false;

                updateUI();
              }
            );

          } catch (
            error
          ) {

            console.error(
              "Fazar AI request error:",
              error
            );


            state.isProcessing =
              false;

            state.isSpeaking =
              false;


            status.classList.add(
              "fazar-error"
            );


            status.textContent =
              error.message ||
              "Assistant request failed.";
          }
        };


      /* ------------------------------------------------------------------ */
      /* ERROR                                                                */
      /* ------------------------------------------------------------------ */

      recognition.onerror =
        function (
          event
        ) {

          console.error(
            "=========================================="
          );

          console.error(
            "FAZAR AI SPEECH RECOGNITION ERROR"
          );

          console.error(
            "Error:",
            event.error
          );

          console.error(
            "Event:",
            event
          );

          console.error(
            "=========================================="
          );


          state.isListening =
            false;

          state.isProcessing =
            false;


          waveform.classList.remove(
            "is-active"
          );

          micButton.classList.remove(
            "is-listening"
          );


          status.classList.add(
            "fazar-error"
          );


          switch (
            event.error
          ) {

            case "not-allowed":

              status.textContent =
                "Microphone permission was denied.";

              break;


            case "service-not-allowed":

              status.textContent =
                "Speech recognition service is not allowed.";

              break;


            case "audio-capture":

              status.textContent =
                "No microphone was detected.";

              break;


            case "no-speech":

              status.textContent =
                "No speech detected. Try again.";

              break;


            case "network":

              status.textContent =
                "Speech recognition network error.";

              break;


            case "aborted":

              status.textContent =
                "Listening stopped.";

              break;


            case "language-not-supported":

              status.textContent =
                "This language is not supported.";

              break;


            default:

              status.textContent =
                "Speech recognition error: " +
                (
                  event.error ||
                  "unknown"
                );
          }
        };


      /* ------------------------------------------------------------------ */
      /* END                                                                  */
      /* ------------------------------------------------------------------ */

      recognition.onend =
        function () {

          console.log(
            "Fazar AI: recognition ended"
          );


          state.isListening =
            false;


          waveform.classList.remove(
            "is-active"
          );

          micButton.classList.remove(
            "is-listening"
          );


          /*
           * Important:
           * Don't reset the UI while backend/TTS is running.
           */

          if (
            !state.isProcessing &&
            !state.isSpeaking
          ) {

            status.classList.remove(
              "fazar-error"
            );

            updateUI();
          }
        };


      return recognition;
    }


    /* ---------------------------------------------------------------------- */
    /* MICROPHONE BUTTON                                                       */
    /* ---------------------------------------------------------------------- */

    micButton.addEventListener(
      "click",
      function () {

        console.log(
          "Fazar AI: microphone clicked"
        );


        if (!state.isListening && !state.isProcessing && !state.isSpeaking) {
          conversation.innerHTML = "";
        }


        status.classList.remove(
          "fazar-error"
        );


        /* -------------------------------------------------------------- */
        /* STOP AI SPEECH                                                 */
        /* -------------------------------------------------------------- */

        if (
          state.isSpeaking
        ) {

          console.log(
            "Fazar AI: stopping speech"
          );


          if (
            "speechSynthesis"
            in window
          ) {

            window.speechSynthesis.cancel();
          }


          state.isSpeaking =
            false;


          updateUI();


          return;
        }


        /* -------------------------------------------------------------- */
        /* BLOCK WHILE AI THINKS                                           */
        /* -------------------------------------------------------------- */

        if (
          state.isProcessing
        ) {

          return;
        }


        /* -------------------------------------------------------------- */
        /* STOP CURRENT LISTENING                                          */
        /* -------------------------------------------------------------- */

        if (
          state.isListening
        ) {

          if (
            state.recognition
          ) {

            try {

              state.recognition.stop();

            } catch (
              error
            ) {

              console.warn(
                "Fazar AI: stop failed:",
                error
              );
            }
          }


          return;
        }


        /* -------------------------------------------------------------- */
        /* ALWAYS CREATE FRESH RECOGNITION                                 */
        /* -------------------------------------------------------------- */

        state.recognition =
          createRecognition();


        if (
          !state.recognition
        ) {

          return;
        }


        /* -------------------------------------------------------------- */
        /* START                                                             */
        /* -------------------------------------------------------------- */

        try {

          console.log(
            "Fazar AI: starting recognition..."
          );


          state.recognition.start();

        } catch (
          error
        ) {

          console.error(
            "Fazar AI: recognition.start() failed:",
            error
          );


          /*
           * Fresh instance retry
           */
          state.recognition =
            createRecognition();


          if (
            state.recognition
          ) {

            try {

              state.recognition.start();

            } catch (
              retryError
            ) {

              console.error(
                "Fazar AI: retry failed:",
                retryError
              );


              state.isListening =
                false;


              status.classList.add(
                "fazar-error"
              );


              status.textContent =
                "Unable to start microphone.";
            }
          }
        }
      }
    );


    /* ---------------------------------------------------------------------- */
    /* LAUNCHER                                                                 */
    /* ---------------------------------------------------------------------- */

    launcher.addEventListener(
      "click",
      function () {

        state.isOpen =
          !state.isOpen;


        panel.classList.toggle(
          "is-open",
          state.isOpen
        );


        launcher.setAttribute(
          "aria-expanded",
          state.isOpen
            ? "true"
            : "false"
        );


        launcher.setAttribute(
          "aria-label",
          state.isOpen
            ? "Close " +
              config.assistantName
            : "Open " +
              config.assistantName
        );


        launcher.innerHTML =
          "";


        launcher.appendChild(
          state.isOpen
            ? getCloseIcon()
            : getChatIcon()
        );
      }
    );


    /* ---------------------------------------------------------------------- */
    /* CLOSE                                                                   */
    /* ---------------------------------------------------------------------- */

    closeButton.addEventListener(
      "click",
      function () {

        if (
          state.isListening &&
          state.recognition
        ) {

          try {

            state.recognition.abort();

          } catch (
            error
          ) {}
        }


        if (
          "speechSynthesis"
          in window
        ) {

          window.speechSynthesis.cancel();
        }


        state.isListening =
          false;

        state.isProcessing =
          false;

        state.isSpeaking =
          false;


        updateUI();


        state.isOpen =
          false;


        panel.classList.remove(
          "is-open"
        );


        launcher.setAttribute(
          "aria-expanded",
          "false"
        );


        launcher.setAttribute(
          "aria-label",
          "Open " +
            config.assistantName
        );


        launcher.innerHTML =
          "";


        launcher.appendChild(
          getChatIcon()
        );
      }
    );


    /* ---------------------------------------------------------------------- */
    /* ESCAPE                                                                  */
    /* ---------------------------------------------------------------------- */

    document.addEventListener(
      "keydown",
      function (
        event
      ) {

        if (
          event.key ===
            "Escape" &&
          state.isOpen
        ) {

          closeButton.click();
        }
      }
    );


    /* ---------------------------------------------------------------------- */
    /* INITIAL STATE                                                            */
    /* ---------------------------------------------------------------------- */

    updateUI();
  }


  /* ------------------------------------------------------------------------ */
  /* INIT                                                                      */
  /* ------------------------------------------------------------------------ */

  async function init() {

    try {

      var config =
        await fetchAssistant();


      buildWidget(
        config
      );

    } catch (
      error
    ) {

      console.error(
        "Fazar AI initialization error:",
        error
      );
    }
  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();
  }

})();