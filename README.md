# GoStack Premium UI Components

Welcome to the official repository for **GoStack Components**—a comprehensive, batteries-included ecosystem of premium, responsive, and reactive web UI components built specifically for the **GoStack Framework**. 

These components are designed to work seamlessly with GoStack's AOT UI compiler (**Tempose**) and client-side reactive directive engine (**GlideJS**). They are scoped, self-contained, and completely free of heavy client-side framework bloat.

---

## 🚀 How to Use Components in GoStack

GoStack operates on an on-demand, remote-pull model to avoid bloating your project. You can download and compile components directly into your active project workspace using the **Gost CLI command line tool**.

### 1. Locating the CLI
When you initialize a GoStack application, the framework scaffolds the command line tool code inside your project under the `cmd/gost/` directory.

To engage with the CLI, open your terminal (PowerShell on Windows, or bash/zsh on Unix) and navigate to the **root directory of your project**.

### 2. Installing a Component
To install a component (e.g., `accordion`), run the following command in your terminal:
```bash
go run cmd/gost/main.go add accordion
```
*(If you have compiled the CLI binary, you can run `./gost add accordion` instead.)*

This command automatically:
1. Connects to the remote GitHub repository registry.
2. Resolves any dependencies (e.g. if a component needs the `button` component, it downloads that too).
3. Downloads the raw `.html`, `.css`, and `.js` files.
4. Saves them in your project under `templates/components/accordion/`.
5. Automatically triggers the GoStack Asset Compiler to regenerate the Go view registration files, making the component immediately available in Go code.

### 3. Rendering inside templates
Once added, you can render the component inside any of your GoStack HTML views (located under `templates/`) using standard template directives:
```html
@component("accordion")
```
For components that accept customization parameters, pass them as a Go map:
```html
@component("button", map["variant": "primary", "text": "Save Changes", "onClick": "saveData()"])
```

---

## 🎨 Scoped CSS & Encapsulation
In standard HTML, styles are global—a class `.title` in a button would clash with a `.title` in a card. 

GoStack avoids this by **automatically scoping CSS** during the build. When the compiler runs, it rewrites rules. For example, in `button.css`:
```css
.btn-primary { background: blue; }
```
Is rewritten to:
```css
gostack-root [gs-component="button"] .btn-primary { background: blue; }
```
This guarantees that your styles will **never leak** out or clash with other components, even if they share the exact same class names.

---

## 📘 Interactive Components: Deep-Dive API Reference

Below is a detailed guide for the interactive components built using GlideJS directives.

### 1. Accordion Component (`accordion`)
A collapsible menu useful for FAQs, settings groups, or tree navigations.

*   **GlideJS State**: `{ "active": null }` (stores the index of the currently open item, or `null` if all are closed).
*   **Parameters**: None (contents are customized in the template).
*   **GoStack Template Usage**:
    ```html
    @component("accordion")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="accordion" gs-data='{"active": null}'>
        <!-- Item 1 -->
        <div class="gs-accordion-item">
            <button class="gs-accordion-header" gs-click="active = (active === 0 ? null : 0)">
                <span>What is GoStack?</span>
                <span class="gs-accordion-icon" gs-class='{"rotated": active === 0}'>&darr;</span>
            </button>
            <div class="gs-accordion-content" gs-show="active === 0" gs-transition>
                <p>GoStack is a modern, compiled web framework built for Go.</p>
            </div>
        </div>
    </div>
    ```

---

### 2. Tabs Component (`tabs`)
A tabbed container to toggle between different views or sub-pages on the same route.

*   **GlideJS State**: `{ "active": 0 }` (stores the index of the currently active tab).
*   **Parameters**: None (contents are customized in the template).
*   **GoStack Template Usage**:
    ```html
    @component("tabs")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="tabs" gs-data='{"active": 0}'>
        <div class="gs-tabs-nav">
            <button class="gs-tab-btn" gs-class='{"active": active === 0}' gs-click="active = 0">Dashboard</button>
            <button class="gs-tab-btn" gs-class='{"active": active === 1}' gs-click="active = 1">Profile</button>
        </div>
        <div class="gs-tabs-content">
            <div gs-show="active === 0" gs-transition>Dashboard Panel Content</div>
            <div gs-show="active === 1" gs-transition>Profile Settings Content</div>
        </div>
    </div>
    ```

