const EMOJIS = {
    8986: "#6e6bbd",
    8987: "#a6a48b",
    9193: "#30aee3",
    9194: "#30aee4",
    9195: "#30aee3",
    9196: "#30aee3",
    9197: "#39b1e4",
    9198: "#38b0e4",
    9199: "#2faee5",
    9200: "#cd8a76",
    9201: "#aca5a5",
    9202: "#5a98b3",
    9203: "#a8a68c",
    9208: "#23a9e3",
    9209: "#51b9e6",
    9210: "#40b3e5",
    9748: "#5e5999",
    9749: "#a6938e",
    9757: "#e1b938",
    9800: "#9575c2",
    9801: "#9676c3",
    9802: "#9879c4",
    9803: "#9f82c7",
    9804: "#997ac4",
    9805: "#9f82c7",
    9806: "#9676c3",
    9807: "#9b7cc5",
    9808: "#9372c1",
    9809: "#9a7bc5",
    9810: "#9575c2",
    9811: "#9676c3",
    9855: "#25aae3",
    9875: "#0579ab",
    9889: "#ca6926",
    9898: "#dedede",
    9899: "#010101",
    9917: "#95a5dc",
    9918: "#cfc3c3",
    9924: "#a2b1c0",
    9925: "#d8c2ad",
    9934: "#9778c3",
    9940: "#e54846",
    9962: "#998162",
    9970: "#8793a9",
    9971: "#627c30",
    9973: "#79917c",
    9977: "#a6723d",
    9978: "#75a827",
    9981: "#b85150",
    9989: "#18ca72",
    9994: "#e6bc38",
    9995: "#e2bb39",
    9996: "#e0b837",
    9997: "#dc9f37",
    10024: "#be9530",
    10060: "#c8284f",
    10062: "#25cd7a",
    10067: "#b72726",
    10068: "#86808c",
    10069: "#847e8a",
    10071: "#b42726",
    10133: "#544c7d",
    10134: "#544b7c",
    10135: "#514979",
    10160: "#49426c",
    10175: "#433d61",
    11035: "#0d0d0d",
    11036: "#dddddd",
    11088: "#e1be39",
    11093: "#cd2951",
    126980: "#d0a8c3",
    127183: "#cbc0ca",
    127344: "#ec4c73",
    127345: "#ed5379",
    127358: "#ec4c73",
    127359: "#22a9e3",
    127374: "#ed5c7f",
    127377: "#ec4b72",
    127378: "#1ba6e2",
    127379: "#21a8e2",
    127380: "#9b7cc5",
    127381: "#1fa8e2",
    127382: "#38b1e4",
    127383: "#34afe4",
    127384: "#ec4f75",
    127385: "#28abe3",
    127386: "#f18a43",
    127489: "#2aace3",
    127514: "#f19c62",
    127535: "#46d38d",
    127538: "#ed5f81",
    127539: "#37b0e4",
    127540: "#ed557a",
    127541: "#ed6787",
    127542: "#f19658",
    127544: "#f19455",
    127545: "#ed6c8c",
    127546: "#f19c61",
    127568: "#e76786",
    127569: "#eb8e4f",
    127744: "#0f3c98",
    127745: "#a9b6bc",
    127746: "#745398",
    127747: "#5a526a",
    127748: "#8d7b51",
    127749: "#ba8e80",
    127750: "#76608d",
    127751: "#946560",
    127752: "#9f8362",
    127753: "#723f69",
    127754: "#1f9fd1",
    127755: "#7c5156",
    127756: "#1a4a7b",
    127757: "#01908d",
    127758: "#018795",
    127759: "#018b91",
    127760: "#6296bb",
    127761: "#472d58",
    127762: "#6e5051",
    127763: "#967648",
    127764: "#ba9742",
    127765: "#e8c23a",
    127766: "#cfa955",
    127767: "#b38d74",
    127768: "#9d778c",
    127769: "#d1ae35",
    127770: "#845c9c",
    127771: "#caa736",
    127772: "#d0ac38",
    127773: "#dab53a",
    127774: "#d69a34",
    127775: "#c4a734",
    127776: "#86684d",
    127789: "#db8941",
    127790: "#c59e30",
    127791: "#bba079",
    127792: "#895d3d",
    127793: "#66802a",
    127794: "#3f781b",
    127795: "#41811a",
    127796: "#627d27",
    127797: "#6bab26",
    127799: "#c16788",
    127800: "#e26bb4",
    127801: "#b94a2c",
    127802: "#d55890",
    127803: "#97872f",
    127804: "#abb089",
    127805: "#8c992a",
    127806: "#5e671f",
    127807: "#548921",
    127808: "#02b05b",
    127809: "#c6242d",
    127810: "#c34832",
    127811: "#16975a",
    127812: "#dc6252",
    127813: "#9e5b41",
    127814: "#6d4f97",
    127815: "#4b4257",
    127816: "#9ca86a",
    127817: "#a05a4d",
    127818: "#d07b2e",
    127819: "#c8bb3c",
    127820: "#d9c05d",
    127821: "#bf9748",
    127822: "#d13930",
    127823: "#71c430",
    127824: "#a0d139",
    127825: "#cb7c2f",
    127826: "#a95228",
    127827: "#984e37",
    127828: "#a47b3c",
    127829: "#da9842",
    127830: "#8a5f56",
    127831: "#b3804f",
    127832: "#b28160",
    127833: "#a29ba7",
    127834: "#d8878d",
    127835: "#ca9c7f",
    127836: "#b83e37",
    127837: "#c89c6b",
    127838: "#deab6d",
    127839: "#de5633",
    127840: "#e4523f",
    127841: "#91b484",
    127842: "#a78378",
    127843: "#e58874",
    127844: "#dc8526",
    127845: "#d4c2cb",
    127846: "#d6ae79",
    127847: "#9f8fb5",
    127848: "#839c9e",
    127849: "#80573f",
    127850: "#cc9053",
    127851: "#99424f",
    127852: "#cf562d",
    127853: "#9a8678",
    127854: "#bd9572",
    127855: "#9f6530",
    127856: "#daa264",
    127857: "#665958",
    127858: "#b98977",
    127859: "#645c7d",
    127860: "#756d7d",
    127861: "#8a8b88",
    127862: "#a2a7bb",
    127863: "#a17fb3",
    127864: "#8ba983",
    127865: "#ad8261",
    127866: "#c6be8e",
    127867: "#b9b289",
    127868: "#dec2af",
    127870: "#74863c",
    127871: "#e28a68",
    127872: "#cc2034",
    127873: "#dc7a38",
    127874: "#d1a76d",
    127875: "#c8694c",
    127876: "#58761e",
    127877: "#cda282",
    127878: "#6f4a59",
    127879: "#6c4f5e",
    127880: "#c9313b",
    127881: "#66586f",
    127882: "#87614c",
    127883: "#537338",
    127884: "#a48f99",
    127885: "#7c8e3f",
    127886: "#7c6c72",
    127887: "#726465",
    127888: "#7b9ebb",
    127889: "#745c50",
    127890: "#df382e",
    127891: "#4d3040",
    127904: "#b87d45",
    127905: "#816f6d",
    127906: "#6a453c",
    127907: "#406d75",
    127908: "#756b7b",
    127909: "#635b87",
    127910: "#43b4e5",
    127911: "#86808d",
    127912: "#cd9997",
    127913: "#55294d",
    127914: "#b76e85",
    127915: "#dba837",
    127916: "#5e487f",
    127917: "#608674",
    127918: "#523c65",
    127919: "#be7c86",
    127920: "#aea4b0",
    127921: "#5c5778",
    127922: "#bfb5c5",
    127923: "#a096a6",
    127924: "#ae3182",
    127925: "#534b7b",
    127926: "#4e4673",
    127927: "#c09b39",
    127928: "#9c5170",
    127929: "#928d95",
    127930: "#b38035",
    127931: "#633d39",
    127932: "#918b98",
    127933: "#5a8d1f",
    127934: "#7f4b45",
    127935: "#527d85",
    127936: "#c95420",
    127937: "#787878",
    127938: "#95a4ae",
    127939: "#9e7535",
    127940: "#826c66",
    127941: "#b58b4c",
    127942: "#a7712c",
    127943: "#53533e",
    127944: "#81675c",
    127945: "#e6a036",
    127946: "#5f8e8b",
    127947: "#8e6544",
    127948: "#836344",
    127951: "#af7851",
    127952: "#c7c7c7",
    127953: "#8c6b6d",
    127954: "#9a6f61",
    127955: "#cb5372",
    127968: "#b38d67",
    127969: "#859664",
    127970: "#a8b4bd",
    127971: "#ab969c",
    127972: "#ac9b9e",
    127973: "#a895a8",
    127974: "#949295",
    127975: "#17a5e2",
    127976: "#d7ac90",
    127977: "#d98a8b",
    127978: "#aa8f9c",
    127979: "#c1a57b",
    127980: "#7393af",
    127981: "#a09194",
    127982: "#c4463d",
    127983: "#bc606a",
    127984: "#9e7688",
    127988: "#0f0f0f",
    127992: "#385b73",
    127993: "#836a58",
    127994: "#845126",
    128000: "#6f595a",
    128001: "#b79ca8",
    128002: "#875844",
    128003: "#505050",
    128004: "#8d8888",
    128005: "#b96832",
    128006: "#cb8c2c",
    128007: "#cfcaca",
    128008: "#c08b50",
    128009: "#448e53",
    128010: "#0daf57",
    128011: "#359fd0",
    128012: "#a46e49",
    128013: "#11a754",
    128014: "#6d483a",
    128015: "#b09c97",
    128016: "#b9854e",
    128017: "#b09f9f",
    128018: "#6d4639",
    128019: "#7c5b2d",
    128020: "#d9b9b3",
    128021: "#be874d",
    128022: "#d87574",
    128023: "#70473a",
    128024: "#929292",
    128025: "#da664e",
    128026: "#a2a2a2",
    128027: "#049d54",
    128028: "#4c426c",
    128029: "#7d6761",
    128030: "#742423",
    128031: "#0290cd",
    128032: "#4690ae",
    128033: "#d2966b",
    128034: "#229153",
    128035: "#ccbb85",
    128036: "#dab036",
    128037: "#d8af36",
    128038: "#ac173e",
    128039: "#aa96a1",
    128040: "#777777",
    128041: "#999999",
    128042: "#c68c4e",
    128043: "#c3894e",
    128044: "#0d8ec7",
    128045: "#bc98a3",
    128046: "#ab8d86",
    128047: "#c47c50",
    128048: "#aea0ae",
    128049: "#dc8d2e",
    128050: "#50935d",
    128051: "#339eca",
    128052: "#563b31",
    128053: "#9d6155",
    128054: "#b58862",
    128055: "#e38482",
    128056: "#72b94e",
    128057: "#d48d5c",
    128058: "#959595",
    128059: "#99634b",
    128060: "#a5a3b2",
    128061: "#be6767",
    128062: "#49436c",
    128064: "#ada8b0",
    128066: "#e2b837",
    128067: "#d9b639",
    128068: "#c9365e",
    128069: "#b11a6b",
    128070: "#e1bc3a",
    128071: "#e3bf3a",
    128072: "#ddb939",
    128073: "#dfbb39",
    128074: "#e9c039",
    128075: "#c0a643",
    128076: "#cfad36",
    128077: "#e3bc39",
    128078: "#deb838",
    128079: "#d6b33e",
    128080: "#d8b337",
    128081: "#cc9235",
    128082: "#cd7759",
    128083: "#6f89b0",
    128084: "#5d99d7",
    128085: "#78c12d",
    128086: "#0286c1",
    128087: "#3e8ad4",
    128088: "#2084c0",
    128089: "#ac184f",
    128090: "#e05bac",
    128091: "#e31d79",
    128092: "#996942",
    128093: "#e39a96",
    128094: "#895846",
    128095: "#908f96",
    128096: "#990f3f",
    128097: "#a84839",
    128098: "#c23550",
    128099: "#4f4875",
    128100: "#583870",
    128101: "#56376d",
    128102: "#deac38",
    128103: "#dfaa36",
    128104: "#dfaf39",
    128105: "#e4ab34",
    128106: "#dc8a32",
    128107: "#6a6b5d",
    128108: "#5a7264",
    128109: "#7b6457",
    128110: "#4e9294",
    128111: "#795f3d",
    128112: "#d4bf90",
    128113: "#e4c65e",
    128114: "#a8483e",
    128115: "#dbc379",
    128116: "#d7b448",
    128117: "#bca355",
    128118: "#dab43f",
    128119: "#dba643",
    128120: "#ab8362",
    128121: "#934360",
    128122: "#c24954",
    128123: "#d0c1cc",
    128124: "#c8b258",
    128125: "#70993f",
    128126: "#514876",
    128127: "#8854a1",
    128128: "#bab6b7",
    128129: "#d08129",
    128130: "#894149",
    128131: "#bb422d",
    128132: "#a73a67",
    128133: "#bf9955",
    128134: "#dc892c",
    128135: "#cf7a2e",
    128136: "#8a8897",
    128137: "#7aa3c9",
    128138: "#dd7936",
    128139: "#d12952",
    128140: "#d897b2",
    128141: "#6e8799",
    128142: "#36a3da",
    128143: "#d56f4d",
    128144: "#8d7e54",
    128145: "#d16054",
    128146: "#b87c79",
    128147: "#c6284e",
    128148: "#d32953",
    128149: "#d32953",
    128150: "#df3f53",
    128151: "#e36daf",
    128152: "#c73257",
    128153: "#0169a8",
    128154: "#01be60",
    128155: "#e3c03a",
    128156: "#805cb2",
    128157: "#df5f44",
    128158: "#c5284e",
    128159: "#a084c6",
    128160: "#0490cb",
    128161: "#ceb24a",
    128162: "#bb2826",
    128163: "#5e3b5b",
    128164: "#317fa5",
    128165: "#c03f29",
    128166: "#0388c1",
    128167: "#23b2de",
    128168: "#cacaca",
    128169: "#905954",
    128170: "#e0bb39",
    128171: "#b78a2c",
    128172: "#d7d7d7",
    128173: "#d7d7d7",
    128174: "#e7c7da",
    128175: "#b02625",
    128176: "#cb9e67",
    128177: "#26537b",
    128178: "#049950",
    128179: "#2e8fbe",
    128180: "#d4a35d",
    128181: "#2abf7b",
    128182: "#65a8c6",
    128183: "#a08fb1",
    128184: "#4eb681",
    128185: "#1aca73",
    128186: "#3582a9",
    128187: "#60accb",
    128188: "#7a4c39",
    128189: "#a3835b",
    128190: "#95819a",
    128191: "#b3adb9",
    128192: "#e5a62f",
    128193: "#ecc038",
    128194: "#ebbc36",
    128195: "#cfc9d5",
    128196: "#d3ced9",
    128197: "#9fbad4",
    128198: "#9fb6cf",
    128199: "#a0a3bf",
    128200: "#d2b8cd",
    128201: "#babfd7",
    128202: "#88acbf",
    128203: "#cfb7a4",
    128204: "#c2323d",
    128205: "#d13189",
    128206: "#5f5c5d",
    128207: "#9d9ba0",
    128208: "#a6a4a9",
    128209: "#ccc1cc",
    128210: "#dab948",
    128211: "#5b416c",
    128212: "#624775",
    128213: "#b6154a",
    128214: "#abc0d5",
    128215: "#71bc36",
    128216: "#0b95d4",
    128217: "#da552e",
    128218: "#618663",
    128219: "#e1476c",
    128220: "#e5c089",
    128221: "#d6b8b6",
    128222: "#c22638",
    128223: "#388e65",
    128224: "#666077",
    128225: "#7e8288",
    128226: "#bd5866",
    128227: "#d3a232",
    128228: "#7e9bba",
    128229: "#809cbc",
    128230: "#d5a161",
    128231: "#a4bad1",
    128232: "#a8aabc",
    128233: "#c9adc0",
    128234: "#546bc7",
    128235: "#546cc8",
    128236: "#7481ba",
    128237: "#525b99",
    128238: "#c64369",
    128239: "#b4832e",
    128240: "#b9b2c0",
    128241: "#594c5f",
    128242: "#515165",
    128243: "#f1a750",
    128244: "#f1a64d",
    128245: "#d27a79",
    128246: "#4bb7e5",
    128247: "#79738d",
    128248: "#807782",
    128249: "#858095",
    128250: "#768698",
    128251: "#777e83",
    128252: "#746491",
    128255: "#bc8751",
    128256: "#2bace3",
    128257: "#30aee3",
    128258: "#30aee3",
    128259: "#36b0e4",
    128260: "#4d4672",
    128261: "#a37222",
    128262: "#ab7723",
    128263: "#bb8f9b",
    128264: "#b5adbd",
    128265: "#aba8ba",
    128266: "#9a9fb2",
    128267: "#86be49",
    128268: "#563a58",
    128269: "#2c77af",
    128270: "#2c76ae",
    128271: "#b19a57",
    128272: "#ba994e",
    128273: "#cb9e33",
    128274: "#c9a143",
    128275: "#c59e42",
    128276: "#deac36",
    128277: "#db8f33",
    128278: "#cf3533",
    128279: "#828282",
    128280: "#8a8091",
    128281: "#4b446f",
    128282: "#4d4672",
    128283: "#4a436d",
    128284: "#49426c",
    128285: "#4c4570",
    128286: "#c46c6b",
    128287: "#3eb3e4",
    128288: "#33afe4",
    128289: "#2dade3",
    128290: "#26aae3",
    128291: "#33afe4",
    128292: "#1da6e1",
    128293: "#e27b25",
    128294: "#887a77",
    128295: "#8b8591",
    128296: "#7c605e",
    128297: "#9890a0",
    128298: "#8d8798",
    128299: "#aa8f2f",
    128300: "#838992",
    128301: "#6e6b89",
    128302: "#6b536a",
    128303: "#9879c4",
    128304: "#969e29",
    128305: "#bd8225",
    128306: "#999999",
    128307: "#595959",
    128308: "#e42e2c",
    128309: "#016bab",
    128310: "#e45d20",
    128311: "#0168a7",
    128312: "#d1561f",
    128313: "#036099",
    128314: "#c52928",
    128315: "#ce2b29",
    128316: "#29abe3",
    128317: "#29abe3",
    128331: "#614248",
    128332: "#86745a",
    128333: "#a17d53",
    128334: "#9f82c7",
    128336: "#a19d9e",
    128337: "#a19d9e",
    128338: "#a09c9e",
    128339: "#a19c9e",
    128340: "#a19c9e",
    128341: "#a09c9d",
    128342: "#a09c9e",
    128343: "#a09c9e",
    128344: "#a09c9d",
    128345: "#a19c9e",
    128346: "#a09d9e",
    128347: "#a19f9f",
    128348: "#a19c9e",
    128349: "#a19c9e",
    128350: "#a09c9d",
    128351: "#a19c9e",
    128352: "#a19d9e",
    128353: "#a19f9f",
    128354: "#a09d9e",
    128355: "#a09c9e",
    128356: "#a09c9d",
    128357: "#a09c9e",
    128358: "#a09c9d",
    128359: "#a09c9d",
    128372: "#5f475d",
    128373: "#7d6a6d",
    128378: "#426c79",
    128400: "#deb938",
    128405: "#dab738",
    128406: "#dcb738",
    128420: "#101010",
    128507: "#5c476b",
    128508: "#b35d36",
    128509: "#388f79",
    128510: "#05954e",
    128511: "#a3a3a3",
    128512: "#d18a51",
    128513: "#dea456",
    128514: "#c38052",
    128515: "#ce884f",
    128516: "#d7883e",
    128517: "#cb834b",
    128518: "#d28142",
    128519: "#b8894b",
    128520: "#8853a0",
    128521: "#d69242",
    128522: "#d88e2b",
    128523: "#d78d30",
    128524: "#d7942b",
    128525: "#e16159",
    128526: "#a16f47",
    128527: "#db9e3c",
    128528: "#d4993c",
    128529: "#de992b",
    128530: "#dc9e3c",
    128531: "#cb913c",
    128532: "#da962b",
    128533: "#d49b41",
    128534: "#d2912b",
    128535: "#d5993c",
    128536: "#d58a3c",
    128537: "#dd982b",
    128538: "#d8912b",
    128539: "#d78c4d",
    128540: "#dc8d48",
    128541: "#dc893c",
    128542: "#da962b",
    128543: "#daa24a",
    128544: "#d8a048",
    128545: "#d34949",
    128546: "#cc9544",
    128547: "#d7952b",
    128548: "#d2a55d",
    128549: "#ca9448",
    128550: "#dfa14f",
    128551: "#da9a51",
    128552: "#ac8e87",
    128553: "#d3843d",
    128554: "#d1913b",
    128555: "#d1833d",
    128556: "#e1ac61",
    128557: "#ac866c",
    128558: "#dd9b52",
    128559: "#dda04d",
    128560: "#9d8e92",
    128561: "#c3957a",
    128562: "#dda150",
    128563: "#dd9d4a",
    128564: "#cc983b",
    128565: "#d48b31",
    128566: "#db9d3c",
    128567: "#deac68",
    128568: "#dc8d2e",
    128569: "#c88647",
    128570: "#dc8d2e",
    128571: "#d97b31",
    128572: "#db902a",
    128573: "#d8862d",
    128574: "#da902a",
    128575: "#d69133",
    128576: "#e49c46",
    128577: "#d4983c",
    128578: "#d4993c",
    128579: "#d4993d",
    128580: "#e1a84c",
    128581: "#de8824",
    128582: "#da7c2a",
    128583: "#d88f2e",
    128584: "#945e4f",
    128585: "#9b6153",
    128586: "#9b6555",
    128587: "#d8882d",
    128588: "#c7a93b",
    128589: "#db9130",
    128590: "#e39c2a",
    128591: "#aa787d",
    128640: "#bf7287",
    128641: "#a1794f",
    128642: "#8f5960",
    128643: "#7c9758",
    128644: "#84aec8",
    128645: "#7d9bb1",
    128646: "#547c95",
    128647: "#6a5c72",
    128648: "#8ba3a7",
    128649: "#588490",
    128650: "#797287",
    128651: "#86788f",
    128652: "#739188",
    128653: "#759596",
    128654: "#4a999f",
    128655: "#6296c0",
    128656: "#7492ac",
    128657: "#b2798f",
    128658: "#a16169",
    128659: "#667d8c",
    128660: "#628794",
    128661: "#939057",
    128662: "#a2a466",
    128663: "#915565",
    128664: "#80707a",
    128665: "#5183b8",
    128666: "#bd9652",
    128667: "#86a8a5",
    128668: "#1f9681",
    128669: "#4c93b8",
    128670: "#5dac80",
    128671: "#6497a5",
    128672: "#7a768a",
    128673: "#7b9476",
    128674: "#987b9f",
    128675: "#529f8a",
    128676: "#669198",
    128677: "#696654",
    128678: "#6a6653",
    128679: "#987a52",
    128680: "#c0685a",
    128681: "#d24f47",
    128682: "#c7833d",
    128683: "#e78e8d",
    128684: "#ab9b80",
    128685: "#d8807f",
    128686: "#2fade3",
    128687: "#cf7877",
    128688: "#2cace3",
    128689: "#d07877",
    128690: "#765154",
    128691: "#d27b7a",
    128692: "#806754",
    128693: "#5ea169",
    128694: "#8a653b",
    128695: "#c7706f",
    128696: "#bb8222",
    128697: "#29abe3",
    128698: "#9879c4",
    128699: "#45b5e5",
    128700: "#30aee3",
    128701: "#a7a0af",
    128702: "#1ea8e2",
    128703: "#7d8299",
    128704: "#b2aeab",
    128705: "#8494a1",
    128706: "#3cb2e4",
    128707: "#3ab1e4",
    128708: "#46b5e5",
    128709: "#53bae6",
    128716: "#3d628e",
    128720: "#9575c2",
    128721: "#df5554",
    128722: "#6a6f73",
    128747: "#61798c",
    128748: "#61798d",
    128756: "#306589",
    128757: "#ae284e",
    128758: "#547578",
    128759: "#c37754",
    128760: "#9aa48c",
    128761: "#6a587c",
    128762: "#4e7353",
    129296: "#d09e59",
    129297: "#b9923a",
    129298: "#cf8f3e",
    129299: "#c38750",
    129300: "#d5923b",
    129301: "#d3ab6f",
    129302: "#8e7a7f",
    129303: "#d9872a",
    129304: "#e1b938",
    129305: "#e7bf39",
    129306: "#e1bb39",
    129307: "#e8c13a",
    129308: "#e9c23b",
    129309: "#eabe38",
    129310: "#e2b937",
    129311: "#e3bc39",
    129312: "#a96e4a",
    129313: "#cb9bb0",
    129314: "#2db16f",
    129315: "#c17e53",
    129316: "#d08d3b",
    129317: "#de9e48",
    129318: "#e09328",
    129319: "#dba652",
    129320: "#d39a40",
    129321: "#d06a52",
    129322: "#db8766",
    129323: "#d9963c",
    129324: "#bb525b",
    129325: "#e28f2a",
    129326: "#a59b3c",
    129327: "#cfa677",
    129328: "#b38867",
    129329: "#a9a05a",
    129330: "#e3bb38",
    129331: "#b7525e",
    129332: "#92a975",
    129333: "#886950",
    129334: "#cbb683",
    129335: "#cc7829",
    129336: "#a87d3e",
    129337: "#a0856c",
    129338: "#77767a",
    129340: "#aa742f",
    129341: "#75967e",
    129342: "#966a36",
    129344: "#945527",
    129345: "#cca39b",
    129346: "#90a0a2",
    129347: "#a9b8b8",
    129348: "#87808e",
    129349: "#713a39",
    129351: "#91925c",
    129352: "#6f98ad",
    129353: "#787966",
    129354: "#cd4042",
    129355: "#b3b1b9",
    129356: "#b66976",
    129357: "#465e6b",
    129358: "#b2c839",
    129359: "#0c9ece",
    129360: "#d19756",
    129361: "#74a839",
    129362: "#3f8219",
    129363: "#b44959",
    129364: "#d99a56",
    129365: "#a78135",
    129366: "#d4a36b",
    129367: "#9e9876",
    129368: "#7d695b",
    129369: "#bca357",
    129370: "#db9c58",
    129371: "#c7d7e9",
    129372: "#d49552",
    129373: "#36aa5c",
    129374: "#bd9254",
    129375: "#e7bf7e",
    129376: "#d7993e",
    129377: "#b4a6a6",
    129378: "#690e31",
    129379: "#2197c5",
    129380: "#bc819c",
    129381: "#8e7b73",
    129382: "#027d58",
    129383: "#ce9e62",
    129384: "#c68a2b",
    129385: "#e17c78",
    129386: "#c1ab68",
    129387: "#d78a86",
    129408: "#b5202d",
    129409: "#a4743b",
    129410: "#54372e",
    129411: "#835141",
    129412: "#a091d1",
    129413: "#896452",
    129414: "#95957d",
    129415: "#784d3d",
    129416: "#939393",
    129417: "#9a7652",
    129418: "#d48347",
    129419: "#83413f",
    129420: "#b4824e",
    129421: "#5f5f5f",
    129422: "#049c51",
    129423: "#878787",
    129424: "#c63f27",
    129425: "#ab146c",
    129426: "#b87929",
    129427: "#8b8b8b",
    129428: "#8c5f3c",
    129429: "#03a759",
    129430: "#02a959",
    129431: "#72a229",
    129472: "#e4b635",
    129488: "#cc9a4d",
    129489: "#e4b339",
    129490: "#dfab36",
    129491: "#c9ad56",
    129492: "#dea536",
    129493: "#85698a",
    129494: "#e2ae69",
    129495: "#979281",
    129496: "#d49a37",
    129497: "#4b8f94",
    129498: "#a89460",
    129499: "#8e574e",
    129500: "#76903b",
    129501: "#988134",
    129502: "#837697",
    129503: "#2e7693",
    129504: "#e85ab0",
    129505: "#e65e21",
    129506: "#13a9d1",
    129507: "#c21e33",
    129508: "#964bb0",
    129509: "#dbb683",
    129510: "#24bc94",
}

