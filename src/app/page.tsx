"use client";



import React, { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, Heart, Baby, Home, MapPin, Info } from "lucide-react";

/* =========================
   Types & Data Schema
========================= */

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
    location?: string; // GPS or row/plot
    notes?: string;
  };
  spouseIds?: string[]; // all spouses (husband/wife)
  parentIds?: string[]; // usually [fatherId, motherId] when known
}

export interface FamilyTree {
  rootId: string; // family head to start from
  persons: Record<string, Person>;
}

/* =========================
   SAMPLE DATA (Replace with your JSON)
========================= */

const SAMPLE_FAMILY: FamilyTree =
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
      notes: "Head of the Hussain family tree.",
      parentIds: ["ghulam-hussain"],
      spouseIds: ["jawadi-baigam"],
    },

    // Wife
    "jawadi-baigam": {
      id: "jawadi-baigam",
      displayName: "Jawadi Baigam جوادی بیگم",
      gender: "F",
      lifeStatus: "deceased",
      deathDate: "2002-01-01",
      spouseIds: ["khadim-hussain"],
      grave: {
        city: "Karachi",
        cemetery: "Wadi-e-Hussain",
        section: "Block A",
        notes: "Near central gate.",
      },
    },

    // Children of Khadim & Jawadi (examples)
    "shakir-hussain": {
      id: "shakir-hussain",
      displayName: "Shakir Hussain",
      gender: "M",
      lifeStatus: "deceased",
      parentIds: ["khadim-hussain", "jawadi-baigam"],
      spouseIds: ["uroosa-baigam"],
      grave: { city: "Karachi" },
    },
    "uroosa-baigam": {
      id: "uroosa-baigam",
      displayName: "Uroosa Baigam",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["shakir-hussain"],
    },

    "hassan-abbas": {
      id: "hassan-abbas",
      displayName: "Hassan Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shakir-hussain", "uroosa-baigam"],
      spouseIds: ["nasreen"],
      address: "Lahore, Pakistan",
    },
    "nasreen": {
      id: "nasreen",
      displayName: "Nasreen",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["hassan-abbas"],
    },
    razajr:{
      id: "razajr",
      displayName: "Raza",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["hassan-abbas", "nasreen"],
      spouseIds: ["hina-raza"],
      address: "Lahore, Pakistan",
    },
    "hina-raza": {
      id: "hina-raza",
      displayName: "Hina Raza",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["razajr"],
    },
    "faizan-raza": {
      id: "faizan-raza",
      displayName: "Faizan Raza",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["razajr", "hina-raza"],
      spouseIds: ["warisha-farzan"],
      address: "Lahore, Pakistan",
    },
    "warisha-farzan": {
      id: "warisha-farzan",
      displayName: "Warisha Farzan",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["faizan-raza"],
    },
    "zahroon-farzan"    : {
      id: "zahroon-farzan",
      displayName: "Zahroon Farzan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["faizan-raza", "warisha-farzan"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },
    "zain-raza-hassan"  : {
      id: "zain-raza-hassan",
      displayName: "Zain Raza Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["razajr", "hina-raza"],
      spouseIds: ["mansoor"],
      address: "Lahore, Pakistan",
    },
    "mansoor"           : {
      id: "mansoor",
      displayName: "Mansoor",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["zain-raza-hassan"],
    },
    "aun-raza-hassan"   : {
      id: "aun-raza-hassan",
      displayName: "Aun Raza Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["razajr", "hina-raza"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },
    "azan-mustafa"      : {
      id: "azan-mustafa",
      displayName: "Azan Mustafa",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["razajr", "hina-raza"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },
    "salman": {
      id: "salman",
      displayName: "Salman",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["hassan-abbas", "nasreen"],
      spouseIds: ["zahra-jafery"],
      address: "Lahore, Pakistan",

    },
    "zahra-jafery": {
      id: "zahra-jafery",
      displayName: "Zahra Jafery",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["salman"],
    },
    "taha-salman": {
      id: "taha-salman",
      displayName: "Taha Salman",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["salman", "zahra-jafery"],
      spouseIds: [],
      address: "Lahore, Pakistan",

    },
    "alishba": {
      id: "alishba",
      displayName: "Alishba",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["salman", "zahra-jafery"],
      spouseIds: ["sameer"],
      address: "Lahore, Pakistan",
    },
    "sameer": {
      id: "sameer",
      displayName: "Sameer",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["alishba"],
    },
    

    "alijr": {
      id: "alijr",
      displayName: "Ali",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["hassan-abbas", "nasreen"],
      spouseIds: ["sadaf"],
      address: "Lahore, Pakistan",

    },
    "sadaf": {
      id: "sadaf",
      displayName: "Sadaf",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["alijr"],
    },
    "mustufa-ali-hassan": {
      id: "mustufa-ali-hassan",
      displayName: "Mustufa Ali Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["alijr", "sadaf"],
      spouseIds: ["minhaljr"],
      address: "Lahore, Pakistan",
    },
    "muhammad-ali": {
      id: "muhammad-ali",
      displayName: "Muhammad Ali",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["alijr", "sadaf"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },
    "minhaljr": {
      id: "minhaljr",
      displayName: "Minhal",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["mustufa-ali-hassan"],
    },
    "taqi":{
      id: "taqi",
      displayName: "Taqi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["hassan-abbas", "nasreen"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },

    "khadim-hussain-jr": {
      id: "khadim-hussain-jr",
      displayName: "Khadim Hussain.",
      gender: "M",
       lifeStatus: "deceased",
      parentIds: ["shakir-hussain", "uroosa-baigam"],
      spouseIds: [],
      address: "Karachi, Pakistan",
    },
    "sabir-hussain": {
      id: "sabir-hussain",
      displayName: "Sabir Hussain",
      gender: "M",
      lifeStatus: "deceased",
      parentIds: ["khadim-hussain", "jawadi-baigam"],
      spouseIds: ["tanveer-fatima"],
      grave: { city: "Karachi" },
    },
    "tanveer-fatima": {
      id: "tanveer-fatima",
      displayName: "Tanveer Fatima",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["sabir-hussain"],
    },
    "ali-imam": {
      id: "ali-imam",
      displayName: "Ali Imam",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["sabir-hussain", "tanveer-fatima"],
      spouseIds: ["noor-fatima"],
      address: "Islamabad, Pakistan",
    },
    "noor-fatima": {
      id: "noor-fatima",
      displayName: "Noor Fatima",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ali-imran"],
    },
    "hassan-imam": {
      id: "hassan-imam",
      displayName: "Hassan Imam",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ali-imam", "noor-fatima"],
      spouseIds: [],
      address: "Islamabad, Pakistan",
    },
    "batool:": {
      id: "batool",
      displayName: "Batool",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["ali-imam", "noor-fatima"],
      spouseIds: ["mansoor-jaffery"],
      address: "Karachi, Pakistan",
    },
    "mansoor-jaffery": {
      id: "mansoor-jaffery",
      displayName: "Mansoor Jaffery",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["batool"],
    },
    "daniyal-jaffery": {
      id: "daniyal-jaffery",
      displayName: "Daniyal Jaffery",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["batool", "mansoor-jaffery"],
      spouseIds: [],
      address: "Karachi, Pakistan",
    },

    "kaneez-fatima": {
      id: "kaneez-fatima",
      displayName: "Kaneez Fatima",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["ali-imam", "noor-fatima"],
      spouseIds: [],
      address: "Islamabad, Pakistan",
    },
    
    "sitara": {
      id: "sitara",
      displayName: "Sitara",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["sabir-hussain", "tanveer-fatima"],
      spouseIds: [],
      address: "Karachi, Pakistan",
    },
    "nadir-hussain": {
      id: "nadir-hussain",
      displayName: "Nadir Hussain",
      gender: "M",
      lifeStatus: "deceased",
      parentIds: ["khadim-hussain", "jawadi-baigam"],
      spouseIds: ["shakra-begum"],
      address: "Karachi, Pakistan",
    },
    "shakra-begum": {
      id: "shakra-begum",
      displayName: "Shakra Begum",
      gender: "F",
       lifeStatus: "deceased",
      // parentIds: ["khadim-hussain", "jawadi-baigam"],
      spouseIds: ["nadir-hussain"],
      address: "Karachi, Pakistan",
    },
    // Example daughter
    "nadra-zaidi": {
      id: "nadra-zaidi",
      displayName: "Nadra Zaidi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["mahmood-akhtar"],
      address: "Karachi, Pakistan",
    },
    "mahmood-akhtar": {
      id: "mahmood-akhtar",
      displayName: "Mahmood Akhtar",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["nadra-zaidi"],
      address: "Karachi, Pakistan",
    },
    "iqbal-zaidi": {
      id: "iqbal-zaidi",
      displayName: "Iqbal Zaidi",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["nadra-zaidi", "mahmood-akhtar"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    'faraz-zaidi': {
      id: 'faraz-zaidi',
      displayName: 'Faraz Zaidi',
      gender: 'M',
      lifeStatus: 'alive',
      parentIds: ['nadra-zaidi', 'mahmood-akhtar'],
      spouseIds: [],
      address: 'Karachi, Pakistan'
    },
    // Another daughter
    "sharaz-zaidi": {
      id: "sharaz-zaidi",
      displayName: "Sharaz Zaidi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadra-zaidi", "mahmood-akhtar"],
      spouseIds: ["ania-zaidi"],
      address: "Karachi, Pakistan",
    },
    "ania-zaidi": {
      id: "ania-zaidi",
      displayName: "Ania Zaidi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["sharaz-zaidi"],
      address: "Karachi, Pakistan",
    },
    "zohaib":{
      id: "zohaib",
      displayName: "Zohaib",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["sharaz-zaidi", "ania-zaidi"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "zohra":{
      id: "zohra",
      displayName: "Zohra",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["sharaz-zaidi", "ania-zaidi"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    // Another child (example daughter)
    "hina-zaidi": {
      id: "hina-zaidi",
      displayName: "Hina Zaidi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadra-zaidi", "mahmood-akhtar"],
      spouseIds: ["talib-zaidi"],
      address: "Karachi, Pakistan",
    },
    "talib-zaidi": {
      id: "talib-zaidi",
      displayName: "Talib Zaidi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["hina-zaidi"],
      address: "Karachi, Pakistan",
    },

    
    "nighat": {
      id: "nighat",
      displayName: "Nighat",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["masood-jaffar"],
      address: "Karachi, Pakistan",
    },
    "masood-jaffar": {
      id: "masood-jaffar",
      displayName: "Masood Jaffar",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["nighat"],
      address: "Karachi, Pakistan",
    },
    "yasir-rizvi": {
      id: "yasir-rizvi",
      displayName: "Yasir Rizvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["nighat", "masood-jaffar"],
      spouseIds: ["samreen"],
      address: "Karachi, Pakistan",
    },
    "samreen": {
      id: "samreen",
      displayName: "Samreen",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["yasir-rizvi"],
      address: "Karachi, Pakistan",
    },
   
    "samra-rizvi":{
      id: "samra-rizvi",
      displayName: "Samra Rizvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["yasir-rizvi", "samreen"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "Inaaya":{
      id: "Inaaya",
      displayName: "Inaaya",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["yasir-rizvi", "samreen"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "qadir-rizvi": {
      id: "qadir-rizvi",
      displayName: "Qadir Rizvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["nighat", "masood-jaffar"],
      spouseIds: ["masooma"],
      address: "Karachi, Pakistan",
    },
    "masooma": {
      id: "masooma",
      displayName: "Masooma",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["qadir-rizvi"],
      address: "Karachi, Pakistan",
    },
    "ali": {
      id: "ali",
      displayName: "Ali",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["qadir-rizvi", "masooma"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "abraham": {
      id: "abraham",
      displayName: "Abraham",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["qadir-rizvi", "masooma"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    
    "erum naqvi": {
      id: "erum naqvi",
      displayName: "Erum Naqvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nighat", "masood-jaffar"],
      spouseIds: ["khushnood"],
      address: "Karachi, Pakistan"
    },
    "khushnood": {
      id: "khushnood",
      displayName: "Khushnood",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["erum naqvi"],
      address: "Karachi, Pakistan"
    },
    "manzoor": {
      id: "manzoor",
      displayName: "Manzoor",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["erum naqvi", "khushnood"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "minhal": {
      id: "minhal",
      displayName: "Minhal",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["erum naqvi", "khushnood"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "samar-baqri": {
      id: "samar-baqri",
      displayName: "Samar Baqri",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["Qasir Baqri"],
      address: "Karachi, Pakistan",
    },
    "Qasir Baqri": {
      id: "Qasir Baqri",
      displayName: "Qasir Baqri",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["samar-baqri"],
      address: "Karachi, Pakistan",
    },
    "sibtain": {
      id: "sibtain",
      displayName: "Sibtain",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["samar-baqri", "Qasir Baqri"],
      spouseIds: ["alina"],
      address: "Karachi, Pakistan"
    },
    "alina": {
      id: "alina",
      displayName: "Alina",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["sibtain"],
      address: "Karachi, Pakistan"
    },
    "almas": {
      id: "almas",
      displayName: "Almas",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["sibtain", "alina"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "zaina": {
      id: "zaina",
      displayName: "Zaina",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["sibtain", "alina"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "farhan": {
      id: "farhan",
      displayName: "Farhan",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["samar-baqri", "Qasir Baqri"],
      spouseIds: ["fakheha kazmi"],
      address: "Karachi, Pakistan"
    },
    "fakheha kazmi": {
      id: "fakheha kazmi",
      displayName: "Fakheha Kazmi",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["farhan"],
      address: "Karachi, Pakistan"
    },
    "nadiya": {
      id: "nadiya",
      displayName: "Nadiya",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["farhan", "fakheha kazmi"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "rehan": {
      id: "rehan",
      displayName: "Rehan",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["samar-baqri", "Qasir Baqri"],
      spouseIds: ["shireen"],
      address: "Karachi, Pakistan"
    },
    "shireen": {
      id: "shireen",
      displayName: "Shireen",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["rehan"],
      address: "Karachi, Pakistan"
    },
    "azad": {
      id: "azad",
      displayName: "Azad",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["nadir-hussain", "shakra-begum"],
      spouseIds: ["nusrat-ali"],
      address: "Karachi, Pakistan"
    },
    "nusrat-ali": {
      id: "nusrat-ali",
      displayName: "Nusrat Ali",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["azad"],
      address: "Karachi, Pakistan"
    },

    "ali-akbar": {
      id: "ali-akbar",
      displayName: "Ali Akbar",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["azad", "nusrat-ali"],
      spouseIds: ["alia rizvi"],
      address: "Karachi, Pakistan"
    },
    "alia rizvi": {
      id: "alia rizvi",
      displayName: "Alia Rizvi",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ali-akbar"],
      address: "Karachi, Pakistan"

    },
    "elham":{
      id: "elham",
      displayName: "Elham",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["ali-akbar", "alia rizvi"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "alina-jr": {
      id: "alina-jr",
      displayName: "Alina",
      gender: "F",
      lifeStatus: "alive",
      parentIds:['azad', 'nusrat-ali'],
      spouseIds: ["sibtain-jr"],
      address: "Karachi, Pakistan"
    },
    "sibtain-jr": {
      id: "sibtain-jr",
      displayName: "Sibtain",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["alina-jr"],
      address: "Karachi, Pakistan"
    },
    "almas-jr":{
      id: "almas-jr",
      displayName: "Almas",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["alina-jr", "sibtain-jr"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "zainab":{
      id: "zainab",
      displayName: "Zainab",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["alina-jr", "sibtain-jr"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "abida": {
      id: "abida",
      displayName: "Abida",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["azad", "nusrat-ali"],
      spouseIds: ["danish-naqvi"],
      address: "Karachi, Pakistan"
    },
    "danish-naqvi": {
      id: "danish-naqvi",
      displayName: "Danish Naqvi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["abida"],
      address: "Karachi, Pakistan"
    },
    "arhan":{
      id: "arhan",
      displayName: "Arhan",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["abida", "danish-naqvi"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "raza":{
      id: "raza",
      displayName: "Raza",
      gender: "M",
      lifeStatus: "alive",
      parentIds:["abida", "danish-naqvi"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "shaheen-zaidi": {
      id: "shaheen-zaidi",
      displayName: "Shaheen Zaidi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["ali-jawad-zaidi"],
      address: "Karachi, Pakistan"
    },
    "ali-jawad-zaidi": {
      id: "ali-jawad-zaidi",
      displayName: "Ali Jawad Zaidi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["shaheen-zaidi"],
      address: "Karachi, Pakistan"
    },
    "haider-abbas": {
      id: "haider-abbas",
      displayName: "Haider Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shaheen-zaidi", "ali-jawad-zaidi"],
      spouseIds: ["midhat-fatima"],
      address: "Karachi, Pakistan"
    },
    "midhat-fatima": {
      id: "midhat-fatima",
      displayName: "Midhat Fatima",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["haider-abbas"],
      address: "Karachi, Pakistan"
    },
    "rubab-fatima": {
      id: "rubab-fatima",
      displayName: "Rubab Fatima",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["haider-abbas", "midhat-fatima"],
      spouseIds: ["haider-abbas"],
      address: "Karachi, Pakistan"
    },
    "sakina-abbas": {
      id: "sakina-abbas",
      displayName: "Sakina Abbas",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["shaheen-zaidi", "ali-jawad-zaidi"],
      spouseIds: ["zakir-hussain-rizvi"],
      address: "Karachi, Pakistan"
    },
    "zakir-hussain-rizvi": {
      id: "zakir-hussain-rizvi",
      displayName: "Zakir Hussain Rizvi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["sakina-abbas"],
      address: "Karachi, Pakistan"
    },
    "maria-hussain": {
      id: "maria-hussain",
      displayName: "Maria Hussain",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["sakina-abbas", "zakir-hussain-rizvi"],
      spouseIds: ["zakir-hussain-rizvi"],
      address: "Karachi, Pakistan"

    },
    "insia-hussain": {
      id: "insia-hussain",
      displayName: "Insia Hussain",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["sakina-abbas", "zakir-hussain-rizvi"],
      spouseIds: ["zakir-hussain-rizvi"],
      address: "Karachi, Pakistan"

    },
    "shoa-zehra": {
      id: "shoa zehra",
      displayName: "Shoa Zehra",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["shaheen-zaidi", "ali-jawad-zaidi"],
      spouseIds: ["naqi-bukhari"],
      address: "Karachi, Pakistan"

    },
    "naqi-bukhari": {
      id: "naqi-bukhari",
      displayName: "Naqi Bukhari",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["shoa-zehra"],
      address: "Karachi, Pakistan"

    },
    "askari-bukhari": {
      id: "askari-bukhari",
      displayName: "Askari Bukhari",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shoa-zehra", "naqi-bukhari"],
      spouseIds: [],
      address: "Karachi, Pakistan"

    },
    "sukaina-fatima": {
      id: "sukaina-fatima",
      displayName: "Sukaina Fatima",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["shoa-zehra", "naqi-bukhari"],
      spouseIds: [],
      address: "Karachi, Pakistan"

    },
    "shama-taqvi": {
      id: "shama-taqvi",
      displayName: "Shama Taqvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["nadir-hussain", "shakra-begum"],
      spouseIds: ["iqtidar-taqvi"],
      address: "Karachi, Pakistan"

    },
    "iqtidar-taqvi": {
      id: "iqtidar-taqvi",
      displayName: "Iqtidar Taqvi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["shama-taqvi"],
      address: "Karachi, Pakistan"

    },
    "ashar-taqvi": {
      id: "ashar-taqvi",
      displayName: "Ashar Taqvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shama-taqvi", "iqtidar-taqvi"],
      spouseIds: ["nidha"],
      address: "Karachi, Pakistan"

    },
    "nidha": {
      id: "nidha",
      displayName: "Nidha",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ashar-taqvi"],
      address: "Karachi, Pakistan"

    },
    "sofia": {
      id: "sofia",
      displayName: "Sofia",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["ashar-taqvi", "nidha"],
      spouseIds: [],
      address: "Karachi, Pakistan"

    },
    "danish-taqvi": {
      id: "danish-taqvi",
      displayName: "Danish Taqvi",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["shama-taqvi", "iqtidar-taqvi"],
      spouseIds: ["adiba"],
      address: "Karachi, Pakistan"

    },
    "adiba": {
      id: "adiba",
      displayName: "Adiba",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["danish-taqvi"],
      address: "Karachi, Pakistan"

    },
    "arhan-jr": {
      id: "arhan-jr",
      displayName: "Arhan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["danish-taqvi", "adiba"],
      spouseIds: [],
      address: "Karachi, Pakistan"

    },
  "raza-jr": {
      id: "raza-jr",
      displayName: "Raza",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["danish-taqvi", "adiba"],
      spouseIds: [],
      address: "Karachi, Pakistan"

    },
    "shereen-taqvi": {
      id: "shereen-taqvi",
      displayName: "Shereen Taqvi",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["shama-taqvi", "iqtidar-taqvi"],
      spouseIds: ["vamiq"],
      address: "Karachi, Pakistan"
    },
    "vamiq": {
      id: "vamiq",
      displayName: "Vamiq",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["shereen-taqvi"],
      address: "Karachi, Pakistan"
    },
    "inaya": {
      id: "inaya",
      displayName: "Inaya",
      gender: "F",
      lifeStatus: "alive",
      parentIds:["shereen-taqvi", "vamiq"],
      spouseIds: [],
      address: "Karachi, Pakistan"
    },
    "nasir-hussain": {
      id: "nasir-hussain",
      displayName: "Nasir Hussain",
      gender: "M",
        lifeStatus: "deceased",
      parentIds: ["khadim-hussain-jr", "sabir-hussain"],
      spouseIds: ["ansar-fatima"],
      address: "Karachi, Pakistan"
    },
    "ansar-fatima": {
      id: "ansar-fatima",
      displayName: "Ansar Fatima",
      gender: "F",
       lifeStatus: "deceased",
      spouseIds: ["nasir-hussain"],
      address: "Karachi, Pakistan"
    },
    "ghulam-abbas": {
      id: "ghulam-abbas",
      displayName: "Ghulam Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["khadim-hussain-jr", "sabir-hussain"],
      spouseIds: ["kiran"],
      address: "Karachi, Pakistan"
    },
    "kiran": {
      id: "kiran",
      displayName: "Kiran",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["ghulam-abbas"],
      address: "Karachi, Pakistan"
    },
    "kumail": {
      id: "kumail",
      displayName: "Kumail",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ghulam-abbas", "kiran"],
      spouseIds: ["rafiqa"],
      address: "Karachi, Pakistan"
    },
    "rafiqa": {
      id: "rafiqa",
      displayName: "Rafiqa",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["kumail"],
      address: "Karachi, Pakistan"
    },
    "ali-akbarjr":{
      id: "ali-akbarjr",
      displayName: "Ali Akbar",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["kumail", "rafiqa"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },
    "ali-haider":{
      id: "ali-haider",
      displayName: "Ali Haider",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["kumail", "rafiqa"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },

    "baqar":{
      id: "baqar",
      displayName: "Baqar",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ghulam-abbas", "kiran"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },
    "murtaza":{
      id: "murtaza",
      displayName: "Murtaza",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ghulam-abbas", "kiran"],
      spouseIds: ["anum"],
      address: "Lahore, Pakistan",
    },
    "anum":{
      id: "anum",
      displayName: "Anum",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["murtaza"],
      address: "Lahore, Pakistan",
    },
    "ali-ahmed":{
      id: "ali-ahmed",
      displayName: "Ali Ahmed",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["murtaza", "anum"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },
    "sani-zehra":{
      id: "sani-zehra",
      displayName: "Sani Zehra",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["murtaza", "anum"],
      spouseIds: [],
      address: "Lahore, Pakistan",
    },
    "kamal-abbas":{
      id: "kamal-abbas",
      displayName: "Kamal Raza",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["ghulam-abbas", "kiran"],
      spouseIds: ["tabasum"],
      address: "Lahore, Pakistan",
    },
    "tabasum":{
      id: "tabasum",
      displayName: "Tabasum",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["kamal-abbas"],
      address: "Lahore, Pakistan",
    },
    "Taha":{
      id: "Taha",
      displayName: "Taha",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["kamal-abbas", "tabasum"],
    },
    "Mahammad Abbas":{
      id: "Mahammad Abbas",
      displayName: "Muhammad Abbas",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["masooma-abbas"],
      parentIds: ["kamal-abbas", "tabasum"],  
    },
    "masooma-abbas":{
      id: "masooma-abbas",
      displayName: "Masooma Abbas",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["Mahammad Abbas"],
    },
    "walia-fatima":{
      id: "walia-fatima",
      displayName: "Walia Fatima",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["Mahammad Abbas", "masooma-abbas"],
    },

 "mazahir hussain":{
      id: "mazahir hussain",
      displayName: "Mazahir Hussain",
      gender: "M",
     lifeStatus: "deceased",
      parentIds: ["khadim-hussain, jawadi-baigam"],
      spouseIds: ["kishwar-sultana"]
 },
 "kishwar-sultana":{
      id: "kishwar-sultana",
      displayName: "Kishwar Sultana",
      gender: "F",
       lifeStatus: "deceased",
      spouseIds: ["mazahir hussain"]
 },
 "matahir-hussain":{
      id: "matahir-hussain",
      displayName: "Matahir Hussain",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazahir-hussain", "kishwar-sultana"],
      spouseIds: ["suraiya-ejaz"],
 },
 "suraiya-ejaz":{
      id: "suraiya-ejaz",
      displayName: "Suraiya Ejaz",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["matahir-hussain"]
 },
 "jawahir-abbas":{
      id: "jawahir-abbas",
      displayName: "Jawahir Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["matahir-hussain", "suraiya-ejaz"],
      spouseIds: ["bushra"],
 },
 "bushra":{
      id: "bushra",
      displayName: "Bushra",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["jawahir-abbas"]
 },
 "irtiza":{
      id: "irtiza",
      displayName: "Irtiza",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["jawahir-abbas", "bushra"],
  
 },
 "mehdi-abbas":{
      id: "mehdi-abbas",
      displayName: "Mehdi Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["jawahir-abbas", "bushra"],

 },
 "aliza-zehra":{
      id: "aliza-zehra",
      displayName: "Aliza Zehra",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["jawahir-abbas", "bushra"],

 },
 "rubab":{
      id: "rubab",
      displayName: "Rubab",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["matahir-hussain", "suraiya-ejaz"],
      spouseIds: ["asfar-naqvi"],
 },
 "asfar-naqvi":{
      id: "asfar-naqvi",
      displayName: "Asfar Naqvi",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["rubab"]
 },
 "haya-abbas":{
      id: "haya-abbas",
      displayName: "Haya Abbas",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["rabab", "asfar-naqvi"],
      spouseIds: ["mazhar-abbas"],
 },
 "mazhar-abbas":{
      id: "mazhar-abbas",
      displayName: "Mazhar Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazahir-hussain","kishwar-sultana"],
      spouseIds: ["shabana"],
 },
 "shabana":{
      id: "shabana",
      displayName: "Shabana",
      gender: "F",
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
 },
 "marium":{
      id: "marium",
      displayName: "Marium",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["azhar"]
 },
 "askari":{
      id: "askari",
      displayName: "Askari",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["azhar", "marium"],
 
 },
 "sania-zehra":{
      id: "sania-zehra",
      displayName: "Sania Zehra",
      gender: "F",
      lifeStatus: "alive",
       parentIds: ["azhar", "marium"],
 

 },
 "asad":{
      id: "asad",
      displayName: "Asad",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazhar-abbas", "shabana"],
      spouseIds: ["narjis"],
 },
 "narjis":{
      id: "narjis",
      displayName: "Narjis",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["asad"]
 },
 
 "hassan":{
      id: "hassan",
      displayName: "Hassan",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["asad", "narjis"],
      spouseIds: ["tahir-abbas"],
 },
 "ahmed":{
      id: "ahmed",
      displayName: "Ahmed",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazhar-abbas", "shabana"],

 },

 "tahir-abbas":{
      id: "tahir-abbas",
      displayName: "Tahir Abbas",
      gender: "M",
      lifeStatus: "alive",
      parentIds: ["mazahir-hussain","kishwar-sultana"],
      spouseIds: ["ghulam-fatima"],
 },
 "ghulam-fatima":{
      id: "ghulam-fatima",
      displayName: "Ghulam Fatima",
      gender: "F",
      lifeStatus: "alive",
      spouseIds: ["tahir-abbas"]
 },
 "madiha":{
      id: "madiha",
      displayName: "Madiha",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["tahir-abbas", "ghulam-fatima"],
      spouseIds: ["qambar-hussain"],
 },
 "qambar-hussain":{
      id: "qambar-hussain",
      displayName: "Qambar Hussain",
      gender: "M",
      lifeStatus: "alive",
      spouseIds: ["madiha"]
 },
 "atika":{
      id: "atika",
      displayName: "Atika",
      gender: "F",
      lifeStatus: "alive",
      parentIds: ["qambar-hussain", "madiha"],

 },

 "jawahir-abbas-jaffery":{
   id: "jawahir-abbas-jaffery",
   displayName: "Jawahir Abbas Jaffery",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: [],
 },
 "salma-khatoon":{
   id: "salma-khatoon",
   displayName: "Salma Khatoon",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: ["saeed-haider-zaidi"]
 },
 "saeed-haider-zaidi":{
   id: "saeed-haider-zaidi",
   displayName: "Saeed Haider Zaidi",
   gender: "M",
   lifeStatus: "alive",
   spouseIds: ["salma-khatoon"]
 },
 "Imran":{
   id: "Imran",
   displayName: "Imran",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["salma-khatoon", "saeed-haider-zaidi"],
   spouseIds: ["tasleem-fatima"]
 },
 "tasleem-fatima":{
   id: "tasleem-fatima",
   displayName: "Tasleem Fatima",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["Imran"]
 },
 "wamak":{
   id: "wamak",
   displayName: "Wamak",
   gender: "M",
   lifeStatus: "alive",
    parentIds: ["Imran", "tasleem-fatima"],
   spouseIds: []
 },
 "talib":{
   id: "talib",
   displayName: "Talib",
   gender: "M",
   lifeStatus: "alive",
    parentIds: ["Imran", "tasleem-fatima"],
   spouseIds: []
 },
 "salman-jr":{
   id: "salman-jr",
   displayName: "Salman",
   gender: "M",
   lifeStatus: "alive",
  parentIds: ["salma-khatoon", "saeed-haider-zaidi"],
   spouseIds: ["Sana"]
 },
 "Sana":{
   id: "Sana",
   displayName: "Sana",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["salman-jr"]
 },
 "nihal":{
   id: "nihal",
   displayName: "Nihal",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["salman-jr", "Sana"],
   spouseIds: []
 },
 "sukaina-jr":{
   id: "sukaina-jr",
   displayName: "Sukaina",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["salman-jr", "Sana"],
   spouseIds: []
 },
 "furqan":{
   id: "furqan",
   displayName: "Furqan",
   gender: "M",
   lifeStatus: "alive",
     parentIds: ["salma-khatoon", "saeed-haider-zaidi"],

   spouseIds: ["amber"]
 },
 "amber":{
   id: "amber",
   displayName: "Amber",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["furqan"]
 },
 "sami":{
   id: "sami",
   displayName: "Sami",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["furqan", "amber"],
   spouseIds: []
 },
 "shargeel":{
   id: "shargeel",
   displayName: "Shargeel",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["furqan", "amber"],
   spouseIds: []
 },
 "zahnib":{
   id: "zahnib",
   displayName: "Zahnib",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["furqan", "amber"],
   spouseIds: []
 },

 "sabahat":{
   id: "sabahat",
   displayName: "Sabahat",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["salma-khatoon", "saeed-haider-zaidi"],
   spouseIds: ["ather"]
 },
 "ather":{
   id: "ather",
   displayName: "Ather",
   gender: "M",
   lifeStatus: "alive",
   spouseIds: ["sabahat"]
 },
"sikander":{
   id: "sikander",
   displayName: "Sikander",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["ather", "sabahat"],
   spouseIds: []
},
"redha":{
   id: "redha",
   displayName: "Redha",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["ather", "sabahat"],
   spouseIds: []
},

 "allay":{
   id: "allay",
   displayName: "Allay",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: ["sadiq-hussain"]
 },
 "sadiq-hussain":{
   id: "sadiq-hussain",
   displayName: "Sadiq Hussain",
   gender: "M",
   lifeStatus: "alive",
   spouseIds: ["allay"]
 },
 "ammar":{
   id: "ammar",
   displayName: "Ammar",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["allay","sadiq-hussain"],
   spouseIds: ["kisa"]
 },
 "kisa":{
   id: "kisa",
   displayName: "Kisa",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["ammar"]
 },
 "kumail-jr":{
   id: "kumail-jr",
   displayName: "Kumail",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["allay","sadiq-hussain"],
   spouseIds: ["sadaf-jr"]
 },
 "sadaf-jr":{
   id: "sadaf",
   displayName: "Sadaf",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["kumail-jr"]
 },
 "messam":{
   id: "messam",
   displayName: "Messam",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["allay","sadiq-hussain"],
   spouseIds: ["azhara"]
 },
 "azhara":{
   id: "azhara",
   displayName: "Azhara",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["messam"]
 },
 "lubaba":{
   id: "lubaba",
   displayName: "Lubaba",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["messam","azhara"],

 },
 "akbar":{
   id: "akbar",
   displayName: "Akbar",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["messam","azhara"],
  //  spouseIds: ["nargis(baby)"]
 },

 "nargis(baby)":{
   id: "nargis(baby)",
   displayName: "Nargis",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: ["afroz"]
 },
 "afroz":{
   id: "afroz",
   displayName: "Afroz",
   gender: "M",
   lifeStatus: "alive",
   spouseIds: ["nargis(baby)"]
 },
 "zaigham":{
   id: "zaigham",
   displayName: "Zaigham",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["nargis(baby)","afroz"],
  //  spouseIds: ["Zahra(Munni)"]
 },

 "Zahra(Munni)":{
   id: "Zahra(Munni)",
   displayName: "Zahra",
   gender: "F",
   lifeStatus: "alive",
   parentIds: ["mazahir-hussain","kishwar-sultana"],
   spouseIds: ["qalb-e-abid"]
 },
 "qalb-e-abid":{
   id: "qalb-e-abid",
   displayName: "Qalb-e-Abid",
   gender: "M",
   lifeStatus: "alive",
   spouseIds: ["Zahra(Munni)"]
 },
 "raza-abid":{
   id: "raza-abid",
   displayName: "Raza",
   gender: "M",
   lifeStatus: "alive",
   parentIds: ["zahra(Munni)", "qalb-e-abid"],
    spouseIds: ["sadaf-raza"]
 },

 "sadaf-raza":{
   id: "sadaf-raza",
   displayName: "Sadaf",
   gender: "F",
   lifeStatus: "alive",
   spouseIds: ["raza-abid"]
 },
 "hajra-khatoon":
   {
     id: "hajra-khatoon",
     displayName: "Hajra Khatoon",
     gender: "F",
      lifeStatus: "deceased",
     parentIds: ["khadim-hussain","jawadi-baigam"],
     spouseIds: ["ghazanfar-hussain"]
   },

 "ghazanfar-hussain":
   {
     id: "ghazanfar-hussain",
     displayName: "Ghazanfar Hussain",
     gender: "M",
      lifeStatus: "deceased",
     spouseIds: ["hajra-khatoon"]
   },
   // tarafdar abbas 
   "tarafdar-abbas":{
     id: "tarafdar-abbas",
     displayName: "Tarafdar Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],

   },
   // shandar abbas 
   "shandar-abbas":{
     id: "shandar-abbas",
     displayName: "Shandar Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["tahira-abbas"]
   },
   "tahira-abbas":{
     id: "tahira-abbas",
     displayName: "Tahira Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["fakhir-hussain","mehdia-bano"],
     spouseIds: ["shandar-abbas"]
   },
   // raza abbas
   "raza-abbas":{
     id: "raza-abbas",
     displayName: "Raza Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["shandar-abbas","tahira-abbas"],
      spouseIds: ["zertaj-fatima"]
   },
   "zertaj-fatima":{
     id: "zertaj-fatima",
     displayName: "Zertaj Fatima",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["sehr-shabana","aallay-imran-zaidi"],
     spouseIds: ["raza-abbas"]
   },
   "hassanabbas":{
     id: "hassanabbas",
     displayName: "Hassan Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["raza-abbas","zertaj-fatima"],
     
   },
   "fiza-abbas":{
     id: "fiza-abbas",
     displayName: "Fiza Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["raza-abbas","zertaj-fatima"],
      
   },

   "mohsin-abbas":{
     id: "mohsin-abbas",
     displayName: "Mohsin Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds:["shandar-abbas","tahira-abbas"],
      spouseIds: ["eraj-abbas"]
   },
   "eraj-abbas":{
     id: "eraj-abbas",
     displayName: "Eraj Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds:["yawar-abbas","taseem"],
     spouseIds: ["mohsin-abbas"]
   },
   "erum-abbas":{
     id: "erum-abbas",
     displayName: "Erum Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["shandar-abbas","tahira-abbas"],
      spouseIds: ["aalay-ali"]
   },
   "aalay-ali":{
     id: "aalay-ali",
     displayName: "Aalay Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds:["sehr-shabana","aallay-imran-zaidi"],
     spouseIds: ["erum-abbas"]
   },
   "aalay-abbas":{
     id: "aalay-abbas",
     displayName: "Aalay Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds:["erum-abbas","aalay-ali"],
    
   },
   "hani-muslim":{
     id: "hani-muslim",
     displayName: "Hani Muslim",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["erum-abbas","aalay-ali"],
     
   },
   "kinza-abbas":{
     id: "kinza-abbas",
     displayName: "Kinza Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["shandar-abbas","tahira-abbas"],
      spouseIds: ["shamoon"]

   },
   "shamoon":{
     id: "shamoon",
     displayName: "Shamoon",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["kinza-abbas"]
   },
   "narjis-shamoon":{
     id: "narjis-jr",
     displayName: "Narjis",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["kinza-abbas","shamoon"],
      
   },
   "Marium":{
     id: "Marium",
     displayName: "Marium",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["kinza-abbas","shamoon"],
   },

   "zainab-abbas":{
     id: "zainab-abbas",
     displayName: "Zainab Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["shandar-abbas","tahira-abbas"],
      spouseIds: ["zain"]
   },
   "zain":{
     id: "zain",
     displayName: "Zain",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["zainab-abbas"]
   },
   "zara":{
     id: "zara",
     displayName: "Zara",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["zainab-abbas","zain"],
   },
   "sayada-abbas":{
     id: "sayada-abbas",
     displayName: "Sayada Abbas",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["shandar-abbas","tahira-abbas"],
     
   },
   //naveed abbas
   "naveed-abbas":{
     id: "naveed-abbas",
     displayName: "Naveed Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["shamim-abbas"]
   },
   "shamim-abbas":{
     id: "shamim-abbas",
     displayName: "Shamim Abbas",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["naveed-abbas"]
   },
   "muhammad":{
     id: "muhammad",
     displayName: "Muhammad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["naveed-abbas","shamim-abbas"],
   },
   "kazim-abbas":{
     id: "kazim-abbas",
     displayName: "Kazim Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["naveed-abbas","shamim-abbas"],
      spouseIds: ["Iman"]
   },
   "Iman":{
     id: "Iman",
     displayName: "Iman",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["kazim-abbas"]
   },
   "Aiman":{
     id: "Aiman",
     displayName: "Aiman",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["naveed-abbas","shamim-abbas"],
     spouseIds:["sajad"]
   }
   ,
   "sajad":{
     id: "sajad",
     displayName: "Sajad",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["Aiman"]
   },
   "haider":{
     id: "haider",
     displayName: "Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["aiman","sajad"],
    
   },
   "yousef":{
     id: "yousef",
     displayName: "Yousef",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["aiman","sajad"],
 
   },
   "wafadar-abbas":{
     id: "wafadar-abbas",
     displayName: "Wafadar Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["naseem-abbas"]
   },
   "naseem-abbas":{
     id: "naseem-abbas",
     displayName: "Naseem Abbas",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["wafadar-abbas"]
   },
   "komal":{
     id: "komal",
     displayName: "Komal",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["naseem-abbas","wafadar-abbas"],
     spouseIds:["sajjad"]
   },
   "sajjad":{
     id: "sajjad",
     displayName: "Sajjad",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["komal"]
   },
   "abis":{
     id: "abis",
     displayName: "Abis",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["sajjad","komal"],
   },
      "joan":{
     id: "joan",
     displayName: "Joan",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["sajjad","komal"],
   },
   "nida":{
     id: "nida",
     displayName: "Nida",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["wafadar-abbas","naseem-abbas"],
     spouseIds:["hilal"]
   },
   "hilal":{
     id: "hilal",
     displayName: "Hilal",
     gender: "M",
     lifeStatus: "alive",
     parentIds:["sehr-shabana","aallay-imran-zaidi"],
     spouseIds: ["nida"]
   },
   "sani":{
     id: "sani",
     displayName: "Sani",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["wafadar-abbas","naseem-abbas"],
     spouseIds:["mehdi"]
   },
   "mehdi":{
     id: "mehdi",
     displayName: "Mehdi",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["sani"]
   },
  "naqi":{
    id: "naqi",
    displayName: "Naqi",
    gender: "M",
    lifeStatus: "alive",
    parentIds: ["sani","mehdi"],
   
  },
  "fatima":{
    id: "fatima",
    displayName: "Fatima",
    gender: "F",
    lifeStatus: "alive",
    parentIds: ["wafadar-abbas","naseem-abbas"],
     spouseIds: ["musa"]
  },
  "musa":{
    id: "musa",
    displayName: "Musa",
    gender: "M",
    lifeStatus: "alive",
    spouseIds: ["fatima"]
  },
   "yawar-abbas":{
     id: "yawar-abbas",
     displayName: "Yawar Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["taseem"]
   },
   "taseem":{
     id: "taseem",
     displayName: "Taseem",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["yawar-abbas"]
   },
   "areeba":{
     id: "areeba",
     displayName: "Areeba",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["yawar-abbas","taseem"],
      spouseIds: ["mehdi-hakeem"]
   },
   "mehdi-hakeem":{
     id: "mehdi-hakeem",
     displayName: "Mehdi Hakeem",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["kazmeen","syed-waqar-hussain"],
     spouseIds: ["areeba"]
   },
   "batool-hakeem":{
     id: "batool-hakeem",
     displayName: "Batool Hakeem",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["areeba","mehdi-hakeem"],
      
   },
   "haniya":{
     id: "haniya",
     displayName: "Haniya",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["areeba","mehdi-hakeem"],


   },
   "sakina":{
     id: "sakina",
     displayName: "Sakina",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["yawar-abbas","taseem"],
      spouseIds: ["abbas"]
   },
   "abbas":{
     id: "abbas",
     displayName: "Abbas",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["sakina"]
   },
   
   "feroza":{
     id: "feroza",
     displayName: "Feroza",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["sayedain-zaidi"]
   },
   "sayedain-zaidi":{
     id: "sayedain-zaidi",
     displayName: "Sayedain Zaidi",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["feroza"]
   },
   "qurat-ul-ain":{
     id: "qurat-ul-ain",
     displayName: "Qurat-ul-Ain",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
      spouseIds: ["ali-hadi"]
   },
   "ali-hadi":{
     id: "ali-hadi",
     displayName: "Ali Hadi",
     gender: "M",
     lifeStatus: "alive",
     parentIds:["farzana","ali-baqir-jr"],
     spouseIds: ["qurat-ul-ain"]
   },
   "jaffar":{
     id: "jaffar",
     displayName: "Jaffar",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["qurat-ul-ain","ali-hadi"],
      spouseIds: ["shanzai"]
   },
   "shanzai":{
     id: "shanzai",
     displayName: "Shanzai",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["jaffar"]
   },

   "hider":{
     id: "hider",
     displayName: "Hider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["qurat-ul-ain","ali-hadi"],
     
   },
   "alia":{
     id: "alia",
     displayName: "Alia",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["qurat-ul-ain","ali-hadi"],
      spouseIds: ["aqeil-abdi"]
   },
      "aqeil-abdi":{
     id: "aqeil-abdi",
     displayName: "Aqeel Abdi",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["alia"]
   },
   "hassan-abdi":{
     id: "hassan-abdi",
     displayName: "Hassan Abdi",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["alia","aqeil-abdi"],

   },
   "mustafa":{
     id: "mustafa",
     displayName: "Mustafa",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
      spouseIds: ["saima"]
   },
   "saima":{
     id: "saima",
     displayName: "Saima",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["mustafa"]
   },
   "abbas-mustafa":{
     id: "abbas-mustafa",
     displayName: "Abbas Mustafa",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mustafa","saima"],
      spouseIds: ["sakina-jr"]
   },
   "sakina-jr":{
     id: "sakina-jr",
     displayName: "Sakina",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["abbas-mustafa"]
   },
   "hamza":{
     id: "hamza",
     displayName: "Hamza",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mustafa","saima"],
      spouseIds: ["kainat"]
   },
   "kainat":{
     id: "kainat",
     displayName: "Kainat",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["hamza"]
   },
   "meshim":{
     id: "meshim",
     displayName: "Meshim",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mustafa","saima"],

   },
   "talib-mustafa":{
     id: "talibjr",
     displayName: "Talib",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mustafa","saima"],

   },
   "ali-zaidi":{
     id: "ali-",
     displayName: "Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
      spouseIds: ["afeen"]
   },
   "afeen":{
     id: "afeen",
     displayName: "Afeen",
     gender: "F",
     lifeStatus: "alive",
     parentIds:["kazmeen","syed-waqar-hussain"],
     spouseIds: ["ali-zaidi"]
   },
   "hussain-ali":{
     id: "hussain-ali",
     displayName: "Hassan Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["ali-zaidi","afeen"],
   },
   "abbas-ali":{
     id: "abbas-ali",
     displayName: "Abbas Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["ali-zaidi","afeen"],

   },
   "zehra-ali":{
     id: "zehra-ali",
     displayName: "Zehra Ali",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["ali-zaidi","afeen"],
   },
   "akbar-zaidi":{
     id: "akbar",
     displayName: "Akbar",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
     spouseIds: ["sadaf-akbar"]
   },
   "sadaf-akbar":{
     id: "sadaf",
     displayName: "Sadaf",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["akbar-zaidi"]
   },
   "ibrahim":{
     id: "ibrahim",
     displayName: "Ibrahim",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["akbar-zaidi","sadaf-akbar"],
   },
   "ghazi":{
     id: "ghazi",
     displayName: "Ghazi",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["akbar-zaidi","sadaf-akbar"],
   },

   "muzamil":{
     id: "muzamil",
     displayName: "Muzamil",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
      spouseIds: ["ponam"]
   },
   "ponam":{
     id: "ponam",
     displayName: "Ponam",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["muzamil"]
   },
   "kisa-muzamil":{
     id: "kisa",
     displayName: "Kisa",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["muzamil","ponam"],
    //  spouseIds: ["ibrahim"]
   },
   "sakina-muzamil":{
     id: "sakina",
     displayName: "Sakina",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["muzamil","ponam"],
   
   },
   "zahir":{
     id: "zahir",
     displayName: "Zahir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muzamil","ponam"],
   },
   "khizar":{
     id: "khizar",
     displayName: "Khizar",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muzamil","ponam"],
   },
   "shabir":{
     id: "shabir",
     displayName: "Shabir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muzamil","ponam"],
   },
   "fakhar":{
     id: "fakhar",
     displayName: "Fakhar",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
     spouseIds: ["hawra"]
   },
   "hawra":{
     id: "hawra",
     displayName: "Hawra",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["fakhar"]
   },
   "muhammad-fakhar":{
     id: "muhammad",
     displayName: "Muhammad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["fakhar","hawra"],
   },
   "tatheer-fakhar":{
     id: "tatheer",
     displayName: "Tatheer",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["fakhar","hawra"],
   },
   "wajahat":{
     id: "wajahat",
     displayName: "Wajahat",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["feroza","sayedain-zaidi"],
     spouseIds: ["zanib"]
   },
   "zanib":{
     id: "zanib",
     displayName: "Zanib",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["wajahat"]
   },
   "ayat":{
     id: "ayat",
     displayName: "Ayat",
     gender: "F",
     lifeStatus: "alive",
      parentIds: ["wajahat","zanib"],

   },
   "mekaeil":{
     id: "mekaeil",
     displayName: "Mekaeil",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["wajahat","zanib"],
   },

   "farzana":{
     id: "farzana",
     displayName: "Farzana",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["ali-baqir-jr"]
   },
   "ali-baqir-jr":{
     id: "ali-baqir-jr",
     displayName: "Ali Baqir",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["farzana"]
   },
   "dilawar":{
     id: "dilawar",
     displayName: "Dilawar",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["farzana","ali-baqir-jr"],
      spouseIds: ["fozia"]
   },
   "fozia":{
     id: "fozia",
     displayName: "Fozia",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["dilawar"]
   },
   "abbas-dilawar":{
     id: "abbas",
     displayName: "Abbas",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["dilawar","fozia"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "hussain-dilawar":{
     id: "hussain",
     displayName: "Hussain",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["dilawar","fozia"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "abiha-dilawar":{
     id: "abiha",
     displayName: "Abiha",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["dilawar","fozia"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "muntazir":{
     id: "muntazir",
     displayName: "Muntazir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["farzana","ali-baqir-jr"],
      spouseIds: ["mehak"]
   },
   "mehak":{
     id: "mehak",
     displayName: "Mehak",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["sehr-shabana","aallay-imran-zaidi"],
     spouseIds: ["muntazir"]
   },
   "muhammad-ayan":{
     id: "muhammad-ayan",
     displayName: "Muhammad Ayan",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muntazir","mehak"],
   },
   "ali-asghar":{
     id: "ali-asghar",
     displayName: "Ali Asghar",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muntazir","mehak"],
   },
   "zahra-muntazir":{
     id: "zahra-muntazir",
     displayName: "Zahra",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["muntazir","mehak"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "kiran-farzana":{
     id: "kiran",
     displayName: "Kiran",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["farzana","ali-baqir-jr"],
      spouseIds: ["zulqanain"]
   },
   "zulqanain":{
     id: "zulqanain",
     displayName: "Zulqanain",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["kiran"]
   },
   "kumail-zulqanain":{
     id: "kumail",
     displayName: "Kumail",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["zulqanain","kiran"],
      spouseIds: ["kazmeen"]
   },
   "ala-muhammad":{
     id: "ala-muhammad",
     displayName: "Ala Muhammad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["zulqanain","kiran"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "honia":{
     id: "honia",
     displayName: "Honia",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["zulqanain","kiran"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "rida":{
     id: "rida",
     displayName: "Rida",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["zulqanain","kiran"],
      // spouseIds: ["syed-waqar-hussain"]
   },

   "kazmeen":{
     id: "kazmeen",
     displayName: "Kazmeen",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["syed-waqar-hussain"]
   },
   "syed-waqar-hussain":{
     id: "syed-waqar-hussain",
     displayName: "Syed Waqar Hussain",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["kazmeen"]
   },
   "irshaad":{
     id: "irshaad",
     displayName: "Irshaad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["kazmeen","syed-waqar-hussain"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "miqdad":{
     id: "miqdad",
     displayName: "Miqdad",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kazmeen","syed-waqar-hussain"],
       spouseIds: ["sameem"]
   },
   "sameem":{
     id: "sameem",
     displayName: "Sameem",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["miqdad"]
   },
   "waqar-miqdad":{
     id: "waqar-miqdad",
     displayName: "Waqar Miqdad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["miqdad","sameem"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "iqtida-mehdi-miqdad":{
     id: "iqtida-mehdi-miqdad",
     displayName: "Iqtida Mehdi Miqdad",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["miqdad","sameem"],
       spouseIds: ["abiha"]
   },
   "abiha":{
     id: "abiha",
     displayName: "Abiha",
     gender: "F",
     lifeStatus: "alive",
     spouseIds: ["iqtida-mehdi-miqdad"]
   },
   "hadi-iqtida-miqdad":{
     id: "hadi-iqtida-miqdad",
     displayName: "Hadi Iqtida Miqdad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["iqtida-mehdi-miqdad","abiha"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "fatima-iqtida-miqdad":{
     id: "fatima-iqtida-miqdad",
     displayName: "Fatima Iqtida Miqdad",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["iqtida-mehdi-miqdad","abiha"],
       
   },
   "areej-kazmeen":{
     id: "areej-kazmeen",
     displayName: "Areej Kazmeen",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kazmeen","syed-waqar-hussain"],
      spouseIds: ["salman"]
   },
   "salman-zaidi":{
     id: "salman-zaidi",
     displayName: "Salman",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["areej-kazmeen"]
   },
   "saim-salman-zaidi":{
     id: "saim-salman-zaidi",
     displayName: "Saim Salman Zaidi",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["salman-zaidi","areej-kazmeen"],
      // spouseIds: ["syed-waqar-hussain"]
   },
   "manahil-saim-zaidi":{
     id: "manahil-saim-zaidi",
     displayName: "Manahil Saim Zaidi",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["salman-zaidi","areej-kazmeen"],
       
   },
   "sabool-kazmeen":{
     id: "sabool-kazmeen",
     displayName: "Sabool Kazmeen",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kazmeen","syed-waqar-hussain"],
      spouseIds: ["haider-zaidi"]
   },
   "haider-zaidi":{
     id: "haider-zaidi",
     displayName: "Haider",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["sabool-kazmeen"]
   },

   "muslim-haider":{
     id: "muslim-haider",
     displayName: "Muslim Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["haider","sabool-kazmeen"],
      // spouseIds: ["syed-waqar-hussain"]
   },
  

   "sehr-shabana":{
     id: "sehr-shabana",
     displayName: "Sehr Shabana",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hajra-khatoon","ghazanfar-hussain"],
      spouseIds: ["aallay-imran-zaidi"]
   },
   "aallay-imran-zaidi":{
     id: "aallay-imran-zaidi",
     displayName: "Aallay Imran Zaidi",
     gender: "M",
     lifeStatus: "alive",
     spouseIds: ["sehr-shabana"]
   },
   

 "saba":{
     id: "saba",
     displayName: "Saba",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["sehr-shabana","aallay-imran-zaidi"],
     spouseIds:["hassan-jan"]
   },
   "hassan-jan":{
     id: "hassan-jan",
     displayName: "Hassan Jan",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["saba"]
   },
"mushir-hussain":{
     id: "mushir-hussain",
     displayName: "Mushir Hussain",
     gender: "M",
      lifeStatus: "deceased",
     parentIds: ["khadim-hussain","hajra-khatoon"],
     spouseIds:["narjis-mushir"]
   },
   "narjis-mushir":{
     id: "narjis-mushir",
     displayName: "narjis-Mushir",
     gender: "F",
      lifeStatus: "deceased",
     spouseIds:["mushir-hussain"]
   },
"nadeem-mushir":{
     id: "nadeem-mushir",
     displayName: "Nadeem Mushir",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['Fatima-nadeem']
},
"Fatima-nadeem":{
     id: "Fatima-nadeem",
     displayName: "Fatima Nadeem",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["nadeem-mushir"]
},
"muhammad-nadeem":{
     id: "muhammad-nadeem",
     displayName: "Muhammad Nadeem",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["nadeem-mushir","Fatima-nadeem"],
    
},
"murtaza-nadeem":{
     id: "murtaza-nadeem",
     displayName: "Murtaza Nadeem",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["nadeem-mushir","Fatima-nadeem"],

},
"faryal-nadeem":{
     id: "faryal-nadeem",
     displayName: "Faryal Nadeem",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["nadeem-mushir","Fatima-nadeem"],
     spouseIds:["hammad"]
},
"hammad":{
     id: "hammad",
     displayName: "Hammad",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["faryal-nadeem"]
},
"ayan-hammad":{
     id: "ayan-hammad",
     displayName: "Ayan Hammad",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["hammad","faryal-nadeem"],
     spouseIds:["mishal-nadeem"]
},
"arya-hammad":{
     id: "arya-hammad",
     displayName: "Arya Hammad",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["hammad","faryal-nadeem"],
},

"mishal-nadeem":{
     id: "mishal-nadeem",
     displayName: "Mishal Nadeem",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["nadeem-mushir","Fatima-nadeem"],
     spouseIds:["aon-naqvi"]
},
"aon-naqvi":{
     id: "aon-naqvi",
     displayName: "Aon Naqvi",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["mishal-nadeem"]
},
"ali-qasim-aon":{
     id: "ali-qasim-aon",
     displayName: "Ali Qasim Aon",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["aon-naqvi","mishal-nadeem"],
},
"muhammad-aon":{
     id: "muhammad-aon",
     displayName: "Muhammad Aon",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["aon-naqvi","mishal-nadeem"],
},

"faheem-mushir":{
     id: "faheem-mushir",
     displayName: "Faheem Mushir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['Fatima-faheem']
},
"Fatima-faheem":{
     id: "Fatima-faheem",
     displayName: "Fatima Faheem",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["faheem-mushir"]
},
"rabab-zehra-faheem":{
     id: "rabab-zehra-faheem",
     displayName: "Rabab Zehra Faheem",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["faheem-mushir","Fatima-faheem"],
     spouseIds:["murtuza-haider"]
},
"syeda":{
     id: "syeda",
     displayName: "Syeda",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["rabab-zehra-faheem","murtuza-haider"],
},
"muhammad-faheem":{
     id: "muhammad-faheem",
     displayName: "Muhammad Faheem",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["rabab-zehra-faheem"]
},
"farah-mushir":{
     id: "farah-mushir",
     displayName: "Farah Mushir",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['aga-zia-haider']
},
"aga-zia-haider":{
     id: "aga-zia-haider",
     displayName: "Aga Zia Haider",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["farah-mushir"]
},
"aga-zia-haider-aga-zia-haider":{
     id: "aga-zia-haider-aga-zia-haider",
     displayName: "Aga Zia Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["aga-zia-haider","farah-mushir"],
     spouseIds:["zehra-asad-agha"]
},
"zehra-asad-agha":{
     id: "zehra-asad-agha",
     displayName: "Zehra Asad Agha",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["aga-zia-haider-aga-zia-haider"]
},
"ali-aga-zia-haider":{
     id: "ali-aga-zia-haider",
     displayName: "Ali Aga Zia Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["aga-zia-haider","farah-mushir"],
     
},
"sameer-aga-zia-haider":{
     id: "sameer-aga-zia-haider",
     displayName: "Sameer Aga Zia Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["aga-zia-haider","farah-mushir"],
},
"jawad-mushir":{
     id: "jawad-mushir",
     displayName: "Jawad Mushir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['fatima-jawad']
},
"fatima-jawad":{
     id: "fatima-jawad",
     displayName: "Fatima Jawad",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["jawad-mushir"]
},

"zafar-mushir":{
     id: "zafar-mushir",
     displayName: "Zafar Mushir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['fatima-zafar']
},
"fatima-zafar":{
     id: "fatima-zafar",
     displayName: "Fatima Zafar",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["zafar-mushir"]
},
"kamran-mushir":{
     id: "kamran-mushir",
     displayName: "Kamran Mushir",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["mushir-hussain","narjis-mushir"],
     spouseIds:['asma-kamran']
},
"asma-kamran":{
     id: "asma-kamran",
     displayName: "Asma Kamran",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["kamran-mushir"]
},
"ali-mehdi-kamran":{
     id: "ali-mehdi-kamran",
     displayName: "Ali Mehdi Kamran",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["kamran-mushir","asma-kamran"],
    
},
"sakina-kamran":{
     id: "sakina-kamran",
     displayName: "Sakina Kamran",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["kamran-mushir","asma-kamran"],
},
"fakhir-hussain":{
     id: "fakhir-hussain",
     displayName: "Fakhir Hussain",
     gender: "M",
       lifeStatus: "deceased",
     parentIds: ["khadim-hussain","jawadi-baigam"],
     spouseIds:['mehdia-bano']
},
"mehdia-bano":{
     id: "mehdia-bano",
     displayName: "Mehdia Bano",
     gender: "F",
      lifeStatus: "deceased",
     spouseIds:["fakhir-hussain"]
},
"muhammad-ali-fakhir":{
     id: "muhammad-ali-fakhir",
     displayName: "Muhammad Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["fakhir-hussain","mehdia-bano"],
     spouseIds:["ambreen-ali"]
},
"ambreen-ali":{
     id: "ambreen-ali",
     displayName: "Ambreen Ali",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["muhammad-ali-fakhir"]
},
"ghayas-ali":{
     id: "ghayas-ali",
     displayName: "Ghayas Ali",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["muhammad-ali-fakhir","ambreen-ali"],
     spouseIds:["kisa-mubaraka"]
},
"kisa-mubaraka":{
     id: "kisa-mubaraka",
     displayName: "Kisa Mubaraka",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["ghayas-ali"]
},
"aun-ali":{
     id: "aun-ali",
     displayName: "Aun Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muhammad-ali-fakhir","ambreen-ali"],
     spouseIds:["sabeena-brohi"]
},
"sabeena-brohi":{
     id: "sabeena-brohi",
     displayName: "Sabeena Brohi",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["aun-ali"]
},
"taha-ali":{
     id: "taha-ali",
     displayName: "Taha Ali",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["muhammad-ali-fakhir","ambreen-ali"],
    //  spouseIds:["zahra-ali"]
},
"ayrish-ali":{
     id: "ayrish-ali",
     displayName: "Ayrish Ali",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["muhammad-ali-fakhir","ambreen-ali"],
    //  spouseIds:["taha-ali"]
},
"amira-haider":{
     id: "amira-haider",
     displayName: "Amira Haider",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["fakhir-hussain","mehdia-bano"],
      spouseIds:["mustafa-haider"]
},
"mustafa-haider":{
     id: "mustafa-haider",
     displayName: "Mustafa Haider",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["amira-haider"]
},
"ali-mustafa-haider":{
     id: "ali-mustufa-haider",
     displayName: "Ali Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["amira-haider","mustafa-haider"],
     spouseIds:["kulsum-haider"]
},
"kulsum-haider":{
     id: "kulsum-haider",
     displayName: "Kulsum Haider",
     gender: "F",
     lifeStatus: "alive",
     spouseIds:["ali-haider"]
},
"abbas-ali-haider":{
     id: "abbas-ali-haider",
     displayName: "Abbas Ali Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["ali-haider","kulsum-haider"],
    
},
"hassan-ali-haider":{
     id: "hassan-ali-haider",
     displayName: "Hassan Ali Haider",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["ali-haider","kulsum-haider"],
    
},
"uzma":{
     id: "uzma",
     displayName: "Uzma",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["amira-haider","mustafa-haider"],
     spouseIds:["murtuza"]
},
"murtuza":{
     id: "murtuza",
     displayName: "Murtuza",
     gender: "M",
     lifeStatus: "alive",
     spouseIds:["uzma"]
},
"naqi-murtuza":{
     id: "naqi-murtuza",
     displayName: "Naqi Murtuza",
     gender: "M",
     lifeStatus: "alive",
     parentIds: ["murtuza","uzma"],
},
"sidra":{
     id: "sidra",
     displayName: "Sidra",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["amira-haider","mustafa-haider"],
    
},
"arshia":{
     id: "arshia",
     displayName: "Arshia",
     gender: "F",
     lifeStatus: "alive",
     parentIds: ["amira-haider","mustafa-haider"],
},

    // Grandchildren examples (Ali Baqir couple)
   
  },
};

/* =========================
   Helpers
========================= */

function clsx(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function getDisplayName(p?: Person | null) {
  if (!p) return "Unknown";
  return p.displayName || [p.firstName, p.lastName].filter(Boolean).join(" ") || p.id;
}

function isRTL(text: string) {
  // rudimentary RTL check for Arabic/Urdu characters
  return /[\u0600-\u06FF]/.test(text);
}

function lifeBadge(status?: LifeStatus) {
  switch (status) {
    case "alive":
      return { label: "Alive", color: "bg-emerald-100 text-emerald-700" };
    case "deceased":
      return { label: "Deceased", color: "bg-rose-100 text-rose-700" };
    default:
      return { label: "Unknown", color: "bg-slate-100 text-slate-600" };
  }
}

function childrenOfCouple(data: FamilyTree, aId: string, bId: string) {
  const { persons } = data;
  const res: Person[] = [];
  for (const p of Object.values(persons)) {
    const parents = p.parentIds || [];
    if (parents.includes(aId) && parents.includes(bId)) res.push(p);
  }
  // sort by displayName
  return res.sort((x, y) => getDisplayName(x).localeCompare(getDisplayName(y)));
}

function spousesOf(person: Person, data: FamilyTree): Person[] {
  const ids = person.spouseIds || [];
  return ids.map((id) => data.persons[id]).filter(Boolean);
}

function childrenOf(person: Person, data: FamilyTree): Person[] {
  // Any child having this person among parentIds
  const res: Person[] = [];
  for (const p of Object.values(data.persons)) {
    const parents = p.parentIds || [];
    if (parents.includes(person.id)) res.push(p);
  }
  return res.sort((x, y) => getDisplayName(x).localeCompare(getDisplayName(y)));
}

/* =========================
   UI Components
========================= */

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", className)}>
      {children}
    </span>
  );
}

function PersonCard({
  person,
  onClick,
  emphasize = false,
}: {
  person: Person;
  onClick?: () => void;
  emphasize?: boolean;
}) {
  const name = getDisplayName(person);
  const rtl = isRTL(name);
  const badge = lifeBadge(person.lifeStatus);
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative w-full text-left",
        "rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md",
        emphasize ? "border-sky-300 ring-2 ring-sky-200" : "border-slate-200"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100" aria-hidden>
          {/* Avatar placeholder; wire up person.avatarUrl if available */}
          <div className="h-full w-full flex items-center justify-center text-slate-400">👤</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={clsx("truncate text-base font-semibold text-slate-900", rtl && "rtl")}
              style={rtl ? ({ direction: "rtl" } as React.CSSProperties) : undefined}
              title={name}
            >
              {name}
            </h3>
            <Badge className={badge.color}>{badge.label}</Badge>
          </div>
          <div className="mt-1 text-sm text-slate-600 flex flex-wrap items-center gap-3">
            {person.address && (
              <span className="inline-flex items-center gap-1"><Home className="h-4 w-4" />{person.address}</span>
            )}
            {person.grave?.city && (
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />Grave: {person.grave.city}{person.grave.cemetery ? `, ${person.grave.cemetery}` : ""}</span>
            )}
          </div>
          {person.notes && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-700">
              <span className="inline-flex items-center gap-1 font-medium text-slate-900"><Info className="h-4 w-4"/>Notes:</span> {person.notes}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon} <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

/* =========================
   Page Component
========================= */

export default function FamilyTreePage() {
  const [data, setData] = useState<FamilyTree>(SAMPLE_FAMILY);
  const head = data.persons[data.rootId];

  // Explorer state
  const [currentId, setCurrentId] = useState<string>(data.rootId);
  const current = data.persons[currentId];
  const [selectedSpouseId, setSelectedSpouseId] = useState<string | null>(null);
  const selectedSpouse = selectedSpouseId ? data.persons[selectedSpouseId] : null;
  const [showSpouses, setShowSpouses] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const [path, setPath] = useState<string[]>([data.rootId]); // breadcrumb of person IDs

  // Search
  const [q, setQ] = useState("");
  const matches = useMemo(() => {
    if (!q.trim()) return [] as Person[];
    const needle = q.toLowerCase();
    return Object.values(data.persons)
      .filter((p) => getDisplayName(p).toLowerCase().includes(needle))
      .slice(0, 8);
  }, [q, data]);

  useEffect(() => {
    // Auto-open spouse pane when navigating into a person, per requirement
    if (!current) return;
    const autoOpen = current.gender === "M" || current.gender === "F"; // both: open their spouse list
    setShowSpouses(autoOpen);
    setSelectedSpouseId(null);
    setShowChildren(false);
  }, [currentId]);

  const spouses = useMemo(() => (current ? spousesOf(current, data) : []), [current, data]);
  const coupleChildren = useMemo(() => {
    if (!current || !selectedSpouse) return [] as Person[];
    return childrenOfCouple(data, current.id, selectedSpouse.id);
  }, [current, selectedSpouse, data]);

  function goToPerson(p: Person) {
    setCurrentId(p.id);
    setPath((prev) => (prev[prev.length - 1] === p.id ? prev : [...prev, p.id]));
  }

  function goBackTo(index: number) {
    const targetId = path[index];
    setPath((prev) => prev.slice(0, index + 1));
    setCurrentId(targetId);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 bg-white">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Hussain Family Tree</h1>
          <p className="mt-1 text-sm text-slate-600">Interactive, click-through explorer. Start from the head and reveal spouse → children → next generation.</p>
        </div>
        <div className="w-full sm:w-80">
          <div className="relative">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
              placeholder="Search name (English/Urdu)…"
            />
            {q && matches.length > 0 && (
              <div className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                {matches.map((p) => (
                  <div
                    key={p.id}
                    className="cursor-pointer rounded-lg px-2 py-1.5 text-sm hover:bg-slate-50"
                    onClick={() => {
                      setQ("");
                      goToPerson(p);
                    }}
                  >
                    {getDisplayName(p)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {path.map((pid, i) => {
          const p = data.persons[pid];
          return (
            <React.Fragment key={pid}>
              {i > 0 && <ChevronRight className="h-4 w-4 text-slate-400" />}
              <button
                className={clsx("rounded-lg px-2 py-1", i === path.length - 1 ? "bg-slate-100 font-medium" : "hover:bg-slate-50")}
                onClick={() => goBackTo(i)}
              >
                {getDisplayName(p)}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Current person */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PersonCard person={current} emphasize />
        {selectedSpouse && <PersonCard person={selectedSpouse} />}
      </div>

      {/* Spouses */}
      <Section title="Spouse(s)" icon={<Heart className="h-4 w-4" />}>
        <div className="flex items-center gap-3">
          
          <span className="text-xs text-slate-500">Click a spouse, then reveal children of the couple.</span>
        </div>
        {showSpouses && (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {spouses.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">No spouse data.</div>
            )}
            {spouses.map((s) => (
              <div key={s.id} className={clsx(selectedSpouseId === s.id && "ring-2 ring-sky-200 rounded-2xl")}
                   onClick={() => {
                     setSelectedSpouseId(s.id);
                     setShowChildren(false);
                   }}>
                <PersonCard person={s} />
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Children of selected couple */}
      <Section title="Children" icon={<Baby className="h-4 w-4" />}>
        <div className="flex items-center gap-3">
          <button
            disabled={!selectedSpouse}
            className={clsx(
              "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm",
              selectedSpouse ? "border-slate-300 bg-white hover:bg-slate-50" : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
            )}
            onClick={() => setShowChildren((v) => !v)}
          >
            {showChildren ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />} {showChildren ? "Hide" : "Show"} children of this couple
          </button>
          {!selectedSpouse && <span className="text-xs text-slate-500">Select a spouse first.</span>}
        </div>

        {showChildren && selectedSpouse && (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {coupleChildren.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">No children recorded for this couple.</div>
            )}
            {coupleChildren.map((child) => (
              <div key={child.id} onClick={() => goToPerson(child)}>
                <PersonCard person={child} />
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Sidebar: Quick list of siblings (same parents) & immediate children */}
      <aside className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700 flex items-center gap-2"><Users className="h-4 w-4" /> Siblings</h3>
          <div className="grid grid-cols-1 gap-2">
            {(() => {
              // Siblings: people sharing any parent with current (simple approach)
              const sibs = Object.values(data.persons)
                .filter((p) => p.id !== current.id)
                .filter((p) => (p.parentIds || []).some((pid) => (current.parentIds || []).includes(pid)))
                .sort((a, b) => getDisplayName(a).localeCompare(getDisplayName(b)));
              if (sibs.length === 0) return <div className="text-sm text-slate-500">None recorded.</div>;
              return sibs.map((p) => (
                <button key={p.id} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => goToPerson(p)}>
                  {getDisplayName(p)}
                </button>
              ));
            })()}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700 flex items-center gap-2"><Users className="h-4 w-4" /> Children (any spouse)</h3>
          <div className="grid grid-cols-1 gap-2">
            {(() => {
              const kids = childrenOf(current, data);
              if (kids.length === 0) return <div className="text-sm text-slate-500">None recorded.</div>;
              return kids.map((p) => (
                <button key={p.id} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => goToPerson(p)}>
                  {getDisplayName(p)}
                </button>
              ));
            })()}
          </div>
        </div>
      </aside>

      {/* Footer tip */}
   
    </div>
  );
}
