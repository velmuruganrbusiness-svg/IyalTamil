
import React, { useState } from 'react';
import { t, Language } from '../utils/translations';
import { SEO } from './SEO';
import { Icon } from './Icon';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

interface TamilKarkaViewProps {
  language: Language;
  onNavigate: (page: 'home') => void;
}

const pureVowels = [
  { char: 'அ', en: 'a', example: 'அம்மா', exEn: 'Amma (Mother)' },
  { char: 'ஆ', en: 'aa', example: 'ஆடு', exEn: 'Aadu (Goat)' },
  { char: 'இ', en: 'i', example: 'இலை', exEn: 'Ilai (Leaf)' },
  { char: 'ஈ', en: 'ee', example: 'ஈ', exEn: 'Ee (Fly)' },
  { char: 'உ', en: 'u', example: 'உரல்', exEn: 'Ural (Mortar)' },
  { char: 'ஊ', en: 'uu', example: 'ஊசி', exEn: 'Oosi (Needle)' },
  { char: 'எ', en: 'e', example: 'எலி', exEn: 'Eli (Rat)' },
  { char: 'ஏ', en: 'ae', example: 'ஏணி', exEn: 'Yeni (Ladder)' },
  { char: 'ஐ', en: 'ai', example: 'ஐவர்', exEn: 'Aivar (Five People)' },
  { char: 'ஒ', en: 'o', example: 'ஒட்டகம்', exEn: 'Ottagam (Camel)' },
  { char: 'ஓ', en: 'oa', example: 'ஓடம்', exEn: 'Odam (Boat)' },
  { char: 'ஔ', en: 'au', example: 'ஔவை', exEn: 'Avvai (Poet)' },
];
const aayuthamData = { char: 'ஃ', en: 'akh', example: 'எஃகு', exEn: 'Ekku (Steel)' };
const consonants = [
  { char: 'க்', en: 'ik', example: 'சக்கரம்', exEn: 'Sakkaram (Wheel)' },
  { char: 'ங்', en: 'ing', example: 'சங்கு', exEn: 'Sangu (Conch)' },
  { char: 'ச்', en: 'ich', example: 'பச்சை', exEn: 'Pachai (Green)' },
  { char: 'ஞ்', en: 'inj', example: 'இஞ்சி', exEn: 'Inji (Ginger)' },
  { char: 'ட்', en: 'it', example: 'பட்டம்', exEn: 'Pattam (Kite)' },
  { char: 'ண்', en: 'in', example: 'கண்', exEn: 'Kan (Eye)' },
  { char: 'த்', en: 'ith', example: 'வாத்து', exEn: 'Vaaththu (Duck)' },
  { char: 'ந்', en: 'inth', example: 'பந்து', exEn: 'Panthu (Ball)' },
  { char: 'ப்', en: 'ip', example: 'கப்பல்', exEn: 'Kappal (Ship)' },
  { char: 'ம்', en: 'im', example: 'மரம்', exEn: 'Maram (Tree)' },
  { char: 'ய்', en: 'iy', example: 'நாய்', exEn: 'Naai (Dog)' },
  { char: 'ர்', en: 'ir', example: 'தேர்', exEn: 'Ther (Chariot)' },
  { char: 'ல்', en: 'il', example: 'பல்', exEn: 'Pal (Tooth)' },
  { char: 'வ்', en: 'iv', example: 'செவ்வந்தி', exEn: 'Sevvanthi (Flower)' },
  { char: 'ழ்', en: 'izh', example: 'யாழ்', exEn: 'Yaazh (Harp)' },
  { char: 'ள்', en: 'il', example: 'வாள்', exEn: 'Vaal (Sword)' },
  { char: 'ற்', en: 'itr', example: 'புற்று', exEn: 'Putru (Anthill)' },
  { char: 'ன்', en: 'in', example: 'மான்', exEn: 'Maan (Deer)' },
];
const uyirmeiKa = [
  { combo: 'க் + அ', result: 'க', en: 'Ka' }, { combo: 'க் + ஆ', result: 'கா', en: 'Kaa' }, { combo: 'க் + இ', result: 'கி', en: 'Ki' }, { combo: 'க் + ஈ', result: 'கீ', en: 'Kee' }, { combo: 'க் + உ', result: 'கு', en: 'Ku' }, { combo: 'க் + ஊ', result: 'கூ', en: 'Koo' }, { combo: 'க் + எ', result: 'கெ', en: 'Ke' }, { combo: 'க் + ஏ', result: 'கே', en: 'Kae' }, { combo: 'க் + ஐ', result: 'கை', en: 'Kai' }, { combo: 'க் + ஒ', result: 'கொ', en: 'Ko' }, { combo: 'க் + ஓ', result: 'கோ', en: 'Koa' }, { combo: 'க் + ஔ', result: 'கௌ', en: 'Kau' },
];