class Idea {
    constructor(id, title, category, priority, content) {
        this.id = id
        this.title = title
        this.category = category
        this.priority = priority
        this.content = content
        this.date = new Date()
    }
}

class Category {
    constructor(name, emoji, color) {
        this.name = name
        this.emoji = emoji
        this.color = color
    }
}

var priority = "☁️"
var category = ""

var ideas = []
var allCategories = []
var id = 0

if(localStorage.getItem("categories") != null)
{
    allCategories = JSON.parse(localStorage.getItem("categories"))
}else{
    var category1 = new Category("Business", "💸", EMOJIS["💸".codePointAt(0)])
    var category2 = new Category("Sport", "⚽", EMOJIS["⚽".codePointAt(0)])
    var category3 = new Category("Travel", "🌍", EMOJIS["🌍".codePointAt(0)])
    var category4 = new Category("Nature", "🌄", EMOJIS["🌄".codePointAt(0)])

    allCategories.push(category1)
    allCategories.push(category2)
    allCategories.push(category3)
    allCategories.push(category4)

    localStorage.setItem("categories", JSON.stringify(allCategories))
}

if(localStorage.getItem("ideas") != null)
{
    ideas = JSON.parse(localStorage.getItem("ideas"))
}

if(localStorage.getItem("id") != null)
{
    id = localStorage.getItem("id")
}