---

### 3. Switch Component (`switch`)
A visual slider switch acting as a modern checkbox.

*   **GlideJS State**: `{ "checked": false }`
*   **Parameters**: None.
*   **GoStack Template Usage**:
    ```html
    @component("switch")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="switch" gs-data='{"checked": false}'>
        <label class="gs-switch-label">
            <span class="gs-switch-text" gs-text="checked ? 'Enabled' : 'Disabled'">Disabled</span>
            <button class="gs-switch-track" gs-class='{"active": checked}' gs-click="checked = !checked">
                <span class="gs-switch-thumb" gs-class='{"active": checked}'></span>
            </button>
        </label>
    </div>
    ```

---

### 4. Rating Star Component (`rating-star`)
Five-star interactive review feedback widget.

*   **GlideJS State**: `{ "rating": 3 }`
*   **Parameters**: None.
*   **GoStack Template Usage**:
    ```html
    @component("rating-star")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="rating-star" gs-data='{"rating": 3}'>
        <div class="gs-stars-container">
            <span class="gs-star" gs-class='{"filled": rating >= 1}' gs-click="rating = 1">&#9733;</span>
            <span class="gs-star" gs-class='{"filled": rating >= 2}' gs-click="rating = 2">&#9733;</span>
            <span class="gs-star" gs-class='{"filled": rating >= 3}' gs-click="rating = 3">&#9733;</span>
            <span class="gs-star" gs-class='{"filled": rating >= 4}' gs-click="rating = 4">&#9733;</span>
            <span class="gs-star" gs-class='{"filled": rating >= 5}' gs-click="rating = 5">&#9733;</span>
        </div>
    </div>
    ```

---

### 5. Dropdown Component (`dropdown`)
A popover menu showing action links on click.

*   **GlideJS State**: `{ "open": false }`
*   **Parameters**: None.
*   **GoStack Template Usage**:
    ```html
    @component("dropdown")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="dropdown" gs-data='{"open": false}'>
        <button class="gs-dropdown-trigger" gs-click="open = !open">
            <span>Actions</span>
            <span class="gs-arrow">&darr;</span>
        </button>
        <div class="gs-dropdown-menu" gs-show="open" gs-transition>
            <a class="gs-dropdown-item" href="#edit" gs-click="open = false">Edit Profile</a>
            <a class="gs-dropdown-item" href="#settings" gs-click="open = false">Account Settings</a>
        </div>
    </div>
    ```

---

### 6. Progress Component (`progress`)
Visual completion loading bar.

*   **GlideJS State**: `{ "percent": 65 }`
*   **Parameters**: None.
*   **GoStack Template Usage**:
    ```html
    @component("progress")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="progress" gs-data='{"percent": 65}'>
        <div class="gs-progress-wrapper">
            <div class="gs-progress-bar" gs-attr='{"style": "width: " + percent + "%"}'></div>
        </div>
        <div class="gs-progress-meta">
            <span class="gs-progress-label">Task Loading</span>
            <span class="gs-progress-val" gs-text="percent + '%'">65%</span>
        </div>
    </div>
    ```

---

### 7. OTP Input Component (`otp-input`)
Verification code input box that automatically shifts focus and processes backspaces.

*   **GlideJS State**: `{ "otp": "" }`
*   **JS Script**: Binds key handlers to automatically shift focus as digits are typed.
*   **GoStack Template Usage**:
    ```html
    @component("otp-input")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="otp-input" gs-data='{"otp": ""}' gs-init="setupOTP($el)">
        <div class="gs-otp-container" gs-ref="container">
            <input class="gs-otp-digit" type="text" maxlength="1" gs-click="otp = getOTP($refs.container)">
            <input class="gs-otp-digit" type="text" maxlength="1" gs-click="otp = getOTP($refs.container)">
            <input class="gs-otp-digit" type="text" maxlength="1" gs-click="otp = getOTP($refs.container)">
            <input class="gs-otp-digit" type="text" maxlength="1" gs-click="otp = getOTP($refs.container)">
        </div>
    </div>
    ```