const numbers = [
  { num: 1, tamilChar: '௧', word: 'ஒன்று', en: 'Ondru' }, { num: 2, tamilChar: '௨', word: 'இரண்டு', en: 'Irandu' }, { num: 3, tamilChar: '௩', word: 'மூன்று', en: 'Moondru' }, { num: 4, tamilChar: '௪', word: 'நான்கு', en: 'Naangu' }, { num: 5, tamilChar: '௫', word: 'ஐந்து', en: 'Aindhu' }, { num: 6, tamilChar: '௬', word: 'ஆறு', en: 'Aaru' }, { num: 7, tamilChar: '௭', word: 'ஏழு', en: 'Yezhu' }, { num: 8, tamilChar: '௮', word: 'எட்டு', en: 'Ettu' }, { num: 9, tamilChar: '௯', word: 'ஒன்பது', en: 'Onbathu' }, { num: 10, tamilChar: '௰', word: 'பத்து', en: 'Pathu' },
];
const days = [
  { word: 'ஞாயிறு', en: 'GNAYIRU', meaning: 'Sunday' }, { word: 'திங்கள்', en: 'THINGAL', meaning: 'Monday' }, { word: 'செவ்வாய்', en: 'SEVVAI', meaning: 'Tuesday' }, { word: 'புதன்', en: 'BUDHAN', meaning: 'Wednesday' }, { word: 'வியாழன்', en: 'VIYAZHAN', meaning: 'Thursday' }, { word: 'வெள்ளி', en: 'VELLI', meaning: 'Friday' }, { word: 'சனி', en: 'SANI', meaning: 'Saturday' },
];
const months = [
  { word: 'సిத்திரை', en: 'CHITHIRAI', meaning: 'Mid Apr - Mid May' }, { word: 'வைகாசி', en: 'VAIKASI', meaning: 'Mid May - Mid Jun' }, { word: 'ஆனி', en: 'AANI', meaning: 'Mid Jun - Mid Jul' }, { word: 'ஆடி', en: 'AADI', meaning: 'Mid Jul - Mid Aug' }, { word: 'ஆவணி', en: 'AAVANI', meaning: 'Mid Aug - Mid Sep' }, { word: 'புரட்டாசி', en: 'PURATTASI', meaning: 'Mid Sep - Mid Oct' }, { word: 'ஐப்பசி', en: 'AIPPASI', meaning: 'Mid Oct - Mid Nov' }, { word: 'கார்த்திகை', en: 'KARTHIGAI', meaning: 'Mid Nov - Mid Dec' }, { word: 'மார்கழி', en: 'MARGAZHI', meaning: 'Mid Dec - Mid Jan' }, { word: 'தை', en: 'THAI', meaning: 'Mid Jan - Mid Feb' }, { word: 'மாசி', en: 'MAASI', meaning: 'Mid Feb - Mid Mar' }, { word: 'பங்குனி', en: 'PANGUNI', meaning: 'Mid Mar - Mid Apr' },
];
const grammarTypes = [
  { title: 'எழுத்து', en: 'Ezhuthu', desc: 'எழுத்துக்களின் பிறப்பு, வகைகள் மற்றும் ஒலிப்பு முறைகளை விளக்குவது.', enDesc: 'Phonology: Deals with letters, their formation, and pronunciation.' }, { title: 'சொல்', en: 'Sol', desc: 'சொற்களின் வகைகள் (பெயர், வினை, இடை, உரி) மற்றும் அவற்றின் இலக்கணம்.', enDesc: 'Morphology: Deals with words, their classification, and formation.' }, { title: 'பொருள்', en: 'Porul', desc: 'வாழ்வியல் நெறிகள் (அகம், புறம்) மற்றும் கவிதைப் பொருளை விளக்குவது.', enDesc: 'Semantics: Deals with the subject matter of poetry (Love & War/Life).' }, { title: 'யாப்பு', en: 'Yaappu', desc: 'செய்யுள் இயற்றும் விதிகள், அசை, சீர், தளை, அடி, தொடை ஆகியவற்றை கூறுவது.', enDesc: 'Prosody: Rules of versification and poetry construction.' }, { title: 'அணி', en: 'Ani', desc: 'செய்யுளுக்கு அழகு சேர்க்கும் உவமை, உருவகம் போன்ற அணிகளை விளக்குவது.', enDesc: 'Rhetoric: Figures of speech and literary ornamentation.' }
];
const sentenceStructure = [
    { subject: 'நான்', subEn: 'I (Naan)', object: 'பழம்', objEn: 'Fruit (Pazham)', verb: 'சாப்பிட்டேன்', verbEn: 'Ate (Saappitten)', sentence: 'நான் பழம் சாப்பிட்டேன்', meaning: 'I ate a fruit' }, { subject: 'அவன்', subEn: 'He (Avan)', object: 'பள்ளிக்கு', objEn: 'To School (Pallikku)', verb: 'சென்றான்', verbEn: 'Went (Sendraan)', sentence: 'அவன் பள்ளிக்குச் சென்றான்', meaning: 'He went to school' }, { subject: 'அவள்', subEn: 'She (Aval)', object: 'பாடம்', objEn: 'Lesson (Paadam)', verb: 'படித்தாள்', verbEn: 'Studied (Padithaal)', sentence: 'அவள் பாடம் படித்தாள்', meaning: 'She studied the lesson' }
];
const commonPhrases = [
    { category: 'Greetings', items: [ { ta: 'வணக்கம்', en: 'Vanakkam', meaning: 'Hello / Greetings' }, { ta: 'நன்றி', en: 'Nandri', meaning: 'Thank you' }, { ta: 'காலை வணக்கம்', en: 'Kaalai Vanakkam', meaning: 'Good Morning' }, { ta: 'எப்படி இருக்கிறீர்கள்?', en: 'Eppadi irukkireergal?', meaning: 'How are you?' }, { ta: 'நான் நலம்', en: 'Naan nalam', meaning: 'I am fine' } ]}, { category: 'Essentials', items: [ { ta: 'ஆம்', en: 'Aam', meaning: 'Yes' }, { ta: 'இல்லை', en: 'Illai', meaning: 'No' }, { ta: 'மன்னிக்கவும்', en: 'Mannikkavum', meaning: 'Sorry / Excuse me' }, { ta: 'எனக்குத் தெரியாது', en: 'Enakku theriyadhu', meaning: 'I do not know' }, { ta: 'உதவி செய்யுங்கள்', en: 'Udhavi seiyungal', meaning: 'Please help' } ]}
];
const scriptGroups = [
    { name: 'Pa Family (Box Shape)', letters: ['ப', 'ம', 'ய', 'வ'] }, { name: 'Ta Family (Hook Shape)', letters: ['ட', 'ழ', 'ற'] }, { name: 'Ka Family', letters: ['க', 'ச', 'த', 'ந'] }, { name: 'La Family', letters: ['ல', 'வ'] }, { name: 'Na Family (Loop)', letters: ['ண', 'ன', 'ல'] }
];
const seasons = [
    { ta: 'இளவேனில்', en: 'ILAVENIL', desc: 'Spring', months: 'சித்திரை - வைகாசி' }, { ta: 'முதுவேனில்', en: 'MUTHUVENIL', desc: 'Summer', months: 'ஆனி - ஆடி' }, { ta: 'கார்', en: 'KAAR', desc: 'Monsoon', months: 'ஆவணி - புரட்டாசி' }, { ta: 'குளிர்', en: 'KULIR', desc: 'Winter', months: 'ஐப்பசி - கார்த்திகை' }, { ta: 'முன்பனி', en: 'MUNPANI', desc: 'Early Dew', months: 'மார்கழி - தை' }, { ta: 'பின்பனி', en: 'PINPANI', desc: 'Late Dew', months: 'மாசி - பங்குனி' }
];
const directions = [ { ta: 'கிழக்கு', en: 'Kizhakku', desc: 'East' }, { ta: 'மேற்கு', en: 'Merku', desc: 'West' }, { ta: 'வடக்கு', en: 'Vadakku', desc: 'North' }, { ta: 'தெற்கு', en: 'Therku', desc: 'South' } ];
const tastes = [ { ta: 'இனிப்பு', en: 'Inippu', desc: 'Sweet', example: 'கரும்பு (Sugarcane)', color: 'bg-rose-100 text-rose-800' }, { ta: 'புளிப்பு', en: 'Pulippu', desc: 'Sour', example: 'எலுமிச்சை (Lemon)', color: 'bg-yellow-100 text-yellow-800' }, { ta: 'கசப்பு', en: 'Kasappu', desc: 'Bitter', example: 'பாகற்காய் (Bitter Gourd)', color: 'bg-green-100 text-green-800' }, { ta: 'உவர்ப்பு', en: 'Uvarppu', desc: 'Salty', example: 'உப்பு (Salt)', color: 'bg-stone-200 text-stone-800' }, { ta: 'காரப்பு', en: 'Kaarappu', desc: 'Spicy/Pungent', example: 'மிளகாய் (Chilli)', color: 'bg-red-100 text-red-800' }, { ta: 'துவர்ப்பு', en: 'Thuvarppu', desc: 'Astringent', example: 'பாக்கு (Betel Nut)', color: 'bg-purple-100 text-purple-800' } ];
const relations = [ { ta: 'அம்மா', en: 'Amma', desc: 'Mother' }, { ta: 'அப்பா', en: 'Appa', desc: 'Father' }, { ta: 'அண்ணன்', en: 'Annan', desc: 'Elder Brother' }, { ta: 'தம்பி', en: 'Thambi', desc: 'Younger Brother' }, { ta: 'அக்கா', en: 'Akka', desc: 'Elder Sister' }, { ta: 'தங்கை', en: 'Thangai', desc: 'Younger Sister' }, { ta: 'தாத்தா', en: 'Thaatha', desc: 'Grandfather' }, { ta: 'பாட்டி', en: 'Paatti', desc: 'Grandmother' }, { ta: 'மாமா', en: 'Maama', desc: 'Uncle (Maternal)' }, { ta: 'அத்தை', en: 'Athai', desc: 'Aunt (Paternal)' } ];
const colorsData = [ { ta: 'சிவப்பு', en: 'Sivappu', meaning: 'Red', class: 'bg-red-500' }, { ta: 'பச்சை', en: 'Pachai', meaning: 'Green', class: 'bg-green-500' }, { ta: 'நீலம்', en: 'Neelam', meaning: 'Blue', class: 'bg-blue-500' }, { ta: 'மஞ்சள்', en: 'Manjal', meaning: 'Yellow', class: 'bg-yellow-400' }, { ta: 'வெள்ளை', en: 'Vellai', meaning: 'White', class: 'bg-white border border-stone-200' }, { ta: 'கருப்பு', en: 'Karuppu', meaning: 'Black', class: 'bg-black' }, { ta: 'ஊதா', en: 'Oodha', meaning: 'Purple', class: 'bg-purple-500' }, { ta: 'செம்மஞ்சள்', en: 'Semmanjal', meaning: 'Orange', class: 'bg-orange-500' } ];
const animalsData = [ { ta: 'சிங்கம்', en: 'Singam', meaning: 'Lion' }, { ta: 'புலி', en: 'Puli', meaning: 'Tiger' }, { ta: 'யானை', en: 'Yaanai', meaning: 'Elephant' }, { ta: 'பசு', en: 'Pasu', meaning: 'Cow' }, { ta: 'குரங்கு', en: 'Kurangu', meaning: 'Monkey' }, { ta: 'மான்', en: 'Maan', meaning: 'Deer' }, { ta: 'நாய்', en: 'Naai', meaning: 'Dog' }, { ta: 'பூனை', en: 'Poonai', meaning: 'Cat' } ];
const birdsData = [ { ta: 'மயில்', en: 'Mayil', meaning: 'Peacock' }, { ta: 'கிளி', en: 'Kili', meaning: 'Parrot' }, { ta: 'காகம்', en: 'Kaagam', meaning: 'Crow' }, { ta: 'குயில்', en: 'Kuyil', meaning: 'Cuckoo' }, { ta: 'கழுகு', en: 'Kazhugu', meaning: 'Eagle' }, { ta: 'புறா', en: 'Puraa', meaning: 'Pigeon' }, { ta: 'வாத்து', en: 'Vaaththu', meaning: 'Duck' }, { ta: 'கோழி', en: 'Kozhi', meaning: 'Hen' } ];
const bodyPartsData = [ { ta: 'தலை', en: 'Thalai', meaning: 'Head' }, { ta: 'கண்', en: 'Kan', meaning: 'Eye' }, { ta: 'காது', en: 'Kaadhu', meaning: 'Ear' }, { ta: 'மூக்கு', en: 'Mookku', meaning: 'Nose' }, { ta: 'வாய்', en: 'Vaai', meaning: 'Mouth' }, { ta: 'கை', en: 'Kai', meaning: 'Hand' }, { ta: 'கால்', en: 'Kaal', meaning: 'Leg' }, { ta: 'பல்', en: 'Pal', meaning: 'Tooth' } ];
const vegetablesData = [ { ta: 'கத்திரிக்காய்', en: 'Kathirikkai', meaning: 'Brinjal' }, { ta: 'வெண்டைக்காய்', en: 'Vendaikkai', meaning: 'Okra' }, { ta: 'தக்காளி', en: 'Thakkali', meaning: 'Tomato' }, { ta: 'உருளைக்கிழங்கு', en: 'Urulaikizhangu', meaning: 'Potato' }, { ta: 'வெங்காயம்', en: 'Vengayam', meaning: 'Onion' }, { ta: 'முருங்கைக்காய்', en: 'Murungakkai', meaning: 'Drumstick' }, { ta: 'பூசணிக்காய்', en: 'Poosanikkai', meaning: 'Pumpkin' }, { ta: 'கேரட்', en: 'Carrot', meaning: 'Carrot' } ];
const fruitsData = [ { ta: 'மாம்பழம்', en: 'Maambazham', meaning: 'Mango' }, { ta: 'பலாப்பழம்', en: 'Palaapazham', meaning: 'Jackfruit' }, { ta: 'வாழைப்பழம்', en: 'Vaazhaipazham', meaning: 'Banana' }, { ta: 'எலுமிச்சை', en: 'Elumichai', meaning: 'Lemon' }, { ta: 'திராட்சை', en: 'Thiratchai', meaning: 'Grapes' }, { ta: 'கொய்யா', en: 'Koiya', meaning: 'Guava' }, { ta: 'மாதுளை', en: 'Maadhulai', meaning: 'Pomegranate' }, { ta: 'தர்பூசணி', en: 'Dharboosani', meaning: 'Watermelon' } ];
const flowersData = [ { ta: 'தாமரை', en: 'Thamarai', meaning: 'Lotus' }, { ta: 'மல்லிகை', en: 'Malligai', meaning: 'Jasmine' }, { ta: 'ரோஜா', en: 'Roja', meaning: 'Rose' }, { ta: 'செம்பருத்தி', en: 'Sembaruthi', meaning: 'Hibiscus' }, { ta: 'சூரியகாந்தி', en: 'Sooryakanthi', meaning: 'Sunflower' }, { ta: 'சாமந்தி', en: 'Saamanthi', meaning: 'Marigold' }, { ta: 'அல்லி', en: 'Alli', meaning: 'Lily' }, { ta: 'கனகாம்பரம்', en: 'Kanakambaram', meaning: 'Firecracker Flower' } ];
const shapesData = [ { ta: 'வட்டம்', en: 'Vattam', meaning: 'Circle', shapeClass: 'rounded-full' }, { ta: 'சதுரம்', en: 'Sadhuram', meaning: 'Square', shapeClass: 'rounded-none' }, { text: 'செவ்வகம்', en: 'Sevvagam', meaning: 'Rectangle', shapeClass: 'w-full h-1/2 rounded-none' }, { ta: 'முக்கோணம்', en: 'Mukkonom', meaning: 'Triangle', shapeClass: 'triangle' } ];
const actionsData = [ { ta: 'நட', en: 'Nada', meaning: 'Walk' }, { ta: 'ஓடு', en: 'Odu', meaning: 'Run' }, { ta: 'சாப்பிடு', en: 'Saappidu', meaning: 'Eat' }, { ta: 'குடி', en: 'Kudi', meaning: 'Drink' }, { ta: 'தூங்கு', en: 'Thoongu', meaning: 'Sleep' }, { ta: 'படி', en: 'Padi', meaning: 'Read' }, { text: 'எழுது', en: 'Ezhuthu', meaning: 'Write' }, { ta: 'விளையாடு', en: 'Vilaiyaadu', meaning: 'Play' } ];