loadHomeScreen()

function loadHomeScreen()
{
    while(document.getElementsByClassName("idea").length > 0)
    {
        document.getElementsByClassName("idea")[0].remove()
    }

    for(var i = ideas.length - 1; i >= 0; i--)
    {
        createIdeaDiv(ideas[i], "ideaHolder")
    }
}

function createIdeaDiv(p_idea, p_area)
{
    var title = p_idea.title
    var category = p_idea.category
    var priority = p_idea.priority
    var content = p_idea.content
    var date = p_idea.date

    var day = new Date(date).getDate()
    var month = new Date(date).getMonth()
    var year = new Date(date).getFullYear()

    var date = day + "/" + month + "/" + year

    var div = document.createElement("div")
    div.className = "idea"

    var header = document.createElement("div")
    header.className = "header"

    var titleSpan = document.createElement("span")
    titleSpan.className = "title"
    titleSpan.innerHTML = title + " " + priority
    
    var dateSpan = document.createElement("span")
    dateSpan.className = "date"
    dateSpan.innerHTML = date

    header.append(titleSpan)
    header.append(dateSpan)
    div.append(header)

    var text = document.createElement("p")
    text.innerHTML = content

    var categories = document.createElement("div")
    categories.className = "categoriesIdea"

    var a = document.createElement("a")
    a.innerHTML = category.emoji + " " + category.name
    a.style.color = category.color
    a.style.marginLeft = "auto"

    categories.append(a)
    div.append(text)
    div.append(categories)

    div.onclick = function()
    {
        loadIdea(p_idea)
    }

    document.getElementById(p_area).append(div)
}

