# Role

Act as an expert Frontend Developer specializing in vanilla HTML and JavaScript (ES6+). Your task is to build the structure and logic for a responsive, interactive AI Chatbot web application that includes a complete authentication flow, dark mode toggling, fact-checking verification, ideological bias metrics, source attribution, active-message utilities, and response length controls.

*Note: Do NOT write any CSS for this prompt. You will be asked to generate the CSS in a separate prompt. Focus entirely on semantic HTML structure, CSS class names (for later styling), and JavaScript logic.*

# Architecture & Tech Stack

* **HTML5:** Semantic structure with clear class names and IDs for styling hooks and JS targeting.
* **JavaScript (ES6+):** DOM manipulation, event handling, mock authentication state, mock data objects, and layout transitions (no frameworks).
* **Language:** The UI text and mockup data must be in English.

# Application Flow & Specifications

## Phase 1: Authentication Flow (View 0)

Before accessing the chatbot, the user must navigate an authentication flow. Build the HTML wrappers and JS logic to handle swapping between these distinct views:

* **1. Login View (Default):**
  * Inputs for Username/Email and Password. Buttons: "Login", "Forgot Password?", and "Create Account".
  * **Logic:** Hardcode valid credentials (Username: `admin`, Password: `admin`). If incorrect, display an error and suggest: *"Did you forget your password?"* (linking to the Forgot Password view). If correct, transition to Phase 2.
* **2. Forgot Password View:**
  * Input for Email address and "Send Recovery Link" button.
  * **Logic:** Show a success message: *"A link to recover your password has been sent."* Add a mock button to proceed to Reset Password.
* **3. Reset Password View:**
  * Inputs for "New Password" and "Confirm New Password". Button: "Reset Password".
  * **Logic:** Standard validations. Show success toast and return to Login.
* **4. Create Account View:**
  * Inputs for Email, Password, Confirm Password. Button: "Sign Up".
  * **Logic:** Validate inputs. Transition *directly* to Phase 2 if valid.

## Phase 2: Initial Chat State (Centered Chat)

* Hidden until authenticated. Initially a centered column.
* **Components:**
  * **Chat Header:** Title ("AI Assistant") and a hamburger menu to toggle the left sidebar.
  * **Chat History:** Displays a welcome message.
  * **Input Area:** 
    * A **Response Length Selector** (e.g., a set of radio buttons, a segmented control, or a dropdown) allowing the user to select: *Short (~100 words)*, *Medium (~300 words)*, or *Long (~700 words)*. Default to Medium.
    * A text area.
    * A "Send" button.
  * **Active Answer Toolbar (Hidden initially):** Placed just below the chat history (above the input area). Contains:
    * A "Download PDF" button.
    * A dynamic "Word Count" display (e.g., "Word count: 0").

## Trigger Event & Message Interaction Logic (JavaScript)

* **Sending a Message:**
  1. Append the user's message.
  2. **Read Length Setting:** Check the value of the Response Length Selector. 
  3. Append a mock AI response. Generate a mock text that roughly matches the requested length (short, medium, or long). **Crucial:** Assign a unique ID to each AI message container (e.g., `data-message-id="msg-1"`). Wrap specific sentences in `<span>` tags with `data-source-id` attributes.
  4. Change layout to reveal the Right Column.
  5. Automatically trigger the "Select" logic for this newly generated message.
* **Selecting a Message (The Context Switcher):**
  1. Make AI message bubbles clickable. 
  2. When clicked, mark the message with an `.active-message` class.
  3. **Dynamic Right Column:** Update the *entire* Right Column (Evaluator, Bias Metrics, Sources) using a mock JS data object based on the selected `message-id`.
  4. **Active Answer Toolbar Logic:** 
     * Calculate the exact word count of the currently active AI message text and update the "Word Count" display in the toolbar.
     * Attach a mock JS function to the "Download PDF" button that triggers a browser `alert()` saying *"Downloading PDF report for [Message ID] including Bias Metrics and Sources..."*.

## Phase 3: Dashboard Layout Components

* **Left Column: Collapsible Sidebar**
  
  * Slides in/out via header menu. Contains a "Dark/Light Mode" toggle switch and dummy links (including "Log Out" returning to View 0).

* **Center Column: The Chat Interface** 
  
  * Takes up the main viewing area, containing the chat history, the Active Answer Toolbar, and the input area (with length selector).

* **Right Column: Verification, Bias & Sources**
  
  * Updates dynamically based on the *currently selected AI message*. Contains:
  * **1. Statement Evaluator:** Cards with an italicized AI quote, status pill (`verified`, `nuanced`, `disputed`), and explanation.
  * **2. AI Bias Metrics:** 6 visual spectrum bars/sliders with opposing labels and a positioned marker:
    * Economic: *Redistribution ↔ Free Market*
    * Social: *Progressive ↔ Traditional*
    * Foreign Policy: *Dovish ↔ Hawkish*
    * Environment: *Green ↔ Growth*
    * Religion: *Secular ↔ Religious*
    * National Identity: *Cosmopolitan ↔ Nationalist*
  * **3. Source Attribution Box (Bottom Right):** 
    * Lists sources for the active message.
    * Each item must include: Name, Hyperlink, Percentage, and a **Source Type Classification** tag (must explicitly state if it is a *Primary*, *Secondary*, or *Tertiary* source).
    * **Hover Logic:** Hovering over a source highlights the corresponding `data-source-id` span inside the *currently active* AI message.

# Output Generation

Provide two separate code blocks:

1. `index.html` (Include script and link tags)
2. `script.js` (Include auth flow, mock JS data objects, word count calculation, dynamic DOM updating logic, length selector logic, and dark mode toggling)
