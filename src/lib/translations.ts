// Complete localization for Ethiopian languages
// Amharic (am), English (en), Oromo (om), Tigrinya (ti), Somali (so)

export type Language = 'am' | 'en' | 'om' | 'ti' | 'so';

export const translations: Record<Language, Record<string, string>> = {
  am: {
    // Navigation
    'nav.members': 'አባላት',
    'nav.attendance': 'ስብሰባ',
    'nav.finance': 'ፋይናንስ',
    'nav.tasks': 'ተግባራት',
    'nav.announcements': 'ማስታወቂያዎች',
    'nav.prayer': 'ጸሎት',
    'nav.events': 'ዝግጅቶች',
    'nav.kidase': 'ቅዳሴ',
    'nav.fasting': 'ጾመ',
    'nav.mahiber': 'ማህበር',
    'nav.dashboard': 'ዋና ገጽ',

    // Departments
    'dept.education': 'ትምህ���ት',
    'dept.choir': 'ዘማሪ',
    'dept.finance': 'ፋይናንስ',
    'dept.public_relations': 'ህዝብ ግንኙነት',
    'dept.research': 'ምርምር',
    'dept.charity': 'ምጽዋት',
    'dept.sunday_school': 'የሰንበት ትምህርት ቤት',
    'dept.mahiber': 'ማህበር',

    // Roles
    'role.admin': 'አስተዳዳሪ',
    'role.department_head': 'የክፍል ሃላፊ',
    'role.secretary': 'ፀሐፊ',
    'role.treasurer': 'ገንዘብ ያዥ',
    'role.member': 'አባል',

    // Spiritual Titles
    'spiritual.deacon': 'ዲያቆን',
    'spiritual.subdeacon': 'ንፍቀ ዲያቆን',
    'spiritual.reader': 'ንባቢ',
    'spiritual.zemari': 'ዘማሪ',
    'spiritual.none': 'ምንም',

    // Event Types
    'event.kidase': 'ቅዳሴ',
    'event.timkat': 'ጥምቀት',
    'event.meskel': 'መስቀል',
    'event.enkutatash': 'እንቁጣጣሽ',
    'event.fasika': 'ፋሲካ',
    'event.gena': 'ገና',
    'event.tsome_filseta': 'ጾመ ፍልሰታ',
    'event.tsome_nebiyat': 'ጾመ ነቢያት',
    'event.weekly_meeting': 'ሳምንታዊ ስብሰባ',
    'event.prayer_session': 'የጸሎት ጊዜ',
    'event.bible_study': 'የመጽሐፍ ቅዱስ ጥናት',
    'event.community_service': 'የማህበረሰብ አገልግሎት',
    'event.special_event': 'ልዩ ዝግጅት',

    // Common Actions
    'action.add': 'ጨምር',
    'action.edit': 'ያርትዑ',
    'action.delete': 'ሰርዝ',
    'action.save': 'ያስቀምጡ',
    'action.cancel': 'ይቅር',
    'action.submit': 'ያስገቡ',
    'action.filter': 'ማጣሪያ',
    'action.search': 'ፈልግ',
    'action.view': 'ይመልከቱ',
    'action.close': 'ዝጋ',

    // Common Labels
    'label.name': 'ስም',
    'label.email': 'ኢሜይል',
    'label.phone': 'ስልክ',
    'label.department': 'ክፍል',
    'label.role': 'ሚና',
    'label.date': 'ቀን',
    'label.status': 'ሁኔታ',
    'label.description': 'መግለጫ',
    'label.amount': 'መጠን',
    'label.total': 'ጠቅላላ',
    'label.active': 'ንቁ',
    'label.inactive': 'ንቁ ያልሆነ',

    // Messages
    'msg.success': 'ተሳክቷል',
    'msg.error': 'ስህተት ተከስቷል',
    'msg.loading': 'በመጫን ላይ...',
    'msg.no_data': 'ምንም ውሂብ የለም',
    'msg.confirm_delete': 'ይህን ሰርዝ ይፈልጋሉ?',
  },

  en: {
    // Navigation
    'nav.members': 'Members',
    'nav.attendance': 'Attendance',
    'nav.finance': 'Finance',
    'nav.tasks': 'Tasks',
    'nav.announcements': 'Announcements',
    'nav.prayer': 'Prayer',
    'nav.events': 'Events',
    'nav.kidase': 'Kidase',
    'nav.fasting': 'Fasting',
    'nav.mahiber': 'Mahiber',
    'nav.dashboard': 'Dashboard',

    // Departments
    'dept.education': 'Education',
    'dept.choir': 'Choir',
    'dept.finance': 'Finance',
    'dept.public_relations': 'Public Relations',
    'dept.research': 'Research',
    'dept.charity': 'Charity',
    'dept.sunday_school': 'Sunday School',
    'dept.mahiber': 'Mahiber',

    // Roles
    'role.admin': 'Admin',
    'role.department_head': 'Department Head',
    'role.secretary': 'Secretary',
    'role.treasurer': 'Treasurer',
    'role.member': 'Member',

    // Spiritual Titles
    'spiritual.deacon': 'Deacon',
    'spiritual.subdeacon': 'Sub-deacon',
    'spiritual.reader': 'Reader',
    'spiritual.zemari': 'Cantor',
    'spiritual.none': 'None',

    // Event Types
    'event.kidase': 'Divine Liturgy',
    'event.timkat': 'Epiphany',
    'event.meskel': 'Finding of the True Cross',
    'event.enkutatash': 'Ethiopian New Year',
    'event.fasika': 'Easter',
    'event.gena': 'Ethiopian Christmas',
    'event.tsome_filseta': 'Fast of the Assumption',
    'event.tsome_nebiyat': 'Advent Fast',
    'event.weekly_meeting': 'Weekly Meeting',
    'event.prayer_session': 'Prayer Session',
    'event.bible_study': 'Bible Study',
    'event.community_service': 'Community Service',
    'event.special_event': 'Special Event',

    // Common Actions
    'action.add': 'Add',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.submit': 'Submit',
    'action.filter': 'Filter',
    'action.search': 'Search',
    'action.view': 'View',
    'action.close': 'Close',

    // Common Labels
    'label.name': 'Name',
    'label.email': 'Email',
    'label.phone': 'Phone',
    'label.department': 'Department',
    'label.role': 'Role',
    'label.date': 'Date',
    'label.status': 'Status',
    'label.description': 'Description',
    'label.amount': 'Amount',
    'label.total': 'Total',
    'label.active': 'Active',
    'label.inactive': 'Inactive',

    // Messages
    'msg.success': 'Success',
    'msg.error': 'An error occurred',
    'msg.loading': 'Loading...',
    'msg.no_data': 'No data available',
    'msg.confirm_delete': 'Are you sure you want to delete this?',
  },

  om: {
    // Navigation
    'nav.members': 'Miseensa',
    'nav.attendance': 'Hirmaannaa',
    'nav.finance': 'Raasaa',
    'nav.tasks': 'Hojii',
    'nav.announcements': 'Labsii',
    'nav.prayer': 'Kadhannaa',
    'nav.events': 'Taataa',
    'nav.kidase': 'Kidase',
    'nav.fasting': 'Soomuu',
    'nav.mahiber': 'Mahiber',
    'nav.dashboard': 'Fuula Jalqabaa',

    // Departments
    'dept.education': 'Barnoota',
    'dept.choir': 'Faaruu',
    'dept.finance': 'Raasaa',
    'dept.public_relations': 'Walqabsiisa Hawaasa',
    'dept.research': 'Qorannoo',
    'dept.charity': 'Gargaarsa',
    'dept.sunday_school': 'Barnoota Galgala',
    'dept.mahiber': 'Mahiber',

    // Roles
    'role.admin': 'Bulchiinsa',
    'role.department_head': 'Mataa Kutaa',
    'role.secretary': 'Barreessaa',
    'role.treasurer': 'Qabeenya',
    'role.member': 'Miseensa',

    // Spiritual Titles
    'spiritual.deacon': 'Diyaakoni',
    'spiritual.subdeacon': 'Diyaakoni Xiqqaa',
    'spiritual.reader': 'Dubbisaa',
    'spiritual.zemari': 'Faaruu',
    'spiritual.none': 'Homaa',

    // Event Types
    'event.kidase': 'Kidase',
    'event.timkat': 'Timkat',
    'event.meskel': 'Meskel',
    'event.enkutatash': 'Waggaa Haaraa',
    'event.fasika': 'Fasika',
    'event.gena': 'Gena',
    'event.tsome_filseta': 'Soomuu Filseta',
    'event.tsome_nebiyat': 'Soomuu Nabiyaa',
    'event.weekly_meeting': 'Walitti Gaafatamuu Torban',
    'event.prayer_session': 'Yeroo Kadhannaa',
    'event.bible_study': 'Barnoota Kitaaba Qulqulluu',
    'event.community_service': 'Tajaajila Hawaasa',
    'event.special_event': 'Taataa Addaa',

    // Common Actions
    'action.add': 'Dabaluu',
    'action.edit': 'Gulaaluu',
    'action.delete': 'Balleesuu',
    'action.save': 'Kuusuu',
    'action.cancel': 'Hir\'isuu',
    'action.submit': 'Eruu',
    'action.filter': 'Filtruu',
    'action.search': 'Baruu',
    'action.view': 'Ilaaluu',
    'action.close': 'Cufuu',

    // Common Labels
    'label.name': 'Maqaa',
    'label.email': 'Imeelii',
    'label.phone': 'Bilbila',
    'label.department': 'Kutaa',
    'label.role': 'Gosa',
    'label.date': 'Guyyaa',
    'label.status': 'Haala',
    'label.description': 'Ibsa',
    'label.amount': 'Hamma',
    'label.total': 'Walitti',
    'label.active': 'Jira',
    'label.inactive': 'Hin jiru',

    // Messages
    'msg.success': 'Milkaa\'ina',
    'msg.error': 'Dogoggora tokko uumame',
    'msg.loading': 'Fe\'aa jira...',
    'msg.no_data': 'Deetaa tokko hin jiru',
    'msg.confirm_delete': 'Kana balleesuu barbaadduu?',
  },

  ti: {
    // Navigation
    'nav.members': 'ሓውሓውታት',
    'nav.attendance': 'ምስክርነት',
    'nav.finance': 'ገንዘብ',
    'nav.tasks': 'ስራሓት',
    'nav.announcements': 'ሓበሬታ',
    'nav.prayer': 'ምልዓል',
    'nav.events': 'ክንውናት',
    'nav.kidase': 'ቅዳሴ',
    'nav.fasting': 'ጾም',
    'nav.mahiber': 'ማህበር',
    'nav.dashboard': 'ዋና ገጽ',

    // Departments
    'dept.education': 'ትምህርቲ',
    'dept.choir': 'ዝማሬ',
    'dept.finance': 'ገንዘብ',
    'dept.public_relations': 'ምትሕግግ ህዝቢ',
    'dept.research': 'ምርምር',
    'dept.charity': 'ሓገዝ',
    'dept.sunday_school': 'ትምህርቲ ሰንበት',
    'dept.mahiber': 'ማህበር',

    // Roles
    'role.admin': 'ሓላፊ',
    'role.department_head': 'ሓላፊ ክፍሊ',
    'role.secretary': 'ጸሓፊ',
    'role.treasurer': 'ሓላፊ ገንዘብ',
    'role.member': 'ሓውሓው',

    // Spiritual Titles
    'spiritual.deacon': 'ዲያቆን',
    'spiritual.subdeacon': 'ንኡስ ዲያቆን',
    'spiritual.reader': 'ንባቢ',
    'spiritual.zemari': 'ዝማሬ',
    'spiritual.none': 'ምንም',

    // Event Types
    'event.kidase': 'ቅዳሴ',
    'event.timkat': 'ጥምቀት',
    'event.meskel': 'መስቀል',
    'event.enkutatash': 'እንቁጣጣሽ',
    'event.fasika': 'ፋሲካ',
    'event.gena': 'ገና',
    'event.tsome_filseta': 'ጾም ፍልሰታ',
    'event.tsome_nebiyat': 'ጾም ነቢያት',
    'event.weekly_meeting': 'ሳምንታዊ ስብሰባ',
    'event.prayer_session': 'ግዜ ምልዓል',
    'event.bible_study': 'ትምህርቲ መጽሐፍ ቅዱስ',
    'event.community_service': 'ስራሕ ህዝቢ',
    'event.special_event': 'ልዩ ክንውናት',

    // Common Actions
    'action.add': 'ወስኽ',
    'action.edit': 'ስተውስ',
    'action.delete': 'ምስዝ',
    'action.save': 'ዓቅም',
    'action.cancel': 'ይቅር',
    'action.submit': 'ሰልፍ',
    'action.filter': 'ምልዓል',
    'action.search': 'ድለ',
    'action.view': 'ርኢ',
    'action.close': 'ዕጽ',

    // Common Labels
    'label.name': 'ስም',
    'label.email': 'ኢሜይል',
    'label.phone': 'ስልክ',
    'label.department': 'ክፍሊ',
    'label.role': 'ሚና',
    'label.date': 'ዕለት',
    'label.status': 'ሁኔታ',
    'label.description': 'ገለጻ',
    'label.amount': 'ብዛት',
    'label.total': 'ጠቅላላ',
    'label.active': 'ንቁ',
    'label.inactive': 'ንቁ ዘይኮነ',

    // Messages
    'msg.success': 'ተሳኢሉ',
    'msg.error': 'ስህተት ተፈጠረ',
    'msg.loading': 'ይጸድቕ...',
    'msg.no_data': 'ዳታ የለን',
    'msg.confirm_delete': 'ሓንቲ ምስዝ ትደልዩ?',
  },

  so: {
    // Navigation
    'nav.members': 'Xubnaha',
    'nav.attendance': 'Hadhaadka',
    'nav.finance': 'Maaliyadda',
    'nav.tasks': 'Hawlaha',
    'nav.announcements': 'Ogeysiisyo',
    'nav.prayer': 'Ducada',
    'nav.events': 'Dhacdooyinka',
    'nav.kidase': 'Kidase',
    'nav.fasting': 'Soomida',
    'nav.mahiber': 'Mahiber',
    'nav.dashboard': 'Bogga Hore',

    // Departments
    'dept.education': 'Waxbarashada',
    'dept.choir': 'Gaarka',
    'dept.finance': 'Maaliyadda',
    'dept.public_relations': 'Xiriirka Dadweynaha',
    'dept.research': 'Cilmiga',
    'dept.charity': 'Caasimadda',
    'dept.sunday_school': 'Dugsiga Axadda',
    'dept.mahiber': 'Mahiber',

    // Roles
    'role.admin': 'Maamulaha',
    'role.department_head': 'Madaxa Waaxda',
    'role.secretary': 'Qoraha',
    'role.treasurer': 'Maamulaha Maaliyadda',
    'role.member': 'Xubnaha',

    // Spiritual Titles
    'spiritual.deacon': 'Diyaakoni',
    'spiritual.subdeacon': 'Diyaakoni Yar',
    'spiritual.reader': 'Akhriyaha',
    'spiritual.zemari': 'Gaarka',
    'spiritual.none': 'Waxba',

    // Event Types
    'event.kidase': 'Kidase',
    'event.timkat': 'Timkat',
    'event.meskel': 'Meskel',
    'event.enkutatash': 'Sanadka Cusub',
    'event.fasika': 'Fasika',
    'event.gena': 'Gena',
    'event.tsome_filseta': 'Soomida Filseta',
    'event.tsome_nebiyat': 'Soomida Nebiiyada',
    'event.weekly_meeting': 'Isku Fadhiga Usbuuca',
    'event.prayer_session': 'Waqtiga Ducada',
    'event.bible_study': 'Bariga Kitaabka Quduuska',
    'event.community_service': 'Adeegga Bulshada',
    'event.special_event': 'Dhacdooyinka Gaar ah',

    // Common Actions
    'action.add': 'Ku dar',
    'action.edit': 'Wax ka beddel',
    'action.delete': 'Tirtir',
    'action.save': 'Kaydi',
    'action.cancel': 'Jooji',
    'action.submit': 'Gudbiso',
    'action.filter': 'Sifiso',
    'action.search': 'Raadi',
    'action.view': 'Eeg',
    'action.close': 'Xir',

    // Common Labels
    'label.name': 'Magaca',
    'label.email': 'Imeelka',
    'label.phone': 'Taleefanka',
    'label.department': 'Waaxda',
    'label.role': 'Doorka',
    'label.date': 'Maalinta',
    'label.status': 'Xaalada',
    'label.description': 'Sharaxaad',
    'label.amount': 'Qadarka',
    'label.total': 'Guud ahaan',
    'label.active': 'Firfircoon',
    'label.inactive': 'Aan firfircoon',

    // Messages
    'msg.success': 'Guul',
    'msg.error': 'Khalad ayaa dhacay',
    'msg.loading': 'Wax la soo raadayo...',
    'msg.no_data': 'Macluumaad ma jiraan',
    'msg.confirm_delete': 'Tirtir miyaa rabta?',
  },
};

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang]?.[key] || key;
}

export function getLanguageName(lang: Language): string {
  const names: Record<Language, string> = {
    am: 'አማርኛ',
    en: 'English',
    om: 'Afaan Oromo',
    ti: 'ትግርኛ',
    so: 'Somali',
  };
  return names[lang];
}