function loadIdea(p_idea)
{
    document.getElementById("viewIdeaFooter").style.display = ""
    document.getElementById("viewIdea").style.display = ""
    document.getElementById("ideaButton").style.display = "none"
    document.getElementById("homeScreen").style.display = "none"

    var title = p_idea.title
    var category = p_idea.category
    var priority = p_idea.priority
    var content = p_idea.content

    document.getElementById("ideaTitle").value = title
    document.getElementById("contentTextareaIdea").value = content

    for(var i = 0; i < document.getElementsByClassName("priorityTDIdea").length; i++)
    {
        if(document.getElementsByClassName("priorityTDIdea")[i].innerHTML === priority)
        {
            document.getElementsByClassName("priorityTDIdea")[i].style.border = "2px solid #ffd962"
        }
    }
}

function newIdea()
{
    for(var i = 0; i < document.getElementsByClassName("categoryIdea").length; i++)
    {
        document.getElementsByClassName("categoryIdea")[i].remove()
    }

    document.getElementById("createNewIdea").style.display = ""
    document.getElementById("createNewIdeaFooter").style.display = ""
    document.getElementById("homeScreen").style.display = "none"
    document.getElementById("ideaButton").style.display = "none"

    allCategories = JSON.parse(localStorage.getItem("categories"))

    while(document.getElementsByClassName("categoryDiv").length > 0)
    {
        document.getElementsByClassName("categoryDiv")[0].remove()
    }
    
    for(var i = 0; i < allCategories.length; i++)
    {
        createCategory(allCategories[i])
    }
}

