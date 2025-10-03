
type Gender = "M" | "F" | "U"; // Male, Female, Unknown

type LifeStatus = "alive" | "deceased" | "unknown";

export interface Person {
  id: string; // unique key you will reference from Excel
  firstName?: string;
  lastName?: string;
  displayName?: string; // optional: for bilingual or custom display like "Khadim Hussain خادم حسین"
  gender: Gender;
  lifeStatus?: LifeStatus;
  birthDate?: string;
  deathDate?: string;
  address?: string; // current or last address
  notes?: string;
  avatarUrl?: string;
  // If deceased, optional grave info
  grave?: {
    city?: string;
    cemetery?: string;
    section?: string;
    location?: string; // GPS or row/plot — can be used as "grave no"
    notes?: string;
  };
  spouseIds?: string[]; // all spouses (husband/wife)
  parentIds?: string[]; // usually [fatherId, motherId] when known
  orderId?: number;
}
export interface FamilyTree {
  rootId: string; // family head to start from
  persons: Record<string, Person>;
}

export const SAMPLE_FAMILY: FamilyTree =
 {
  rootId: "khadim-hussain",
  persons: {
    // Ancestor (optional, only to show lineage above)
    "ghulam-hussain": {
      id: "ghulam-hussain",
      displayName: "Ghulam Hussain ibn.e.Adam غلام حسین",
      gender: "M",
      lifeStatus: "unknown",
    },

    // Head
    "khadim-hussain": {
      id: "khadim-hussain",
      displayName: "Khadim Hussain خادم حسین",
      gender: "M",
      lifeStatus: "deceased",
      deathDate: "1989-01-01",
      grave: {city: "Aligarh India"  },
      parentIds: ["ghulam-hussain"],
      spouseIds: ["jawadi-baigam"],
       avatarUrl: "khadm-hussain.jpeg",
    },

    // Wife
    "jawadi-baigam": {
      id: "jawadi-baigam",
      displayName: "Jawadi Baigam جوادی بیگم",
      gender: "F",
      lifeStatus: "deceased",
      deathDate: "2002-01-01",
      spouseIds: ["khadim-hussain"],
      grave: { city: "Karachi Pakistan" },
      avatarUrl: "jawadi-begum.jpeg",

    },

    // Children of Khadim & Jawadi (examples)
    "shakir-hussain": {
      id: "shakir-hussain",
      displayName: "Shakir Hussain",
      gender: "M",
      lifeStatus: "deceased",
      parentIds: ["khadim-hussain", "jawadi-baigam"],
      spouseIds: ["uroosa-baigam"],
      grave: { city: "Aligarh India" },
      orderId: 1,
    },
    "uroosa-baigam": {
      id: "uroosa-baigam",
      displayName: "Uroosa Baigam",
      gender: "F",
      lifeStatus: "deceased",
      spouseIds: ["shakir-hussain"],
      grave: { city: "Lahore Pakistan" },
      
    },

    "hassan-abbas": {
      id: "hassan-abbas",
      displayName: "Hassan Abbas Jafrey",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shakir-hussain", "uroosa-baigam"],
      spouseIds: ["nasreen"],
      address: 'Karachi, Pakistan',
      orderId: 1,
      avatarUrl: "hassan-abbas-jafery.webp"
   
    },
    "nasreen": {
      id: "nasreen",
      displayName: "Nasreen Jafrey",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["hassan-abbas"],
      address: 'Karachi, Pakistan',
      avatarUrl: "nasreen-jafery.jpeg"
    },
    "reza-hassan":{
      id: "reza-hassan",
      displayName: "Reza Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["hassan-abbas", "nasreen"],
      spouseIds: ["hina-reza"],
      address: "Karachi, Pakistan",
      orderId: 1,
      avatarUrl: "reza-hassan.jpg"
    },
    "hina-reza": {
      id: "hina-raza",
      displayName: "Syeda Hina Reza",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["reza-hassan"],
      address: "Karachi, Pakistan",
    },
    "faizan-reza": {
      id: "faizan-reza",
      displayName: "Faizan Reza Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["reza-hassan", "hina-reza"],
      spouseIds: ["varisha-farzan"],
      address: "Karachi, Pakistan",
      orderId: 1,
      avatarUrl: "faizan-reza.jpg"
    },
    "varisha-farzan": {
      id: "varisha-farzan",
      displayName: "Varisha Faizan",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["faizan-reza"],
      address: "Karachi, Pakistan",
    },
    "zaroon-farizan-reza": {
      id: "zaroon-farizan-reza",
      displayName: "Zaroon Farizan Reza",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["faizan-reza", "varisha-farzan"],
      spouseIds: [],
      address: "Karachi, Pakistan",
      orderId: 1
    },
    "zain-reza-hassan"  : {
      id: "zain-reza-hassan",
      displayName: "Zain Reza Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["reza-hassan", "hina-reza"],
      spouseIds: ["manoor"],
       address: "Karachi, Pakistan",
      orderId: 2,
      avatarUrl: "zain.jpg"
    },
    "manoor"           : {
      id: "manoor",
      displayName: "Manoor",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["zain-reza-hassan"],
       address: "Karachi, Pakistan",
    },
    "aun-reza-hassan"   : {
      id: "aun-reza-hassan",
      displayName: "Aun Reza Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["reza-hassan", "hina-reza"],
      spouseIds: [],
      address: "Lahore, Pakistan",
      orderId: 3,
      avatarUrl: "aun-ali.jpg"
    },
    "azan-mustafa-reza"      : {
      id: "azan-mustafa-reza",
      displayName: "Azan Mustafa Reza",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["reza-hassan", "hina-reza"],
      spouseIds: [],
      address: "Lahore, Pakistan",
      orderId: 4,
      avatarUrl: "azan-reza.jpg"
    },
    "salman": {
      id: "salman",
      displayName: "Salman Abbas Jaffery",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["hassan-abbas", "nasreen"],
      spouseIds: ["zahra-jafery"],
      address: "Abu Dhabi, UAE",
      orderId: 2,
      avatarUrl: "salman-jafery.jpg"
    },
    "zahra-jafery": {
      id: "zahra-jafery",
      displayName: "Zahra Jafery",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["salman"],
       address: "Abu Dhabi, UAE",
    },
    "taha-salman": {
      id: "taha-salman",
      displayName: "Taha Salman",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["salman", "zahra-jafery"],
      spouseIds: [],
      address: "Abu Dhabi, UAE",
      orderId: 1,
      avatarUrl: "taha-salman.jpg"
    },
    "alishba": {
      id: "alishba",
      displayName: "Alishba",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["salman", "zahra-jafery"],
      spouseIds: ["sameer"],
       address: "Abu Dhabi, UAE",
      orderId: 2
    },
    "sameer": {
      id: "sameer",
      displayName: "Sameer",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["alishba"],
     address: "Abu Dhabi, UAE",
    },
    

    "ali-hassan": {
      id: "ali-hassan",
      displayName: "Ali Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["hassan-abbas", "nasreen"],
      spouseIds: ["sadaf"],
      address: "Canada",
      orderId: 3
    },
    "sadaf": {
      id: "sadaf",
      displayName: "Sadaf",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ali-hassan"],
       address: "Canada",
    },
    "mustufa-ali-hassan": {
      id: "mustufa-ali-hassan",
      displayName: "Mustufa Ali Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ali-hassan", "sadaf"],
      spouseIds: [],
      address: "Canada",
      orderId: 2,
      avatarUrl: "mustufa-ali.jpg"
    },
    "muhammad-ali-hassan": {
      id: "muhammad-ali-hassan",
      displayName: "Muhammad Ali Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ali-hassan", "sadaf"],
      spouseIds: ["minhaljr"],
      address: "Canada",
      orderId: 1
    },

    "minhaljr": {
      id: "minhaljr",
      displayName: "Minhal",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["ali-hassan-ali"],
       address: "Canada",
    },
    "taqi":{
      id: "taqi",
      displayName: "Taqi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["hassan-abbas", "nasreen"],
      spouseIds: ["nidha"],
      address: "Canada",
      orderId: 4
    },

    "nidha": {
      id: "nidha",
      displayName: "Nidha",
      gender: "F",
      lifeStatus: "alive",
       address: "Canada",
      spouseIds: ["taqi"],
    },
    "zuhair-taqi": {
      id: "zuhair-taqi",
      displayName: "Zuhair Taqi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["taqi", "nidha"],
       address: "Canada",
      orderId: 1
    },
    "naqi-taqi": {
      id: "naqi-taqi",
      displayName: "Naqi Taqi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["taqi", "nidha"],
       address: "Canada",
      orderId: 2
    },

   'zoha':{ 
    id: "zoha",
    displayName: "Zoha",
    gender: "M",
    lifeStatus: "alive",
    parentIds: ["taqi", "nidha"],
    spouseIds: ["naqi-taqi"],
    address: "Canada",
    orderId: 3

   },
    "khadim-hussain-jr": {
      id: "khadim-hussain-jr",
      displayName: "Khadim Hussain.",
      gender: "M",
       lifeStatus: "deceased",
      parentIds: ["shakir-hussain", "uroosa-baigam"],
      spouseIds: [],
     grave: { city: "Aligarh India" },
      orderId: 2
    },

    "sabir-hussain": {
      id: "sabir-hussain",
      displayName: "Sabir Hussain",
      gender: "M",
      lifeStatus: "deceased",
      parentIds: ["khadim-hussain","jawadi-baigam"],
      spouseIds: ["tanveer-fatima"],
      grave: { city: "Karachi Pakistan" },
      orderId: 2,
      avatarUrl: "sabir-hussaain.jpeg"
    },
    "tanveer-fatima": {
      id: "tanveer-fatima",
      displayName: "Tanveer Fatima",
      gender: "F",
      lifeStatus: "deceased",
      spouseIds: ["sabir-hussain"],
      grave: { city: "Karachi Pakistan" },
    },
    "ali-imam": {
      id: "ali-imam",
      displayName: "Ali Imam",
      gender: "M",
      lifeStatus: "deceased",
      parentIds: ["sabir-hussain", "tanveer-fatima"],
      spouseIds: ["noor-fatima"],
      grave: { city: "Karachi Pakistan" },
      orderId: 1,
      avatarUrl: "ali-imam.jpeg"
    },
    "noor-fatima": {
      id: "noor-fatima",
      displayName: "Noor Fatima",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ali-imam"],
       address: "Karachi, Pakistan",
      avatarUrl: "noor.jpeg"
    },
    "hassan-imam": {
      id: "hassan-imam",
      displayName: "Hassan Imam",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ali-imam", "noor-fatima"],
      spouseIds: [],
      address: "Karachi, Pakistan",
      orderId: 1,
    },
    "batool:": {
      id: "batool",
      displayName: "Batool",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["ali-imam", "noor-fatima"],
      spouseIds: ["manzoor-jaffery"],
      address: "Canada",
      orderId: 2,
    },
    "manzoor-jaffery": {
      id: "manzoor-jaffery",
      displayName: "Manzoor Jaffery",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["batool"],
      address: "Canada",
    },
    "daniyal-jaffery": {
      id: "daniyal-jaffery",
      displayName: "Daniyal Jaffery",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["batool", "manzoor-jaffery"],
      address: "Canada",
      orderId: 1
    },

    "kaneez-fatima": {
      id: "kaneez-fatima",
      displayName: "Kaneez Fatima",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["ali-imam", "noor-fatima"],
      spouseIds: [],
      address: "Canada",
      avatarUrl: "kaneez-fatima.jpeg",
    },
    
    "sitara": {
      id: "sitara",
      displayName: "Sitara",
      gender: "F",
      lifeStatus: "deceased",
      parentIds:["sabir-hussain", "tanveer-fatima"],
      spouseIds: [],
      grave: { city: "Karachi Pakistan" },
      orderId: 2
    },
    "nadir-hussain": {
      id: "nadir-hussain",
      displayName: "Nadir Hussain",
      gender: "M",
      lifeStatus: "deceased",
      parentIds: ["khadim-hussain", "jawadi-baigam"],
        grave: { city: "India Aligarh" },
      spouseIds: ["shakra-begum"],
      avatarUrl: "nadir.jpeg",
      orderId: 3,
    },
    "shakra-begum": {
      id: "shakra-begum",
      displayName: "Shakra Begum",
      gender: "F",
       lifeStatus: "deceased",
      spouseIds: ["nadir-hussain"],
      grave: { city: "India Aligarh" },
      avatarUrl: "shakra-begum.jpeg",
    },
    // Example daughter
    "nadra-zaidi": {
      id: "nadra-zaidi",
      displayName: "Nadra Zaidi",
      gender: "F",
      lifeStatus: "deceased",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["mahmood-akhtar"],
      address: "Aligarh India",
      orderId: 1,
      avatarUrl: "nadra-zaidi.jpeg",
    },
    "mahmood-akhtar": {
      id: "mahmood-akhtar",
      displayName: "Mahmood Akhtar",
      gender: "M",
      lifeStatus: "deceased",
      spouseIds: ["nadra-zaidi"],
      grave: { city: "Aligarh India" },
    },
    "iqbal-zaidi": {
      id: "iqbal-zaidi",
      displayName: "Iqbal Zaidi",
      gender: "M",
      lifeStatus: "deceased",
      parentIds:["nadra-zaidi", "mahmood-akhtar"],
      spouseIds: ["sarawat-zaidi"],
      grave:{city:"India"},
      orderId: 1
    },
    "sarawat-zaidi": {
      id: "sarawat-zaidi",
      displayName: "Sarawat Zaidi",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["iqbal-zaidi"],
       address: "India",
    },
    "abbas-nadir":{
      id: "abbas-nadir",
      displayName: "Abbas Nadir",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["iqbal-zaidi", "sarawat-zaidi"],
      spouseIds: [],
      address: "India",
      orderId: 1

    },
    "hamza-nadir":{
      id: "hamza-nadir",
      displayName: "Hamza Nadir",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["iqbal-zaidi", "sarawat-zaidi"],
      spouseIds: [],
      address: "India",
      orderId: 2

    },
    "zanib-nadir":{
      id: "zanib-nadir",
      displayName: "Zanib Nadir",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["iqbal-zaidi", "sarawat-zaidi"],
      spouseIds: [],
      address: "India",
      orderId: 3

    },
    'faraz-zaidi': {
      id: 'faraz-zaidi',
      displayName: 'Faraz Zaidi',
      gender: 'M',
      lifeStatus: 'alive',
      parentIds: ['nadra-zaidi', 'mahmood-akhtar'],
      spouseIds: ["firdos-zaidi"],
      address: 'India',
      orderId: 2
    },
    "firdos-zaidi": {
      id: "firdos-zaidi",
      displayName: "Firdos zaidi",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["faraz-zaidi"],
       address: 'India',
    },
  "faiz-raza":{
    id: "faiz-raza",
    displayName: "Faiz Raza",
    gender: "M",
    lifeStatus: "alive",
    parentIds: ["faraz-zaidi", "firdos-zaidi"],
    spouseIds: [],
    address: 'India',
    orderId: 1
  },
  "kulsum-fatima":{
    id: "kulsum-fatima",
    displayName: "Kulsum Fatima",
    gender: "F",
    lifeStatus: "alive",
    parentIds: ["faraz-zaidi", "firdos-zaidi"],
    spouseIds: [],
    address: 'India',
    orderId: 2
  },
    // Another daughter
    "sharaz-zaidi": {
      id: "sharaz-zaidi",
      displayName: "Sharaz Zaidi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadra-zaidi", "mahmood-akhtar"],
      spouseIds: ["ania-zaidi"],
      address: "India",
      orderId: 3,
    },
    "ania-zaidi": {
      id: "ania-zaidi",
      displayName: "Ania Zaidi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["sharaz-zaidi"],
      address: 'India',
    },
    "zohaib":{
      id: "zohaib",
      displayName: "Zohaib",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["sharaz-zaidi", "ania-zaidi"],
      spouseIds: [],
      address: 'India',
      orderId: 1
    },
    "zohra":{
      id: "zohra",
      displayName: "Zohra",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["sharaz-zaidi", "ania-zaidi"],
      spouseIds: [],
      address: 'India',
      orderId: 2
    },
    // Another child (example daughter)
    "hina-zaidi": {
      id: "hina-zaidi",
      displayName: "Hina Zaidi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadra-zaidi", "mahmood-akhtar"],
      spouseIds: ["talib-zaidi"],
      address: 'India',
      orderId: 4,
    },
    "talib-zaidi": {
      id: "talib-zaidi",
      displayName: "Talib Zaidi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["hina-zaidi"],
      address: 'India',
    },
    "hassan-zaidi":{
      id: "hassan-zaidi",
      displayName: "Hassan Zaidi",    
      gender: "M",
      lifeStatus: "alive",
      parentIds:["hina-zaidi", "talib-zaidi"],
      spouseIds: [],
      address: 'India',
      orderId: 1
    },
    "aleema-zaidi":{
      id: "aleema-zaidi",
      displayName: "Aleema Zaidi",    
      gender: "F",    
      lifeStatus: "alive",
      parentIds:["hina-zaidi", "talib-zaidi"],
      spouseIds: [],
      address: 'India',
      orderId: 2
    },
    "zeba-shah":
    { 
      id: "zeba-shah",
      displayName: "Zeba Shah",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["nadra-zaidi", "mahmood-akhtar"],
      spouseIds: ["sheraz-shah"],
      address: 'India',
      orderId: 6

    },
    "sheraz-shah": { 
      id: "sheraz-shah",
      displayName: "Sheraz Shah",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["zeba-shah"],
      address: 'India',
      avatarUrl: "sheraz.jpeg"

    },
    "ayan-sheraz": {
      id: "ayan-sheraz",
      displayName: "Ayan Sheraz",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["zeba-shah", "sheraz-shah"],
      spouseIds: [],
      address: 'India',
      orderId: 1
    },
    "fazal-sheraz": {
      id: "fazal-sheraz",
      displayName: "Fazal Sheraz",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["zeba-shah", "sheraz-shah"],
      spouseIds: [],
      address: 'India',
      orderId: 2
    },
        "huma-rizvi": {
      id: "huma-rizvi",
      displayName: "Huma Rizvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadra-zaidi", "mahmood-akhtar"],
      spouseIds: ["baqir-rizvi"],
      address: 'India',
      orderId: 5,
    },
    "baqir-rizvi": {
      id: "baqir-rizvi",  
      displayName: "Baqir Rizvi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["huma-rizvi"],
     address: 'India',
    },
    "akber-baqir": {
      id: "akber-baqir",
      displayName: "Akber Baqir",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["huma-rizvi", "baqir-rizvi"],
      spouseIds: [],
      address: 'India',
      orderId: 1
    },
    "qasim-baqir": {
      id: "qasim-baqir",
      displayName: "Qasim Baqir",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["huma-rizvi", "baqir-rizvi"],
      spouseIds: [],
      address: 'India',
      orderId: 2
    },
   
    "nighat": {
      id: "nighat",
      displayName: "Nighat",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["masood-jaffar"],
      address: 'India',
      orderId: 2,
    },
   
    "masood-jaffar": {
      id: "masood-jaffar",
      displayName: "Masood Jaffar",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["nighat"],
      address: 'India',
    },
    "yasir-rizvi": {
      id: "yasir-rizvi",
      displayName: "Yasir Rizvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["nighat", "masood-jaffar"],
      spouseIds: ["samreen"],
      address: 'India',
      orderId: 1
    },
    "samreen": {
      id: "samreen",
      displayName: "Samreen",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["yasir-rizvi"],
      address: 'India',
    },
   
    "samra-rizvi":{
      id: "samra-rizvi",
      displayName: "Samra Rizvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["yasir-rizvi", "samreen"],
      spouseIds: [],
      address: 'India',
      orderId: 1
    },
    "Inaaya":{
      id: "Inaaya",
      displayName: "Inaaya",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["yasir-rizvi", "samreen"],
      spouseIds: [],
      address: 'India',
      orderId: 2
    },
    "qadir-rizvi": {
      id: "qadir-rizvi",
      displayName: "Qadir Rizvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["nighat", "masood-jaffar"],
      spouseIds: ["masooma"],
     address: 'India',
      orderId: 2
    },
    "masooma": {
      id: "masooma",
      displayName: "Masooma",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["qadir-rizvi"],
    address: 'India',
    },
    "ali": {
      id: "ali",
      displayName: "Ali",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["qadir-rizvi", "masooma"],
      spouseIds: [],
     address: 'India',
      orderId: 1
    },
    "abraham": {
      id: "abraham",
      displayName: "Abraham",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["qadir-rizvi", "masooma"],
      spouseIds: [],
      address: 'India',
      orderId: 2
    },
    
    "erum-rizvi": {
      id: "erum-rizvi",
      displayName: "Erum Rizvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nighat", "masood-jaffar"],
      spouseIds: ["khushnood"],
      address: 'India',
      orderId: 3
    },
    "khushnood": {
      id: "khushnood",
      displayName: "Khushnood",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["erum-rizvi"],
      address: 'India',
    },
    "manzoor-rizvi": {
      id: "manzoor-rizvi",
      displayName: "Manzoor Rizvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["erum-rizvi", "khushnood"],
      spouseIds: [],
     address: 'India',
    orderId: 1
    },
    "minhal": {
      id: "minhal",
      displayName: "Minhal",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["erum-rizvi", "khushnood"],
      spouseIds: [],
      address: 'India',
      orderId: 2
    },
    "samar-baqri": {
      id: "samar-baqri",
      displayName: "Samar Baqri",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["Qasir Baqri"],
     address: 'India',
      orderId: 3
    },
    "Qasir Baqri": {
      id: "Qasir Baqri",
      displayName: "Qasir Baqri",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["samar-baqri"],
     address: 'India',
    },
    "sibtain": {
      id: "sibtain",
      displayName: "Sibtain",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["samar-baqri", "Qasir Baqri"],
      spouseIds: ["alina"],
      address: 'India',
      orderId: 1
    },
    "alina": {
      id: "alina",
      displayName: "Alina",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["sibtain"],
        parentIds:['azad', 'nusrat-ali'],
      address: 'India',
      orderId: 2
    },
    "almas": {
      id: "almas",
      displayName: "Almas",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["sibtain", "alina"],
      spouseIds: [],
      address: 'India',
      orderId: 1
    },
    "zaina": {
      id: "zaina",
      displayName: "Zaina",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["sibtain", "alina"],
      spouseIds: [],
     address: 'India',
      orderId: 2
    },
    "farhan": {
      id: "farhan",
      displayName: "Farhan",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["samar-baqri", "Qasir Baqri"],
      spouseIds: ["fakheha kazmi"],
      address: 'India',
      orderId: 2
    },
    "fakheha kazmi": {
      id: "fakheha kazmi",
      displayName: "Fakheha Kazmi",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["farhan"],
    address: 'India',
    },
    "nadiya": {
      id: "nadiya",
      displayName: "Nadiya",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["farhan", "fakheha kazmi"],
      spouseIds: [],
     address: 'India'
      ,orderId: 1
    },
    "rehan": {
      id: "rehan",
      displayName: "Rehan",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["samar-baqri", "Qasir Baqri"],
      spouseIds: ["shireen"],
      address: 'India'
      ,orderId: 3
    },
    "shireen": {
      id: "shireen",
      displayName: "Shireen",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["rehan"],
      address: 'India',
    },
    "azad": {
      id: "azad",
      displayName: "Azad",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["nadir-hussain", "shakra-begum"],
      spouseIds: ["nusrat-ali"],
    address: 'India',
      orderId: 4
    },
    "nusrat-ali": {
      id: "nusrat-ali",
      displayName: "Nusrat Ali",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["azad"],
      address: 'India',
    },

    "ali-akbar": {
      id: "ali-akbar",
      displayName: "Ali Akbar",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["azad", "nusrat-ali"],
      spouseIds: ["alia rizvi"],
     address: 'India'
      ,orderId: 1
    },
    "alia rizvi": {
      id: "alia rizvi",
      displayName: "Alia Rizvi",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ali-akbar"],
      address: 'India',

    },
    "elham":{
      id: "elham",
      displayName: "Elham",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["ali-akbar", "alia rizvi"],
      spouseIds: [],
      address: 'India'
      ,orderId: 1
    },

    "adiba": {
      id: "adiba",
      displayName: "Adiba",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["azad", "nusrat-ali"],
      spouseIds: ["danish-taqvi"],
      address: 'India'
      ,orderId: 3
    },
    "danish-taqvi": {
      id: "danish-taqvi",
      displayName: "Danish Taqvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shama-taqvi", "iqtidar-taqvi"],
      spouseIds: ["adiba"],
     address: 'India',
      orderId:2
    },
    "arhan":{
      id: "arhan",
      displayName: "Arhan",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["adiba", "danish-taqvi"],
      spouseIds: [],
      address: 'India'
      ,orderId: 1
    },
    "raza":{
      id: "raza",
      displayName: "Raza",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["adiba", "danish-taqvi"],
      spouseIds: [],
     address: 'India'
      ,orderId: 2
    },
    "shaheen-zaidi": {
      id: "shaheen-zaidi",
      displayName: "Shaheen Zaidi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["ali-jawad-zaidi"],
      address: 'India',
      orderId: 5,
      avatarUrl: "shaheen.jpeg"
    },
    "ali-jawad-zaidi": {
      id: "ali-jawad-zaidi",
      displayName: "Ali Jawad Zaidi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["shaheen-zaidi"],
     address: 'India',
     avatarUrl: "ali-jawad.jpeg"
    },
    "haider-abbas": {
      id: "haider-abbas",
      displayName: "Haider Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shaheen-zaidi", "ali-jawad-zaidi"],
      spouseIds: ["midhat-fatima"],
     address: 'India',
      orderId: 1,
      avatarUrl: "haider-abbas.jpg"
    },
    "midhat-fatima": {
      id: "midhat-fatima",
      displayName: "Midhat Fatima",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["haider-abbas"],
     address: 'India',
    },
    "rubab-fatima": {
      id: "rubab-fatima",
      displayName: "Rubab Fatima",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["haider-abbas", "midhat-fatima"],
     address: 'India'
      ,orderId: 1
    },
    "sakina-abbas": {
      id: "sakina-abbas",
      displayName: "Sakina Abbas",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["shaheen-zaidi", "ali-jawad-zaidi"],
      spouseIds: ["zakir-hussain-rizvi"],
      address: 'India'
      ,orderId: 2
    },
    "zakir-hussain-rizvi": {
      id: "zakir-hussain-rizvi",
      displayName: "Zakir Hussain Rizvi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["sakina-abbas"],
     address: 'India'
    },
    "maria-hussain": {
      id: "maria-hussain",
      displayName: "Maria Hussain",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["sakina-abbas", "zakir-hussain-rizvi"],
      spouseIds: ["zakir-hussain-rizvi"],
     address: 'India'
      ,orderId: 1
    },
    "insia-hussain": {
      id: "insia-hussain",
      displayName: "Insia Hussain",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["sakina-abbas", "zakir-hussain-rizvi"],
      spouseIds: ["zakir-hussain-rizvi"],
     address: 'India'
      ,orderId: 2
    },
    "shoa-zehra": {
      id: "shoa zehra",
      displayName: "Shoa Zehra",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["shaheen-zaidi", "ali-jawad-zaidi"],
      spouseIds: ["naqi-bukhari"],
     address: 'India'
      ,orderId: 3,


    },
    "naqi-bukhari": {
      id: "naqi-bukhari",
      displayName: "Naqi Bukhari",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["shoa-zehra"],
     address: 'India',

    },
    "askari-bukhari": {
      id: "askari-bukhari",
      displayName: "Askari Bukhari",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shoa-zehra", "naqi-bukhari"],
      spouseIds: [],
      address: 'India',

    },
    "sukaina-fatima": {
      id: "sukaina-fatima",
      displayName: "Sukaina Fatima",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["shoa-zehra", "naqi-bukhari"],
      spouseIds: [],
      address: 'India',

    },
    "shama-taqvi": {
      id: "shama-taqvi",
      displayName: "Shama Taqvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["iqtidar-taqvi"],
     address: 'India',
      orderId: 6

    },
    "iqtidar-taqvi": {
      id: "iqtidar-taqvi",
      displayName: "Iqtidar Taqvi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["shama-taqvi"],
     address: 'India',

    },
    "ashar-taqvi": {
      id: "ashar-taqvi",
      displayName: "Ashar Taqvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shama-taqvi", "iqtidar-taqvi"],
      spouseIds: ["nidha-taqvi"],
    address: 'India'
      ,orderId: 1

    },
    "nidha-taqvi": {
      id: "nidha-taqvi",
      displayName: "Nidha Taqvi",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ashar-taqvi"],
     address: 'India',

    },
    "sofia": {
      id: "sofia",
      displayName: "Sofia",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["ashar-taqvi", "nidha-taqvi"],
      spouseIds: [],
     address: 'India'
      ,orderId: 1

    },

    "shereen-taqvi": {
      id: "shereen-taqvi",
      displayName: "Shereen Taqvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["shama-taqvi", "iqtidar-taqvi"],
      spouseIds: ["vamiq"],
     address: 'India'
      ,orderId: 3
    },
    "vamiq": {
      id: "vamiq",
      displayName: "Vamiq",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["shereen-taqvi"],
      address: 'India',
    },
    "inaya": {
      id: "inaya",
      displayName: "Inaya",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["shereen-taqvi", "vamiq"],
      spouseIds: [],
    address: 'India'
      ,orderId: 1
    },
    "nasir-hussain": {
      id: "nasir-hussain",
      displayName: "Nasir Hussain",
      gender: "M",
        lifeStatus: "deceased",
      parentIds: ["khadim-hussain", "jawadi-baigam"],
      spouseIds: ["ansar-fatima"],
      grave: { city: "Karachi Pakistan" },
      
      orderId: 4,
      avatarUrl: "nasir.jpeg",
    },
    "ansar-fatima": {
      id: "ansar-fatima",
      displayName: "Ansar Fatima",
      gender: "F",
       lifeStatus: "deceased",
      spouseIds: ["nasir-hussain"],
      grave: { city: "Karachi Pakistan" },
    },
    "ghulam-abbas": {
      id: "ghulam-abbas",
      displayName: "Ghulam Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["nasir-hussain", "ansar-fatima"],
      spouseIds: ["kiran"],
      address: "USA",
      orderId: 1
    },
    "kiran": {
      id: "kiran",
      displayName: "Kiran",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ghulam-abbas"],
      address: "USA"
    },
    "kumail": {
      id: "kumail",
      displayName: "Kumail",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ghulam-abbas", "kiran"],
      spouseIds: ["rafiqa"],
      address: "USA"
      ,orderId: 1,
      avatarUrl: "kumail.jpg",
    },
    "rafiqa": {
      id: "rafiqa",
      displayName: "Rafiqa",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["kumail"],
      address: "USA"
    },
    "ali-akbar-abbas":{
      id: "ali-akbar-abbas",
      displayName: "Ali Akbar Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["kumail", "rafiqa"],
      spouseIds: [],
      address: "USA",
      orderId: 1
    },
    "ali-haider-abbas":{
      id: "ali-haider-abbas",
      displayName: "Ali Haider Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["kumail", "rafiqa"],
      spouseIds: [],
      address: "USA",
      orderId: 2
    },

    "baqar-abbas":{
      id: "baqar-abbas",
      displayName: "Baqar Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ghulam-abbas", "kiran"],
      spouseIds: [],
      address: "Karachi, Pakistan",
      orderId: 2,
      avatarUrl: "baqar-abbas.jpeg"
    },
    "murtaza":{
      id: "murtaza",
      displayName: "Murtaza",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ghulam-abbas", "kiran"],
      spouseIds: ["anum"],
      address: "Ireland",
      orderId: 3
    },
    "anum":{
      id: "anum",
      displayName: "Anum",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["murtaza"],
      address: "Ireland",
    },
    "ali-ahmed":{
      id: "ali-ahmed",
      displayName: "Ali Ahmed",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["murtaza", "anum"],
      spouseIds: [],
      address: "Ireland",
      orderId: 1
    },
    "sani-zehra":{
      id: "sani-zehra",
      displayName: "Sani Zehra",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["murtaza", "anum"],
      spouseIds: [],
      address: "Ireland",
      orderId: 2
    },
    "kamal-abbas":{
      id: "kamal-abbas",
      displayName: "Kamal Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["nasir-hussain", "ansar-fatima"],
      spouseIds: ["tabasum"],
      address: "Karachi, Pakistan",
      orderId: 2,
      avatarUrl: "kamal.jpeg"
    },
    "tabasum":{
      id: "tabasum",
      displayName: "Tabasum",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["kamal-abbas"],
      address: "Karachi, Pakistan",
    },
    "Taha":{
      id: "Taha",
      displayName: "Taha",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["kamal-abbas", "tabasum"],
      address: "Karachi, Pakistan",
      orderId:2
    },
    "Mahammad Abbas":{
      id: "Mahammad Abbas",
      displayName: "Muhammad Abbas",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["masooma-abbas"],
      parentIds: ["kamal-abbas", "tabasum"],  
       address: "Karachi, Pakistan",
      orderId: 1
    },
    "masooma-abbas":{
      id: "masooma-abbas",
      displayName: "Masooma Abbas",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["Mahammad Abbas"],
        address: "Karachi, Pakistan",
    },
    "walia-fatima":{
      id: "walia-fatima",
      displayName: "Walia Fatima",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["Mahammad Abbas", "masooma-abbas"],
       address: "Karachi, Pakistan",
      orderId: 1
    },

 "mazahir-hussain":{
      id: "mazahir hussain",
      displayName: "Mazahir Hussain",
      gender: "M",
     lifeStatus: "deceased",
      parentIds: ["khadim-hussain", "jawadi-baigam"],
      spouseIds: ["kishwar-sultana"],
      orderId: 5,
  grave: { city: "Karachi Pakistan" },
 },
 "kishwar-sultana":{
      id: "kishwar-sultana",
      displayName: "Kishwar Sultana",
      gender: "F",
       lifeStatus: "deceased",
      spouseIds: ["mazahir-hussain"],
        grave: { city: "Karachi Pakistan" },
 },
 "matahir-hussain":{
      id: "matahir-hussain",
      displayName: "Matahir Hussain",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazahir-hussain", "kishwar-sultana"],
      spouseIds: ["suraiya-ejaz"],
      orderId: 1,
        address: "Karachi, Pakistan",
      avatarUrl: "matahir.jpeg"
 },
 "suraiya-ejaz":{
      id: "suraiya-ejaz",
      displayName: "Suraiya Ejaz",
      gender: "F",
      lifeStatus: "deceased",
      spouseIds: ["matahir-hussain"]
      ,grave:{city: "Karachi Pakistan" },
      avatarUrl: "suraiya.jpeg"
 },
 "jawahir-abbas":{
      id: "jawahir-abbas",
      displayName: "Jawahir Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["matahir-hussain", "suraiya-ejaz"],
      spouseIds: ["bushra"],
      address: "Canada",
      orderId: 1,
      avatarUrl: "jawahir.jpeg"
 },
 "bushra":{
      id: "bushra",
      displayName: "Bushra",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["jawahir-abbas"]
      ,address: "Canada",
      avatarUrl: "bushra.jpeg"
 },
 "irtiza":{
      id: "irtiza",
      displayName: "Irtiza",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["jawahir-abbas", "bushra"],
      address: "Canada",
      orderId: 1
  
 },
 "mehdi-abbas":{
      id: "mehdi-abbas",
      displayName: "Mehdi Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["jawahir-abbas", "bushra"],
      address: "Canada",
      orderId: 2


 },
 "aliza-zehra":{
      id: "aliza-zehra",
      displayName: "Aliza Zehra",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["jawahir-abbas", "bushra"],
      orderId: 3,

       address: "Canada",

 },
 "rabab":{
      id: "rabab",
      displayName: "Rabab",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["matahir-hussain", "suraiya-ejaz"],
      spouseIds: ["asfar-naqvi"],
       address: "Karachi, Pakistan",
 },
 "asfar-naqvi":{
      id: "asfar-naqvi",
      displayName: "Asfar Naqvi",
      gender: "M",
      lifeStatus: "alive",
       address: "Karachi, Pakistan",
      spouseIds: ["rabab"],
      avatarUrl: "asfar.jpeg"
 },
 "haya-abbas":{
      id: "haya-abbas",
      displayName: "Haya Abbas",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["rabab", "asfar-naqvi"],
  address: "Karachi, Pakistan",
      orderId: 1
 },
 "mazhar-abbas":{
      id: "mazhar-abbas",
      displayName: "Mazhar Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazahir-hussain","kishwar-sultana"],
       address: "Karachi, Pakistan",
      spouseIds: ["shabana"],
      orderId: 5,
      avatarUrl: "mazhar-abbas.jpeg"
 },
 "shabana":{
      id: "shabana",
      displayName: "Shabana",
      gender: "F",
       address: "Karachi, Pakistan",
      lifeStatus: "alive",
      spouseIds: ["mazhar-abbas"]
 },
 "azhar":{
      id: "azhar",
      displayName: "Azhar",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazhar-abbas", "shabana"],
      spouseIds: ["marium"],
       address: "Karachi, Pakistan",
      orderId: 1
 },
 "marium":{
      id: "marium",
      displayName: "Marium",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["azhar"],
       address: "Karachi, Pakistan",
 },
 "askari":{
      id: "askari",
      displayName: "Askari",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["azhar", "marium"],
       address: "Karachi, Pakistan",
      orderId: 1
 
 },
 "sania-zehra":{
      id: "sania-zehra",
      displayName: "Sania Zehra",
      gender: "F",
      lifeStatus: "alive",
       parentIds: ["azhar", "marium"],
        address: "Karachi, Pakistan",
      orderId: 2

 },
 "asad":{
      id: "asad",
      displayName: "Asad",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazhar-abbas", "shabana"],
      spouseIds: ["narjis"],
       address: "Karachi, Pakistan",
      orderId: 2
 },
 "narjis":{
      id: "narjis",
      displayName: "Narjis",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["asad"],
       address: "Karachi, Pakistan",
 },
 
 "hassan":{
      id: "hassan",
      displayName: "Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["asad", "narjis"],
    address: "Karachi, Pakistan",
      orderId: 1
 },
 "ahmed":{
      id: "ahmed",
      displayName: "Ahmed",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazhar-abbas", "shabana"],
       address: "Karachi, Pakistan",
      orderId: 3

 },

 "tahir-abbas":{
      id: "tahir-abbas",
      displayName: "Tahir Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazahir-hussain","kishwar-sultana"],
      spouseIds: ["ghulam-fatima"],
       address: "Karachi, Pakistan",
      orderId: 7
 },
 "ghulam-fatima":{
      id: "ghulam-fatima",
      displayName: "Ghulam Fatima",
      gender: "F",
      lifeStatus: "deceased",
      spouseIds: ["tahir-abbas"],
      grave: { city: "Karachi Pakistan" },
      avatarUrl: "ghulam-fatima.jpeg"
 },
 "madiha":{
      id: "madiha",
      displayName: "Madiha",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["tahir-abbas", "ghulam-fatima"],
      spouseIds: ["qambar-hussain"],
       address: "Karachi, Pakistan",
      orderId: 1
 },
 "qambar-hussain":{
      id: "qambar-hussain",
      displayName: "Qambar Hussain",
      gender: "M",
      lifeStatus: "alive",
       address: "Karachi, Pakistan",
      spouseIds: ["madiha"]
 },
 "atika":{
      id: "atika",
      displayName: "Atika",
      gender: "F",
      lifeStatus: "alive",
       address: "Karachi, Pakistan",
      parentIds: ["qambar-hussain", "madiha"],
      orderId: 1

 },

 "jawahir-abbas-jaffery":{
   id: "jawahir-abbas-jaffery",
   displayName: "Jawahir Abbas Jaffery",
   gender: "M",
   lifeStatus: "deceased",
   grave: { city: "Karachi Pakistan" },
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: [],
    orderId: 3,
   
 },
 "salma-khatoon":{
   id: "salma-khatoon",
   displayName: "Salma Khatoon",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: ["saeed-haider-zaidi"],
   orderId: 2,
    avatarUrl: "salma.jpeg"
 },
 "saeed-haider-zaidi":{
   id: "saeed-haider-zaidi",
   displayName: "Saeed Haider Zaidi",
   gender: "M",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   spouseIds: ["salma-khatoon"],
   avatarUrl: "saeed.jpeg"
 },
 "Imran":{
   id: "Imran",
   displayName: "Imran",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["salma-khatoon", "saeed-haider-zaidi"],
   spouseIds: ["tasleem-fatima"],
   orderId: 1,
  address: "Karachi, Pakistan",
  avatarUrl: "imran.jpeg"
 },
 "tasleem-fatima":{
   id: "tasleem-fatima",
   displayName: "Tasleem Fatima",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   spouseIds: ["Imran"],
    avatarUrl: "tasleem-fatima.jpeg"
 },
 "wamak":{
   id: "wamak",
   displayName: "Wamak",
   gender: "M",
   lifeStatus: "alive",
    address: "Canada",
    parentIds: ["Imran", "tasleem-fatima"],
   spouseIds: []
  ,orderId: 1
 },
 "talib":{
   id: "talib",
   displayName: "Talib",
   gender: "M",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
    parentIds: ["Imran", "tasleem-fatima"],
   spouseIds: []
    ,orderId: 2
 },
 "salman-haider":{
   id: "salman-haider",
   displayName: "Salman Haider",
   gender: "M",
   lifeStatus: "alive",
   
  parentIds: ["salma-khatoon", "saeed-haider-zaidi"],
   spouseIds: ["Sana"],
   orderId: 2,
  address: "Abu Dhabi, UAE",
    avatarUrl: "salman-haider.jpeg"
 },
 "Sana":{
   id: "Sana",
   displayName: "Sana",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   spouseIds: ["salman-haider"],
    avatarUrl: "sana.jpeg"
 },
 "nihal":{
   id: "nihal",
   displayName: "Nihal",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["salman-haider", "Sana"],
   spouseIds: [],
   orderId: 1,
    avatarUrl: "nihal.jpeg"
 },
 "sukaina-salman":{
   id: "sukaina-salman",
   displayName: "Sukaina Salman",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["salman-haider", "Sana"],
    address: "Karachi, Pakistan",
   spouseIds: []
    ,orderId: 2
 },
 "furqan":{
   id: "furqan",
   displayName: "Furqan",
   gender: "M",
   lifeStatus: "alive",
    address: "Abu Dhabi, UAE",
     parentIds: ["salma-khatoon", "saeed-haider-zaidi"],
     orderId: 3,
   spouseIds: ["amber"],
    avatarUrl: "furqan.jpeg"
 },
 "amber":{
   id: "amber",
   displayName: "Amber",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   spouseIds: ["furqan"]
 },
 "sami":{
   id: "sami",
   displayName: "Sami",
   gender: "M",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["furqan", "amber"],
   spouseIds: []
  ,orderId: 1
 },
 "shargeel":{
   id: "shargeel",
   displayName: "Shargeel",
   gender: "M",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["furqan", "amber"],
   spouseIds: []
  ,orderId: 2
 },
 "zahnib":{
   id: "zahnib",
   displayName: "Zahnib",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["furqan", "amber"],
   spouseIds: []
  ,orderId: 3
 },

 "sabahat":{
   id: "sabahat",
   displayName: "Sabahat",
   gender: "F",
   lifeStatus: "alive",
    address: "USA",
   parentIds: ["salma-khatoon", "saeed-haider-zaidi"],
   spouseIds: ["ather"]
  ,orderId: 4
 },
 "ather":{
   id: "ather",
   displayName: "Ather",
   gender: "M",
   lifeStatus: "alive",
    address: "USA",
   spouseIds: ["sabahat"]
 },
