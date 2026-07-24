# Role

Act as an expert Frontend Developer specializing in modern CSS3. Your task is to style the AI Chatbot web application that you just built the HTML and JavaScript for. 

# Architecture & Tech Stack

* **CSS3:** Use CSS Variables for theming (crucial for Light/Dark mode), Flexbox for component alignment, and CSS Grid/Transitions for layout changes. 
* No CSS frameworks (like Tailwind or Bootstrap). Vanilla CSS only.

# Design & UX Requirements

* **Theme & Dark Mode:** Clean, modern, minimalist. Utilize CSS variables (e.g., `--bg-color`, `--text-color`, `--panel-bg`, `--border-color`) in the `:root` pseudo-class for Light Mode, overriding them in `body.dark-mode` for Dark Mode.
* **Typography:** Sans-serif system fonts (e.g., Inter, Roboto, San Francisco).
* **Message Bubbles & States:** 
  * User messages: Right-aligned, primary color background, white text.
  * AI messages: Left-aligned, neutral background. Add a cursor pointer to indicate clickability.
  * **Active State:** Define an `.active-message` class. When an AI message is selected, give it a distinct visual state (e.g., a colored border or subtle glow) so the user knows which message the right column is analyzing.
* **Highlighting:** Define a `.highlight` class (e.g., a soft amber background with a smooth transition) for spans inside the AI text. Ensure it is readable in both modes.

# Layout & Transition Specifications

## View 0: Authentication Screens

* Style as a centered, card-based layout taking up `100vh`. Form elements should be modern (rounded corners, subtle borders, focus rings).

## View 1: Initial Chat State

* Chat interface is a single, centered column.
* Left Sidebar is off-canvas (`transform: translateX(-100%)`).
* Right Column is hidden (`display: none` or width `0`).
* **Chat Input Area:** Sticky at the bottom. 
  * Style the **Response Length Selector** (Short/Medium/Long) to look like a modern segmented control (pill-shaped toggles) or a sleek inline dropdown sitting elegantly just above or inside the top edge of the text input box.
* **Active Answer Toolbar:** Style this utility bar (containing the Download PDF button and Word Count) to sit neatly just above the chat input area. Make it look like a subtle, secondary control bar (smaller text, muted colors, flexbox for alignment).

## View 2: Active Dashboard State

* **Sidebar (Left):** Slides in smoothly when toggled. Style the mode toggle nicely.
* **Center Column (Chat):** Adjusts width dynamically. 
* **Right Column (Verification, Bias & Sources):** 
  * Fades in on the right. 
  * **Statement Evaluator Cards:** Themed backgrounds, rounded corners. Style the Status Pills: Verified (Green), Nuanced (Amber), Disputed (Red).
  * **AI Bias Metrics (Spectrums):** Create a visual track for the 6 ideological spectrums (e.g., *Redistribution ↔ Free Market*). Place the labels on opposite ends using Flexbox. Create a CSS class for the "marker" that sits on the track to represent the bias position.
  * **Source Attribution Box:** Positioned at the bottom of the Right Column. Clean list items with a hover state. 
  * **Source Type Badges:** Style the *Primary*, *Secondary*, and *Tertiary* classification tags. Give them distinct, subtle styles (e.g., Primary = solid muted background, Secondary = outlined border, Tertiary = italicized/transparent background) so they are easily distinguishable.

# Output Generation

Please provide a single code block containing the complete code for:

1. `styles.css`