function createCategory(p_category)
{
    var name = p_category.name
    var emoji = p_category.emoji
    var color = p_category.color

    var element = document.createElement("a")
    element.innerHTML = emoji + " " + name
    element.className = "noselect categoryDiv"
    element.style.color = color
    element.style.fontSize = "18px"
    element.style.marginRight = "10px"
    element.style.marginTop = "10px"
    element.style.border = "2px solid #403f3f"

    document.getElementById("createNewIdeaCategories").append(element)

    element.onclick = function()
    {
        addCategory(element, p_category)
    }
}

function saveNewIdea()
{
    var title = document.getElementById("title").value
    var content = document.getElementById("contentTextarea").value

    var idea = new Idea(id, title, category, priority, content)

    id = id + 1
    localStorage.setItem("id", id)

    ideas.push(idea)
    localStorage.setItem("ideas", JSON.stringify(ideas))

    closeNewIdea()
}

function closeNewIdea()
{
    document.getElementById("createNewIdea").style.display = "none"
    document.getElementById("createNewIdeaFooter").style.display = "none"
    document.getElementById("homeScreen").style.display = ""
    document.getElementById("ideaButton").style.display = ""

    loadHomeScreen()
}

function closeIdea()
{
    document.getElementById("viewIdeaFooter").style.display = "none"
    document.getElementById("viewIdea").style.display = "none"
    document.getElementById("ideaButton").style.display = ""
    document.getElementById("homeScreen").style.display = ""
}