"sikander":{
   id: "sikander",
   displayName: "Sikander",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["ather", "sabahat"],
    address: "USA",
   spouseIds: [],
   orderId: 1
},
"redha":{
   id: "redha",
   displayName: "Redha",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["ather", "sabahat"],
    address: "USA",
   spouseIds: []
    ,orderId: 2
},

 "allay":{
   id: "allay",
   displayName: "Allay",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
    address: "Karachi, Pakistan",
   spouseIds: ["sadiq-hussain"],
   avatarUrl: "allay.jpg",
   orderId: 6
 },
 "sadiq-hussain":{
   id: "sadiq-hussain",
   displayName: "Sadiq Hussain",
   gender: "M",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   spouseIds: ["allay"],
   avatarUrl: "allay.jpg"
 },
 "ammar":{
   id: "ammar",
   displayName: "Ammar",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["allay","sadiq-hussain"],
    address: "Karachi, Pakistan",
   spouseIds: ["kisa"],
   orderId: 1,
    avatarUrl: "hassan-ammar.jpg"
 },
 "kisa":{
   id: "kisa",
   displayName: "Kisa",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["ammar"],
    address: "Karachi, Pakistan"
    ,avatarUrl: "almas.jpg"
 },
 "muhammad-mohsin":{
    id: "muhammad-mohsin",
    displayName: "Muhammad Mohsin",
    gender: "M",
    lifeStatus: "alive",
    parentIds: ["ammar","kisa"],
    address: "Karachi, Pakistan",
    orderId: 1,
    avatarUrl: "muhammad-mohsin.jpg"
 },
 "rahima-fatima":{
    id: "rahima-fatima",
    displayName: "Rahima Fatima",
    gender: "F",
    lifeStatus: "alive",
    parentIds: ["ammar","kisa"],
    address: "Karachi, Pakistan",
    orderId: 2,
    avatarUrl: "rahima.jpg"
 },
 "kumail-haider":{
   id: "kumail-haider",
   displayName: "Kumail Haider",
   gender: "M",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["allay","sadiq-hussain"],
   spouseIds: ["sadaf-haider"],
   avatarUrl: "kummail.jpeg",
   orderId: 2
 },
 "sadaf-haider":{
   id: "sadaf-haider",
   displayName: "Sadaf Raza",
    address: "Karachi, Pakistan",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["kumail-haider"],
   avatarUrl: "sadaf-raza.jpg"
 },
 "muhammad-arif-hassan":{
   id: "muhammad-arif-hassan",
   displayName: "Muhammad Arif",
   gender: "M",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["kumail-haider","sadaf-haider"],
    orderId: 1,
    avatarUrl: "arif-hassan.jpg"
 },
 "muhammadf-taqi-jawad":{
   id: "muhammadf-taqi-jawad",
   displayName: "Muhammad Taqi",
   gender: "M",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["kumail-haider","sadaf-haider"],
    orderId: 2
    ,avatarUrl: "taqi-jawad.jpg"
 },
 "sadiqi-fatima":{
    id: "sadiqi-fatima",
    displayName: "Sadiqi Fatima",
    gender: "F",
    lifeStatus: "alive",
    parentIds: ["kumail-haider","sadaf-haider"],
    address: "Karachi, Pakistan",
    orderId: 3,
    avatarUrl: "sidiqa.jpg"
  },

 "messam":{
   id: "messam",
   displayName: "Maysum Hasan",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["allay","sadiq-hussain"],
   spouseIds: ["azhara"]
  ,orderId: 3,
  avatarUrl: "mesum.jpg"
 },
 "azra":{
   id: "azra",
   displayName: "Azra",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   spouseIds: ["messam"]
  ,avatarUrl: "azra.jpg"
 },
 "lubaba":{
   id: "lubaba",
   displayName: "Lubaba",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["messam","azra"],
    orderId: 1,
    avatarUrl: "lubaba.jpg"

 },
 "akbar":{
   id: "akbar",
   displayName: "Akbar",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["messam","azra"],
    address: "Karachi, Pakistan",
    orderId: 2,
    avatarUrl: "akbar.jpg"
  //  spouseIds: ["nargis(baby)"]
 },

 "nargis(baby)":{
   id: "nargis(baby)",
   displayName: "Nargis",
   gender: "F",
   lifeStatus: "alive",
    address: "Karachi, Pakistan",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: ["afroz"],
   orderId: 4,
   avatarUrl: "narjis.jpg"
 },
 "afroz":{
   id: "afroz",
   displayName: "Afroz",
   gender: "M",
   lifeStatus: "deceased",
   grave: { city: "Karachi Pakistan" },
   spouseIds: ["nargis(baby)"]
    ,avatarUrl: "afroz.jpg"
   
 },
 "zaigham":{
   id: "zaigham",
   displayName: "Zaigham",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["nargis(baby)","afroz"],
    orderId: 1,
    spouseIds: ["nadia"],
    address: "Karachi, Pakistan",
  avatarUrl: "zaigham.jpg"
  //  spouseIds: ["Zahra(Munni)"]
 },
  "nadia":{
    id: "nadia",
    displayName: "Nadia",
    gender: "F",
    lifeStatus: "alive",
    spouseIds: ["zaigham"]
      ,address: "Karachi, Pakistan"
      ,avatarUrl: "nadia.jpg"
  },
  "mohib":{
    id: "mohib",
    displayName: "Mohib",
    gender: "M",
    lifeStatus: "alive",
    parentIds: ["zaigham","nadia"],
      address: "Karachi, Pakistan",
      orderId: 1,
      avatarUrl: "mohib.jpg"
  },
  "baqhir":{
    id: "baqhir",
    displayName: "Baqhir",
    gender: "M",
    lifeStatus: "alive",
      address: "Karachi, Pakistan",
    parentIds: ["zaigham","nadia"],
      orderId: 2,
      avatarUrl: "baqhir.jpg"
  },
  "tatheer":{
    id: "tatheer",
    displayName: "Tatheer",
    gender: "F",
      address: "Karachi, Pakistan",
    lifeStatus: "alive",
    parentIds: ["zaigham","nadia"],
      orderId: 3,
      avatarUrl: "tatheer.jpg"
  },
 "Zahra(Munni)":{
   id: "Zahra(Munni)",
   displayName: "Taskeen Zahra",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: ["qalb-e-abid"],
    address: "Karachi, Pakistan",
   orderId: 8
 },
 "qalb-e-abid":{
   id: "qalb-e-abid",
   displayName: "Qalb-e-Abid",
   gender: "M",
   lifeStatus: "alive",
   spouseIds: ["Zahra(Munni)"],
   address: "Karachi, Pakistan"
 },
 "raza-abid":{
   id: "raza-abid",
   displayName: "Raza Abid",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["Zahra(Munni)","qalb-e-abid"],
    spouseIds: ["sadaf-raza"]
    ,orderId: 1,
    address: "Germany"
 },

 "sadaf-raza":{
   id: "sadaf-raza",
   displayName: "Sadaf",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["raza-abid"]
    ,address: "Germany"
 },
 "hajra-khatoon":
   {
     id: "hajra-khatoon",
     displayName: "Hajra Khatoon",
     gender: "F",
      lifeStatus: "deceased",
     parentIds: ["khadim-hussain","jawadi-baigam"],
     spouseIds: ["ghazanfar-hussain"],
     grave: { city: "Karachi Pakistan" },
     orderId: 6,
      avatarUrl: "hajra.jpeg"
   },

 "ghazanfar-hussain":
   {
     id: "ghazanfar-hussain",
     displayName: "Ghazanfar Hussain",
     gender: "M",
      lifeStatus: "deceased",
     spouseIds: ["hajra-khatoon"]
      ,grave: { city: "Karachi Pakistan"},
      avatarUrl: "ghazanfar.jpeg"
   },
   // tarafdar abbas 
   "tarafdar-abbas":{
     id: "tarafdar-abbas",
     displayName: "Tarafdar Abbas",
     gender: "M",
     lifeStatus: "deceased",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
     orderId: 1
      ,grave: { city: "Karachi Pakistan" },
      avatarUrl: "tarafdar-abbas.jpeg"
   },
   // shandar abbas 
   "shandar-abbas":{
     id: "shandar-abbas",
     displayName: "Shandar Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["tahira-abbas"],
      address:"Melbourne, Australia",
      orderId: 4,
      avatarUrl: "shandar-abbas.jpg"
   },
   "tahira-abbas":{
     id: "tahira-abbas",
     displayName: "Tahira Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["fakhir-hussain","mehdia-bano"],
     spouseIds: ["shandar-abbas"],
     address:"Melbourne, Australia",
     orderId: 1,
      avatarUrl: "tahira-abbas.jpg"
   },
   // raza abbas
   "raza-abbas":{
     id: "raza-abbas",
     displayName: "Raza Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["shandar-abbas","tahira-abbas"],
      spouseIds: ["zertaj-fatima"],
      address:"Qom Iran",
      orderId: 1,
      avatarUrl: "raza.jpeg"
   },
   "zertaj-fatima":{
     id: "zertaj-fatima",
     displayName: "Zertaj Fatima",
     gender: "F",
     lifeStatus: "alive",
   address:"Qom Iran",
     parentIds: ["sehr-shabana","aallay-imran-zaidi"],
     spouseIds: ["raza-abbas"],
     orderId: 4
      ,avatarUrl: "zertaj.jpeg"
   },
   "hassanabbas":{
     id: "hassanabbas",
     displayName: "Hassan Abbas",
     gender: "M",
     lifeStatus: "alive",
    address:"Qom Iran",
     parentIds: ["raza-abbas","zertaj-fatima"],
     orderId: 1,
     avatarUrl: "hassan-raza.jpeg"
     
   },
   "fiza-abbas":{
     id: "fiza-abbas",
     displayName: "Fiza Abbas",
     gender: "F",
    address:"Qom Iran",
     lifeStatus: "alive",
     parentIds: ["raza-abbas","zertaj-fatima"],
      orderId: 2
      
   },

   "mohsin-abbas":{
     id: "mohsin-abbas",
     displayName: "Mohsin Abbas",
     gender: "M",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     parentIds:["shandar-abbas","tahira-abbas"],
      spouseIds: ["eraj-abbas"],
      orderId:4,
      avatarUrl: "mohsin-abbas.jpeg"
      
   },
   "eraj-abbas":{
     id: "eraj-abbas",
     displayName: "Eraj Abbas",
     gender: "M",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     parentIds:["yawar-abbas","taseem"],
     spouseIds: ["mohsin-abbas"],
    orderId:2
   },
   "erum-abbas":{
     id: "erum-abbas",
     displayName: "Erum Abbas",
     gender: "F",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     parentIds:["shandar-abbas","tahira-abbas"],
      spouseIds: ["aalay-ali"]
      ,orderId:2,
      avatarUrl: "erum.jpg"
   },
   "aalay-ali":{
     id: "aalay-ali",
     displayName: "Aalay Ali",
     gender: "M",
     address:"Melbourne, Australia",
     lifeStatus: "alive",
     parentIds:["sehr-shabana","aallay-imran-zaidi"],
     spouseIds: ["erum-abbas"]
      ,orderId:1,
      avatarUrl: "ale-ali.jpg"
   },
   "aalay-abbas":{
     id: "aalay-abbas",
     displayName: "Aalay Abbas",
     gender: "M",
     address:"Melbourne, Australia",
     lifeStatus: "alive",
     parentIds:["erum-abbas","aalay-ali"],
     orderId:1,
     avatarUrl: "ale-abbas.jpg"
    
   },
   "hani-muslim":{
     id: "hani-muslim",
     displayName: "Hani Muslim",
     gender: "F",
     address:"Melbourne, Australia",
     lifeStatus: "alive",
     parentIds:["erum-abbas","aalay-ali"],
      orderId:2,
      avatarUrl: "hani.jpg"
     
   },
   "kinza-abbas":{
     id: "kinza-abbas",
     displayName: "Kinza Abbas",
     gender: "F",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     parentIds:["shandar-abbas","tahira-abbas"],
      spouseIds: ["shamoon"]
      ,orderId:3,
      avatarUrl: "kinza.jpeg"

   },
   "shamoon":{
     id: "shamoon",
     displayName: "Shamoon",
     gender: "M",
     address:"Melbourne, Australia",
     lifeStatus: "alive",
     spouseIds: ["kinza-abbas"]
   },
   "narjis-shamoon":{
     id: "narjis-jr",
     displayName: "Narjis",
     gender: "F",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     parentIds:["kinza-abbas","shamoon"],
    orderId: 1,
      avatarUrl: "nargis-kinza.jpeg"
      
   },
   "Marium":{
     id: "Marium",
     displayName: "Marium",
     gender: "F",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     parentIds:["kinza-abbas","shamoon"],
      orderId: 2,
      avatarUrl: "marium.jpeg"
   },

   "zainab-abbas":{
     id: "zainab-abbas",
     displayName: "Zainab Abbas",
     gender: "F",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     parentIds:["shandar-abbas","tahira-abbas"],
      spouseIds: ["zain"]
      ,orderId:5,
      avatarUrl: "zainab.jpeg"
   },
   "zain":{
     id: "zain",
     displayName: "Zain",
     gender: "M",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     spouseIds: ["zainab-abbas"]

   },
   "zara":{
     id: "zara",
     displayName: "Zara",
     gender: "F",
     address:"Melbourne, Australia",
     lifeStatus: "alive",
     parentIds:["zainab-abbas","zain"],
      orderId:1
   },
   "sayada-abbas":{
     id: "sayada-abbas",
     displayName: "Sayada Abbas",
     gender: "F",
     address:"Melbourne, Australia",
     lifeStatus: "alive",
     parentIds:["shandar-abbas","tahira-abbas"],
      orderId:6,
      avatarUrl: "syeda.jpeg"
     
   },
   //naveed abbas
   "naveed-abbas":{
     id: "naveed-abbas",
     displayName: "Naveed Abbas",
     gender: "M",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["shamim-abbas"],
      orderId: 7,
      avatarUrl: "naved.jpeg"
   },
   "shamim-abbas":{
     id: "shamim-abbas",
     displayName: "Shamim Abbas",
     gender: "M",
     address:"Melbourne, Australia",
     lifeStatus: "alive",
     spouseIds: ["naveed-abbas"]
      ,avatarUrl: "shameem.jpeg"
   },
   "muhammad-abbas":{
     id: "muhammad-abbas",
     displayName: "Muhammad",
     gender: "M",
     lifeStatus: "alive",
     address:"Melbourne, Australia",
     avatarUrl: "muhammad-abbas.jpeg",
     parentIds: ["naveed-abbas","shamim-abbas"],
      orderId: 1
   },
   "kazim-abbas":{
     id: "kazim-abbas",
     displayName: "Kazim Abbas",
     gender: "M",
     lifeStatus: "alive",
     address:"Melbourne, Australia",

     parentIds: ["naveed-abbas","shamim-abbas"],
      spouseIds: ["Iman"]
      ,orderId: 2,
      avatarUrl: "kazim.jpeg"
   },
   "Iman":{
     id: "Iman",
     displayName: "Iman",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["kazim-abbas"],
     address:"Melbourne, Australia",

   
   },
   "Aiman":{
     id: "Aiman",
     displayName: "Aiman",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["naveed-abbas","shamim-abbas"],
     spouseIds:["sajad"]
      ,orderId: 3,
     address:"Melbourne, Australia",

   }
   ,
   "sajad":{
     id: "sajad",
     displayName: "Sajad",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["Aiman"],
     address:"Melbourne, Australia",

   },
   "haider":{
     id: "haider",
     displayName: "Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["Aiman","sajad"],
      orderId: 1,
     address:"Melbourne, Australia",

    
   },
   "yousef":{
     id: "yousef",
     displayName: "Yousef",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["Aiman","sajad"],
      orderId: 2,
     address:"Melbourne, Australia",

 
   },
   "wafadar-abbas":{
     id: "wafadar-abbas",
     displayName: "Wafadar Abbas",
     gender: "M",
     address:"Karachi, Pakistan",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["naseem-abbas"],
      orderId: 6,
      avatarUrl: "wafadar.jpg"

   },
   "naseem-abbas":{
     id: "naseem-abbas",
     displayName: "Naseem Abbas",
     gender: "F",
     address:"Karachi, Pakistan",
     lifeStatus: "alive",
     spouseIds: ["wafadar-abbas"],
     avatarUrl: "naseem.jpg"
   },
   "komal":{
     id: "komal",
     displayName: "Komal",
     gender: "F",
     address:"Abu Dhabi, UAE",
     lifeStatus: "alive",
     parentIds: ["naseem-abbas","wafadar-abbas"],
     spouseIds:["sajjad"],
     orderId: 1,
      avatarUrl: "komal.jpeg"
   },
   "sajjad":{
     id: "sajjad",
     displayName: "Sajjad",
     gender: "M",
      address:"Abu Dhabi, UAE",
     lifeStatus: "alive",
     spouseIds: ["komal"]
      ,avatarUrl: "sajjad.jpeg"
   },
   "abis":{
     id: "abis",
     displayName: "Abis",
     gender: "M",
      address:"Abu Dhabi, UAE",
     lifeStatus: "alive",
     parentIds: ["sajjad","komal"],
    orderId: 1,
    avatarUrl: "abis.jpeg"
   },
      "joan":{
     id: "joan",
     displayName: "Joan",
     gender: "M",
      address:"Abu Dhabi, UAE",
     lifeStatus: "alive",
     parentIds: ["sajjad","komal"],
    orderId: 2
    ,avatarUrl: "joan.jpeg"
   },
   "nida":{
     id: "nida",
     displayName: "Nida",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["wafadar-abbas","naseem-abbas"],
     spouseIds:["hilal"],
     orderId: 2,
     address:"Melbourne, Australia",
     avatarUrl: "nida.jpg"
   },
   "hilal":{
     id: "hilal",
     displayName: "Hilal",
     gender: "M",
     lifeStatus: "alive",
     parentIds:["sehr-shabana","aallay-imran-zaidi"],
     spouseIds: ["nida"],
      address:"Melbourne, Australia",
     orderId: 2,
     avatarUrl: "hilal.jpg"
   },
   "sani":{
     id: "sani",
     displayName: "Sani",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["wafadar-abbas","naseem-abbas"],
     spouseIds:["mehdi"],
     address:"Melbourne, Australia",
      orderId: 3,
      avatarUrl: "sani.jpg"
   },
   "mehdi":{
     id: "mehdi",
     displayName: "Mehdi",
     gender: "M",
     lifeStatus: "alive",
      address:"Melbourne, Australia",
     spouseIds: ["sani"]
      ,avatarUrl: "mehdi.jpg"
   },
  "naqi":{
    id: "naqi",
    displayName: "Naqi",
    gender: "M",
    lifeStatus: "alive",
     address:"Melbourne, Australia",
    parentIds: ["sani","mehdi"],
      orderId: 1,
      avatarUrl: "naqi.jpg"
   
  },
  "fatima":{
    id: "fatima",
    displayName: "Fatima Zehra",
    gender: "F",
    lifeStatus: "alive",
    parentIds: ["wafadar-abbas","naseem-abbas"],
     spouseIds: ["musa"]
      ,orderId: 4,
      address:"Hungary"
      ,avatarUrl: "fatima.jpeg"
  },

  "moosa":{
    id: "moosa",
    displayName: "Moosa Zaidi",
    gender: "M",
    lifeStatus: "alive",
    spouseIds: ["fatima"],
    address:"Hungary"
    ,avatarUrl: "musa.jpeg"
  },
   "yawar-abbas":{
     id: "yawar-abbas",
     displayName: "Yawar Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["taseem"],
      orderId: 8,
     address:"Melbourne, Australia",

   },
   "taseem":{
     id: "taseem",
     displayName: "Tasneem",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["yawar-abbas"],
     address:"Melbourne, Australia",

   },
   "areeba":{
     id: "areeba",
     displayName: "Areeba",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["yawar-abbas","taseem"],
      spouseIds: ["mehdi-hakeem"],
      address: "Melbourne Australia",
      orderId: 1,
      
   },
   "mehdi-hakeem":{
     id: "mehdi-hakeem",
     displayName: "Mehdi Hakeem",
     gender: "M",
     lifeStatus: "alive",
     address: "Melbourne Australia",
     parentIds: ["kazmeen-khatoon","syed-waqar-hussain"],
     spouseIds: ["areeba"],
     orderId:4
   },
   "batool-hakeem":{
     id: "batool-hakeem",
     displayName: "Batool Hakeem",
     gender: "F",
     address: "Melbourne Australia",
     lifeStatus: "alive",
     parentIds: ["areeba","mehdi-hakeem"],
      orderId: 1
      
   },
   "haniya":{
     id: "haniya",
     displayName: "Haniya",
     gender: "F",
     address: "Melbourne Australia",
     lifeStatus: "alive",
     parentIds: ["areeba","mehdi-hakeem"],
      orderId: 2


   },
   
   "feroza":{
     id: "feroza",
     displayName: "Feroza",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["sayedain-zaidi"],
      address: "USA",
      orderId: 2,
      avatarUrl: "feroza.jpeg"
   },
   "sayedain-zaidi":{
     id: "sayedain-zaidi",
     displayName: "Sayedain Zaidi",
     gender: "M",
     lifeStatus: "deceased",
     spouseIds: ["feroza"]
      ,grave: { city: "Islamabad Pakistan" },
      avatarUrl: "sayedain-zaidi.jpeg"

   },
   "qurat-ul-ain":{
     id: "qurat-ul-ain",
     displayName: "Qurat-ul-Ain",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
      spouseIds: ["ali-hadi"],
      orderId: 1,
      address: "USA",
      avatarUrl: "qurat-ul-ain.jpeg"
   },
   "ali-hadi":{
     id: "ali-hadi",
     displayName: "Ali Hadi",
     gender: "M",
     lifeStatus: "alive",
     parentIds:["farzana","ali-baqir-jr"],
     spouseIds: ["qurat-ul-ain"],
      address: "USA",
     orderId:1,
      avatarUrl: "ali-hadi.jpeg"

   },
   "jaffar":{
     id: "jaffar",
     displayName: "Jaffar",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["qurat-ul-ain","ali-hadi"],
      spouseIds: ["shanzai"],
      address: "USA",
      orderId: 1
   },
   "shanzai":{
     id: "shanzai",
     displayName: "Shanzai",
     gender: "F",
     lifeStatus: "alive",
     address: "USA",
     spouseIds: ["jaffar"],
    
   },

   "hider":{
     id: "hider",
     displayName: "Hider",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["qurat-ul-ain","ali-hadi"],
     orderId: 2
     
   },
   "alia":{
     id: "alia",
     displayName: "Alia",
     gender: "F",
     lifeStatus: "alive",
      address: "Karachi, Pakistan",
     parentIds: ["qurat-ul-ain","ali-hadi"],
      spouseIds: ["aqeil-abdi"]
      ,orderId: 3
   },
      "aqeil-abdi":{
     id: "aqeil-abdi",
     displayName: "Aqeel Abdi",
     gender: "F",
     lifeStatus: "alive",
      address: "Karachi, Pakistan",
     spouseIds: ["alia"]
   },
   "hassan-abdi":{
     id: "hassan-abdi",
     displayName: "Hassan Abdi",
     gender: "M",
     address: "Karachi, Pakistan",
     lifeStatus: "alive",
     parentIds: ["alia","aqeil-abdi"],
      orderId: 1

   },
   "mustafa":{
     id: "mustafa",
     displayName: "Mustafa",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["feroza","sayedain-zaidi"],
      spouseIds: ["salma"],
      orderId: 2
   },
   "salma":{
     id: "salma",
     displayName: "Salma",
     gender: "F",
     lifeStatus: "alive",
      address: "USA",
     spouseIds: ["mustafa"]
   },
   "abbas-mustafa":{
     id: "abbas-mustafa",
     displayName: "Abbas Mustafa",
     gender: "M",
     lifeStatus: "alive",
      address: "USA",
     parentIds: ["mustafa","salma"],
      spouseIds: ["sukaina-abbas"],
      orderId: 1
   },
   "sukaina-abbas":{
     id: "sukaina-abbas",
     displayName: "Sukaina Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds:['yawar-abbas','taseem'],
     orderId: 3,
      address: "USA",
     spouseIds: ["abbas-mustafa"]
   },
   "hamza":{
     id: "hamza",
     displayName: "Hamza",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mustafa","salma"],
      spouseIds: ["kainat"],
      address: "USA"
      ,orderId: 2
   },
   "kainat":{
     id: "kainat",
     displayName: "Kainat",
     gender: "F",
     lifeStatus: "alive",
     address: "USA",
     spouseIds: ["hamza"]
   },
   "meshim":{
     id: "meshim",
     displayName: "Meshim",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["mustafa","salma"],
      orderId: 3

   },
   "talib-mustafa":{
     id: "talibjr",
     displayName: "Talib",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["mustafa","salma"],
      orderId: 4

   },
   "zanib-mustafa":{ 
     id: "zanib-mustafa",
     displayName: "Zanib Mustafa",
     gender: "F",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["mustafa","salma"],
      orderId: 5

   },
   "ali-zaidi":{
     id: "ali-zaidi",
     displayName: "Ali Zaidi",
     gender: "M",
     lifeStatus: "alive",
     address: "Qom Iran",
     parentIds: ["feroza","sayedain-zaidi"],
      spouseIds: ["afeen"]
      ,orderId: 3,
      avatarUrl:"ali-zaidi.jpeg"
   },
   "afeen":{
     id: "afeen",
     displayName: "Afeen",
     gender: "F",
     lifeStatus: "alive",
      address: "Qom Iran",
     parentIds:["kazmeen-khatoon","syed-waqar-hussain"],
     spouseIds: ["ali-zaidi"],
     orderId:7
   },
   "hussain-ali":{
     id: "hussain-ali",
     displayName: "Hassaun Ali",
     gender: "M",
     lifeStatus: "alive",
      address: "Qom Iran",
     parentIds: ["ali-zaidi","afeen"],
    orderId: 1
   },
   "abbas-ali":{
     id: "abbas-ali",
     displayName: "Abbas Ali",
     gender: "M",
      address: "Qom Iran",
     lifeStatus: "alive",
     parentIds: ["ali-zaidi","afeen"],
    orderId: 2

   },
   "zehra-ali":{
     id: "zehra-ali",
     displayName: "Zehra Ali",
     gender: "F",
     lifeStatus: "alive",
      address: "Qom Iran",
     parentIds: ["ali-zaidi","afeen"],
    orderId: 3
   },
   "akbar-zaidi":{
     id: "akbar-zaidi",
     displayName: "Akbar Zaidi",
     gender: "M",
     address: "USA",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
     spouseIds: ["sadaf-akbar"]
      ,orderId: 4,
      avatarUrl: "akbar-zaidi.jpeg"
      
   },
   "sadaf-akbar":{
     id: "sadaf-akbar",
     displayName: "Sadaf",
     gender: "F",
     address: "USA",
     lifeStatus: "alive",
     spouseIds: ["akbar-zaidi"]
   },
   "ibrahim":{
     id: "ibrahim",
     displayName: "Ibrahim",
     gender: "M",
     address: "USA",
     lifeStatus: "alive",
     parentIds: ["akbar-zaidi","sadaf-akbar"],
     orderId: 1
   },
   "ghazi":{
     id: "ghazi",
     displayName: "Ghazi",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["akbar-zaidi","sadaf-akbar"],
      orderId: 2
   },

   "muzamil":{
     id: "muzamil",
     displayName: "Muzamil",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["feroza","sayedain-zaidi"],
      spouseIds: ["ponam"]
      ,orderId: 5,
      avatarUrl:"muzamil.jpeg"
   },
   "ponam":{
     id: "ponam",
     displayName: "Ponam",
     gender: "F",
     address: "USA",
     lifeStatus: "alive",
     spouseIds: ["muzamil"]
   },
   "kisa-muzamil":{
     id: "kisa-muzamil",
     displayName: "Kisa Muzamil",
     gender: "F",
     address: "USA",
     lifeStatus: "alive",
     parentIds: ["muzamil","ponam"],
      orderId: 4
    //  spouseIds: ["ibrahim"]
   },
   "sakina-muzamil":{
     id: "sakina-muzamil",
     displayName: "Sakina Muzamil",
     gender: "F",
     address: "USA",
     lifeStatus: "alive",
     parentIds: ["muzamil","ponam"],
      orderId: 5
   
   },
   "zahir":{
     id: "zahir",
     displayName: "Zahir",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["muzamil","ponam"],
      orderId: 1
   },
   "khizar":{
     id: "khizar",
     displayName: "Khizar",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["muzamil","ponam"],
      orderId: 2
   },
   "shabir":{
     id: "shabir",
     displayName: "Shabir",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["muzamil","ponam"],
      orderId: 3
   },
   "fakhar":{
     id: "fakhar",
     displayName: "Fakhar",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["feroza","sayedain-zaidi"],
     spouseIds: ["hawra"],
     orderId: 6
   },
   "hawra":{
     id: "hawra",
     displayName: "Hawra",
     gender: "F",
     address: "USA",
     lifeStatus: "alive",
     spouseIds: ["fakhar"]
   },
   "muhammad-fakhar":{
     id: "muhammad-fakhar",
     displayName: "Muhammad",
     gender: "M",
     address: "USA",
     lifeStatus: "alive",
     parentIds: ["fakhar","hawra"],
     orderId:1
   },
   "tatheer-fakhar":{
     id: "tatheer-fakhar",
     displayName: "Tatheer",
     gender: "F",
     address: "USA",
     lifeStatus: "alive",
     parentIds: ["fakhar","hawra"],
      orderId:2
   },
   "wajahat":{
     id: "wajahat",
     displayName: "Wajahat",
     gender: "M",
     lifeStatus: "alive",
     address: "USA",
     parentIds: ["feroza","sayedain-zaidi"],
     spouseIds: ["zanib"]
      ,orderId: 7,
      avatarUrl: "wajahat.jpeg"
   },
   "zanib":{
     id: "zanib",
     displayName: "Zanib",
     gender: "F",
     lifeStatus: "alive",
     address: "USA",
     spouseIds: ["wajahat"],
      avatarUrl: "zanib.jpeg"
   },
   "ayat":{
     id: "ayat",
     displayName: "Ayat",
     gender: "F",
     lifeStatus: "alive",
     address: "USA",
      parentIds: ["wajahat","zanib"],
      orderId: 1

   },
   "mekaeil":{
     id: "mekaeil",
     displayName: "Mekaeil",
     gender: "F",
     address: "USA",
     lifeStatus: "alive",
     parentIds: ["wajahat","zanib"],
      orderId: 2
   },

   "farzana":{
     id: "farzana",
     displayName: "Farzana",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["ali-baqir-jr"],
      address:"USA",
      orderId: 5
   },
   "ali-baqir-jr":{
     id: "ali-baqir-jr",
     displayName: "Ali Baqir",
     gender: "M",
     address: "USA",
     lifeStatus: "deceased",
     grave: {
       city: "USA"
     },
     spouseIds: ["farzana"],
     avatarUrl: "ali-baqir-jr.jpeg"
   },
   "dilawar":{
     id: "dilawar",
     displayName: "Dilawar",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["farzana","ali-baqir-jr"],
      spouseIds: ["fozia"],
      orderId: 2,
      address:"Islamabad Pakistan",
    
   },
   "fozia":{
     id: "fozia",
     displayName: "Fozia",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["dilawar"],
    address:"Islamabad Pakistan"
  
   },
   "abbas-dilawar":{
     id: "abbas",
     displayName: "Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["dilawar","fozia"],
     orderId: 1,
     address:"Islamabad Pakistan"
      // spouseIds: ["syed-waqar-hussain"]
   },
   "hussain-dilawar":{
     id: "hussain",
     displayName: "Hussain",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["dilawar","fozia"],
      orderId: 2,
      address:"Islamabad Pakistan"
      // spouseIds: ["syed-waqar-hussain"]
   },
   "abiha-dilawar":{
     id: "abiha-dilawar",
     displayName: "Abiha",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["dilawar","fozia"],
      orderId: 3,
      address:"Islamabad Pakistan"
      // spouseIds: ["syed-waqar-hussain"]
   },
   "muntazir":{
     id: "muntazir",
     displayName: "Muntazir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["farzana","ali-baqir-jr"],
      spouseIds: ["mehak"]
      ,orderId: 3,
      address:"Melbourne Australia"
   },
   "mehak":{
     id: "mehak",
     displayName: "Mehak",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["sehr-shabana","aallay-imran-zaidi"],
     spouseIds: ["muntazir"],
      address:"Melbourne Australia",
     orderId: 3,
      avatarUrl: "mehak.jpeg"
   },
   "muhammad-ayan":{
     id: "muhammad-ayan",
     displayName: "Syed Muhammad Ayan Mehdi ",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muntazir","mehak"],
     orderId: 1,
      address:"Melbourne Australia",
      avatarUrl: "ayan.jpg"
   },
   "ali-asghar":{
     id: "ali-asghar",
     displayName: "Syed Ali Asghar Mehdi ",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muntazir","mehak"],
      orderId: 2,
       address:"Melbourne Australia",
      avatarUrl: "ali-asghar.jpg"
   },
   "zahra-muntazir":{
     id: "zahra-muntazir",
     displayName: "Zahra Fatima",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["muntazir","mehak"],
      orderId: 3,
       address:"Melbourne Australia",
      avatarUrl: "zahra.jpg"
      // spouseIds: ["syed-waqar-hussain"]
   },
   "kiran-farzana":{
     id: "kiran-farzana",
     displayName: "Kiran Farzana",
     gender: "F",
     address:"USA",
     lifeStatus: "alive",
     parentIds: ["farzana","ali-baqir-jr"],
      spouseIds: ["zulqanain"]
      ,orderId: 4
   },
   "zulqanain":{
     id: "zulqanain",
     displayName: "Zulqanain",
     gender: "F",
          address:"USA",
     lifeStatus: "alive",
     spouseIds: ["kiran-farzana"],
   },
   "kumail-zulqanain":{
     id: "kumail-zulqanain",
     displayName: "Kumail Zulqanain",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["zulqanain","kiran-farzana"],
          address:"USA",
      orderId: 1
   },
   "ala-muhammad":{
     id: "ala-muhammad",
     displayName: "Ala Muhammad",
     gender: "M",
     lifeStatus: "alive",
          address:"USA",
     parentIds: ["zulqanain","kiran-farzana"],
      orderId: 2
      // spouseIds: ["syed-waqar-hussain"]
   },
   "honia":{
     id: "honia",
     displayName: "Honia",
     gender: "F",
          address:"USA",
     lifeStatus: "alive",
     parentIds: ["zulqanain","kiran-farzana"],
      orderId: 3
      // spouseIds: ["syed-waqar-hussain"]
   },
   "rida":{
     id: "rida",
     displayName: "Rida",
     gender: "F",
          address:"USA",
     lifeStatus: "alive",
     parentIds: ["zulqanain","kiran-farzana"],
      orderId: 4
      // spouseIds: ["syed-waqar-hussain"]
   },

   "kazmeen-khatoon":{
     id: "kazmeen",
     displayName: "Kazmeen Khatoon",
     gender: "F",
     address: "Karachi",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["syed-waqar-hussain"],
      orderId: 3
   },
   "syed-waqar-hussain":{
     id: "syed-waqar-hussain",
     displayName: "Syed Waqar Hussain",
     gender: "M",
     lifeStatus: "deceased",
     grave:{
       city: "Karachi Pakistan"},
     spouseIds: ["kazmeen-khatoon"],
      avatarUrl: "waqar.jpeg",
   },
   "irshaad":{
     id: "irshaad",
     displayName: "Irshaad",
     gender: "M",
     lifeStatus: "deceased",
     grave:{
       city: "Karachi Pakistan",
      
     },
     parentIds: ["kazmeen-khatoon","syed-waqar-hussain"],
     orderId: 1,
      // spouseIds: ["syed-waqar-hussain"]
   },
   "miqdad":{
     id: "miqdad",
     displayName: "Miqdad",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kazmeen-khatoon","syed-waqar-hussain"],
       spouseIds: ["sameen"],
       address:"Ireland",
      orderId: 2
   },
   "sameen":{
     id: "sameem",
     displayName: "Sameem",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["miqdad"],
         address:"Ireland",
   },
   "waqar-miqdad":{
     id: "waqar-miqdad",
     displayName: "Waqar Miqdad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["miqdad","sameen"],
      orderId: 1,
          address:"Ireland",
      // spouseIds: ["syed-waqar-hussain"]
   },
   "sakina-miqdad":{
     id: "sakina-miqdad",
     displayName: "Sakina Miqdad",
     gender: "F",
      lifeStatus: "alive",
      parentIds: ["miqdad","sameen"],
        orderId: 2,
            address:"Ireland",
    },
   "iqtida-mehdi-miqdad":{
     id: "iqtida-mehdi-miqdad",
     displayName: "Iqtida Mehdi",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kazmeen-khatoon","syed-waqar-hussain"],
       spouseIds: ["abiha"],
       address: "Karachi Pakistan",
      orderId: 2,
        avatarUrl: "iqtida.jpeg"
   },
   "abiha":{
     id: "abiha",
     displayName: "Abiha",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["iqtida-mehdi-miqdad"],
       address: "Karachi Pakistan"
   },
   "hadi-iqtida-miqdad":{
     id: "hadi-iqtida-miqdad",
     displayName: "Hadi Iqtida Miqdad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["iqtida-mehdi-miqdad","abiha"],
      orderId: 1,
      address: "Karachi Pakistan",
      // spouseIds: ["syed-waqar-hussain"]
   },
   "fatima-iqtida-miqdad":{
     id: "fatima-iqtida-miqdad",
     displayName: "Fatima Iqtida Miqdad",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["iqtida-mehdi-miqdad","abiha"],
       orderId: 2,
       address: "Karachi Pakistan"
   },
   "areej-kazmeen":{
     id: "areej-kazmeen",
     displayName: "Areej Kazmeen",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kazmeen-khatoon","syed-waqar-hussain"],
     address: "Karachi Pakistan"
      ,orderId: 5
   },
   "salman-zaidi":{
     id: "salman-zaidi",
     displayName: "Salman Zaidi",
     gender: "M",
     lifeStatus: "alive",
     address: "Karachi Pakistan",
     spouseIds: ["areej-kazmeen"]
   },
   "saim-salman-zaidi":{
     id: "saim-salman-zaidi",
     displayName: "Saim Salman Zaidi",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["salman-zaidi","areej-kazmeen"],
      orderId: 1,
      address: "Karachi Pakistan"
      // spouseIds: ["syed-waqar-hussain"]
   },
   "manahil-saim-zaidi":{
     id: "manahil-saim-zaidi",
     displayName: "Manahil Saim Zaidi",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["salman-zaidi","areej-kazmeen"],
        orderId: 2,
        address: "Karachi Pakistan"

       
   },
   "sabool-kazmeen":{
     id: "sabool-kazmeen",
     displayName: "Sabool Kazmeen",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kazmeen-khatoon","syed-waqar-hussain"],
      spouseIds: ["haider-zaidi"]
      ,orderId: 6,
      address: "Karachi Pakistan"
   },
   "haider-zaidi":{
     id: "haider-zaidi",
     displayName: "Haider",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["sabool-kazmeen"],
     address: "Karachi Pakistan"
   },

   "muslim-haider":{
     id: "muslim-haider",
     displayName: "Muslim Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["haider","sabool-kazmeen"],
      orderId: 1,
      address: "Karachi Pakistan"
      // spouseIds: ["syed-waqar-hussain"]
   },
  

   "sehr-shabana":{
     id: "sehr-shabana",
     displayName: "Sehr Shabana",
     gender: "F",
     lifeStatus: "deceased",
     grave: {
       city:"Multan Pakistan",
     },
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["aallay-imran-zaidi"],
      orderId: 9
   },
   "aallay-imran-zaidi":{
     id: "aallay-imran-zaidi",
     displayName: "Aallay Imran Zaidi",
     gender: "M",
     lifeStatus: "deceased",
     grave: {
       city:"Multan Pakistan",
     },
     spouseIds: ["sehr-shabana"],
      avatarUrl: "aallay-imran-zaidi.jpeg"

   },
   

 "saba":{
     id: "saba",
     displayName: "Saba",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["sehr-shabana","aallay-imran-zaidi"],
     spouseIds:["hassan-jan"]
      ,orderId:5,
      address:'Melbourne Australia',
      avatarUrl:"saba.jpeg"
   },
   "hassan-jan":{
     id: "hassan-jan",
     displayName: "Hassan Jan",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["saba"],
      address:'Melbourne Australia',
      avatarUrl:"hassan-jan.jpeg"

   },