---

### 8. Theme Toggle Component (`theme-toggle`)
Uses local storage persistence to toggle light/dark modes.

*   **GlideJS State**: `{ "dark": false }`
*   **Directives**: Uses `gs-persist` to sync configuration, and `gs-effect` to toggle CSS class names on the main `document.documentElement` node.
*   **GoStack Template Usage**:
    ```html
    @component("theme-toggle")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="theme-toggle" gs-data='{"dark": gs-persist("dark_theme", false)}' gs-effect="document.documentElement.classList.toggle('dark', dark)">
        <button class="gs-theme-btn" gs-click="dark = !dark">
            <span gs-text="dark ? '☀️ Light' : '🌙 Dark'">Dark</span>
        </button>
    </div>
    ```

---

### 9. Toast Component (`toast`)
Auto-dismissing alert message floating in the viewport.

*   **GlideJS State**: `{ "show": true }`
*   **GoStack Template Usage**:
    ```html
    @component("toast")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="toast" gs-data='{"show": true}' gs-show="show" gs-transition>
        <div class="gs-toast-box">
            <span class="gs-toast-icon">&#10003;</span>
            <span class="gs-toast-message">Record saved successfully!</span>
            <button class="gs-toast-close" gs-click="show = false">&times;</button>
        </div>
    </div>
    ```

---

### 10. Carousel Component (`carousel`)
Slide show slider with smooth show/hide transitions.

*   **GlideJS State**: `{ "index": 0 }`
*   **GoStack Template Usage**:
    ```html
    @component("carousel")
    ```
*   **HTML Structure & Behavior**:
    ```html
    <div gs-component="carousel" gs-data='{"index": 0}'>
        <div class="gs-carousel-slides">
            <div class="gs-slide" gs-show="index === 0" gs-transition>
                <div class="gs-slide-content">Slide One</div>
            </div>
            <div class="gs-slide" gs-show="index === 1" gs-transition>
                <div class="gs-slide-content">Slide Two</div>
            </div>
        </div>
        <div class="gs-carousel-controls">
            <button gs-click="index = index === 0 ? 1 : index - 1">&larr;</button>
            <button gs-click="index = index === 1 ? 0 : index + 1">&rarr;</button>
        </div>
    </div>
    ```

---

## 🗂 Complete Registry Index (100 Components)

The table below catalogs every component in the repository:

### 1. Layouts & Navigation Controls
| Component | Description | Parameters | GoStack Render Call |
| :--- | :--- | :--- | :--- |
| `accordion` | Collapsible FAQs panels. | *None* | `@component("accordion")` |
| `tabs` | Tabbed sub-view navigation. | *None* | `@component("tabs")` |
| `dropdown` | Triggerable action options menu. | *None* | `@component("dropdown")` |
| `carousel` | Responsive slides showcase. | *None* | `@component("carousel")` |
| `modal` | Center pop-up dialog window. | `id`, `title` | `@component("modal", map["id":"confirm"])` |
| `drawer` | Side slide-out configuration panel. | `side` | `@component("drawer", map["side":"right"])`|
| `navbar` | Top header utility navigation bar. | *None* | `@component("navbar")` |
| `sidebar` | Vertical links dashboard panel. | *None* | `@component("sidebar")` |
| `menu` | General link item directory. | *None* | `@component("menu")` |
| `context-menu` | Right-click overlay options list. | *None* | `@component("context-menu")` |
| `pagination` | Direct page navigator controls. | `current`, `total` | `@component("pagination")` |
| `breadcrumb` | Hierarchy path locator guide. | *None* | `@component("breadcrumb")` |
| `header` | Layout top block. | *None* | `@component("header")` |
| `footer` | Layout bottom links block. | *None* | `@component("footer")` |
| `topbar` | Alert banner strip above header. | *None* | `@component("topbar")` |
| `tree` | Folder and nested node structures. | *None* | `@component("tree")` |
| `timeline` | Serial history tracker panels. | *None* | `@component("timeline")` |
| `stepper` | Flow-stage track indicators. | `currentStep` | `@component("stepper")` |
| `backdrop` | Blackout loader page overlay. | *None* | `@component("backdrop")` |
| `hero` | Premium visual landing intro banner. | *None* | `@component("hero")` |