function saveNewCategory()
{
    var name = document.getElementById("nameCategory").value
    var emoji = document.getElementById("emojiCategory").value
    var color = EMOJIS[emoji.codePointAt(0)]

    var category = new Category(name, emoji, color)

    allCategories.push(category)

    localStorage.setItem("categories", JSON.stringify(allCategories))

    closeNewCategory()
}

function closeNewCategory()
{
    document.getElementById("createNewCategory").style.display = "none"
    document.getElementById("createNewCategoryFooter").style.display = "none"
    
    newIdea()
}

function addCategory(p_element, p_category)
{
    if(p_element.style.border !== "2px solid rgb(64, 63, 63)")
    {
        p_element.style.border = "2px solid #403f3f"
        category = ""
    }else{
        for(var i = 0; i < document.getElementsByClassName("categoryDiv").length; i++)
        {
            document.getElementsByClassName("categoryDiv")[i].style.border = "2px solid #403f3f"
        }

        p_element.style.border = "2px solid #ffd962"
        category = p_category
    }
}

function addPriority(p_element)
{
    for(var i = 0; i < document.getElementsByClassName("priorityTD").length; i++)
    {
        document.getElementsByClassName("priorityTD")[i].style.border = "2px solid #403f3f"
    }

    for(var i = 0; i < document.getElementsByClassName("priorityTDIdea").length; i++)
    {
        document.getElementsByClassName("priorityTDIdea")[i].style.border = "2px solid #403f3f"
    }

    p_element.style.border = "2px solid #ffd962"

    priority = p_element.innerHTML
}