"mushir-hussain":{
     id: "mushir-hussain",
     displayName: "Mushir Hussain",
     gender: "M",
      lifeStatus: "deceased",
     parentIds: ["khadim-hussain","jawadi-baigam"],
     grave: { city: "Karachi Pakistan" },
     spouseIds:["narjis-mushir"],
     orderId: 7,
     avatarUrl:"mushir.jpeg"
   },
   "narjis-mushir":{
     id: "narjis-mushir",
     displayName: "Narjis-Mushir",
     gender: "F",
      lifeStatus: "deceased",
     spouseIds:["mushir-hussain"],
     grave: { city: "Karachi Pakistan" },
     avatarUrl:"nargis.jpeg"
   },
"nadeem-mushir":{
     id: "nadeem-mushir",
     displayName: "Nadeem Mushir",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['Fatima-nadeem'],
     address:"USA",
     orderId:1,
      avatarUrl:"nadeem-mushir.jpeg"

},
"Fatima-nadeem":{
     id: "Fatima-nadeem",
     displayName: "Fatima Nadeem",
     gender: "F",
     address:"USA",
     lifeStatus: "alive",
     spouseIds:["nadeem-mushir"],
      avatarUrl:"fatima-nadeem.jpeg"
},
"muhammad-nadeem":{
     id: "muhammad-nadeem",
     displayName: "Muhammad Nadeem",
     gender: "M",
     address:"USA",
     lifeStatus: "alive",
     parentIds: ["nadeem-mushir","Fatima-nadeem"],
     orderId:3
},
"murtaza-nadeem":{
     id: "murtaza-nadeem",
     displayName: "Murtaza Nadeem",
     gender: "M",
     address:"USA",
     lifeStatus: "alive",
     parentIds: ["nadeem-mushir","Fatima-nadeem"],
     orderId:4
},
"faryal-nadeem":{
     id: "faryal-nadeem",
     displayName: "Faryal Nadeem",
     gender: "F",
     address:"USA",
     lifeStatus: "alive",
     parentIds: ["nadeem-mushir","Fatima-nadeem"],
     spouseIds:["hammad"]
      ,orderId:1
},
"hammad":{
     id: "hammad",
     displayName: "Hammad",
     gender: "M",
     lifeStatus: "alive",
       address:"USA",
     spouseIds:["faryal-nadeem"]
},
"aliyan-hammad":{
     id: "ayan-hammad",
     displayName: "Ayan Hammad",
     gender: "M",
      address:"USA",
     lifeStatus: "alive",
     parentIds: ["hammad","faryal-nadeem"],
    
     orderId:1
},
"arya-hammad":{
     id: "arya-hammad",
     displayName: "Arya Hammad",
     gender: "F",
     lifeStatus: "alive",
      address:"USA",
     parentIds: ["hammad","faryal-nadeem"],
      orderId:2
},

