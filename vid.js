// custom-video-player.js
(function() {
    const styles = `
    <style>
        .dideofullscreen .custom-video-wrapper {
            border-radius: 0;
            box-shadow: none;
        }
        .dideofullscreen .custom-volume {
            margin-left: 15px !important;
            margin-right: 15px !important;
        }
        .dideofullscreen .custom-buttons {
            gap: 15px;
            display: flex !important;
        }
        .dideofullscreen .custom-buttons button {
            height: 34px;
        }
        .dideofullscreen .custom-buttons button svg {
            width: 24px;
            height: 24px;
        }
        .dideofullscreen .ccvvvvf00f {
            height: 34px;
        }
        .dideofullscreen .custom-controls {
            padding: 26px;
        }
        .dideofullscreen .custom-progress {
            margin: 8px 0 22px;
        }
        .dideofullscreen .coooomf button {
            margin-left: 14px;
        }
        .dideofullscreen .progress-tooltip {
            font-size: 16px;
            padding: 3px 10px;
            bottom: 20px;
        }
        .dideofullscreen  .center-play-icon svg {
            width: 44px;
            height: 44px;
        }
        .dideofullscreen  .center-play-icon {
            width: 90px;
            height: 90px;
        }
        .dideofullscreen xxsde {
            height: 16px;
            margin: 0 3px;
        }
        .dideofullscreen .time, .dideofullscreen .time1 {
            font-size: 18px;
        }
        .dideofullscreen .custom-volume .volume-icon svg {
            width: 30px;
            height: 30px;
        }
        .dideofullscreen .custom-volume .volume-icon {
            width: 30px;
            height: 30px;
        }
        .dideofullscreen .volume-track-wrap {
            width: 92px;
        }
        .dideofullscreen .custom-volume:hover {
            width: 136px;
        }
        .dideofullscreen .cvp-settings-btn {
            padding: 0;
            width: 34px;
            height: 34px;
        }
        .dideofullscreen .cvp-settings-btn svg {
            width: 26px;
            height: 26px;
        }
        .dideofullscreen .cvp-settings-menu {
            min-width: 230px;
        }
        .dideofullscreen .cvp-settings-menu-item {
            padding: 12px 16px;
        }
        .dideofullscreen .cvp-speed-menu {
            max-height: 300x;
            min-width: 230px;
        }
        .dideofullscreen .cvp-speed-option {
            padding: 0px 18px;
            height: 43px;
        }
        .dideofullscreen .cvp-settings-corner {
            position: absolute;
            top: 26px;
            right: 26px;
            z-index: 30;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        .dideofullscreen  {
            
        }

        @media (hover: none) and (pointer: coarse) {
          .custom-buttons {
            display: none !important;
          }
          .custom-volume {
            margin-left: 0 !important;
          }
        }

        .custom-video-wrapper {
            position: relative;
            outline: none;
            user-select: none;
            background: #000;
            border-radius: 12px;
            overflow: hidden;
            margin: 20px 0;
            width: 650px;
            max-width: 100%;
            height: 358px;
            display: flex;
            justify-content: center;
            align-items: center;
            direction: ltr;
            -webkit-tap-highlight-color: transparent;
        }
        .custom-video-wrapper.loading::after {
            position: absolute;
            content: 'Video loading...';
            color: #2d94ff;
            font-family: sans-serif;
            font-size: 20px;
            z-index: 20;
            background: rgba(0,0,0,0.7);
            padding: 10px 20px;
            border-radius: 30px;
            pointer-events: none;
        }
        .custom-video-wrapper video {
            position: relative;
            z-index: 5;
            height: 100%;
            width: 100%;
            display: block;
        }
        .custom-video-wrapper button {
            position: relative;
            overflow: hidden;
            transition: opacity 0.2s;
        }
        .custom-video-wrapper button.disabled {
            opacity: 0.5;
            pointer-events: none;
            cursor: not-allowed;
        }
        .custom-controls {
            position: absolute;
            z-index: -1;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            padding: 10px;
            background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .custom-video-wrapper.controls-visible .custom-controls {
            opacity: 1;
            z-index: 10;
        }
        .custom-video-wrapper.settings-open .custom-controls {
            opacity: 0 !important;
            z-index: -1 !important;
            pointer-events: none !important;
        }
        .custom-buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            align-items: center;
        }
        .custom-buttons button {
            padding: 0px 10px;
            height: 30px;
            border: none;
            background: #ffffff22;
            color: #ffffff;
            cursor: pointer;
            border-radius: 25px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            transition: background 0.2s;
        }
        .custom-buttons button:hover:not(.disabled) {
            background: #ffffff44;
        }
        .custom-buttons button svg {
            width: 18px;
            height: 18px;
            fill: white;
            flex-shrink: 0;
            display: block;
        }

        /* ===== شريط التقدم المخصص ===== */
        .custom-progress {
            width: 100%;
            margin: 8px 0 12px;
            padding: 0 2px;
            box-sizing: border-box;
            direction: ltr;
        }
        .progress-track {
            position: relative;
            width: 100%;
            height: 5px;
            background: rgba(255,255,255,0.25);
            border-radius: 99px;
            cursor: pointer;
            transition: height 0.15s ease;
        }
        .progress-track:hover,
        .progress-track.dragging {
            height: 8px;
        }
        .progress-buffered {
            position: absolute;
            left: 0; top: 0; bottom: 0;
            background: rgba(255,255,255,0.35);
            border-radius: 99px;
            width: 0%;
            pointer-events: none;
        }
        .progress-fill {
            position: absolute;
            left: 0; top: 0; bottom: 0;
            background: #fff;
            border-radius: 99px;
            width: 0%;
            pointer-events: none;
            transition: width 0.1s linear;
        }
        .progress-track.dragging .progress-fill {
            transition: none;
        }
        .progress-thumb {
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 14px;
            height: 14px;
            background: #fff;
            border-radius: 50%;
            pointer-events: none;
            transition: transform 0.15s ease;
            box-shadow: 0 0 4px rgba(0,0,0,0.5);
        }
        .progress-track:hover .progress-thumb,
        .progress-track.dragging .progress-thumb {
            transform: translate(-50%, -50%) scale(1);
        }
        .progress-tooltip {
            position: absolute;
            bottom: 16px;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.75);
            color: #fff;
            font-size: 11px;
            font-family: sans-serif;
            padding: 2px 7px;
            border-radius: 4px;
            pointer-events: none;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.15s;
        }
        .progress-track:hover .progress-tooltip,
        .progress-track.dragging .progress-tooltip {
            opacity: 1;
        }

        /* ===== شريط الصوت المخصص ===== */
        .custom-volume {
            transition: width 0.3s ease;
            overflow: hidden;
            width: 28px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: white;
            justify-content: flex-start;
            margin-left: 10px;
            margin-right: 4px;
        }
        .custom-volume:hover {
            width: 120px;
        }
        .custom-volume.touch-expanded {
            width: 120px;
        }
        .custom-volume.touch-expanded .volume-track-wrap {
            opacity: 1;
        }
        .custom-volume .volume-icon {
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }
        .custom-volume .volume-icon svg {
            width: 22px;
            height: 22px;
            fill: white;
            display: block;
        }
        .volume-track-wrap {
            flex-shrink: 0;
            width: 80px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .custom-volume:hover .volume-track-wrap {
            opacity: 1;
        }
        .volume-track {
            position: relative;
            width: 100%;
            height: 4px;
            background: rgba(255,255,255,0.25);
            border-radius: 99px;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .volume-track:hover {
            height: 6px;
        }
        .volume-track:active {
            height: 6px;
        }
        .volume-fill {
            position: absolute;
            left: 0; top: 0; bottom: 0;
            background: #fff;
            border-radius: 99px;
            width: 100%;
            pointer-events: none;
            transition: all 0.15s ease;
        }
        .volume-thumb {
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 12px;
            height: 12px;
            background: #fff;
            border-radius: 50%;
            pointer-events: none;
            transition: transform 0.15s ease;
            box-shadow: 0 0 3px rgba(0,0,0,0.5);
        }
        .volume-track:hover .volume-thumb {
            transform: translate(-50%, -50%) scale(1);
        }
        .volume-track:active .volume-thumb {
            transform: translate(-50%, -50%) scale(1);
        }

        video::-webkit-media-controls { display: none !important; }

        @media (max-width: 600px) {
            .custom-buttons button { font-size: 12px; }
        }
        .ccvvvvf00f {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 7px;
            direction: ltr;
            margin-bottom: 5px;
            color: #ffffffd4;
            height: 30px;
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: none;
        }
        .custom-video-wrapper.cursor-hidden { cursor: none; }
        .coooomf {
            display: flex;
            align-items: center;
        }
        .coooomf button {
            cursor: pointer;
            border: none;
            background: transparent;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 5px;
            width: 34px;
            height: 34px;
        }
        .coooomf button svg {
            width: 26px;
            height: 26px;
            fill: white;
            color: white;
            display: block;
        }
        .coooomf button.veowc2s0d.active svg {
            fill: #2196F3;
            color: #2196F3;
        }
        .coooomf button.Video-save.active svg {
            fill: #fff;
        }
        .Video-save svg {
            width: 28px !important;
            height: 28px !important;
        }

        /* flash overlay للسهام */
        .seek-flash {
            position: absolute;
            z-index: 20;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.45);
            color: #fff;
            font-family: sans-serif;
            font-size: 15px;
            padding: 8px 14px;
            border-radius: 8px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .seek-flash.left  { left: 54px; }
        .seek-flash.right { right: 54px; }
        .seek-flash.show  { opacity: 1; }
        .seek-flash svg { width: 18px; height: 18px; fill: white; }

        /* ===== أيقونة التشغيل/الإيقاف في المنتصف ===== */
        .center-play-icon {
            position: absolute;
            z-index: 15;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 72px;
            height: 72px;
            background: rgba(0, 0, 0, 0.55);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            opacity: 0;
        }
        .center-play-icon svg {
            width: 36px;
            height: 36px;
            fill: white;
        }
        .center-play-icon.animate-in {
            animation: centerIconIn 0.18s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .center-play-icon.animate-out {
            animation: centerIconOut 0.35s ease forwards;
        }
        @keyframes centerIconIn {
            0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes centerIconOut {
            0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1.3); }
        }

        .xxxxddcvf {
            height: 100%;
            width: 100%;
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 8;
            background: linear-gradient(transparent 50%, #12101040 50%),
            linear-gradient(90deg, #ff00000f, #00ff0005, #0000ff0f);
            background-size: 100% 3.5px, 3px 100%;
            animation: scanlines-roll-98c8b647 0.1s linear infinite;
            cursor: pointer;
        }
        @keyframes scanlines-roll-98c8b647 {
            0%   { background-position: 0 0, 0 0; }
            100% { background-position: 0 2px, 3px 0; }
        }
        .xxxxdww {
            height: 100%;
            width: 100%;
            background-image: url(https://github.com/Eya2d/Video/blob/main/download.webp?raw=true);
            background-size: 100% 100%;
        }
        .time, .time1 {
            font-family: sans-serif;
            margin-right: 3px;
            line-height: 0;
        }
        .time {
            margin-left: 3px;
        }
        xxsde {
            position: relative;
            height: 13px;
            transform: rotate(20deg);
            margin: 0 2px;
            width: 2px;
            background: #ffffffd4;
        }

        /* ===== زر الإعدادات في الزاوية العلوية اليمنى ===== */
        .cvp-settings-corner {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 30;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        .cvp-settings-btn {
            cursor: pointer;
            border: none;
            background: rgb(0 0 0 / 20%);
            padding: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            transition: background 0.2s;
            position: relative;
            z-index: 1;
        }
        .cvp-settings-btn:hover {
            background: rgba(0,0,0,0.65);
        }
        .cvp-settings-btn svg {
            width: 20px;
            height: 20px;
            fill: white;
            display: block;
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cvp-settings-btn.open svg {
            transform: rotate(90deg);
        }

        /* ===== الطبقة الشفافة (backdrop) ===== */
        .cvp-backdrop {
            position: absolute;
            inset: 0;
            z-index: 25;
            background: #0000;
            opacity: 0;
            animation: cvpFadeIn 0.2s ease forwards;
        }
        .cvp-backdrop.hiding {
            animation: cvpFadeOut 0.18s ease forwards;
        }
        @keyframes cvpFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        @keyframes cvpFadeOut {
            from { opacity: 1; }
            to   { opacity: 0; }
        }

        /* ===== القائمة الرئيسية للإعدادات ===== */
        .cvp-settings-menu {
            position: absolute;
            top: 44px;
            background: rgba(18,18,18,0.92);
            border-radius: 10px;
            padding: 6px 0;
            min-width: 170px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.55);
            overflow: hidden;
            opacity: 0;
            transform: translateY(-6px) scale(0.97);
            transform-origin: top right;
            animation: cvpMenuIn 0.2s ease forwards;
        }
        .cvp-settings-menu.hiding {
            animation: cvpMenuOut 0.18s ease forwards;
        }
        @keyframes cvpMenuIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cvpMenuOut {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to   { opacity: 0; transform: translateY(-6px) scale(0.97); }
        }
        .cvp-settings-menu-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 16px;
            color: #fff;
            font-family: sans-serif;
            font-size: 14px;
            cursor: pointer;
            border: none;
            background: transparent;
            width: 100%;
            text-align: left;
            transition: background 0.15s;
            white-space: nowrap;
        }
        .cvp-settings-menu-item:hover {
            background: rgba(255,255,255,0.1);
        }
        .cvp-settings-menu-item svg {
            width: 18px;
            height: 18px;
            fill: white;
            flex-shrink: 0;
        }
        .cvp-settings-menu-item .cvp-menu-item-right {
            margin-left: auto;
            font-size: 12px;
            color: rgba(255,255,255,0.55);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .cvp-settings-menu-item .cvp-menu-item-right svg {
            width: 13px;
            height: 13px;
            fill: rgba(255,255,255,0.55);
        }

        /* ===== قائمة السرعة ===== */
        .cvp-speed-menu {
            position: absolute;
            max-height: 250px;
            top: 44px;
            right: 0;
            scrollbar-width: thin;
            scrollbar-color: #c1c1c170 transparent;
            background: rgba(18,18,18,0.92);
            border-radius: 10px;
            padding: 6px 0;
            min-width: 150px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.55);
            overflow: auto;
            opacity: 0;
            transform: translateY(-6px) scale(0.97);
            transform-origin: top right;
            animation: cvpMenuIn 0.2s ease forwards;
        }
        .cvp-speed-menu.hiding {
            animation: cvpMenuOut 0.18s ease forwards;
        }
        .cvp-speed-menu-header {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 7px 14px 10px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 4px;
        }
        .cvp-speed-back-btn {
            cursor: pointer;
            border: none;
            background: transparent;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            transition: background 0.15s;
            flex-shrink: 0;
        }
        .cvp-speed-back-btn:hover {
            background: rgba(255,255,255,0.12);
        }
        .cvp-speed-back-btn svg {
            width: 14px;
            height: 14px;
            fill: white;
            display: block;
        }
        .cvp-speed-menu-title {
            color: rgba(255,255,255,0.7);
            font-family: sans-serif;
            font-size: 13px;
            flex: 1;
        }
        .cvp-speed-option {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 16px;
            color: #fff;
            font-family: sans-serif;
            font-size: 14px;
            cursor: pointer;
            border: none;
            background: transparent;
            width: 100%;
            text-align: left;
            transition: background 0.15s;
        }
        .cvp-speed-option:hover {
            background: rgba(255,255,255,0.1);
        }
        .cvp-speed-option.active {
            color: #2196F3;
        }
        .cvp-speed-option .cvp-speed-check {
            width: 16px;
            height: 16px;
            margin-left: auto;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .cvp-speed-option .cvp-speed-check svg {
            width: 14px;
            height: 14px;
            fill: #2196F3;
            display: none;
        }
        .cvp-speed-option.active .cvp-speed-check svg {
            display: block;
        }
        .kky66657e0 {
            display: flex;
            align-items: center;
        }
    </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);

    /* ── SVGs ── */
    const SVG_PLAY    = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"/></svg>`;
    const SVG_PAUSE   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"/></svg>`;
    const SVG_RESTART = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="white" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path d="M256 58l80 80-80 80"/></svg>`;
    const SVG_VOL_ON  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 416a23.88 23.88 0 01-14.2-4.68 8.27 8.27 0 01-.66-.51L125.76 336H56a24 24 0 01-24-24V200a24 24 0 0124-24h69.75l91.37-74.81a8.27 8.27 0 01.66-.51A24 24 0 01256 120v272a24 24 0 01-24 24zm-106.18-80zm-.27-159.86zM320 336a16 16 0 01-14.29-23.19c9.49-18.87 14.3-38 14.3-56.81 0-19.38-4.66-37.94-14.25-56.73a16 16 0 0128.5-14.54C346.19 208.12 352 231.44 352 256c0 23.86-6 47.81-17.7 71.19A16 16 0 01320 336z"/><path d="M368 384a16 16 0 01-13.86-24C373.05 327.09 384 299.51 384 256c0-44.17-10.93-71.56-29.82-103.94a16 16 0 0127.64-16.12C402.92 172.11 416 204.81 416 256c0 50.43-13.06 83.29-34.13 120a16 16 0 01-13.87 8z"/><path d="M416 432a16 16 0 01-13.39-24.74C429.85 365.47 448 323.76 448 256c0-66.5-18.18-108.62-45.49-151.39a16 16 0 1127-17.22C459.81 134.89 480 181.74 480 256c0 64.75-14.66 113.63-50.6 168.74A16 16 0 01416 432z"/></svg>`;
    const SVG_VOL_OFF = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="white" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M416 432L64 80"/><path d="M243.33 98.86a23.89 23.89 0 00-25.55 1.82l-.66.51-28.52 23.35a8 8 0 00-.59 11.85l54.33 54.33a8 8 0 0013.66-5.66v-64.49a24.51 24.51 0 00-12.67-21.71zM251.33 335.29L96.69 180.69A16 16 0 0085.38 176H56a24 24 0 00-24 24v112a24 24 0 0024 24h69.76l92 75.31a23.9 23.9 0 0025.87 1.69A24.51 24.51 0 00256 391.45v-44.86a16 16 0 00-4.67-11.3zM352 256c0-24.56-5.81-47.87-17.75-71.27a16 16 0 10-28.5 14.55C315.34 218.06 320 236.62 320 256q0 4-.31 8.13a8 8 0 002.32 6.25l14.36 14.36a8 8 0 0013.55-4.31A146 146 0 00352 256zM416 256c0-51.18-13.08-83.89-34.18-120.06a16 16 0 00-27.64 16.12C373.07 184.44 384 211.83 384 256c0 23.83-3.29 42.88-9.37 60.65a8 8 0 001.9 8.26L389 337.4a8 8 0 0013.13-2.79C411 311.76 416 287.26 416 256z"/><path d="M480 256c0-74.25-20.19-121.11-50.51-168.61a16 16 0 10-27 17.22C429.82 147.38 448 189.5 448 256c0 46.19-8.43 80.27-22.43 110.53a8 8 0 001.59 9l11.92 11.92a8 8 0 0012.92-2.16C471.6 344.9 480 305 480 256z"/></svg>`;
    const SVG_FULLSCREEN_ENTER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5H6.41421L9.70711 8.29289C10.0976 8.68342 10.0976 9.31658 9.70711 9.70711C9.31658 10.0976 8.68342 10.0976 8.29289 9.70711L5 6.41421V8C5 8.55228 4.55228 9 4 9C3.44772 9 3 8.55228 3 8V4ZM16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9C19.4477 9 19 8.55228 19 8V6.41421L15.7071 9.70711C15.3166 10.0976 14.6834 10.0976 14.2929 9.70711C13.9024 9.31658 13.9024 8.68342 14.2929 8.29289L17.5858 5H16C15.4477 5 15 4.55228 15 4C15 3.44772 15.4477 3 16 3ZM9.70711 14.2929C10.0976 14.6834 10.0976 15.3166 9.70711 15.7071L6.41421 19H8C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21H4C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16V17.5858L8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929ZM14.2929 14.2929C14.6834 13.9024 15.3166 13.9024 15.7071 14.2929L19 17.5858V16C19 15.4477 19.4477 15 20 15C20.5523 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 20.5523 15 20C15 19.4477 15.4477 19 16 19H17.5858L14.2929 15.7071C13.9024 15.3166 13.9024 14.6834 14.2929 14.2929Z" fill="white"/></svg>`;
    const SVG_FULLSCREEN_EXIT  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.29289 3.29289C3.68342 2.90237 4.31658 2.90237 4.70711 3.29289L8 6.58579V5C8 4.44772 8.44772 4 9 4C9.55228 4 10 4.44772 10 5V9C10 9.55228 9.55228 10 9 10H5C4.44772 10 4 9.55228 4 9C4 8.44772 4.44772 8 5 8H6.58579L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289ZM19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289C21.0976 3.68342 21.0976 4.31658 20.7071 4.70711L17.4142 8H19C19.5523 8 20 8.44772 20 9C20 9.55228 19.5523 10 19 10H15C14.4477 10 14 9.55228 14 9V5C14 4.44772 14.4477 4 15 4C15.5523 4 16 4.44772 16 5V6.58579L19.2929 3.29289ZM4 15C4 14.4477 4.44772 14 5 14H9C9.55228 14 10 14.4477 10 15V19C10 19.5523 9.55228 20 9 20C8.44772 20 8 19.5523 8 19V17.4142L4.70711 20.7071C4.31658 21.0976 3.68342 21.0976 3.29289 20.7071C2.90237 20.3166 2.90237 19.6834 3.29289 19.2929L6.58579 16H5C4.44772 16 4 15.5523 4 15ZM14 15C14 14.4477 14.4477 14 15 14H19C19.5523 14 20 14.4477 20 15C20 15.5523 19.5523 16 19 16H17.4142L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L16 17.4142V19C16 19.5523 15.5523 20 15 20C14.4477 20 14 19.5523 14 19V15Z" fill="white"/></svg>`;
    const SVG_SEEK_FWD  = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M480 256c0 123.5-100.3 224-223.5 224C133.1 480 32 379.5 32 256S133.1 32 256.5 32C379.7 32 480 132.5 480 256z" fill="none" stroke="white" stroke-miterlimit="10" stroke-width="32"/><path d="M256 176v160M336 256H176" stroke="white" stroke-linecap="round" stroke-width="32" fill="none"/></svg>`;
    const SVG_SEEK_BACK = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M480 256c0 123.5-100.3 224-223.5 224C133.1 480 32 379.5 32 256S133.1 32 256.5 32C379.7 32 480 132.5 480 256z" fill="none" stroke="white" stroke-miterlimit="10" stroke-width="32"/><path d="M176 256h160" stroke="white" stroke-linecap="round" stroke-width="32" fill="none"/></svg>`;

    const SVG_SAVE_INACTIVE = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" style="stroke-width: 38px;"/></svg>`;
    const SVG_SAVE_ACTIVE   = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M400 480a16 16 0 01-10.63-4L256 357.41 122.63 476A16 16 0 0196 464V96a64.07 64.07 0 0164-64h192a64.07 64.07 0 0164 64v368a16 16 0 01-16 16z"/></svg>`;

    const SVG_SETTINGS = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><circle cx="256" cy="256" r="48" style="&#10;    fill: #ffffff00;&#10;"/><path d="M470.39 300l-.47-.38-31.56-24.75a16.11 16.11 0 01-6.1-13.33v-11.56a16 16 0 016.11-13.22L469.92 212l.47-.38a26.68 26.68 0 005.9-34.06l-42.71-73.9a1.59 1.59 0 01-.13-.22A26.86 26.86 0 00401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 01-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 01-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 00298.76 26h-85.52a26.92 26.92 0 00-26.45 22.39l-.09.56-5.57 39.67a16 16 0 01-8.13 11.82 175.21 175.21 0 00-10 5.82 15.92 15.92 0 01-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 00-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 005.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 016.1 13.33v11.56a16 16 0 01-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 00-5.9 34.06l42.71 73.9a1.59 1.59 0 01.13.22 26.86 26.86 0 0032.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0114.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 018.19 11.82l5.56 39.59.12.72A27.22 27.22 0 00213.24 486h85.52a26.92 26.92 0 0026.45-22.39l.09-.56 5.57-39.67a16 16 0 018.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0114.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0032.48-11.34 2.53 2.53 0 01.13-.22l42.71-73.89a26.7 26.7 0 00-5.89-34.11zm-134.48-40.24a80 80 0 11-83.66-83.67 80.21 80.21 0 0183.66 83.67z"/></svg>`;

    const SVG_SPEED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm0 375.08a167.08 167.08 0 110-334.16 167.08 167.08 0 010 334.16z"/><path d="M256 128a16 16 0 000 32 96 96 0 11-96 96 16 16 0 00-32 0 128 128 0 10128-128zM280 234.67V144a16 16 0 00-32 0v96a16 16 0 008 13.86l48 27.71a16 16 0 1016-27.71z"/></svg>`;

    const SVG_ARROW_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg>`;
    const SVG_ARROW_LEFT  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144"/></svg>`;
    const SVG_CHECK       = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="#2196F3" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M416 128L192 384l-96-96"/></svg>`;

    const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const DEFAULT_SPEED = 1;

    const ANIM_DURATION = 180;

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            || (navigator.maxTouchPoints > 1);
    }

    function formatTime(s) {
        if (isNaN(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    function getStorageKey(videoElement, suffix = 'pos') {
        const src = videoElement.src || videoElement.currentSrc || '';
        const hash = btoa(encodeURIComponent(src)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 60);
        return `cvp_${suffix}_${hash}`;
    }

    const allPlayers = [];

    window.addEventListener('beforeunload', () => {
        allPlayers.forEach(p => {
            if (p.saveCurrentPosition) p.saveCurrentPosition();
            if (p.saveCurrentVolume) p.saveCurrentVolume();
        });
    });

    window.customVideoPlayer = function(videoElement) {
        if (!videoElement) return;

        videoElement.removeAttribute('controls');
        videoElement.preload = 'metadata';

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-video-wrapper loading';
        videoElement.parentNode.insertBefore(wrapper, videoElement);
        wrapper.appendChild(videoElement);

        /* flash overlays */
        const flashLeft  = document.createElement('div');
        flashLeft.className  = 'seek-flash left';
        flashLeft.innerHTML  = SVG_SEEK_BACK + '<span>-5s</span>';
        const flashRight = document.createElement('div');
        flashRight.className = 'seek-flash right';
        flashRight.innerHTML = SVG_SEEK_FWD + '<span>+5s</span>';
        wrapper.appendChild(flashLeft);
        wrapper.appendChild(flashRight);

        /* أيقونة التشغيل/الإيقاف في المنتصف */
        const centerIcon = document.createElement('div');
        centerIcon.className = 'center-play-icon';
        centerIcon.innerHTML = SVG_PLAY;
        wrapper.appendChild(centerIcon);

        let centerIconTimer = null;
        function showCenterIcon(isPlay) {
            centerIcon.innerHTML = isPlay ? SVG_PLAY : SVG_PAUSE;
            clearTimeout(centerIconTimer);
            centerIcon.classList.remove('animate-out');
            void centerIcon.offsetWidth;
            centerIcon.classList.add('animate-in');
            centerIconTimer = setTimeout(() => {
                centerIcon.classList.remove('animate-in');
                centerIcon.classList.add('animate-out');
            }, 600);
        }

        const scanlineDiv = document.createElement('div');
        scanlineDiv.className = 'xxxxddcvf';
        scanlineDiv.innerHTML = '<div class="xxxxdww"></div>';
        wrapper.appendChild(scanlineDiv);

        /* ===== زر الإعدادات ===== */
        const settingsCorner = document.createElement('div');
        settingsCorner.className = 'cvp-settings-corner';

        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'cvp-settings-btn';
        settingsBtn.title = 'الإعدادات';
        settingsBtn.innerHTML = SVG_SETTINGS;

        settingsCorner.appendChild(settingsBtn);
        wrapper.appendChild(settingsCorner);

        let currentSpeed  = DEFAULT_SPEED;
        let activeMenuEl  = null;
        let backdropEl    = null;
        let isAnimating   = false;

        function getSpeedLabel(s) {
            return s === 1 ? 'عادي' : s + 'x';
        }

        function buildSettingsMenu() {
            const menu = document.createElement('div');
            menu.className = 'cvp-settings-menu';
            menu.innerHTML = `
                <button class="cvp-settings-menu-item cvp-speed-trigger">
                    ${SVG_SPEED}
                    <span>سرعة التشغيل</span>
                    <span class="cvp-menu-item-right">
                        <span class="cvp-current-speed-label">${getSpeedLabel(currentSpeed)}</span>
                        ${SVG_ARROW_RIGHT}
                    </span>
                </button>
            `;
            menu.querySelector('.cvp-speed-trigger').addEventListener('click', (e) => {
                e.stopPropagation();
                swapMenu('speed');
            });
            menu.addEventListener('click', (e) => e.stopPropagation());
            return menu;
        }

        function buildSpeedMenu() {
            const menu = document.createElement('div');
            menu.className = 'cvp-speed-menu';
            let html = `
                <div class="cvp-speed-menu-header">
                    <button class="cvp-speed-back-btn" title="رجوع">${SVG_ARROW_LEFT}</button>
                    <span class="cvp-speed-menu-title">سرعة التشغيل</span>
                </div>
            `;
            SPEED_OPTIONS.forEach(speed => {
                const label       = speed === 1 ? 'عادي (1x)' : speed + 'x';
                const activeClass = speed === currentSpeed ? 'active' : '';
                html += `
                    <button class="cvp-speed-option ${activeClass}" data-speed="${speed}">
                        <span>${label}</span>
                        <span class="cvp-speed-check">${SVG_CHECK}</span>
                    </button>
                `;
            });
            menu.innerHTML = html;
            menu.querySelector('.cvp-speed-back-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                swapMenu('settings');
            });
            menu.querySelectorAll('.cvp-speed-option').forEach(opt => {
                opt.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const speed = parseFloat(opt.dataset.speed);
                    currentSpeed = speed;
                    videoElement.playbackRate = speed;
                    closeAll();
                });
            });
            menu.addEventListener('click', (e) => e.stopPropagation());
            return menu;
        }

        function createBackdrop() {
            const bd = document.createElement('div');
            bd.className = 'cvp-backdrop';
            bd.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                closeAll();
            });
            bd.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                closeAll();
            }, { passive: true });
            return bd;
        }

        function mountMenu(menuEl) {
            if (!backdropEl) {
                backdropEl = createBackdrop();
                wrapper.insertBefore(backdropEl, settingsCorner);
            }
            settingsCorner.appendChild(menuEl);
            activeMenuEl = menuEl;
            settingsBtn.classList.add('open');
            // إخفاء شريط التحكم عند فتح الإعدادات
            wrapper.classList.add('settings-open');
        }

        function unmountCurrent(callback) {
            if (!activeMenuEl) { if (callback) callback(); return; }
            const el = activeMenuEl;
            activeMenuEl = null;
            el.classList.add('hiding');
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
                if (callback) callback();
            }, ANIM_DURATION);
        }

        function unmountBackdrop() {
            if (!backdropEl) return;
            const bd = backdropEl;
            backdropEl = null;
            bd.classList.add('hiding');
            setTimeout(() => {
                if (bd.parentNode) bd.parentNode.removeChild(bd);
            }, ANIM_DURATION);
        }

        function openSettings() {
            if (isAnimating) return;
            isAnimating = true;
            const menu = buildSettingsMenu();
            mountMenu(menu);
            setTimeout(() => { isAnimating = false; }, ANIM_DURATION);
        }

        function swapMenu(target) {
            if (isAnimating) return;
            isAnimating = true;
            unmountCurrent(() => {
                const menu = target === 'speed' ? buildSpeedMenu() : buildSettingsMenu();
                settingsCorner.appendChild(menu);
                activeMenuEl = menu;
                setTimeout(() => { isAnimating = false; }, ANIM_DURATION);
            });
        }

        function closeAll() {
            settingsBtn.classList.remove('open');
            unmountCurrent();
            unmountBackdrop();
            // إظهار شريط التحكم عند إغلاق الإعدادات
            wrapper.classList.remove('settings-open');
        }

        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeMenuEl) {
                closeAll();
            } else {
                openSettings();
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (activeMenuEl && !wrapper.contains(e.target)) {
                closeAll();
            }
        });

        /* ===== شريط التحكم ===== */
        const controls = document.createElement('div');
        controls.className = 'custom-controls';
        controls.innerHTML = `
            <div class="custom-progress">
                <div class="progress-track">
                    <div class="progress-buffered"></div>
                    <div class="progress-fill"></div>
                    <div class="progress-thumb"></div>
                    <div class="progress-tooltip">0:00</div>
                </div>
            </div>
            <div class="ccvvvvf00f">
                <div class="kky66657e0">
                <div class="custom-buttons">
                    <button class="custom-play">${SVG_PLAY}</button>
                    <button class="custom-restart" title="Restart">${SVG_RESTART}</button>
                </div>
                <div class="custom-volume">
                    <span class="volume-icon">${SVG_VOL_ON}</span>
                    <div class="volume-track-wrap">
                        <div class="volume-track">
                            <div class="volume-fill"></div>
                            <div class="volume-thumb"></div>
                        </div>
                    </div>
                </div>
                <div class="time1">00:00</div><xxsde></xxsde>
                <div class="time">00:00</div>
                </div>
                <div class="coooomf">
                    <button class="Video-save" title="حفظ موضع التشغيل">${SVG_SAVE_INACTIVE}</button>
                    <button class="veowc2s0d" title="Old TV quality"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" width="16" height="16"> <path fill="currentColor" fill-rule="evenodd" d="M3 3.5h10A1.5 1.5 0 0 1 14.5 5v5a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 10V5A1.5 1.5 0 0 1 3 3.5m-.21 9.493A3 3 0 0 1 0 10V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5a3 3 0 0 1-2.79 2.993l.46.922a.75.75 0 1 1-1.34.67L11.536 13H4.464l-.793 1.585a.75.75 0 1 1-1.342-.67z" clip-rule="evenodd"/> </svg></button>
                    <button class="custom-fullscreen">${SVG_FULLSCREEN_ENTER}</button>
                </div>
            </div>
        `;
        wrapper.appendChild(controls);

        const progressTrack    = controls.querySelector('.progress-track');
        const progressFill     = controls.querySelector('.progress-fill');
        const progressBuffered = controls.querySelector('.progress-buffered');
        const progressThumb    = controls.querySelector('.progress-thumb');
        const progressTooltip  = controls.querySelector('.progress-tooltip');
        const volumeTrack      = controls.querySelector('.volume-track');
        const volumeFill       = controls.querySelector('.volume-fill');
        const volumeThumb      = controls.querySelector('.volume-thumb');
        const volumeWrap       = controls.querySelector('.custom-volume');
        const playBtn          = controls.querySelector('.custom-play');
        const restartBtn       = controls.querySelector('.custom-restart');
        const fullscreenBtn    = controls.querySelector('.custom-fullscreen');
        const volumeIcon       = controls.querySelector('.volume-icon');
        const timeDisplay      = controls.querySelector('.time');
        const totalTimeDisplay = controls.querySelector('.time1');
        const toggleScanBtn    = controls.querySelector('.veowc2s0d');
        const saveBtn          = controls.querySelector('.Video-save');

        const allButtons = [playBtn, restartBtn, fullscreenBtn, toggleScanBtn, saveBtn, volumeIcon];
        const volumeTrackDiv = volumeTrack;

        function setControlsDisabled(disabled) {
            allButtons.forEach(btn => {
                if (disabled) {
                    btn.setAttribute('disabled', 'disabled');
                    btn.classList.add('disabled');
                } else {
                    btn.removeAttribute('disabled');
                    btn.classList.remove('disabled');
                }
            });
            if (disabled) {
                volumeTrackDiv.style.pointerEvents = 'none';
                volumeTrackDiv.style.opacity = '0.5';
            } else {
                volumeTrackDiv.style.pointerEvents = 'auto';
                volumeTrackDiv.style.opacity = '1';
            }
        }

        setControlsDisabled(true);

        function updateTotalTimeDisplay() {
            const duration = videoElement.duration;
            if (!isNaN(duration) && duration !== Infinity) {
                totalTimeDisplay.textContent = formatTime(duration);
            } else {
                totalTimeDisplay.textContent = '00:00';
            }
        }

        videoElement.addEventListener('canplay', () => {
            wrapper.classList.remove('loading');
            setControlsDisabled(false);
            updateTotalTimeDisplay();
        }, { once: true });

        videoElement.addEventListener('error', () => {
            wrapper.classList.remove('loading');
            setControlsDisabled(false);
        });

        videoElement.addEventListener('durationchange', updateTotalTimeDisplay);

        /* حفظ واستعادة مستوى الصوت */
        let volumeStorageKey = null;
        function getVolumeKey() {
            if (!volumeStorageKey) volumeStorageKey = getStorageKey(videoElement, 'vol');
            return volumeStorageKey;
        }
        function saveCurrentVolume() {
            if (videoElement.volume !== undefined && !videoElement.muted) {
                try { localStorage.setItem(getVolumeKey(), videoElement.volume.toString()); } catch(e) {}
            } else if (videoElement.muted) {
                try { localStorage.setItem(getVolumeKey(), '0'); } catch(e) {}
            }
        }
        function restoreVolume() {
            try {
                const saved = localStorage.getItem(getVolumeKey());
                if (saved !== null) {
                    let vol = parseFloat(saved);
                    if (!isNaN(vol)) {
                        if (vol === 0) {
                            videoElement.muted = true;
                            videoElement.volume = 0;
                        } else {
                            videoElement.muted = false;
                            videoElement.volume = Math.min(1, Math.max(0, vol));
                        }
                        setVolume(videoElement.muted ? 0 : videoElement.volume);
                    }
                } else {
                    setVolume(1);
                }
            } catch(e) { setVolume(1); }
        }

        let isSaving    = false;
        let saveInterval = null;
        let storageKey  = null;

        function getPosKey() {
            if (!storageKey) storageKey = getStorageKey(videoElement, 'pos');
            return storageKey;
        }

        function updateSaveIcon() {
            saveBtn.innerHTML = isSaving ? SVG_SAVE_ACTIVE : SVG_SAVE_INACTIVE;
            if (isSaving) saveBtn.classList.add('active');
            else saveBtn.classList.remove('active');
        }

        function saveCurrentPosition() {
            if (!isSaving) return;
            const t = videoElement.currentTime;
            if (!isNaN(t) && t > 0) {
                try { localStorage.setItem(getPosKey(), t.toString()); } catch(e) {}
            }
        }

        function restoreSavedPosition() {
            try {
                const saved = localStorage.getItem(getPosKey());
                if (saved !== null) {
                    const t = parseFloat(saved);
                    if (!isNaN(t) && t > 0) {
                        isSaving = true;
                        updateSaveIcon();
                        videoElement.currentTime = t;
                    }
                }
            } catch(e) {}
        }

        function startSaving() {
            isSaving = true;
            updateSaveIcon();
            saveCurrentPosition();
            saveInterval = setInterval(saveCurrentPosition, 1000);
        }

        function stopSaving() {
            isSaving = false;
            updateSaveIcon();
            clearInterval(saveInterval);
            saveInterval = null;
            try { localStorage.removeItem(getPosKey()); } catch(e) {}
        }

        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isSaving) stopSaving();
            else startSaving();
        });

        videoElement.addEventListener('seeked', () => saveCurrentPosition());
        videoElement.addEventListener('timeupdate', () => { if (isSaving) saveCurrentPosition(); });

        videoElement.addEventListener('loadedmetadata', () => {
            storageKey = getStorageKey(videoElement, 'pos');
            restoreSavedPosition();
            restoreVolume();
            updateProgressBar();
            updateTotalTimeDisplay();
        });

        allPlayers.push({ videoElement, wrapper, saveCurrentPosition, saveCurrentVolume });

        /* إدارة ظهور عناصر التحكم */
        let hideTimeout = null;

        // متغير لتتبع ما إذا كانت أدوات التحكم مرئية على الهاتف
        let mobileControlsVisible = false;

        function showControls() {
            wrapper.classList.add('controls-visible');
            wrapper.classList.remove('cursor-hidden');
            if (isMobileDevice()) {
                mobileControlsVisible = true;
            }
        }
        function scheduleHide() {
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                if (!videoElement.paused) {
                    wrapper.classList.remove('controls-visible');
                    wrapper.classList.add('cursor-hidden');
                    if (isMobileDevice()) {
                        mobileControlsVisible = false;
                    }
                }
            }, 3000);
        }
        function updateControlsVisibility() {
            if (videoElement.paused) { showControls(); clearTimeout(hideTimeout); }
            else { scheduleHide(); }
        }

        wrapper.addEventListener('mousemove', () => {
            showControls();
            if (!videoElement.paused) scheduleHide();
        });
        wrapper.addEventListener('mouseleave', () => {
            if (!videoElement.paused) {
                clearTimeout(hideTimeout);
                wrapper.classList.remove('controls-visible');
                wrapper.classList.remove('cursor-hidden');
                if (isMobileDevice()) {
                    mobileControlsVisible = false;
                }
            }
        });

        function updateTimeDisplay() {
            const remaining = (videoElement.duration || 0) - (videoElement.currentTime || 0);
            timeDisplay.textContent = formatTime(remaining);
        }

        function updateProgressBar() {
            if (!videoElement.duration) return;
            const pct = (videoElement.currentTime / videoElement.duration) * 100;
            progressFill.style.width  = pct + '%';
            progressThumb.style.left  = pct + '%';
            updateTimeDisplay();
        }

        function updateBuffered() {
            if (!videoElement.duration || !videoElement.buffered.length) return;
            const pct = (videoElement.buffered.end(videoElement.buffered.length - 1) / videoElement.duration) * 100;
            progressBuffered.style.width = pct + '%';
        }

        function getPctFromEvent(e, trackElement) {
            const rect = trackElement.getBoundingClientRect();
            let x = e.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            return x / rect.width;
        }

        function getPctFromTouch(touch, trackElement) {
            const rect = trackElement.getBoundingClientRect();
            let x = touch.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            return x / rect.width;
        }

        function applySeekPct(pct) {
            if (!videoElement.duration) return;
            const newTime = pct * videoElement.duration;
            videoElement.currentTime = newTime;
            progressFill.style.width = (pct * 100) + '%';
            progressThumb.style.left = (pct * 100) + '%';
            const remaining = videoElement.duration - newTime;
            timeDisplay.textContent = formatTime(remaining);
        }

        function updateTooltip(clientX) {
            if (!videoElement.duration) return;
            const rect = progressTrack.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const pct = x / rect.width;
            const elapsed = pct * videoElement.duration;
            progressTooltip.textContent = formatTime(elapsed);
            progressTooltip.style.left = x + 'px';
        }

        /* ===== شريط التقدم - ماوس ===== */
        let seekingProgress = false;
        progressTrack.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            seekingProgress = true;
            progressTrack.classList.add('dragging');
            applySeekPct(getPctFromEvent(e, progressTrack));
        });

        document.addEventListener('mousemove', (e) => {
            if (seekingProgress) {
                applySeekPct(getPctFromEvent(e, progressTrack));
                updateTooltip(e.clientX);
            } else if (seekingVolume) {
                volFromClientX(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            if (seekingProgress) {
                seekingProgress = false;
                progressTrack.classList.remove('dragging');
            }
            if (seekingVolume) {
                seekingVolume = false;
            }
        });

        progressTrack.addEventListener('mousemove', (e) => {
            updateTooltip(e.clientX);
        });

        /* ===== شريط التقدم - لمس ===== */
        let touchSeekingProgress = false;

        progressTrack.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            e.preventDefault();
            touchSeekingProgress = true;
            progressTrack.classList.add('dragging');
            const touch = e.touches[0];
            applySeekPct(getPctFromTouch(touch, progressTrack));
            updateTooltip(touch.clientX);
            showControls();
        }, { passive: false });

        progressTrack.addEventListener('touchmove', (e) => {
            if (!touchSeekingProgress) return;
            e.stopPropagation();
            e.preventDefault();
            const touch = e.touches[0];
            applySeekPct(getPctFromTouch(touch, progressTrack));
            updateTooltip(touch.clientX);
        }, { passive: false });

        progressTrack.addEventListener('touchend', (e) => {
            if (!touchSeekingProgress) return;
            e.stopPropagation();
            touchSeekingProgress = false;
            progressTrack.classList.remove('dragging');
            scheduleHide();
        }, { passive: true });

        progressTrack.addEventListener('touchcancel', () => {
            touchSeekingProgress = false;
            progressTrack.classList.remove('dragging');
        }, { passive: true });

        /* ===== شريط الصوت - ماوس ===== */
        let seekingVolume = false;

        function volFromClientX(clientX) {
            const rect = volumeTrack.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            setVolume(x / rect.width);
        }

        volumeTrack.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            seekingVolume = true;
            volFromClientX(e.clientX);
        });

        /* ===== شريط الصوت - لمس ===== */
        let touchSeekingVolume = false;
        let volumeTouchExpandTimer = null;

        volumeIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isMobileDevice()) {
                volumeWrap.classList.add('touch-expanded');
                clearTimeout(volumeTouchExpandTimer);
                volumeTouchExpandTimer = setTimeout(() => {
                    volumeWrap.classList.remove('touch-expanded');
                }, 3000);
            }
            toggleMute();
        });

        volumeTrack.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            e.preventDefault();
            touchSeekingVolume = true;
            volumeTrack.style.height = '6px';
            const touch = e.touches[0];
            const rect = volumeTrack.getBoundingClientRect();
            let x = touch.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            setVolume(x / rect.width);
            showControls();
            clearTimeout(volumeTouchExpandTimer);
        }, { passive: false });

        volumeTrack.addEventListener('touchmove', (e) => {
            if (!touchSeekingVolume) return;
            e.stopPropagation();
            e.preventDefault();
            const touch = e.touches[0];
            const rect = volumeTrack.getBoundingClientRect();
            let x = touch.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            setVolume(x / rect.width);
        }, { passive: false });

        volumeTrack.addEventListener('touchend', (e) => {
            if (!touchSeekingVolume) return;
            e.stopPropagation();
            touchSeekingVolume = false;
            volumeTrack.style.height = '';
            volumeTouchExpandTimer = setTimeout(() => {
                volumeWrap.classList.remove('touch-expanded');
            }, 2000);
        }, { passive: true });

        volumeTrack.addEventListener('touchcancel', () => {
            touchSeekingVolume = false;
            volumeTrack.style.height = '';
        }, { passive: true });

        videoElement.addEventListener('timeupdate', updateProgressBar);
        videoElement.addEventListener('progress', updateBuffered);

        function setVolume(vol) {
            vol = Math.max(0, Math.min(1, vol));
            videoElement.volume = vol;
            videoElement.muted = (vol === 0);
            volumeFill.style.width = (vol * 100) + '%';
            volumeThumb.style.left = (vol * 100) + '%';
            volumeIcon.innerHTML = (vol === 0) ? SVG_VOL_OFF : SVG_VOL_ON;
            saveCurrentVolume();
        }

        function toggleMute() {
            if (videoElement.muted || videoElement.volume === 0) {
                const restoreVol = videoElement._lastVol || 1;
                setVolume(restoreVol);
            } else {
                videoElement._lastVol = videoElement.volume;
                setVolume(0);
            }
        }

        function updatePlayButton() {
            playBtn.innerHTML = videoElement.paused ? SVG_PLAY : SVG_PAUSE;
        }
        function pauseOthers() {
            allPlayers.forEach(p => {
                if (p.videoElement !== videoElement && !p.videoElement.paused) p.videoElement.pause();
            });
        }
        function playPause() {
            if (videoElement.paused) {
                pauseOthers();
                videoElement.play();
                showCenterIcon(false);
            } else {
                videoElement.pause();
                showCenterIcon(true);
            }
        }
        function restartVideo() {
            pauseOthers();
            videoElement.currentTime = 0;
            videoElement.play();
            showCenterIcon(false);
        }

        /* ===== نظام تراكم الـ seek (السهام واللمس) ===== */
        // متغيرات لتراكم مقدار التقديم/التأخير
        let seekAccumLeft  = 0;   // مجموع الثواني للجهة اليسرى
        let seekAccumRight = 0;   // مجموع الثواني للجهة اليمنى
        let seekResetTimerLeft  = null;
        let seekResetTimerRight = null;
        const SEEK_RESET_DELAY  = 1000; // ms بعد آخر ضغطة نعيد العداد

        function showFlash(side, seconds) {
            const el = side === 'left' ? flashLeft : flashRight;
            const label = side === 'left' ? '-' : '+';
            el.querySelector('span').textContent = label + seconds + 's';
            el.classList.add('show');

            // نلغي أي مؤقت إخفاء سابق لهذه الجهة
            if (side === 'left') {
                clearTimeout(flashLeft._hideTimer);
                flashLeft._hideTimer = setTimeout(() => el.classList.remove('show'), 800);
            } else {
                clearTimeout(flashRight._hideTimer);
                flashRight._hideTimer = setTimeout(() => el.classList.remove('show'), 800);
            }
        }

        function seekBy(seconds) {
            const side = seconds < 0 ? 'left' : 'right';

            if (side === 'left') {
                clearTimeout(seekResetTimerLeft);
                seekAccumLeft += Math.abs(seconds);
                videoElement.currentTime = Math.max(0, videoElement.currentTime - Math.abs(seconds));
                showFlash('left', seekAccumLeft);
                seekResetTimerLeft = setTimeout(() => { seekAccumLeft = 0; }, SEEK_RESET_DELAY);
            } else {
                clearTimeout(seekResetTimerRight);
                seekAccumRight += Math.abs(seconds);
                videoElement.currentTime = Math.min(videoElement.duration || 0, videoElement.currentTime + Math.abs(seconds));
                showFlash('right', seekAccumRight);
                seekResetTimerRight = setTimeout(() => { seekAccumRight = 0; }, SEEK_RESET_DELAY);
            }

            updateProgressBar();
        }

        /* =========================================================
           منطق اللمس على الهاتف
           - أول لمسة على الشاشة (عندما تكون الأدوات مخفية): تُظهر الأدوات فقط
           - اللمسة التالية: تشغيل/إيقاف أو double tap للتقديم/التأخير
        ========================================================= */

        const SCROLL_THRESHOLD = 10;
        const TAP_MOVE_LIMIT   = 8;
        const TAP_DELAY        = 300;

        let touchStartX      = 0;
        let touchStartY      = 0;
        let touchMoved       = false;
        let touchIsScrolling = false;
        let tapCount         = 0;
        let tapTimer         = null;
        let tapSide          = null;

        wrapper.addEventListener('touchstart', (e) => {
            const target = e.target;
            const isOnControls =
                target.closest('.custom-controls') ||
                target.closest('.cvp-settings-corner') ||
                target.closest('.seek-flash');
            if (isOnControls) return;

            const touch = e.touches[0];
            touchStartX      = touch.clientX;
            touchStartY      = touch.clientY;
            touchMoved       = false;
            touchIsScrolling = false;
        }, { passive: true });

        wrapper.addEventListener('touchmove', (e) => {
            const target = e.target;
            const isOnControls =
                target.closest('.custom-controls') ||
                target.closest('.cvp-settings-corner');
            if (isOnControls) return;

            const touch = e.touches[0];
            const dx = touch.clientX - touchStartX;
            const dy = touch.clientY - touchStartY;
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);

            if (!touchMoved && (absDx > TAP_MOVE_LIMIT || absDy > TAP_MOVE_LIMIT)) {
                touchMoved = true;
            }

            if (!touchIsScrolling) {
                if (absDy > SCROLL_THRESHOLD && absDy > absDx) {
                    touchIsScrolling = true;
                }
            }

            if (!touchIsScrolling) {
                e.preventDefault();
            }
        }, { passive: false });

        wrapper.addEventListener('touchend', (e) => {
            const target = e.target;
            const isOnControls =
                target.closest('.custom-controls') ||
                target.closest('.cvp-settings-corner') ||
                target.closest('.seek-flash');
            if (isOnControls) return;

            if (touchIsScrolling || touchMoved) {
                touchIsScrolling = false;
                touchMoved = false;
                return;
            }

            e.preventDefault();

            // إذا كانت أدوات التحكم مخفية → أظهرها فقط ولا تفعل شيئاً آخر
            if (!mobileControlsVisible) {
                showControls();
                scheduleHide();
                touchMoved       = false;
                touchIsScrolling = false;
                return;
            }

            // إذا كانت قائمة الإعدادات مفتوحة → أغلقها
            if (activeMenuEl) {
                closeAll();
                touchMoved       = false;
                touchIsScrolling = false;
                return;
            }

            // الأدوات مرئية → تشغيل/إيقاف أو double tap
            const touch  = e.changedTouches[0];
            const rect   = wrapper.getBoundingClientRect();
            const touchX = touch.clientX - rect.left;
            const side   = touchX < rect.width / 2 ? 'left' : 'right';

            if (tapCount === 1 && tapSide === side) {
                // double tap → تقديم أو تأخير
                clearTimeout(tapTimer);
                tapCount = 0;
                tapSide  = null;

                const wasPaused = videoElement.paused;
                if (side === 'right') {
                    seekBy(5);
                } else {
                    seekBy(-5);
                }
                if (!wasPaused && videoElement.paused) {
                    videoElement.play();
                }
                showControls();
                if (!videoElement.paused) scheduleHide();

            } else {
                // single tap → انتظر لتحديد إذا كان double tap
                tapCount = 1;
                tapSide  = side;
                clearTimeout(tapTimer);
                tapTimer = setTimeout(() => {
                    if (tapCount === 1) {
                        playPause();
                        showControls();
                        updateControlsVisibility();
                    }
                    tapCount = 0;
                    tapSide  = null;
                }, TAP_DELAY);
            }

            touchMoved       = false;
            touchIsScrolling = false;
        }, { passive: false });

        wrapper.addEventListener('touchcancel', () => {
            touchMoved       = false;
            touchIsScrolling = false;
        }, { passive: true });

        /* ===== لوحة المفاتيح ===== */
        wrapper.setAttribute('tabindex', '0');
        wrapper.addEventListener('keydown', (e) => {
            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    playPause();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    seekBy(5);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    seekBy(-5);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setVolume(videoElement.volume + 0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setVolume(videoElement.volume - 0.1);
                    break;
                case 'f':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'm':
                    e.preventDefault();
                    toggleMute();
                    break;
                case 'Escape':
                    if (activeMenuEl) { e.preventDefault(); closeAll(); }
                    break;
            }
        });

        function updateFullscreenButton() {
            fullscreenBtn.innerHTML = document.fullscreenElement ? SVG_FULLSCREEN_EXIT : SVG_FULLSCREEN_ENTER;
        }
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                wrapper.requestFullscreen().catch(err => console.log(err.message));
            } else {
                document.exitFullscreen();
            }
        }
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement === wrapper) {
                document.body.classList.add('dideofullscreen');
            } else if (!document.fullscreenElement) {
                document.body.classList.remove('dideofullscreen');
            }
            updateFullscreenButton();
        });

        toggleScanBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (scanlineDiv.style.display === 'block') {
                scanlineDiv.style.display = 'none';
                toggleScanBtn.classList.remove('active');
            } else {
                scanlineDiv.style.display = 'block';
                toggleScanBtn.classList.add('active');
            }
        });

        scanlineDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            playPause();
        });

        videoElement.addEventListener('click', (e) => {
            if (!isMobileDevice()) {
                e.stopPropagation();
                playPause();
            }
        });

        playBtn.addEventListener('click', (e) => { e.stopPropagation(); playPause(); });
        restartBtn.addEventListener('click', (e) => { e.stopPropagation(); restartVideo(); });
        fullscreenBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleFullscreen(); });

        videoElement.addEventListener('play',  () => { updatePlayButton(); updateControlsVisibility(); });
        videoElement.addEventListener('pause', () => { updatePlayButton(); updateControlsVisibility(); });
        videoElement.addEventListener('ended', () => { updatePlayButton(); updateControlsVisibility(); });

        showControls();
        updatePlayButton();
        updateTimeDisplay();
        updateSaveIcon();
        updateTotalTimeDisplay();

        return wrapper;
    };

    window.applyToAllVideos = function() {
        document.querySelectorAll('video:not([data-customized])').forEach(video => {
            customVideoPlayer(video);
            video.setAttribute('data-customized', 'true');
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyToAllVideos);
    } else {
        applyToAllVideos();
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => { if (m.addedNodes.length) applyToAllVideos(); });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