---

### 2. Form Inputs & Actions
| Component | Description | Parameters | GoStack Render Call |
| :--- | :--- | :--- | :--- |
| `button` | Form handler click button. | `text`, `variant` | `@component("button", map["text":"Save"])` |
| `input` | Input text box with validation states. | `type`, `label` | `@component("input", map["type":"email"])` |
| `textarea` | Styled multi-line text input field. | `label` | `@component("textarea")` |
| `select` | Dropdown picker options selection. | `label` | `@component("select")` |
| `checkbox` | Check box status clicker. | `label` | `@component("checkbox")` |
| `radio` | Standard single-option lists. | `name`, `options` | `@component("radio")` |
| `switch` | Visual on/off switch sliders. | *None* | `@component("switch")` |
| `color-picker` | Custom overlay palette chooser. | *None* | `@component("color-picker")` |
| `color-swatch` | Interactive circle colors list. | *None* | `@component("color-swatch")` |
| `date-picker` | Day-selection calendar overlay. | *None* | `@component("date-picker")` |
| `time-picker` | Hours/minutes selector inputs. | *None* | `@component("time-picker")` |
| `otp-input` | Mobile passcode verification boxes. | *None* | `@component("otp-input")` |
| `phone-input` | Call numbers input with dial dropdown. | *None* | `@component("phone-input")` |
| `number-input` | Precise numerical selectors. | *None* | `@component("number-input")` |
| `password-input`| Concealed password input toggler. | *None* | `@component("password-input")` |
| `chip-input` | Tag input list boxes. | *None* | `@component("chip-input")` |
| `slider` | Slider controller bar. | *None* | `@component("slider")` |
| `range` | Dual min/max controller handles. | *None* | `@component("range")` |
| `range-calendar`| Date segment selector calendars. | *None* | `@component("range-calendar")` |
| `rating` | Scale-metric evaluation inputs. | *None* | `@component("rating")` |
| `rating-star` | Standard review stars component. | *None* | `@component("rating-star")` |
| `file-upload` | Drag-drop target box uploaders. | *None* | `@component("file-upload")` |
| `uploader` | Upload speed & file progress grid. | *None* | `@component("uploader")` |
| `signature` | Inline document signature canvas. | *None* | `@component("signature")` |
| `signature-pad` | Full canvas signature clear tool. | *None* | `@component("signature-pad")` |
| `credit-card-form`| Visual credit card interactive layout. | *None* | `@component("credit-card-form")` |
| `form-group` | Form input structure helper. | *None* | `@component("form-group")` |
| `reset-button` | Reset button. | *None* | `@component("reset-button")` |
| `submit-button` | Button showing loaders on action. | *None* | `@component("submit-button")` |
| `hidden-input` | Key attribute holder. | *None* | `@component("hidden-input")` |

---

### 3. Display & Visual Feedback
| Component | Description | Parameters | GoStack Render Call |
| :--- | :--- | :--- | :--- |
| `card` | Standard semantic panel. | *None* | `@component("card")` |
| `badge` | Custom styled highlight labels. | *None* | `@component("badge")` |
| `avatar` | Profile image placeholders. | *None* | `@component("avatar")` |
| `divider` | Visual line breaks. | *None* | `@component("divider")` |
| `progress` | Progress indicators. | *None* | `@component("progress")` |
| `spinner` | Loading wheel spinners. | *None* | `@component("spinner")` |
| `tooltip` | Hover-popup context indicators. | `text`, `position` | `@component("tooltip")` |
| `toast` | Popup alert banners. | *None* | `@component("toast")` |
| `toast-container`| Toast animation stacks. | *None* | `@component("toast-container")` |
| `alert` | Succes/error banner strips. | `type`, `message` | `@component("alert")` |
| `tag` | Content filters labels. | *None* | `@component("tag")` |
| `skeleton` | Layout loading outlines. | *None* | `@component("skeleton")` |
| `status` | Direct state color dots. | *None* | `@component("status")` |
| `barcode` | Automated product barcode renderers.| *None* | `@component("barcode")` |
| `qr-code` | Matrix code generators. | *None* | `@component("qr-code")` |
| `chart` | Inline statistical SVG layout. | *None* | `@component("chart")` |
| `dashboard-widget`| Grid dashboard numeric modules. | *None* | `@component("dashboard-widget")` |
| `price-card` | Plan tiers pricing structures. | *None* | `@component("price-card")` |
| `table` | Scoped data layout tables. | *None* | `@component("table")` |
| `label` | Input header captions. | *None* | `@component("label")` |