"mishal-nadeem":{
     id: "mishal-nadeem",
     displayName: "Mishal Nadeem",
     gender: "F",
     lifeStatus: "alive",
     address:'Islamabad Pakistan',
     parentIds: ["nadeem-mushir","Fatima-nadeem"],
     spouseIds:["aon-naqvi"]
      ,orderId:2
},
"aon-naqvi":{
     id: "aon-naqvi",
     displayName: "Aon Naqvi",
     gender: "M",
       address:'Islamabad Pakistan',
     lifeStatus: "alive",
     spouseIds:["mishal-nadeem"]
},
"ali-qasim-aon":{
     id: "ali-qasim-aon",
     displayName: "Ali Qasim Aon",
     gender: "M",
       address:'Islamabad Pakistan',
     lifeStatus: "alive",
     parentIds: ["aon-naqvi","mishal-nadeem"],
      orderId:1
},
"muhammad-aon":{
     id: "muhammad-aon",
     displayName: "Muhammad Mehdi",
     gender: "M",
     lifeStatus: "alive",
       address:'Islamabad Pakistan',
     parentIds: ["aon-naqvi","mishal-nadeem"],
      orderId:2
},

"faheem-mushir":{
     id: "faheem-mushir",
     displayName: "Faheem Mushir",
     gender: "M",
     lifeStatus: "alive",
     address: "Karachi Pakistan",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['kolsom-fatima-faheem'],
     orderId:2,
     avatarUrl:"faheem-mushir.png"
},
"kolsom-fatima-faheem":{
     id: "kolsom-fatima-faheem",
     displayName: "Kolsom fatima faheem",
     gender: "F",
     address: "Karachi Pakistan",

     lifeStatus: "alive",
     spouseIds:["faheem-mushir"]
},
"rabab-zehra-faheem":{
     id: "rabab-zehra-faheem",
     displayName: "Rabab Zehra Faheem",
     gender: "F",
     lifeStatus: "alive",
     address: "Canada",
     parentIds: ["faheem-mushir","kolsom-fatima-faheem"],
     spouseIds:["murtuza-haider"],
     orderId:1
},
"murtuza-haider":{
     id: "murtuza-haider",
     displayName: "Murtuza Haider",
     gender: "M",
      lifeStatus: "alive",
      address: "Canada",
      spouseIds:["rabab-zehra-faheem"]
},
"syeda":{
     id: "syeda",
     displayName: "Syeda",
     gender: "F",
     lifeStatus: "alive",
     address: "Canada",
     parentIds: ["rabab-zehra-faheem","murtuza-haider"],
      orderId:1
},

