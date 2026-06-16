// Multi-language support for Ethiopian languages
export type Language = 'am' | 'en' | 'om' | 'ti';

export const LANGUAGES = {
  am: { name: 'አማርኛ', label: 'Amharic', flag: '🇪🇹' },
  en: { name: 'English', label: 'English', flag: '🇬🇧' },
  om: { name: 'Afaan Oromo', label: 'Oromo', flag: '🇪🇹' },
  ti: { name: 'ትግርኛ', label: 'Tigrinya', flag: '🇪🇷' },
} as const;

export const translations = {
  am: {
    // Navigation
    dashboard: 'ዳሽቦርድ',
    members: 'አባላት',
    attendance: 'ስብሰባ ተገኝነት',
    finance: 'ፋይናንስ',
    tasks: 'ተግባራት',
    announcements: 'ማስታወቂያዎች',
    prayer: 'ጸሎት',
    events: 'ዝግጅቶች',
    kidase: 'ቅዳሴ',
    fasting: 'ጾመ',
    mahiber: 'ማህበር',

    // Departments
    education: 'ትምህርት',
    choir: 'ዘማሪ',
    finance_dept: 'ፋይናንስ',
    publicRelations: 'ህዝብ ግንኙነት',
    research: 'ምርምር',
    charity: 'ምጽዋት',
    sundaySchool: 'የሰንበት ትምህርት ቤት',
    mahiber_dept: 'ማህበር',

    // Common
    add: 'ጨምር',
    edit: 'ያርትዑ',
    delete: 'ሰርዝ',
    save: 'ያስቀምጡ',
    cancel: 'ይቅር',
    search: 'ፈልግ',
    filter: 'ማጣሪያ',
    loading: 'በመጫን ላይ...',
    error: 'ስህተት',
    success: 'ስኬት',
    noData: 'ምንም ውሂብ የለም',

    // Members
    addMember: 'አባል ጨምር',
    memberName: 'የአባል ስም',
    email: 'ኢሜይል',
    phone: 'ስልክ',
    universityId: 'የዩኒቨርሲቲ መታወቂያ',
    department: 'ክፍል',
    batch: 'ስብስብ',
    role: 'ሚና',
    active: 'ንቁ',
    inactive: 'ንቁ ያልሆነ',

    // Roles
    admin: 'አስተዳዳሪ',
    departmentHead: 'የክፍል ሃላፊ',
    secretary: 'ፀሐፊ',
    treasurer: 'ገንዘብ ያዥ',
    member: 'አባል',

    // Attendance
    checkIn: 'ገብ',
    present: 'ተገኝቷል',
    absent: 'ተገኝቷል ያልሆነ',
    eventName: 'የዝግጅት ስም',
    eventDate: 'የዝግጅት ቀን',

    // Finance
    payment: 'ክፍያ',
    expense: 'ወጪ',
    amount: 'መጠን',
    month: 'ወር',
    paid: 'ተከፍሏል',
    unpaid: 'ተከፍሏል ያልሆነ',
    addPayment: 'ክፍያ ጨምር',
    addExpense: 'ወጪ ጨምር',

    // Tasks
    taskTitle: 'የተግባር ርዕስ',
    description: 'መግለጫ',
    dueDate: 'የመጨረሻ ቀን',
    completed: 'ተጠናቅቋል',
    pending: 'በመጠባበቅ ላይ',
    assignTo: 'ለ... ይሰጡ',

    // Announcements
    postAnnouncement: 'ማስታወቂያ ለጋዜጣ',
    announcementTitle: 'ማስታወቂያ ርዕስ',
    announcementBody: 'ማስታወቂያ ሰውነት',
    pinned: 'ተጣብቋል',
    expiresAt: 'ሚያልቅበት',

    // Prayer
    prayerRequest: 'ጸሎት ጠይቅ',
    prayerTitle: 'ጸሎት ርዕስ',
    prayerDescription: 'ጸሎት መግለጫ',
    anonymous: 'ስም ያልታወቀ',
    resolved: 'ተፈትሷል',
    openRequests: 'ክፍት ጸሎቶች',
    answeredPrayers: 'የተመለሱ ጸሎቶች',

    // Events
    eventType: 'የዝግጅት ዓይነት',
    location: 'ቦታ',
    recurring: 'ተደጋጋሚ',
    createEvent: 'ዝግጅት ፍጠር',

    // Kidase
    kidaseSchedule: 'ቅዳሴ ሰዓት ሰሌዳ',
    deacon: 'ዲያቆን',
    subdeacon: 'ንፍቀ ዲያቆን',
    reader: 'ንባቢ',
    zemari: 'ዘማሪ',

    // Fasting
    fastingCalendar: 'ጾመ ካሌንደር',
    fastingPeriod: 'ጾመ ጊዜ',
    spiritualGuidance: 'መንፈሳዊ መምሪያ',

    // Mahiber
    mahiberGroup: 'ማህበር ቡድን',
    mahiberType: 'ማህበር ዓይነት',
    meetingDay: 'ስብሰባ ቀን',
    meetingTime: 'ስብሰባ ሰዓት',
    leader: 'መሪ',
    mahiberMembers: 'አባላት',

    // Messages
    memberAdded: 'አባል ተጨምሯል',
    memberUpdated: 'አባል ተዘምኗል',
    memberDeleted: 'አባል ተሰርዟል',
    paymentRecorded: 'ክፍያ ተመዝግቧል',
    taskCreated: 'ተግባር ተፈጠረ',
    announcementPosted: 'ማስታወቂያ ተለጠፈ',
    prayerSubmitted: 'ጸሎት ቀርቧል',
    eventCreated: 'ዝግጅት ተፈጠረ',
  },

  en: {
    // Navigation
    dashboard: 'Dashboard',
    members: 'Members',
    attendance: 'Attendance',
    finance: 'Finance',
    tasks: 'Tasks',
    announcements: 'Announcements',
    prayer: 'Prayer Board',
    events: 'Events',
    kidase: 'Kidase',
    fasting: 'Fasting',
    mahiber: 'Mahiber',

    // Departments
    education: 'Education',
    choir: 'Choir',
    finance_dept: 'Finance',
    publicRelations: 'Public Relations',
    research: 'Research',
    charity: 'Charity',
    sundaySchool: 'Sunday School',
    mahiber_dept: 'Mahiber',

    // Common
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    noData: 'No data available',

    // Members
    addMember: 'Add Member',
    memberName: 'Member Name',
    email: 'Email',
    phone: 'Phone',
    universityId: 'University ID',
    department: 'Department',
    batch: 'Batch',
    role: 'Role',
    active: 'Active',
    inactive: 'Inactive',

    // Roles
    admin: 'Admin',
    departmentHead: 'Department Head',
    secretary: 'Secretary',
    treasurer: 'Treasurer',
    member: 'Member',

    // Attendance
    checkIn: 'Check In',
    present: 'Present',
    absent: 'Absent',
    eventName: 'Event Name',
    eventDate: 'Event Date',

    // Finance
    payment: 'Payment',
    expense: 'Expense',
    amount: 'Amount',
    month: 'Month',
    paid: 'Paid',
    unpaid: 'Unpaid',
    addPayment: 'Add Payment',
    addExpense: 'Add Expense',

    // Tasks
    taskTitle: 'Task Title',
    description: 'Description',
    dueDate: 'Due Date',
    completed: 'Completed',
    pending: 'Pending',
    assignTo: 'Assign To',

    // Announcements
    postAnnouncement: 'Post Announcement',
    announcementTitle: 'Announcement Title',
    announcementBody: 'Announcement Body',
    pinned: 'Pinned',
    expiresAt: 'Expires At',

    // Prayer
    prayerRequest: 'Prayer Request',
    prayerTitle: 'Prayer Title',
    prayerDescription: 'Prayer Description',
    anonymous: 'Anonymous',
    resolved: 'Resolved',
    openRequests: 'Open Requests',
    answeredPrayers: 'Answered Prayers',

    // Events
    eventType: 'Event Type',
    location: 'Location',
    recurring: 'Recurring',
    createEvent: 'Create Event',

    // Kidase
    kidaseSchedule: 'Kidase Schedule',
    deacon: 'Deacon',
    subdeacon: 'Sub-deacon',
    reader: 'Reader',
    zemari: 'Cantor',

    // Fasting
    fastingCalendar: 'Fasting Calendar',
    fastingPeriod: 'Fasting Period',
    spiritualGuidance: 'Spiritual Guidance',

    // Mahiber
    mahiberGroup: 'Mahiber Group',
    mahiberType: 'Mahiber Type',
    meetingDay: 'Meeting Day',
    meetingTime: 'Meeting Time',
    leader: 'Leader',
    mahiberMembers: 'Members',

    // Messages
    memberAdded: 'Member added successfully',
    memberUpdated: 'Member updated successfully',
    memberDeleted: 'Member deleted successfully',
    paymentRecorded: 'Payment recorded successfully',
    taskCreated: 'Task created successfully',
    announcementPosted: 'Announcement posted successfully',
    prayerSubmitted: 'Prayer submitted successfully',
    eventCreated: 'Event created successfully',
  },

  om: {
    // Navigation
    dashboard: 'Daashboorii',
    members: 'Miseensa',
    attendance: 'Hirmaannaa',
    finance: 'Raajii',
    tasks: 'Hojii',
    announcements: 'Labsii',
    prayer: 'Kadhannaa',
    events: 'Taatee',
    kidase: 'Kidase',
    fasting: 'Soomuu',
    mahiber: 'Mahiber',

    // Departments
    education: 'Barnoota',
    choir: 'Faaruu',
    finance_dept: 'Raajii',
    publicRelations: 'Walqabsiisa Hawaasa',
    research: 'Qorannaa',
    charity: 'Midhaa',
    sundaySchool: 'Barnoota Galgala',
    mahiber_dept: 'Mahiber',

    // Common
    add: 'Dabaluu',
    edit: 'Gulaaluu',
    delete: 'Balleessuu',
    save: 'Kuusuu',
    cancel: 'Hir\'isuu',
    search: 'Barbaadu',
    filter: 'Filtruu',
    loading: 'Fe\'uu...',
    error: 'Dogoggora',
    success: 'Milkaa\'ina',
    noData: 'Deetaa hin jiru',

    // Members
    addMember: 'Miseensa Dabaluu',
    memberName: 'Maqaa Miseensa',
    email: 'Imeelii',
    phone: 'Bilbila',
    universityId: 'Lakkoofsaa Yunivarsiitii',
    department: 'Kutaa',
    batch: 'Garee',
    role: 'Gahee',
    active: 'Aktibii',
    inactive: 'Aktibii Hin Taane',

    // Roles
    admin: 'Bulchiinsa',
    departmentHead: 'Mataa Kutaa',
    secretary: 'Barreessaa',
    treasurer: 'Raajii Qabaa',
    member: 'Miseensa',

    // Attendance
    checkIn: 'Seenuuf Galu',
    present: 'Jira',
    absent: 'Hin Jiru',
    eventName: 'Maqaa Taatee',
    eventDate: 'Guyyaa Taatee',

    // Finance
    payment: 'Kaffaltii',
    expense: 'Baasii',
    amount: 'Hamma',
    month: 'Jiida',
    paid: 'Kaffalame',
    unpaid: 'Kaffalame Hin Taane',
    addPayment: 'Kaffaltii Dabaluu',
    addExpense: 'Baasii Dabaluu',

    // Tasks
    taskTitle: 'Maqaa Hojii',
    description: 'Ibsa',
    dueDate: 'Guyyaa Xumura',
    completed: 'Xumure',
    pending: 'Eegaa Jira',
    assignTo: 'Kennuu',

    // Announcements
    postAnnouncement: 'Labsii Barreessuu',
    announcementTitle: 'Maqaa Labsii',
    announcementBody: 'Jiidha Labsii',
    pinned: 'Cufame',
    expiresAt: 'Xumura',

    // Prayer
    prayerRequest: 'Kadhannaa Kadhachuu',
    prayerTitle: 'Maqaa Kadhannaa',
    prayerDescription: 'Ibsa Kadhannaa',
    anonymous: 'Maqaa Hin Beekamne',
    resolved: 'Furmaate',
    openRequests: 'Kadhannaa Banaa',
    answeredPrayers: 'Kadhannaa Deebii Argame',

    // Events
    eventType: 'Gosa Taatee',
    location: 'Bakka',
    recurring: 'Irra Deddeebi\'u',
    createEvent: 'Taatee Uumuu',

    // Kidase
    kidaseSchedule: 'Sagantaa Kidase',
    deacon: 'Deekona',
    subdeacon: 'Deekona Xiqqaa',
    reader: 'Dubbisaa',
    zemari: 'Faaruu',

    // Fasting
    fastingCalendar: 'Kaaleendaa Soomuu',
    fastingPeriod: 'Yeroo Soomuu',
    spiritualGuidance: 'Gargaarsa Muummee',

    // Mahiber
    mahiberGroup: 'Garee Mahiber',
    mahiberType: 'Gosa Mahiber',
    meetingDay: 'Guyyaa Walitti Dhufnaa',
    meetingTime: 'Yeroo Walitti Dhufnaa',
    leader: 'Hogganaa',
    mahiberMembers: 'Miseensa',

    // Messages
    memberAdded: 'Miseensa milkaa\'inaan dabalame',
    memberUpdated: 'Miseensa milkaa\'inaan fooyye',
    memberDeleted: 'Miseensa milkaa\'inaan balleessame',
    paymentRecorded: 'Kaffaltii milkaa\'inaan galche',
    taskCreated: 'Hojii milkaa\'inaan uume',
    announcementPosted: 'Labsii milkaa\'inaan barreesse',
    prayerSubmitted: 'Kadhannaa milkaa\'inaan erge',
    eventCreated: 'Taatee milkaa\'inaan uume',
  },

  ti: {
    // Navigation
    dashboard: 'ዳሽቦርድ',
    members: 'ሓውሓውታት',
    attendance: 'ምርኩዝ',
    finance: 'ገንዘብ',
    tasks: 'ስራሓት',
    announcements: 'ሓበሬታ',
    prayer: 'ምዕራይ',
    events: 'ክንውናት',
    kidase: 'ቅዳሴ',
    fasting: 'ጾም',
    mahiber: 'ማህበር',

    // Departments
    education: 'ትምህርቲ',
    choir: 'ዘማሪ',
    finance_dept: 'ገንዘብ',
    publicRelations: 'ህዝባዊ ምስጋር',
    research: 'ምርምር',
    charity: 'ሓበሬታ',
    sundaySchool: 'ሰንበት ትምህርቲ',
    mahiber_dept: 'ማህበር',

    // Common
    add: 'ወስኽ',
    edit: 'ስተውስ',
    delete: 'ሰርዝ',
    save: 'ዓቅም',
    cancel: 'ይቅር',
    search: 'ድለ',
    filter: 'ምልክት',
    loading: 'ክሳብ ሕጂ...',
    error: 'ስህተት',
    success: 'ስኬት',
    noData: 'ሓበሬታ የለን',

    // Members
    addMember: 'ሓውሓው ወስኽ',
    memberName: 'ስም ሓውሓው',
    email: 'ኢሜይል',
    phone: 'ስልክ',
    universityId: 'ቁጽሪ ዩኒቨርሲቲ',
    department: 'ክፍሊ',
    batch: 'ቡድን',
    role: 'ሚናት',
    active: 'ንቁ',
    inactive: 'ንቁ ዘይኮነ',

    // Roles
    admin: 'ሓላፊ',
    departmentHead: 'ሓላፊ ክፍሊ',
    secretary: 'ጸሓፊ',
    treasurer: 'ገንዘብ ዋዛ',
    member: 'ሓውሓው',

    // Attendance
    checkIn: 'ምርኩዝ',
    present: 'ተገኒዩ',
    absent: 'ተገኒዩ ዘይኮነ',
    eventName: 'ስም ክንውናት',
    eventDate: 'ዕለት ክንውናት',

    // Finance
    payment: 'ክፍያ',
    expense: 'ወጪ',
    amount: 'ብዛዕባ',
    month: 'ወርሒ',
    paid: 'ተከፊለ',
    unpaid: 'ተከፊለ ዘይኮነ',
    addPayment: 'ክፍያ ወስኽ',
    addExpense: 'ወጪ ወስኽ',

    // Tasks
    taskTitle: 'ርእስ ስራሕ',
    description: 'ገለጻ',
    dueDate: 'ዕለት ምዝጋብ',
    completed: 'ተወሲኹ',
    pending: 'ክሳብ ሕጂ',
    assignTo: 'ምሕላው',

    // Announcements
    postAnnouncement: 'ሓበሬታ ወስኽ',
    announcementTitle: 'ርእስ ሓበሬታ',
    announcementBody: 'ሰውነት ሓበሬታ',
    pinned: 'ተሰሪዑ',
    expiresAt: 'ምዝጋብ',

    // Prayer
    prayerRequest: 'ምዕራይ ምሕታት',
    prayerTitle: 'ርእስ ምዕራይ',
    prayerDescription: 'ገለጻ ምዕራይ',
    anonymous: 'ስም ዘይተዋህበ',
    resolved: 'ተፈሪዩ',
    openRequests: 'ክፍት ምዕራይ',
    answeredPrayers: 'ምዕራይ ተመሊሱ',

    // Events
    eventType: 'ዓይነት ክንውናት',
    location: 'ቦታ',
    recurring: 'ተደጋጋሚ',
    createEvent: 'ክንውናት ፍጠር',

    // Kidase
    kidaseSchedule: 'ሰዓት ቅዳሴ',
    deacon: 'ዲያቆን',
    subdeacon: 'ንፍቀ ዲያቆን',
    reader: 'ንባቢ',
    zemari: 'ዘማሪ',

    // Fasting
    fastingCalendar: 'ካሌንደር ጾም',
    fastingPeriod: 'ወቕተ ጾም',
    spiritualGuidance: 'መንፈሳዊ መምሪያ',

    // Mahiber
    mahiberGroup: 'ቡድን ማህበር',
    mahiberType: 'ዓይነት ማህበር',
    meetingDay: 'ዕለት ምስተውዓል',
    meetingTime: 'ሰዓት ምስተውዓል',
    leader: 'መሪ',
    mahiberMembers: 'ሓውሓውታት',

    // Messages
    memberAdded: 'ሓውሓው ብስኬት ተወሲኹ',
    memberUpdated: 'ሓውሓው ብስኬት ተሓሓዘ',
    memberDeleted: 'ሓውሓው ብስኬት ተሰሪዑ',
    paymentRecorded: 'ክፍያ ብስኬት ተመዝገበ',
    taskCreated: 'ስራሕ ብስኬት ተፈጠረ',
    announcementPosted: 'ሓበሬታ ብስኬት ተወሲኹ',
    prayerSubmitted: 'ምዕራይ ብስኬት ተላኢኹ',
    eventCreated: 'ክንውናት ብስኬት ተፈጠረ',
  },
} as const;

export function getTranslation(lang: Language, key: keyof typeof translations.am): string {
  return translations[lang][key] || translations.en[key] || key;
}