function createNewCategory()
{
    document.getElementById("createNewIdea").style.display = "none"
    document.getElementById("createNewIdeaFooter").style.display = "none"
    document.getElementById("createNewCategory").style.display = ""
    document.getElementById("createNewCategoryFooter").style.display = ""
}

function openCategoryView()
{
    document.getElementById("homeScreen").style.display = "none"
    document.getElementById("ideaButton").style.display = "none"
    document.getElementById("categoryOverview").style.display = ""
    document.getElementById("overviewCategoryFooter").style.display = ""

    while(document.getElementsByClassName("categoryInOverview").length > 0)
    {
        document.getElementsByClassName("categoryInOverview")[0].remove()
    }

    for(var i = 0; i < allCategories.length; i++)
    {
        createCategoryForOverview(allCategories[i])
    }
}

function closeCategoryOverview()
{
    document.getElementById("homeScreen").style.display = ""
    document.getElementById("ideaButton").style.display = ""
    document.getElementById("categoryOverview").style.display = "none"
    document.getElementById("overviewCategoryFooter").style.display = "none"
}

function createCategoryForOverview(p_category)
{
    var name = p_category.name
    var emoji = p_category.emoji
    var color = p_category.color

    var div = document.createElement("div")
    div.style.border = "2px solid " + color
    div.className = "categoryInOverview"

    var emojiDiv = document.createElement("div")
    emojiDiv.innerHTML = emoji

    var nameDiv = document.createElement("p")
    nameDiv.style.color = color
    nameDiv.innerHTML = name

    div.append(emojiDiv)
    div.append(nameDiv)

    div.onclick = function()
    {
        openCategory(p_category)
    }

    document.getElementById("categoryHolderOverview").append(div)
}