"farah-mushir":{
     id: "farah-mushir",
     displayName: "Farah Mushir",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['aga-zia-haider'],
     address:"USA",
     orderId:3,
      avatarUrl:"farah-mushir.jpeg"
},
"aga-zia-haider":{
     id: "aga-zia-haider",
     displayName: "Aga Zia Haider",
     address:"USA",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["farah-mushir"],
     avatarUrl:'aga-zia-haider.jpeg'
},
"asad-aga-zia-haider":{
     id: "asad-aga-zia-haider",
     displayName: "Asad Aga Zia Haider",
     gender: "M",
     address:"USA",

     lifeStatus: "alive",
     parentIds: ["aga-zia-haider","farah-mushir"],
     spouseIds:["zehra-asad-agha"],
     orderId:1

},
"zehra-asad-agha":{
     id: "zehra-asad-agha",
     displayName: "Zehra Asad Agha",
     gender: "F",
     lifeStatus: "alive",
     address:"USA",

     spouseIds:["asad-aga-zia-haider"]
},
"ali-aga-zia-haider":{
     id: "ali-aga-zia-haider",
     displayName: "Ali Aga Zia Haider",
     gender: "M",
     lifeStatus: "alive",
     address:"USA",

     parentIds: ["aga-zia-haider","farah-mushir"],
     orderId:2
     
},
"sameer-aga-zia-haider":{
     id: "sameer-aga-zia-haider",
     displayName: "Sameer Aga Zia Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["aga-zia-haider","farah-mushir"],
      orderId:3,
     address:"USA",

},
"jawad-mushir":{
     id: "jawad-mushir",
     displayName: "Jawad Mushir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['rabab-Fatima'],
     orderId:4,
     address:"Karachi Pakistan",
      avatarUrl:"jawad-mushir.jpg"
     
},
"rabab-Fatima":{
     id: "rabab-Fatima",
     displayName: "Rubab Fatima",
     gender: "F",
     address:"Karachi Pakistan",

     lifeStatus: "alive",
     spouseIds:["jawad-mushir"]
},