type SectionId = 'vowels' | 'aayutham' | 'consonants' | 'uyirmei' | 'ilakkanam' | 'numbers' | 'days' | 'months' | 'sentences' | 'phrases' | 'script' | 'seasons' | 'directions' | 'tastes' | 'relations' | 'colors' | 'animals' | 'birds' | 'bodyParts' | 'vegetables' | 'fruits' | 'flowers' | 'shapes' | 'actions';

interface TopicConfig { id: SectionId; titleKey: string; count?: number; color: 'rose' | 'blue' | 'purple' | 'amber' | 'teal' | 'emerald' | 'indigo' | 'orange' | 'cyan' | 'lime' | 'fuchsia' | 'sky'; descKey?: string; }

const topics: TopicConfig[] = [
  { id: 'vowels', titleKey: 'vowels', count: 12, color: 'rose', descKey: 'vowelsDesc' }, { id: 'aayutham', titleKey: 'aayutham', count: 1, color: 'purple', descKey: 'aayuthamDesc' }, { id: 'consonants', titleKey: 'consonants', count: 18, color: 'blue', descKey: 'consonantsDesc' }, { id: 'uyirmei', titleKey: 'uyirmei', count: 216, color: 'amber', descKey: 'uyirmeiDesc' }, { id: 'colors', titleKey: 'colors', count: 8, color: 'fuchsia', descKey: 'colorsDesc' }, { id: 'shapes', titleKey: 'shapes', count: 4, color: 'indigo', descKey: 'shapesDesc' }, { id: 'vegetables', titleKey: 'vegetables', count: 8, color: 'emerald', descKey: 'vegetablesDesc' }, { id: 'fruits', titleKey: 'fruits', count: 8, color: 'orange', descKey: 'fruitsDesc' }, { id: 'flowers', titleKey: 'flowers', count: 8, color: 'rose', descKey: 'flowersDesc' }, { id: 'animals', titleKey: 'animals', count: 8, color: 'emerald', descKey: 'animalsDesc' }, { id: 'birds', titleKey: 'birds', count: 8, color: 'sky', descKey: 'birdsDesc' }, { id: 'bodyParts', titleKey: 'bodyParts', count: 8, color: 'orange', descKey: 'bodyPartsDesc' }, { id: 'actions', titleKey: 'actions', count: 8, color: 'cyan', descKey: 'actionsDesc' }, { id: 'script', titleKey: 'script', color: 'indigo', descKey: 'scriptDesc' }, { id: 'sentences', titleKey: 'sentences', color: 'orange', descKey: 'sentencesDesc' }, { id: 'phrases', titleKey: 'phrases', color: 'cyan', descKey: 'phrasesDesc' }, { id: 'ilakkanam', titleKey: 'ilakkanam', count: 5, color: 'teal', descKey: 'ilakkanamDesc' }, { id: 'numbers', titleKey: 'numbers', color: 'emerald', descKey: 'numbersDesc' }, { id: 'days', titleKey: 'days', count: 7, color: 'rose', descKey: 'daysDesc' }, { id: 'months', titleKey: 'months', count: 12, color: 'blue', descKey: 'monthsDesc' }, { id: 'seasons', titleKey: 'seasons', count: 6, color: 'lime', descKey: 'seasonsDesc' }, { id: 'directions', titleKey: 'directions', count: 4, color: 'sky', descKey: 'directionsDesc' }, { id: 'tastes', titleKey: 'tastes', count: 6, color: 'fuchsia', descKey: 'tastesDesc' }, { id: 'relations', titleKey: 'relations', color: 'amber', descKey: 'relationsDesc' },
];

