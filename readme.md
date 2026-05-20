# 📱 APS Mobile Specification Scraper & WordPress Sync

An automated data-scraping and synchronization suite. This tool extracts high-fidelity mobile device specifications and galleries directly from **MobileDokan.com**, processes and converts images to WebP via **Sharp**, and syncs them seamlessly into a WordPress site powered by the **APS (Arena Products Store) Products** plugin.

It features a robust **Node.js/Express backend API** and a dedicated **Chromium-based Chrome Extension** to streamline and automate catalog management.

---

## 🌟 Key Features

*   **Comprehensive Data Extraction**: Scrapes detailed product properties from MobileDokan including OS, CPU details, display specs, camera configurations, physical dimensions, battery capacities, RAM/ROM sizes, network bands, multimedia capabilities, and even technical scores/ratings.
*   **WebP Image Processing & Optimization**: Downloads high-res product photos, color variations, and exterior shots, automatically converting them to the next-gen **WebP** format using **Sharp** to maximize Web Vital metrics and minimize page weights.
*   **WordPress Media & Data Integration**:
    *   Uploads WebP images to the WordPress Media Library using standard WP REST APIs.
    *   Maps product details to Arena Products Store (APS) Custom Attribute groups dynamically using specialized IDs.
*   **APS Chromium Browser Extension**: Injects custom automation controls into dashboard environments (e.g., `nixgle.com`) for direct ingestion from the backend port with a single click.

---

## 📂 Project Structure

```
├── extension/             # Chromium-based browser extension
│   ├── manifest.json      # Extension manifest (v3)
│   ├── content.js         # Content script orchestrating dashboard actions
│   ├── content.css        # Injected styles for automation indicators
│   └── icons/             # Chrome Extension branding icons
├── lib/                   # Core business logic and integrations
│   ├── scrap.js           # Advanced cheerio parsing engine for MobileDokan
│   ├── imageProcessor.js  # Stream downloads and Sharp WebP conversion
│   ├── uploadImageToWordPress.js  # FormData WordPress Media uploading
│   ├── getAuth.js         # WP Basic Authentication Base64 generation
│   ├── getHTMLFromURL.js  # User-Agent-masked Axios HTML fetcher
│   └── getFileExtension.js# URI extension analyzer
├── utilities/             # Helper utilities
│   ├── transformProductData.js # Maps scraped fields to APS WordPress plugin spec format
│   ├── uploadImage.js     # Image orchestration wrapper
│   ├── saveImagesArray.js # Image array filtering and batch processing
│   └── utilFunctions.js   # Parsing utility helpers (Battery extract, RAM/ROM normalizer)
├── temp/                  # Auto-created directory for transient WebP conversions
├── Scraper.bat            # Windows startup script to start backend minimized
├── .env                   # Environment credentials configuration
├── env.example            # Environment configuration template
├── package.json           # Project dependencies & scripts
└── readme.md              # Documentation
```

---

## 🛠️ Installation & Setup

### 1. Express Backend Setup

1. **Clone the repository** and navigate to the project directory:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy the `env.example` file to create your own `.env` configuration:
   ```bash
   cp env.example .env
   ```
   Open the `.env` file and populate it with your WordPress endpoint and administrative application credentials:
   ```env
   APP_RUNNING_PORT=3030
   WP_SITE_URL='https://www.yourdomain.com'
   WP_API_URL='https://www.yourdomain.com/wp-json/wp/v2/media'
   WP_USER='your-wp-admin-username'
   WP_APP_PASSWORD='your-wp-application-password' # Generate this under WP User Settings
   ```
   > [!IMPORTANT]
   > Do NOT use your normal login password for `WP_APP_PASSWORD`. Always generate an **Application Password** from the WordPress admin dashboard (`Users` -> `Profile` -> `Application Passwords`).

3. **Start the API Server**:
   You can run the server in standard or hot-reloading development mode:
   *   **Production/Standard Mode**:
       ```bash
       npm start
       ```
   *   **Development Mode (Nodemon)**:
       ```bash
       npm run start-mon
       ```

   *Alternatively*, on Windows, you can double-click **`Scraper.bat`** to boot the backend automatically in a minimized command line interface.

---

### 2. Chrome Extension Setup

The **APS Scraper** extension integrates with your Chromium-based browser (Chrome, Edge, Brave, etc.) to automate loading data into the dashboard.

1. Open Chrome and head to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** in the top-left corner.
4. Select the `extension` folder inside this project directory.
5. The extension is now active and will inject injection nodes on targeted URLs (e.g. `nixgle.com`).

---

## 🔌 API Endpoints Reference

The backend Express app exposes key integration APIs on `http://localhost:3030`:

### `GET /`
Fetch mobile phone specifications from MobileDokan.com as raw JSON without importing them.
*   **Query Parameters**:
    *   `url` (string): The URL of the MobileDokan device page.
*   **Example Request**:
    ```bash
    curl "http://localhost:3030/?url=https://www.mobiledokan.com/xiaomi-redmi-note-13/"
    ```

### `POST /upload-images`
Upload a list of image URLs (main, color options, exterior gallery) to the WordPress media manager after converting them locally to WebP.
*   **Request Body**:
    ```json
    {
      "main": "https://url-to-main-image.jpg",
      "colors": ["https://url-to-color-variant.jpg"],
      "exterior": ["https://url-to-exterior-angle.jpg"]
    }
    ```

### `GET /push-data-from-mobiledokan-com`
The primary automation hook. It scrapes a device, processes and converts all imagery to WebP, maps specifications directly to the **APS Products** plugin schemas, and POSTs the formatted product into WordPress database.
*   **Query Parameters**:
    *   `url` (string): The MobileDokan mobile page URL.
*   **Example Request**:
    ```bash
    curl "http://localhost:3030/push-data-from-mobiledokan-com?url=https://www.mobiledokan.com/mobile/xiaomi-redmi-note-13/"
    ```

---

## ⚡ Tech Stack

*   **Express.js**: Lightweight framework routing scraping hooks.
*   **Cheerio**: Lightning-fast parsing of jQuery-style HTML selectors.
*   **Sharp**: High-speed Node.js image processing library used to compress and format assets into modern WebP format.
*   **Axios**: Multi-purpose HTTP client for fetching HTML and posting to WordPress.
*   **Chrome Extension (Manifest V3)**: Chromium content injector.

---

## 📝 License
This project is proprietary and developed for catalog optimization. Unauthorized distribution or copying is prohibited. Created by **Nixgle**.