"zafar-mushir":{
     id: "zafar-mushir",
     displayName: "Zafar Mushir",
     gender: "M",
     lifeStatus: "alive",
     address:"USA",

     parentIds: ["mushir-hussain","narjis-mushir"],

     spouseIds:['fatima-zafar']
      ,orderId:5,
      avatarUrl:"zafar-mushir.jpeg"
},
"fatima-zafar":{
     id: "fatima-zafar",
     displayName: "Fatima Zafar",
     gender: "F",
     lifeStatus: "alive",
     address:"USA",

     spouseIds:["zafar-mushir"]
},
"kamran-mushir":{
     id: "kamran-mushir",
     displayName: "Kamran Mushir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['asma-kamran']
      ,orderId:6,
      address:"Karachi Pakistan",
      avatarUrl:"kamran.jpg"
},
"asma-kamran":{
     id: "asma-kamran",
     displayName: "Asma Kamran",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["kamran-mushir"],
      address:"Karachi Pakistan",
},
"ali-mehdi-kamran":{
     id: "ali-mehdi-kamran",
     displayName: "Ali Mehdi Kamran",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["kamran-mushir","asma-kamran"],
      orderId: 1,
      address:"Karachi Pakistan",
    
},
"sakina-kamran":{
     id: "sakina-kamran",
     displayName: "Sakina Kamran",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kamran-mushir","asma-kamran"],
      orderId: 2,
      address:"Karachi Pakistan",
},
"nazir-hussain":{
     id: "nazir-hussain",
     displayName: "Nazir Hussain",
     gender: "M",
       lifeStatus: "deceased",
     parentIds: ["khadim-hussain","jawadi-baigam"],
   grave: { city: "India" },
     orderId: 10
},
"ghayur-fatima":{
     id: "ghayur-fatima",
     displayName: "Ghayur Fatima",
     gender: "M",
       lifeStatus: "deceased",
     parentIds: ["khadim-hussain","jawadi-baigam"],
  grave: { city: "Karachi Pakistan" },
     orderId: 9,
     spouseIds:["syed-abrar-hussain"],
     avatarUrl:"gayor-fatima.jpeg"

},
"syed-abrar-hussain":{
     id: "syed-abrar-hussain",
     displayName: "Syed Abrar Hussain",
     gender: "M",
       lifeStatus: "deceased",
     spouseIds:["ghayur-fatima"],
  grave: { city: "Lahore Pakistan" },
},
"sayra":{
      id: "sayra",
      displayName: "Sayra",
      gender: "F",
       lifeStatus: "deceased",
      parentIds: ["khadim-hussain","jawadi-baigam"],
    grave: { city: "India" },
      orderId: 11
},
"fakhir-hussain":{
     id: "fakhir-hussain",
     displayName: "Fakhir Hussain",
     gender: "M",
       lifeStatus: "deceased",
     parentIds: ["khadim-hussain","jawadi-baigam"],
     spouseIds:['mehdia-bano'],
     grave: { city: "Multan Pakistan" },
     orderId: 8,
     avatarUrl:"fakhir-hussain.jpeg"
},
"mehdia-bano":{
     id: "mehdia-bano",
     displayName: "Mehdia Bano",
     gender: "F",
      lifeStatus: "deceased",
     spouseIds:["fakhir-hussain"],
     grave: { city: "Karachi Pakistan"},
     avatarUrl:"mehdia.jpeg"
},
"muhammad-ali":{
     id: "muhammad-ali",
     displayName: "Muhammad Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["fakhir-hussain","mehdia-bano"],
     address:"KSA Saudi Arabia",
     spouseIds:["ambreen-ali"],
    avatarUrl: "muhammad-ali.jpeg",
     orderId: 3
},