export const TamilKarkaView: React.FC<TamilKarkaViewProps> = ({ language, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const getSectionTitle = (id: SectionId) => t(topics.find(t => t.id === id)!.titleKey as any, language);

  const breadcrumbs: BreadcrumbItem[] = [
      { label: t('home', language), onClick: () => onNavigate('home') },
      { label: t('learnTamil', language), onClick: () => setActiveSection(null), active: !activeSection }
  ];

  if (activeSection) {
      breadcrumbs.push({ label: getSectionTitle(activeSection), active: true });
  }

  const renderDashboard = () => (
    <div className="animate-subtle-fade">
       <div className="text-center mb-[100px]">
        <h2 className="text-4xl md:text-6xl font-black font-tamil text-[#2D2D2D] dark:text-white mb-6 tracking-tight">{t('learnTamil', language)}</h2>
        <p className="text-[#333333] dark:text-stone-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-90">தமிழ் எழுத்துக்கள் மற்றும் சொற்களை நவீன முறையில், எளிமையாகக் கற்றுக்கொள்ளுங்கள்.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-16 lg:gap-x-12 relative">
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px border-t border-dashed border-stone-200 dark:border-stone-800 -z-0 pointer-events-none opacity-40"></div>

        {topics.map((topic, idx) => {
           const colorClasses = { 
                rose: 'text-rose-600 dark:text-rose-400 bg-rose-500/5', 
                blue: 'text-blue-600 dark:text-blue-400 bg-blue-500/5', 
                purple: 'text-purple-600 dark:text-purple-400 bg-purple-500/5', 
                amber: 'text-amber-600 dark:text-amber-400 bg-amber-500/5', 
                teal: 'text-teal-600 dark:text-teal-400 bg-teal-500/5', 
                emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5', 
                indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/5', 
                orange: 'text-orange-600 dark:text-orange-400 bg-orange-500/5', 
                cyan: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/5', 
                lime: 'text-lime-600 dark:text-lime-400 bg-lime-500/5', 
                fuchsia: 'text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-500/5', 
                sky: 'text-sky-600 dark:text-sky-400 bg-sky-500/5' 
           };
           const currentColors = colorClasses[topic.color];
           
           return (
            <button 
              key={topic.id} 
              onClick={() => { setActiveSection(topic.id); window.scrollTo(0,0); }} 
              className="group relative text-left p-10 rounded-[2.5rem] transition-all duration-500 bg-white/40 dark:bg-stone-900/40 backdrop-blur-xl border border-white/20 dark:border-stone-800/50 hover:-translate-y-3 hover:shadow-[0_32px_64px_rgba(74,103,65,0.08)] flex flex-col h-full ring-1 ring-black/5 dark:ring-white/5 overflow-hidden"
            >
              <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none ${currentColors.split(' ').pop()}`}></div>
              
              <div className="relative z-10 w-full">
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl ${currentColors} backdrop-blur-md shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon name="school" />
                  </div>
                  {topic.count && (
                    <span className="font-sans font-bold text-2xl text-stone-800 dark:text-stone-100 tracking-tighter opacity-90 group-hover:scale-110 transition-transform duration-500">
                        {topic.count.toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
                
                <h3 className="font-black font-tamil mb-3 text-[#2D2D2D] dark:text-stone-100 leading-tight group-hover:text-zen-green transition-colors duration-300 break-word" style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)' }}>
                    {t(topic.titleKey as any, language)}
                </h3>
                
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed mb-10 min-h-[40px]">
                    {topic.descKey ? t(topic.descKey as any, language) : ''}
                </p>
                
                <div className="mt-auto pt-6 border-t border-stone-100/50 dark:border-stone-800/50 flex items-center text-sm font-bold uppercase tracking-[0.15em] text-zen-green group-hover:text-zen-lightGreen transition-all duration-300">
                  <span>படிக்கத் தொடங்க</span>
                  <span className="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
                    <Icon name="chevron-right" />
                  </span>
                </div>
              </div>
            </button>
           );
        })}
      </div>
    </div>
  );

  const renderSectionContent = () => {
    const responsiveGridClass = "grid gap-8 pb-20 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]";
    const detailHeaderClass = "text-center mb-[60px] text-[#555555] dark:text-stone-400 font-bold";
    
    switch (activeSection) {
      case 'vowels': return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">{pureVowels.map((item, index) => <LearningCard key={index} mainText={item.char} subText={`/${item.en}/`} bottomText={item.example} bottomSubText={item.exEn} color="rose" />)}</div>;
      case 'aayutham': return <div className="flex justify-center h-[50vh] items-center"><div className="w-full max-w-[280px]"><LearningCard mainText={aayuthamData.char} subText={`/${aayuthamData.en}/`} bottomText={aayuthamData.example} bottomSubText={aayuthamData.exEn} color="purple" /></div></div>;
      case 'consonants': return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">{consonants.map((item, index) => <LearningCard key={index} mainText={item.char} subText={`/${item.en}/`} bottomText={item.example} bottomSubText={item.exEn} color="blue" />)}</div>;
      case 'uyirmei': return (
        <div className="animate-subtle-fade">
            <p className="text-center mb-16 text-[#333333] dark:text-stone-400 italic text-xl font-medium tracking-wide">({t('example', language)}: 'க' வரிசை / Row of 'Ka')</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12">
                {uyirmeiKa.map((item, index) => (
                    <div key={index} className="group bg-white/40 dark:bg-[#1a1a1a] rounded-[2.5rem] p-8 border border-stone-200/50 dark:border-neutral-800 shadow-sm transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-[5px] hover:bg-[#5A7D5B]/5 hover:shadow-[0_20px_40px_rgba(90,125,91,0.06)] backdrop-blur-sm">
                        <div className="text-[11px] font-bold text-[#333333] dark:text-stone-500 mb-5 uppercase tracking-[0.2em]">{item.combo}</div>
                        <div className="text-6xl font-black font-tamil text-[#5A7D5B] transition-colors duration-300 mb-4">{item.result}</div>
                        <div className="text-sm font-bold text-[#333333] dark:text-stone-400 uppercase tracking-[0.25em]">/{item.en}/</div>
                        <div className="w-0 h-[4px] bg-[#5A7D5B] rounded-full mt-6 group-hover:w-12 transition-all duration-500 ease-out"></div>
                    </div>
                ))}
            </div>
        </div>
      );
      case 'ilakkanam': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
            {grammarTypes.map((item, index) => (
                <div key={index} className="group bg-white dark:bg-stone-900 rounded-[2.5rem] p-10 border border-[#eaddcf] dark:border-neutral-800 shadow-sm hover:-translate-y-[5px] hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden min-h-[400px] justify-between">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-zen-green/5 dark:bg-zen-green/10 rounded-full transition-transform group-hover:scale-150"></div>
                    
                    <div className="relative z-10 flex flex-col items-center w-full">
                        <div className="w-16 h-16 bg-[#5A7D5B] text-white rounded-full flex items-center justify-center font-black text-2xl mb-8 shadow-md">
                            {index + 1}
                        </div>
                        
                        <h4 className="text-4xl font-black font-tamil text-[#333333] dark:text-white mb-3 leading-tight">
                            {item.title}
                        </h4>
                        <span className="text-[12px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-8">
                            {item.en}
                        </span>
                        
                        <p className="font-tamil text-xl font-bold text-[#333333] dark:text-stone-300 leading-relaxed mb-6">
                            {item.desc}
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto pt-6 border-t border-stone-100 dark:border-stone-800 w-full">
                        <p className="text-sm font-medium text-[#555555] dark:text-stone-400 leading-relaxed">
                            {item.enDesc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      );
      case 'numbers': return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 pb-20">
            {numbers.map((item, index) => (
                <div key={index} className="group bg-white/80 dark:bg-stone-900 rounded-[2.5rem] p-8 border border-[#eaddcf] dark:border-neutral-800 shadow-lg hover:-translate-y-[4px] hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="text-5xl font-black text-stone-100 dark:text-neutral-800 absolute top-2 right-4 select-none pointer-events-none opacity-40">
                        {item.num}
                    </div>
                    <div className="text-5xl font-black font-tamil text-[#5A7D5B] mb-5 relative z-10">
                        {item.tamilChar}
                    </div>
                    <div className="font-tamil font-bold text-xl text-[#333333] dark:text-stone-100 mb-2">
                        {item.word}
                    </div>
                    <div className="text-[12px] text-stone-500 dark:text-stone-400 font-sans font-bold uppercase tracking-widest">
                        {item.en}
                    </div>
                    <div className="w-0 h-[3px] bg-[#5A7D5B] rounded-full mt-6 group-hover:w-10 transition-all duration-500 ease-out"></div>
                </div>
            ))}
        </div>
      );
      case 'days': return (
        <div className="max-w-4xl mx-auto space-y-4 pb-20">
            <div className={detailHeaderClass}>{t('daysDesc', language)}</div>
            {days.map((day, idx) => (
                <div key={idx} className="group flex items-center justify-between p-6 bg-[#F9F8F4] dark:bg-stone-900 rounded-[1.5rem] border border-stone-200/60 dark:border-stone-800 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-lg hover:-translate-y-[3px] hover:bg-[#5A7D5B]/5 transition-all duration-300">
                    <span className="font-tamil font-black text-3xl text-[#333333] dark:text-stone-100 group-hover:text-[#5A7D5B]">
                        {day.word}
                    </span>
                    <div className="text-right">
                        <span className="block text-[11px] font-bold text-[#666666] dark:text-stone-400 uppercase tracking-widest mb-1">
                            {day.en}
                        </span>
                        <span className="block text-base font-semibold text-[#5A7D5B] dark:text-zen-lightGreen">
                            {day.meaning}
                        </span>
                    </div>
                </div>
            ))}
        </div>
      );
      case 'months': return (
        <div className="max-w-4xl mx-auto space-y-4 pb-20">
            <div className={detailHeaderClass}>{t('monthsDesc', language)}</div>
            {months.map((month, idx) => (
                <div key={idx} className="group flex items-center justify-between p-6 bg-[#F9F8F4] dark:bg-stone-900 rounded-[1.5rem] border border-stone-200/60 dark:border-stone-800 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-lg hover:-translate-y-[3px] hover:bg-[#5A7D5B]/5 transition-all duration-300">
                    <div className="flex items-center gap-8">
                        <span className="w-12 h-12 rounded-full bg-transparent border-2 border-[#5A7D5B]/30 text-[#5A7D5B] flex items-center justify-center text-xl font-black group-hover:bg-[#5A7D5B] group-hover:text-white group-hover:border-[#5A7D5B] transition-all">
                            {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="font-tamil font-black text-3xl text-[#333333] dark:text-stone-100 group-hover:text-[#5A7D5B]">
                            {month.word}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="block text-[11px] font-bold text-[#666666] dark:text-stone-400 uppercase tracking-widest mb-1">
                            {month.en}
                        </span>
                        <span className="block text-base font-semibold text-[#5A7D5B] dark:text-zen-lightGreen">
                            {month.meaning}
                        </span>
                    </div>
                </div>
            ))}
        </div>
      );
      case 'seasons': return (
        <div className="max-w-4xl mx-auto space-y-4 pb-20">
            <div className={detailHeaderClass}>{t('seasonsDesc', language)}</div>
            {seasons.map((season, idx) => (
                <div key={idx} className="group flex items-center justify-between p-6 bg-[#F9F8F4] dark:bg-stone-900 rounded-[1.5rem] border border-stone-200/60 dark:border-stone-800 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-lg hover:-translate-y-[3px] hover:bg-[#5A7D5B]/5 transition-all duration-300">
                    <div className="flex flex-col">
                        <span className="font-tamil font-black text-3xl text-[#333333] dark:text-stone-100 group-hover:text-[#5A7D5B]">
                            {season.ta}
                        </span>
                        <span className="text-xs font-bold text-[#5A7D5B] uppercase tracking-wide mt-1">
                            {season.desc}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="block text-[11px] font-bold text-[#666666] dark:text-stone-400 uppercase tracking-widest mb-1">
                            {season.en}
                        </span>
                        <span className="block text-sm font-medium text-stone-500 dark:text-stone-400 italic">
                            {season.months}
                        </span>
                    </div>
                </div>
            ))}
        </div>
      );
      case 'directions': return (
        <div className="flex justify-center py-20 pb-40">
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Center Anchor Point */}
            <div className="absolute w-4 h-4 bg-[#5A7D5B] rounded-full z-20 shadow-md"></div>
            
            {/* Vertical Axis Line */}
            <div className="absolute h-[280px] w-0.5 bg-stone-200 dark:bg-stone-800 transition-all duration-500 group-hover/thisai-v:w-1 group-hover/thisai-v:bg-[#5A7D5B]/50"></div>
            {/* Horizontal Axis Line */}
            <div className="absolute w-[280px] h-0.5 bg-stone-200 dark:bg-stone-800 transition-all duration-500 group-hover/thisai-h:h-1 group-hover/thisai-h:bg-[#5A7D5B]/50"></div>

            {/* North */}
            <div className="absolute top-0 flex flex-col items-center -mt-12 group/thisai-v">
              <span className="font-tamil font-black text-3xl text-[#5A7D5B] transition-transform duration-300 group-hover/thisai-v:-translate-y-1">வடக்கு</span>
              <span className="text-[11px] font-sans font-bold text-[#555555] dark:text-stone-400 uppercase tracking-[0.2em] mt-1">North</span>
            </div>

            {/* South */}
            <div className="absolute bottom-0 flex flex-col items-center -mb-12 group/thisai-v">
              <span className="text-[11px] font-sans font-bold text-[#555555] dark:text-stone-400 uppercase tracking-[0.2em] mb-1">South</span>
              <span className="font-tamil font-black text-3xl text-[#5A7D5B] transition-transform duration-300 group-hover/thisai-v:translate-y-1">தெற்கு</span>
            </div>

            {/* East */}
            <div className="absolute right-0 flex flex-col items-center -mr-24 group/thisai-h text-right items-end">
              <span className="font-tamil font-black text-3xl text-[#5A7D5B] transition-transform duration-300 group-hover/thisai-h:translate-x-1">கிழக்கு</span>
              <span className="text-[11px] font-sans font-bold text-[#555555] dark:text-stone-400 uppercase tracking-[0.2em] mt-1">East</span>
            </div>

            {/* West */}
            <div className="absolute left-0 flex flex-col items-center -ml-24 group/thisai-h text-left items-start">
              <span className="font-tamil font-black text-3xl text-[#5A7D5B] transition-transform duration-300 group-hover/thisai-h:-translate-x-1">மேற்கு</span>
              <span className="text-[11px] font-sans font-bold text-[#555555] dark:text-stone-400 uppercase tracking-[0.2em] mt-1">West</span>
            </div>
          </div>
        </div>
      );
      case 'tastes': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
            {tastes.map((taste, idx) => (
                <div key={idx} className="group bg-white dark:bg-stone-900 rounded-[2.5rem] p-10 border border-[#eaddcf] dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:-translate-y-[5px] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl mb-8 shadow-sm ${taste.color}`}>
                        {idx + 1}
                    </div>
                    <h4 className="font-tamil font-black text-3xl text-[#333333] dark:text-stone-100 mb-2">
                        {taste.ta}
                    </h4>
                    <p className="text-[12px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-[0.2em] mb-4">
                        {taste.en}
                    </p>
                    <span className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-10 leading-none">
                        {taste.desc}
                    </span>
                    <div className="mt-auto w-full py-4 px-6 rounded-2xl bg-bone/50 dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700">
                        <p className="text-[13px] font-bold text-[#5A7D5B] dark:text-zen-lightGreen leading-relaxed italic">
                            {taste.example}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      );
      case 'relations': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
            {relations.map((rel, idx) => (
                <div key={idx} className="group bg-white dark:bg-stone-900 p-10 rounded-[2.5rem] border border-[#eaddcf] dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:-translate-y-[5px] transition-all duration-300 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon name="like" />
                    </div>
                    <div className="w-16 h-16 bg-stone-50 dark:bg-stone-800 text-[#5A7D5B] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner transition-transform group-hover:scale-110">
                        <Icon name="like" />
                    </div>
                    <h4 className="font-tamil font-black text-2xl text-[#333333] dark:text-stone-100 mb-3">
                        {rel.ta}
                    </h4>
                    <p className="text-[12px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-[0.2em] mb-4">
                        {rel.en}
                    </p>
                    <div className="w-10 h-0.5 bg-[#5A7D5B]/20 mx-auto mb-4"></div>
                    <p className="text-sm font-bold text-stone-400 dark:text-stone-500 leading-relaxed italic">
                        {rel.desc}
                    </p>
                </div>
            ))}
        </div>
      );
      case 'colors': return <div className={responsiveGridClass}>{colorsData.map((color, idx) => <LearningCard key={idx} topElement={<div className={`w-24 h-24 rounded-full mb-4 shadow-inner flex-shrink-0 ${color.class}`}></div>} mainText={color.ta} subText={color.en} color="fuchsia" isCompact />)}</div>;
      case 'animals': return <div className={responsiveGridClass}>{animalsData.map((animal, idx) => <LearningCard key={idx} topElement={<div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 text-[#5A7D5B] rounded-3xl flex items-center justify-center mb-2 text-3xl font-black">{animal.ta.charAt(0)}</div>} mainText={animal.ta} subText="" bottomText={animal.meaning} bottomSubText={animal.en} color="emerald" />)}</div>;
      case 'birds': return <div className={responsiveGridClass}>{birdsData.map((bird, idx) => <LearningCard key={idx} topElement={<div className="w-20 h-20 bg-sky-50 dark:bg-sky-900/20 text-sky-600 rounded-3xl flex items-center justify-center mb-2 text-3xl font-black">{bird.ta.charAt(0)}</div>} mainText={bird.ta} subText="" bottomText={bird.meaning} bottomSubText={bird.en} color="sky" />)}</div>;
      case 'bodyParts': return <div className={responsiveGridClass}>{bodyPartsData.map((part, idx) => <LearningCard key={idx} topElement={<div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-3xl flex items-center justify-center mb-2 text-3xl font-black">{part.ta.charAt(0)}</div>} mainText={part.ta} subText="" bottomText={part.meaning} bottomSubText={part.en} color="orange" />)}</div>;
      case 'vegetables': return <div className={responsiveGridClass}>{vegetablesData.map((veg, idx) => <LearningCard key={idx} topElement={<div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 text-[#5A7D5B] rounded-3xl flex items-center justify-center mb-2 text-3xl font-black">{veg.ta.charAt(0)}</div>} mainText={veg.ta} subText="" bottomText={veg.meaning} bottomSubText={veg.en} color="emerald" />)}</div>;
      case 'fruits': return <div className={responsiveGridClass}>{fruitsData.map((fruit, idx) => <LearningCard key={idx} topElement={<div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-3xl flex items-center justify-center mb-2 text-3xl font-black">{fruit.ta.charAt(0)}</div>} mainText={fruit.ta} subText="" bottomText={fruit.meaning} bottomSubText={fruit.en} color="orange" />)}</div>;
      case 'flowers': return <div className={responsiveGridClass}>{flowersData.map((flower, idx) => <LearningCard key={idx} topElement={<div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-3xl flex items-center justify-center mb-2 text-3xl font-black">{flower.ta.charAt(0)}</div>} mainText={flower.ta} subText="" bottomText={flower.meaning} bottomSubText={flower.en} color="rose" />)}</div>;
      case 'shapes': return <div className={responsiveGridClass}>{shapesData.map((shape, idx) => <LearningCard key={idx} topElement={shape.shapeClass === 'triangle' ? <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[80px] border-b-[#5A7D5B] mb-2"></div> : <div className={`w-20 h-20 bg-[#5A7D5B] mb-2 ${shape.shapeClass}`}></div>} mainText={shape.ta} subText="" bottomText={shape.meaning} bottomSubText={shape.en} color="indigo" />)}</div>;
      case 'actions': return <div className={responsiveGridClass}>{actionsData.map((action, idx) => <LearningCard key={idx} mainText={action.ta} subText="" bottomText={action.meaning} bottomSubText={action.en} color="cyan" />)}</div>;
      case 'sentences': return (
        <div className="space-y-12">
            <div className="bg-zen-green/5 dark:bg-stone-900/50 p-10 rounded-[2.5rem] flex items-start gap-6 shadow-sm border border-stone-200 dark:border-stone-800">
                <div className="text-[#5A7D5B] flex-shrink-0 mt-1">
                    <Icon name="leaf" />
                </div>
                <div>
                    <h3 className="text-xl font-bold font-tamil text-[#444444] dark:text-stone-200 mb-3">வாக்கிய அமைப்பு (Sentence Structure)</h3>
                    <p className="text-lg text-[#555555] dark:text-stone-400 leading-relaxed">
                        English uses <strong className="text-[#5A7D5B]">SVO</strong> (Subject-Verb-Object). <br/>
                        Tamil uses <strong className="text-[#5A7D5B]">SOV</strong> (Subject-Object-Verb).
                    </p>
                </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {sentenceStructure.map((item, idx) => (
                    <div key={idx} className="group bg-white/80 dark:bg-[#1a1a1a] rounded-[2.5rem] p-10 border border-[#eaddcf] dark:border-neutral-800 shadow-lg hover:-translate-y-[5px] hover:shadow-2xl transition-all duration-300 min-h-[360px] flex flex-col">
                        <div className="mb-6 space-y-4 flex-grow">
                            <div className="flex justify-between border-b border-[#eaddcf]/50 dark:border-neutral-800 pb-3">
                                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest font-sans">Subject</span>
                                <div className="text-right">
                                    <span className="block font-tamil font-bold text-[#3e2b22] dark:text-stone-200">{item.subject}</span>
                                    <span className="text-[11px] text-stone-500 font-medium">{item.subEn}</span>
                                </div>
                            </div>
                            <div className="flex justify-between border-b border-[#eaddcf]/50 dark:border-neutral-800 pb-3">
                                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest font-sans">Object</span>
                                <div className="text-right">
                                    <span className="block font-tamil font-bold text-[#3e2b22] dark:text-stone-200">{item.object}</span>
                                    <span className="text-[11px] text-stone-500 font-medium">{item.objEn}</span>
                                </div>
                            </div>
                            <div className="flex justify-between border-b border-[#eaddcf]/50 dark:border-neutral-800 pb-3">
                                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest font-sans">Verb</span>
                                <div className="text-right">
                                    <span className="block font-tamil font-bold text-[#3e2b22] dark:text-stone-200">{item.verb}</span>
                                    <span className="text-[11px] text-stone-500 font-medium">{item.verbEn}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto pt-6 bg-stone-50/50 dark:bg-stone-900/40 -mx-10 -mb-10 p-10 rounded-b-[2.5rem] flex items-center justify-between group-hover:bg-zen-green/5 transition-colors duration-300">
                            <div>
                                <p className="font-tamil font-black text-2xl text-[#3e2b22] dark:text-stone-100 mb-2 leading-tight">{item.sentence}</p>
                                <p className="text-sm font-medium text-[#555555] dark:text-stone-400 italic">{item.meaning}</p>
                            </div>
                            <button className="p-3 rounded-full bg-white dark:bg-stone-800 shadow-sm text-stone-400 hover:text-zen-green transition-colors" title="Listen">
                                <Icon name="volume-up" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
      case 'phrases': return (
        <div className="space-y-16 pb-20">
            {commonPhrases.map((group, idx) => (
                <div key={idx}>
                    <h3 className="text-3xl font-black font-tamil text-[#3e2b22] dark:text-white mb-10 pl-6 border-l-[4px] border-zen-green leading-none">
                        {group.category}
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        {group.items.map((phrase, pIdx) => (
                            <div 
                                key={pIdx} 
                                className="group bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] border border-[#eaddcf] dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-[4px] transition-all duration-300 flex justify-between items-center overflow-hidden"
                            >
                                <div className="flex-grow pr-4">
                                    <p className="font-tamil font-bold text-2xl text-[#333333] dark:text-stone-100 mb-2">
                                        {phrase.ta}
                                    </p>
                                    <p className="text-[12px] font-bold text-stone-400 uppercase tracking-widest mt-2">
                                        {phrase.en}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="px-5 py-2.5 rounded-full text-sm font-bold text-zen-green bg-bone/50 dark:bg-stone-900 border border-zen-green/20 group-hover:border-zen-green transition-colors duration-300">
                                        {phrase.meaning}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      );
      case 'script': return (
        <div className="space-y-12 pb-20">
            <div className="bg-zen-green/5 dark:bg-stone-900/50 p-10 rounded-[2.5rem] border border-stone-300 dark:border-stone-700 flex items-start gap-6 shadow-sm">
                <div className="text-zen-green flex-shrink-0 mt-1">
                    <Icon name="leaf" />
                </div>
                <div>
                    <p className="text-lg font-bold text-[#444444] dark:text-stone-200 leading-relaxed mb-2">
                        ஒரே வடிவத்தில் உள்ள எழுத்துக்களைக் குழுவாகக் கற்பது எளிது. ஒரே மாதிரியான எழுத்துக்களைச் சேர்த்துப் பயிற்சி செய்யுங்கள்.
                    </p>
                    <p className="text-sm font-medium text-[#777777] dark:text-stone-400 italic">
                        Tamil letters are easier to learn when grouped by shape. Practice writing these similar-looking letters together.
                    </p>
                </div>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {scriptGroups.map((group, idx) => (
                    <div key={idx} className="bg-white/80 dark:bg-[#1a1a1a] rounded-[2.5rem] p-10 border border-[#eaddcf] dark:border-neutral-800 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Icon name="pen" /></div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-8 border-b border-[#eaddcf]/50 pb-4">{group.name}</h4>
                        <div className="grid grid-cols-2 gap-6">
                            {group.letters.map((char, cIdx) => <LearningCard key={cIdx} mainText={char} subText="" color="indigo" isCompact />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 animate-subtle-fade">
      <SEO title={`${t('learnTamil', language)} | தமிழ்ச் சங்கம்`} description="Learn Tamil language basics, vowels, consonants, numbers, and vocabulary." />
      <Breadcrumbs items={breadcrumbs} />
      {activeSection ? (
        <div className="animate-subtle-fade">
           <div className="text-center mb-[60px]"><h2 className="text-4xl md:text-5xl font-black font-tamil text-[#333333] dark:text-white mb-4">{getSectionTitle(activeSection)}</h2>{(() => { const topic = topics.find(t => t.id === activeSection); if (topic?.descKey) return <p className="text-[#8a7060] dark:text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">{t(topic.descKey as any, language)}</p>; return null; })()}</div>
           {renderSectionContent()}
        </div>
      ) : renderDashboard()}
    </div>
  );
};

const LearningCard: React.FC<any> = ({ mainText, subText, bottomText, bottomSubText, topElement, color, isCompact = false }) => {
    return (
        <div className={`group bg-white/80 dark:bg-[#1a1a1a] rounded-[2.5rem] p-10 border border-[#eaddcf] dark:border-neutral-800 shadow-sm transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden h-full ${isCompact ? 'min-h-[280px]' : 'min-h-[240px]'} justify-between hover:-translate-y-[5px] hover:bg-[#5A7D5B]/5 hover:shadow-[0_20px_45px_rgba(90,125,91,0.08)]`}>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-50 dark:bg-stone-900/20 rounded-full transition-transform duration-500 group-hover:scale-150 opacity-60"></div>
            {topElement && <div className="relative z-10 w-full flex justify-center mb-8">{topElement}</div>}
            <div className="relative z-10 flex-grow flex flex-col justify-center items-center w-full">
                    <span className="font-black font-tamil text-[#3e2b22] dark:text-stone-100 group-hover:text-[#5A7D5B] transition-colors duration-300 leading-tight mb-2 break-words" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>{mainText}</span>
                    {subText && (
                        <div className="text-sm font-bold text-stone-600 dark:text-stone-500 tracking-[0.2em] group-hover:text-[#5A7D5B] transition-colors duration-300 mt-2 first-letter:uppercase lowercase">
                            {subText}
                        </div>
                    )}
                    <div className="w-0 h-[3px] bg-[#5A7D5B] rounded-full mt-6 group-hover:w-16 transition-all duration-300"></div>
            </div>
            {(bottomText || bottomSubText) && (
                <div className="mt-8 w-full pt-8 border-t border-[#eaddcf]/50 dark:border-neutral-800 relative z-10">
                    {bottomText && <p className="font-tamil font-bold text-stone-600 dark:text-stone-400 text-lg leading-snug first-letter:uppercase lowercase">{bottomText}</p>}
                    {bottomSubText && <p className="text-[11px] text-stone-500 font-bold mt-2 first-letter:uppercase lowercase tracking-wide">{bottomSubText}</p>}
                </div>
            )}
        </div>
    );
};