function openCategory(p_category)
{
    var name = p_category.name
    var emoji = p_category.emoji
    var color = p_category.color

    document.getElementById("categoryView").style.display = ""
    document.getElementById("viewCategoryFooter").style.display = ""
    document.getElementById("categoryOverview").style.display = "none"
    document.getElementById("overviewCategoryFooter").style.display = "none"
    document.getElementById("homeScreen").style.display = "none"
    document.getElementById("ideaButton").style.display = "none"

    document.getElementById("categoryViewHeadline").innerHTML = emoji + " " + name
    document.getElementById("categoryViewHeadline").style.color = color

    while(document.getElementsByClassName("idea").length > 0)
    {
        document.getElementsByClassName("idea")[0].remove()
    }

    for(var i = ideas.length - 1; i >= 0; i--)
    {
        if(ideas[i].category.name === name)
        {
            createIdeaDiv(ideas[i], "ideaHolderCategory")
        }
    }
}

function closeCategory()
{
    document.getElementById("categoryView").style.display = "none"
    document.getElementById("viewCategoryFooter").style.display = "none"
    document.getElementById("homeScreen").style.display = ""
    document.getElementById("ideaButton").style.display = ""

    loadHomeScreen()
}

function searchIdea(p_value)
{
    while(document.getElementsByClassName("idea").length > 0)
    {
        document.getElementsByClassName("idea")[0].remove()
    }

    for(var i = ideas.length - 1; i >= 0; i--)
    {
        console.log(ideas[i].title)

        if(ideas[i].title.includes(p_value))
        {
            createIdeaDiv(ideas[i])
        }
    }
}