---

### 4. Behavioral Utilities
| Component | Description | Parameters | GoStack Render Call |
| :--- | :--- | :--- | :--- |
| `intersection-observer`| Scroll viewport action anchors. | *None* | `@component("intersection-observer")` |
| `resize-observer` | Container dimension change watchers.| *None* | `@component("resize-observer")` |
| `focus-trap` | Accessibility screen-locking tools.| *None* | `@component("focus-trap")` |
| `clipboard` | Click-to-copy handlers. | *None* | `@component("clipboard")` |
| `keyboard-shortcut`| Keyboard key action bindings. | *None* | `@component("keyboard-shortcut")` |
| `portal` | Overlay HTML rendering nodes. | *None* | `@component("portal")` |
| `transition` | Slide/fade view animations wrappers.| *None* | `@component("transition")` |
| `theme-toggle` | System dark mode toggle buttons. | *None* | `@component("theme-toggle")` |
| `scroll-spy` | Viewport scroll navigation markers.| *None* | `@component("scroll-spy")` |
| `toggle` | Standard state toggle boxes. | *None* | `@component("toggle")` |

---

### 5. Media & Content Widgets
| Component | Description | Parameters | GoStack Render Call |
| :--- | :--- | :--- | :--- |
| `audio-player` | Structured audio controls. | *None* | `@component("audio-player")` |
| `video-player` | MP4/HLS streaming media players. | *None* | `@component("video-player")` |
| `captcha` | Validation logic prompts. | *None* | `@component("captcha")` |
| `poll` | User feedback voting systems. | *None* | `@component("poll")` |
| `quiz` | Score lists custom surveys. | *None* | `@component("quiz")` |
| `survey` | Feedback survey forms. | *None* | `@component("survey")` |
| `comment-box` | Comment feed lists inputs. | *None* | `@component("comment-box")` |
| `social-share` | Share widgets. | *None* | `@component("social-share")` |
| `search` | Filter search text fields. | *None* | `@component("search")` |
| `camera` | Web photo stream capture. | *None* | `@component("camera")` |
| `map` | Interactive layout geo overlays. | *None* | `@component("map")` |
| `container` | Inner margins alignments blocks. | *None* | `@component("container")` |
| `section` | Row section wrappers. | *None* | `@component("section")` |
| `grid` | Grid layout templates. | *None* | `@component("grid")` |
| `stack` | Simple flex alignment row/columns. | *None* | `@component("stack")` |
| `link` | Navigation links. | *None* | `@component("link")` |
| `list` | Group list builders. | *None* | `@component("list")` |
| `calendar` | Calendar trackers layouts. | *None* | `@component("calendar")` |
| `card-list` | Grid card layouts. | *None* | `@component("card-list")` |
| `badge-group` | Badge alignment listings. | *None* | `@component("badge-group")` |

---

## 🛠 Contributing a New Component
We welcome component submissions from developers worldwide! To contribute:
1. Fork this repository.
2. Create a new directory under root named after your component (e.g. `my-component`).
3. Add:
   * `my-component.html`: The HTML template utilizing standard GlideJS directives.
   * `my-component.css`: Fully scoped component styling.
   * `my-component.go`: Declaring the Go package definition: `package my_component`.
   * `my-component.js` *(Optional)*: Standalone JavaScript script.
4. Add your component configuration entry to `registry.json` mapped to its files and dependency list.
5. Create a Pull Request!
