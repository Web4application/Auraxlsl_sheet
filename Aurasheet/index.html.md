<html lang="en"
	
	<head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aura Spreadsheet</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
     
		/* Custom scrollbars */
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; border-left: 1px solid #e5e5e5; border-top: 1px solid #e5e5e5; }
        ::-webkit-scrollbar-thumb { background: #d4d4d4; border: 2px solid #f5f5f5; border-radius: 6px; }
        ::-webkit-scrollbar-thumb:hover { background: #a3a3a3; }
        ::-webkit-scrollbar-corner { background: #f5f5f5; }

        /* Hide number inputs arrows */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        
        /* Spreadsheet Cell Focus Logic */
        .cell-input { position: relative; }
        .cell-input:focus {
            outline: none;
            box-shadow: inset 0 0 0 2px #4f46e5;
            z-index: 10;
            background-color: white;
        }
        /* Fake fill handle on focus */
        .cell-input:focus::after {
            content: '';
            position: absolute;
            bottom: -3px;
            right: -3px;
            width: 6px;
            height: 6px;
            background-color: #4f46e5;
            border: 1px solid white;
            z-index: 11;
            cursor: crosshair;
        }

        /* Styling to make table layout behave perfectly */
        table { border-spacing: 0; }
        th, td { padding: 0; background-clip: padding-box; }
    </style>
</head>
<body class="bg-white text-neutral-800 font-sans h-screen w-screen flex flex-col overflow-hidden text-sm selection:bg-indigo-100 selection:text-indigo-900" style="font-family: 'Inter', sans-serif;">

    <!-- Top Navigation -->
    <header class="flex items-center justify-between px-4 py-2 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur-sm shrink-0">
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
                <div class="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-white">
                    <iconify-icon icon="solar:document-text-linear" style="stroke-width: 1.5;"></iconify-icon>
                </div>
                <div class="font-medium text-lg tracking-tighter text-neutral-900 leading-none mt-0.5">AURA</div>
            </div>
            
            <div class="flex flex-col gap-0.5">
                <input type="text" value="Q3 Financial Projections" class="text-sm font-medium bg-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-300 rounded px-1 -ml-1 text-neutral-900 w-64 truncate hover:bg-neutral-200/50 transition-colors">
                <nav class="flex gap-0.5 text-xs text-neutral-500 -ml-2 mt-0.5">
                    <button class="px-2 py-0.5 hover:bg-neutral-200/60 rounded transition-colors text-neutral-900">File</button>
                    <button class="px-2 py-0.5 hover:bg-neutral-200/60 rounded transition-colors">Edit</button>
                    <button class="px-2 py-0.5 hover:bg-neutral-200/60 rounded transition-colors">View</button>
                    <button class="px-2 py-0.5 hover:bg-neutral-200/60 rounded transition-colors">Insert</button>
                    <button class="px-2 py-0.5 hover:bg-neutral-200/60 rounded transition-colors">Format</button>
                    <button class="px-2 py-0.5 hover:bg-neutral-200/60 rounded transition-colors">Data</button>
                    <button class="px-2 py-0.5 hover:bg-neutral-200/60 rounded transition-colors">Tools</button>
                    <button class="px-2 py-0.5 hover:bg-neutral-200/60 rounded transition-colors">Help</button>
                </nav>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <button class="text-neutral-500 hover:text-neutral-900 transition-colors p-1.5 rounded-full hover:bg-neutral-100">
                <iconify-icon icon="solar:history-linear" style="stroke-width: 1.5;" class="text-lg"></iconify-icon>
            </button>
            <button class="text-neutral-500 hover:text-neutral-900 transition-colors p-1.5 rounded-full hover:bg-neutral-100">
                <iconify-icon icon="solar:chat-round-dots-linear" style="stroke-width: 1.5;" class="text-lg"></iconify-icon>
            </button>
            <button class="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium hover:bg-indigo-100 transition-colors border border-indigo-200/50">
                <iconify-icon icon="solar:lock-keyhole-linear" style="stroke-width: 1.5;"></iconify-icon> Share
            </button>
            <div class="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium ring-2 ring-white shadow-sm cursor-pointer">W</div>
        </div>
    </header>

    <!-- Formatting Toolbar -->
    <div class="flex items-center px-2 py-1.5 border-b border-neutral-200 bg-white overflow-x-auto scrollbar-hide shrink-0 gap-1 shadow-sm relative z-40">
        <!-- History/Print -->
        <div class="flex items-center px-1 gap-0.5">
            <button class="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:undo-left-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:undo-right-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex ml-1"><iconify-icon icon="solar:printer-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:paint-roller-linear" style="stroke-width: 1.5;"></iconify-icon></button>
        </div>
        
        <div class="w-px h-5 bg-neutral-200 mx-1"></div>

        <!-- Formatting Basics -->
        <div class="flex items-center gap-1">
            <button class="flex items-center gap-1 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-100 rounded transition-colors border border-transparent hover:border-neutral-200">
                100% <iconify-icon icon="solar:alt-arrow-down-linear" style="stroke-width: 1.5;"></iconify-icon>
            </button>
            <button class="flex items-center gap-1 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-100 rounded transition-colors border border-transparent hover:border-neutral-200">
                $ <iconify-icon icon="solar:alt-arrow-down-linear" style="stroke-width: 1.5;"></iconify-icon>
            </button>
            <button class="flex items-center gap-1 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-100 rounded transition-colors border border-transparent hover:border-neutral-200">
                123 <iconify-icon icon="solar:alt-arrow-down-linear" style="stroke-width: 1.5;"></iconify-icon>
            </button>
        </div>

        <div class="w-px h-5 bg-neutral-200 mx-1"></div>

        <!-- Font -->
        <div class="flex items-center gap-1">
            <button class="flex items-center justify-between w-28 px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-100 rounded transition-colors border border-transparent hover:border-neutral-200 truncate">
                <span class="truncate">Inter</span>
                <iconify-icon icon="solar:alt-arrow-down-linear" style="stroke-width: 1.5;" class="text-neutral-400 ml-1 shrink-0"></iconify-icon>
            </button>
            
            <div class="flex items-center border border-neutral-200 rounded overflow-hidden">
                <button class="px-2 py-0.5 hover:bg-neutral-100 text-neutral-500 transition-colors border-r border-neutral-200 flex"><iconify-icon icon="solar:minus-linear" style="stroke-width: 1.5;"></iconify-icon></button>
                <input type="number" value="10" class="w-8 text-center text-xs focus:outline-none bg-transparent">
                <button class="px-2 py-0.5 hover:bg-neutral-100 text-neutral-500 transition-colors border-l border-neutral-200 flex"><iconify-icon icon="solar:add-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            </div>
        </div>

        <div class="w-px h-5 bg-neutral-200 mx-1"></div>

        <!-- Typography tools -->
        <div class="flex items-center gap-0.5">
            <button class="p-1.5 text-neutral-900 bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:text-bold-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:text-italic-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:text-strikethrough-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors relative flex ml-1">
                <iconify-icon icon="solar:letter-linear" style="stroke-width: 1.5;"></iconify-icon>
                <div class="absolute bottom-1.5 left-2 right-2 h-[2px] bg-neutral-900 rounded-full"></div>
            </button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors relative flex">
                <iconify-icon icon="solar:bucket-linear" style="stroke-width: 1.5;"></iconify-icon>
                <div class="absolute bottom-1.5 left-2 right-2 h-[2px] bg-white border border-neutral-300 rounded-full"></div>
            </button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex ml-1"><iconify-icon icon="solar:border-all-linear" style="stroke-width: 1.5;"></iconify-icon></button>
        </div>

        <div class="w-px h-5 bg-neutral-200 mx-1"></div>

        <!-- Alignment -->
        <div class="flex items-center gap-0.5">
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:align-left-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-900 bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:align-center-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:align-right-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex ml-1"><iconify-icon icon="solar:align-vertical-center-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex ml-1"><iconify-icon icon="solar:text-wrap-linear" style="stroke-width: 1.5;"></iconify-icon></button>
        </div>

        <div class="w-px h-5 bg-neutral-200 mx-1"></div>
        
        <!-- Insert / Data tools -->
        <div class="flex items-center gap-0.5">
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:link-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:chat-round-line-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:chart-square-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:filter-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="flex items-center gap-1 p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors">
                <iconify-icon icon="solar:math-linear" style="stroke-width: 1.5;"></iconify-icon>
                <iconify-icon icon="solar:alt-arrow-down-linear" style="stroke-width: 1.5;" class="text-[10px]"></iconify-icon>
            </button>
        </div>
    </div>

    <!-- Formula Bar -->
    <div class="flex items-center px-2 py-1.5 border-b border-neutral-200 bg-white gap-2 shrink-0 z-30">
        <div class="flex items-center border border-neutral-200 rounded bg-white w-24 overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
            <input type="text" value="D4" class="w-full text-xs px-2 py-1 focus:outline-none text-neutral-700 font-medium">
        </div>
        <div class="w-px h-4 bg-neutral-200"></div>
        <div class="text-neutral-400 flex items-center justify-center"><iconify-icon icon="solar:math-linear" style="stroke-width: 1.5;"></iconify-icon></div>
        <div class="flex-1 flex items-center border border-transparent focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 rounded bg-white transition-shadow">
            <input type="text" class="w-full text-sm px-2 py-1 focus:outline-none text-neutral-800 font-mono" value="=SUM(D2:D3)" placeholder="Enter a formula or value">
        </div>
    </div>

    <!-- Main Workspace (Grid) -->
    <div class="flex-1 overflow-auto bg-neutral-100 relative shadow-inner">
        <table class="w-max min-w-full bg-white text-xs select-none">
            <thead class="bg-neutral-50/90 backdrop-blur text-neutral-500 font-medium select-none">
                <tr>
                    <!-- Empty top-left corner -->
                    <th class="sticky top-0 left-0 z-40 bg-neutral-100 border-r border-b border-neutral-300 w-10 min-w-[40px] h-6 shadow-[1px_1px_0_0_#d4d4d4]"></th>
                    <!-- Columns A to J -->
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[120px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">A</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[200px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">B</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[120px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">C</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[100px] font-medium h-6 bg-neutral-200 text-neutral-900 border-b-indigo-500 border-b-2 shadow-[0_1px_0_0_#4f46e5]">D</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[120px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">E</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[100px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">F</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[100px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">G</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[100px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">H</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[100px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">I</th>
                    <th class="sticky top-0 z-20 border-r border-b border-neutral-300 min-w-[100px] font-normal h-6 hover:bg-neutral-200/50 transition-colors shadow-[0_1px_0_0_#d4d4d4]">J</th>
                </tr>
            </thead>
            <tbody>
                <!-- Header Row -->
                <tr>
                    <td class="sticky left-0 z-30 bg-neutral-50 border-r border-b border-neutral-300 text-center text-neutral-500 h-[25px] shadow-[1px_0_0_0_#d4d4d4]">1</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input font-medium bg-neutral-50" contenteditable="true">Date</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input font-medium bg-neutral-50" contenteditable="true">Description</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input font-medium bg-neutral-50" contenteditable="true">Category</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input font-medium bg-neutral-50 text-right" contenteditable="true">Amount</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input font-medium bg-neutral-50 text-right" contenteditable="true">Balance</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                </tr>
                <!-- Data Row 1 -->
                <tr>
                    <td class="sticky left-0 z-30 bg-neutral-50 border-r border-b border-neutral-300 text-center text-neutral-500 h-[25px] shadow-[1px_0_0_0_#d4d4d4]">2</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-neutral-600" contenteditable="true">2023-10-01</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true">Starting Balance</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-neutral-500" contenteditable="true">Capital</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right" contenteditable="true">$15,000.00</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right font-medium" contenteditable="true">$15,000.00</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                </tr>
                <!-- Data Row 2 -->
                <tr>
                    <td class="sticky left-0 z-30 bg-neutral-50 border-r border-b border-neutral-300 text-center text-neutral-500 h-[25px] shadow-[1px_0_0_0_#d4d4d4]">3</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-neutral-600" contenteditable="true">2023-10-05</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true">Software Subscriptions (Oct)</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-neutral-500" contenteditable="true">SaaS</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right text-red-600" contenteditable="true">-$450.00</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right font-medium" contenteditable="true">$14,550.00</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                </tr>
                <!-- Data Row 3 (Active Focus) -->
                <tr>
                    <td class="sticky left-0 z-30 bg-neutral-200 border-r border-b border-neutral-300 text-center text-neutral-900 font-medium h-[25px] shadow-[1px_0_0_0_#d4d4d4]">4</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-neutral-600 bg-indigo-50/30" contenteditable="true">2023-10-12</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input bg-indigo-50/30" contenteditable="true">Client Project Alpha - Phase 1</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-neutral-500 bg-indigo-50/30" contenteditable="true">Revenue</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right outline-none ring-2 ring-inset ring-indigo-500 z-10 relative bg-white" contenteditable="true" autofocus="">
                        $4,200.00
                        <div class="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-indigo-500 border border-white cursor-crosshair"></div>
                    </td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right font-medium bg-indigo-50/30" contenteditable="true">$18,750.00</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                </tr>
                <!-- Data Row 4 -->
                <tr>
                    <td class="sticky left-0 z-30 bg-neutral-50 border-r border-b border-neutral-300 text-center text-neutral-500 h-[25px] shadow-[1px_0_0_0_#d4d4d4]">5</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-neutral-600" contenteditable="true">2023-10-15</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true">Office Supplies</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-neutral-500" contenteditable="true">Ops</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right text-red-600" contenteditable="true">-$125.50</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right font-medium" contenteditable="true">$18,624.50</td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                    <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                </tr>
                
                <!-- Generate empty rows to show scrolling -->
                <script>
                    for(let i=6; i<=50; i++) {
                        document.write(`
                        <tr>
                            <td class="sticky left-0 z-30 bg-neutral-50 border-r border-b border-neutral-300 text-center text-neutral-400 h-[25px] shadow-[1px_0_0_0_#d4d4d4]">${i}</td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input text-right" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                            <td class="border-r border-b border-neutral-200 px-2 py-1 cell-input" contenteditable="true"></td>
                        </tr>
                        `);
                    }
                </script>
            </tbody>
        </table>
    </div>

    <!-- Bottom Status Bar & Sheet Tabs -->
    <footer class="flex items-center border-t border-neutral-200 bg-neutral-50 text-xs shrink-0 select-none">
        <!-- Sheet controls -->
        <div class="flex items-center px-2 py-1 border-r border-neutral-200 gap-1 bg-white h-full">
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:add-linear" style="stroke-width: 1.5;"></iconify-icon></button>
            <button class="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors flex"><iconify-icon icon="solar:hamburger-menu-linear" style="stroke-width: 1.5;"></iconify-icon></button>
        </div>
        
        <!-- Tabs -->
        <div class="flex items-end overflow-x-auto scrollbar-hide flex-1 h-8 pt-1 bg-neutral-100">
            <div class="px-5 py-1.5 bg-white border-t-2 border-indigo-500 text-indigo-700 font-medium border-r border-neutral-200 shadow-[0_-1px_0_0_#e5e5e5] flex items-center gap-2 cursor-pointer h-full rounded-tr-sm">
                Q3 Financials <iconify-icon icon="solar:alt-arrow-down-linear" style="stroke-width: 1.5;" class="text-[10px] opacity-50"></iconify-icon>
            </div>
            <div class="px-5 py-1.5 hover:bg-neutral-200/50 transition-colors cursor-pointer border-r border-neutral-200 text-neutral-600 flex items-center gap-2 h-full">
                Employee Directory <iconify-icon icon="solar:alt-arrow-down-linear" style="stroke-width: 1.5;" class="text-[10px] opacity-0 hover:opacity-50"></iconify-icon>
            </div>
             <div class="px-5 py-1.5 hover:bg-neutral-200/50 transition-colors cursor-pointer border-r border-neutral-200 text-neutral-600 flex items-center gap-2 h-full">
                Marketing Budget <iconify-icon icon="solar:alt-arrow-down-linear" style="stroke-width: 1.5;" class="text-[10px] opacity-0 hover:opacity-50"></iconify-icon>
            </div>
        </div>

        <!-- Status info -->
        <div class="px-4 py-1.5 flex items-center gap-6 text-neutral-500 bg-white h-full border-l border-neutral-200">
            <div class="flex items-center gap-2">
                <span class="font-medium text-neutral-400">Sum:</span> 
                <span class="text-neutral-800 font-medium">$4,200.00</span>
            </div>
            <div class="w-px h-3 bg-neutral-200"></div>
            <button class="flex items-center gap-1.5 hover:text-indigo-600 transition-colors font-medium">
                <iconify-icon icon="solar:magic-stick-3-linear" style="stroke-width: 1.5;"></iconify-icon> Explore Data
            </button>
        </div>
    </footer>


</body></html>