"ambreen-ali":{
     id: "ambreen-ali",
     displayName: "Ambreen Ali",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["muhammad-ali"],
     address: "Karachi, Pakistan",
     avatarUrl: "ambreen-ali.jpeg",
},
"ghayas-ali":{
     id: "ghayas-ali",
     displayName: "Ghayas Ali",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["muhammad-ali","ambreen-ali"],
     spouseIds:["kisa-mubaraka"],
    address: "Karachi, Pakistan",
    avatarUrl: "ghayas-ali.jpeg",
     orderId:1
},
"kisa-mubarka":{
     id: "kisa-mubarka",
     displayName: "Kisa Mubarka",
     gender: "F",
     address: "Karachi, Pakistan",
     lifeStatus: "alive",
     spouseIds:["ghayas-ali"],
     avatarUrl: "kisa.jpeg",
},
"aun-ali":{
     id: "aun-ali",
     displayName: "Aun Ali",
     gender: "M",
     lifeStatus: "alive",
     address: 'Skardu Pakistan',
     parentIds: ["muhammad-ali","ambreen-ali"],
     spouseIds:["sabeena-brohi"],
     orderId: 2,
     avatarUrl:"aun.jpeg"
},
"sabeena-brohi":{
     id: "sabeena-brohi",
     displayName: "Sabeena Brohi",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["aun-ali"],
       address: 'Skardu Pakistan',
       avatarUrl:"sabeena.jpeg"
},
"taha-ali":{
     id: "taha-ali",
     displayName: "Taha Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muhammad-ali","ambreen-ali"],
     orderId: 3,
     address:'Malaysia*',
     avatarUrl:"taha.jpeg"
    //  spouseIds:["zahra-ali"]
},
"ayrish-ali":{
     id: "ayrish-ali",
     displayName: "Ayrish Ali",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["muhammad-ali","ambreen-ali"],
      orderId: 4,
      address:'Malaysia',
      avatarUrl:"ayrish-ali.jpeg"
    //  spouseIds:["taha-ali"]
},
"amira-haider":{
     id: "amira-haider",
     displayName: "Amira Haider",
     gender: "F",
     lifeStatus: "alive",
     address: "Karachi, Pakistan",
     parentIds: ["fakhir-hussain","mehdia-bano"],
      spouseIds:["mustafa-haider"],
      orderId:2
      ,avatarUrl:"amirah-haider.jpeg"
},
"mustafa-haider":{
     id: "mustafa-haider",
     displayName: "Mustafa Haider",
     gender: "M",
     lifeStatus: "alive",
     address: "Karachi, Pakistan",

     spouseIds:["amira-haider"],
       avatarUrl:"mustafa.jpeg"
   
},
"ali-haider-kazmi":{
     id: "ali-haider-kazmi",
     displayName: "Ali Haider Kazmi",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mustafa-haider","amira-haider"],
     spouseIds:["kulsoom-haider"]
      ,orderId:2,
     address: "Karachi, Pakistan",
      avatarUrl:"ali-haider-kazmi.jpeg"

},
"kulsoom-haider":{
     id: "kulsoom-haider",
     displayName: "Kulsoom Haider",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["ali-haider-kazmi"],
     address: "Karachi, Pakistan",
      avatarUrl:"kulsoom-haider.jpeg"

},
"abbas-haider":{
     id: "abbas-haider",
     displayName: "Abbas Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["ali-haider-kazmi","kulsoom-haider"],
     orderId:1,
     address: "Karachi, Pakistan",
      avatarUrl:"abbas-haider.jpeg"

    //  spouseIds:["naqi-murtuza"]
},
"hassan-haider":{
     id: "hassan-haider",
     displayName: "Hassan Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["ali-haider-kazmi","kulsoom-haider"],
      orderId:2,
     address: "Karachi, Pakistan",
     avatarUrl:"hassan-haider.jpeg"

    //  spouseIds:["naqi-murtuza"]
},
"uzma":{
     id: "uzma",
     displayName: "Uzma",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["amira-haider","mustafa-haider"],
     spouseIds:["murtuza"],
     orderId:1,
     address: "Karachi, Pakistan",
      avatarUrl:"uzma.jpeg"

},
"murtuza":{
     id: "murtuza",
     displayName: "Murtuza",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["uzma"],
     address: "Karachi, Pakistan",
     avatarUrl:"murtuza-haider.jpeg"

},
"naqi-murtuza":{
     id: "naqi-murtuza",
     displayName: "Naqi Murtuza",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["murtuza","uzma"],
      orderId:1,
     address: "Karachi, Pakistan",
      avatarUrl:"naqi-murtuza.jpeg"

},

"sidra":{
     id: "sidra",
     displayName: "Sidra",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["amira-haider","mustafa-haider"],
     orderId: 3,
     address: "Karachi, Pakistan",
     avatarUrl:"sidra.jpeg"
    
},
"arshia":{
     id: "arshia",
     displayName: "Arshia",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["amira-haider","mustafa-haider"],
     spouseIds:["naqi-haider"],
      orderId: 4,
     address: "Karachi, Pakistan",
      avatarUrl:"arshia.jpg"

},
"naqi-haider":{
     id: "naqi-haider",
     displayName: "Naqi Haider",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["arshia"],
     address: "Karachi, Pakistan",
      avatarUrl:"naqi-haider.jpg"

},
"abid":{
     id: "abid",
     displayName: "Abid",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["amira-haider","mustafa-haider"],
      orderId: 5,
     address: "Karachi, Pakistan",
     avatarUrl:"abid.jpg"
     
     

},

    // Grandchildren examples (Ali Baqir couple)
   
  },
};