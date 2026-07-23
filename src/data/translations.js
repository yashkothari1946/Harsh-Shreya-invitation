import { image } from 'framer-motion/client';
import { Heart } from 'lucide-react';
import { Flower2 } from "lucide-react";
import { Ampersand } from 'lucide-react';

//Pawan Kothari & sangeeta kothari rajmal vaya & hemlata vaya  

export const translations = {
  en: {
    nav: {
      home: "Home",
      story: "Our Story",
      invitation: "Invitation",
      events: "Events",
      countdown: "Countdown",
      gallery: "Gallery",
      venue: "Venue",
      rsvp: "RSVP"
    },
    
    // Preloader
    preloader: {
      welcome: "Welcome to the Wedding Invitation of",
      enter: "Enter Invitation",
      audioNotice: "Turn on sound for a romantic experience"
    },

    // Hero
    hero: {
      familyIntro: "Together with their families,",
      groominviteRequest: "The Kothari family cordially invites you to this auspicious occasion.",
      brideinviteRequest: "The Vaya family cordially invites you to this auspicious occasion",
      bride: "Shreya",
      groom: "Harsh",
      date: "December 11, 2026",
      openBtn: "Open Invitation"
    },

    // Our Story
    story: {
      title: "Our Journey Together",
      subtitle: "How it all began",
     timeline: [
  {
    date: "The Beginning",
    title: "A Divine Beginning",
    desc: "Destiny brought two souls together, marking the beginning of a beautiful journey filled with love, blessings, and cherished moments.",
    image: "/Beginningg.jpg",
  },
  {
    date: "Family Blessings",
    title: "Two Families, One Bond",
    desc: "With the love and blessings of both families, two hearts and two families united in a bond of happiness and togetherness.",
    image: "/family.jpg",
  },
  {
    date: "Engagement",
    title: "The Ring Ceremony",
    desc: "A promise of forever was sealed with rings, celebrating the beginning of a lifetime filled with love, trust, and companionship.",
    image: "/ring.jpg",
  },
  {
  date: "Wedding",
  title: "Sacred Wedding Rituals",
  desc: "With the blessings of our families and loved ones, we look forward to beginning our lifelong journey together through sacred wedding rituals, love, and eternal promises.",
  image: "/wedding.jpg",
}
]
    },

    // Invitation
    invitation: {
      title: "Wedding Invitation",
      subtitle: "Shubh Vivah",
      text: "With hearts full of love, we invite you to celebrate the marriage of",
      brideLabel: "The Bride",
      groomLabel: "The Groom",
      and:  <Ampersand />,
      brideParents: "Daughter of Smt. Hemlata & Shri Rajmal Vaya",
      groomParents: "Son of Smt. Sangeeta & Shri Pawan Kothari",
      eventTime: "Time: 07:00 PM onwards",
      eventDate: "Date: December 11, 2026",
      eventVenue: "Venue: The City Palace, Udaipur",
      dressCodeVal: "We sincerely request you and your family to kindly join us in celebrating the wedding of our beloved Uncle and Aunt. Your gracious presence and heartfelt blessings will make this special occasion even more memorable.",
      inviteNote: "We look forward to sharing our joy with you on our special day."
    },

    // Events
    events: {
      title: "Wedding Events",
      subtitle: "Join us in our celebrations",
      list: [
        {
         name: "Ganpati Sthapana",
         date: "6 December 2026",
         logo: "/ganesh.jpg",
         mantra: "|| वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ||",
         time: "10:00 AM",
         venue: "City Palace, Udaipur",
         image: "/ganpati.png",
         desc: "With the divine blessings of Lord Ganesha, we begin our wedding celebrations by seeking wisdom, prosperity, and the removal of all obstacles."
},
        {
          name: "Haldi Ceremony",
          date: "November 26, 2026",
          logo: "haldii.jpg",
          mantra: "|| पवित्रं मङ्गलं कर्म ||",
          time: "10:00 AM",
          venue: "Palace Gardens",
           image: "/haldi.jpg",
          desc: "A bright, joyful ceremony filled with turmeric, laughter, and blessings to kickstart our wedding festivities."
        },
        {
          name: "Mehendi & Sangeet",
          date: "November 27, 2026",
          logo: "/mehandii.jpg",
          mantra: "|| सुहागं रक्तं वर्णम ||",
          time: "04:00 PM",
          venue: "Royal Courtyard",
          image: "/mehandi.jpg",
          desc: "Henna designs painted with love, followed by an evening of music, dance, and celebration under the stars."
        },
        {
          name: "The Wedding",
          date: "December 11, 2026",
          logo: "wwedding.jpg",
          mantra: "|| सप्तपदीं मिलनम् ||",
          time: "07:00 PM Onwards",
          venue: "Grand Mandap",
           image: "/weddingg.jpg",
          desc: "The holy union of two souls. Witness the sacred pheras and marriage rituals as we bind our lives together."
        },
        {
          name: "Reception Dinner",
          mantra: "|| अभिनन्दनं महोत्सवः ||",
          logo: "/couplee.jpg",
          date: "November 29, 2026",
          time: "08:00 PM",
          venue: "Palace Banquets",
          image: "/couplee.jpg",
          desc: "An elegant dinner ceremony to celebrate our new journey as husband and wife with family and well-wishers."
        }
      ]
    },

    // Countdown
    countdown: {
      title: "The Big Day Approaches",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds"
    },

    // Gallery
    gallery: {
      title: "Captured Moments",
      subtitle: "Memories to last a lifetime"
    },

    // Venue
    venue: {
      title: "Wedding Venue",
      subtitle: "How to reach the location",
      name: "Amrutham Bagh Resort",
      address: "Pherniyon ka guda, Badi Ahead of Miraj pipe factory, Udaipur, Pherniyon Ka Gurha, Rajasthan 313011",
      directions: "Get Directions"
    },

    // RSVP
    rsvp: {
      title: "RSVP",
      subtitle: "Kindly respond by November 15, 2026",
      nameLabel: "Your Full Name",
      phoneLabel: "Phone Number",
      guestsLabel: "Number of Guests",
      messageLabel: "Send your blessings & message",
      submitBtn: "Confirm Attendance",
      submittingBtn: "Sending RSVP...",
      successMsg: "Thank you for confirming your presence! We are thrilled to celebrate with you.",
      errorMsg: "Something went wrong. Please try again or contact the hosts.",
      validation: {
        name: "Please enter your name",
        phone: "Please enter a valid phone number",
        guests: "Please enter at least 1 guest"
      }
    },

    // Footer
    footer: {
      thankYou: "We eagerly await the honor of your presence. Kindly join us and bless this joyous occasion with your love and blessings.",
      madeWith: "Made with love for Harsh & Shreya.",
      copyright: "© 2026 Harsh & Shreya. All Rights Reserved."
    }
  },
  hi: {
    // Navigation
    nav: {
      home: "मुख्य पृष्ठ",
      story: "हमारी कहानी",
      invitation: "निमंत्रण पत्र",
      events: "कार्यक्रम",
      countdown: "शुभ मुहूर्त",
      gallery: "तस्वीरें",
      venue: "स्थान",
      rsvp: "स्वीकृति (RSVP)"
    },
    
    // Preloader
    preloader: {
      welcome: "शुभ विवाह निमंत्रण पत्र",
      enter: "आमंत्रण स्वीकारें",
      audioNotice: "एक शानदार और रोमानी अनुभव के लिए ध्वनि चालू करें"
    },

    // Hero
    hero: {
      familyIntro: "अपने परिवारों के साथ,",
      groominviteRequest: "कोठारी परिवार आपको इस शुभ अवसर पर सादर आमंत्रित करते हैं",
      brideinviteRequest: "वाया परिवार आपको इस शुभ अवसर पर सादर आमंत्रित करते हैं",
      bride: "श्रेया",
      groom: "हर्ष",
      date: "11 दिसंबर 2026",
      openBtn: "निमंत्रण पत्र खोलें"
    },

    // Our Story
    story: {
      title: "प्रेम से विवाह तक की यात्रा",
      subtitle: "कैसे हुई शुरुआत",
      timeline: [
        {
         date: "शुभारंभ",
         title: "एक दिव्य शुरुआत",
         desc: "भाग्य और ईश्वर के आशीर्वाद से दो आत्माएँ एक पवित्र बंधन में बंधने जा रही हैं। प्रेम, विश्वास और खुशियों से सजी एक नई जीवन-यात्रा का शुभारंभ होने वाला है।",
         image: "/beginningg.jpg",
},
       {
        date: "परिवार का आशीर्वाद",
        title: "दो परिवार, एक अटूट बंधन",
        desc: "दोनों परिवारों के प्रेम, स्नेह और आशीर्वाद के साथ दो परिवार एक पवित्र रिश्ते में बंधने जा रहे हैं, जो प्रेम, विश्वास और खुशियों से भरे नए जीवन की शुरुआत का प्रतीक है।",
       image: "/family.jpg",
},
      {
       date: "सगाई",
       title: "अंगूठी समारोह",
       desc: "अंगूठियों के पावन आदान-प्रदान के साथ हमने जीवनभर एक-दूसरे का साथ निभाने का संकल्प लिया। यह प्रेम, विश्वास और साथ की एक सुंदर यात्रा का शुभारंभ है।",
       image: "/ring.jpg",
},
        {
        date: "विवाह",
       title: "पवित्र वैवाहिक संस्कार",
       desc: "परिवारजनों एवं प्रियजनों के आशीर्वाद के साथ हम पवित्र वैवाहिक संस्कारों, सात फेरों और जीवनभर साथ निभाने के वचनों के माध्यम से अपने नए जीवन की शुभ शुरुआत करेंगे।",
      image: "/wedding.jpg",
}
      ]
    },

    // Invitation
    invitation: {
      title: "विवाह आमंत्रण",   
      subtitle: "शुभ विवाह",
      text: "स्नेह और उमंग से भरे हृदयों के साथ, हम आपको सहर्ष आमंत्रित करते हैं",
      and: "संग",
      brideLabel: "दुल्हन",
      groomLabel: "दूल्हा",
      brideParents: "सुपुत्री श्रीमती सुनीता एवं श्री राजीव शर्मा",
      groomParents: "सुपुत्र श्रीमती मधु एवं श्री देवेन्द्र वर्मा",
      eventTime: "समय: सायं ०७:०० बजे से",
      eventDate: "दिनांक: 11 दिसंबर 2026",
      eventVenue: "स्थान: सिटी पैलेस,उदयपुर",
      dressCodeVal: "हमारे प्रिय चाचा चाची के शुभ विवाह समारोह में आप सपरिवार ज़रूर-ज़रूर पधारें एवं चाचा चाची को अपना स्नेह और आशीर्वाद प्रदान करें।",
      inviteNote: "हमारे इस खास दिन पर आपकी उपस्थिति हमारे आनंद को और बढ़ा देगी।"
    },

    // Events
    events: {
      title: "विवाह कार्यक्रम",
      subtitle: "हमारे उत्सवों में शामिल हों",
      list: [
        {
          name: "गणपति स्थापना",
          logo: "/ganesh.jpg",
         mantra: "|| वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ||",
         date: " 6 दिसम्बर २०२६",
         time: "प्रातः १०:०० बजे", 
         venue: "सिटी पैलेस, उदयपुर",
          image: "/ganpati.png",
         desc: "भगवान श्री गणेश जी के मंगलमय आशीर्वाद के साथ हम अपने शुभ विवाह समारोह का पावन शुभारंभ करते हैं तथा सभी विघ्नों के निवारण एवं सुख-समृद्धि की कामना करते हैं।"
},
        {
          name: "हल्दी",
          date: "२६ नवंबर २०२६",
          logo: "haldii.jpg",
          mantra: "|| पवित्रं मङ्गलं कर्म ||",
          time: "प्रातः १०:०० बजे",
          venue: "पैलेस गार्डन्स",
           image: "/haldi.jpg",
          desc: "हल्दी के सुनहरे रंग, अपनों की हंसी और ढेर सारे आशीर्वाद के साथ हमारे शादी की रस्मों की शुभ शुरुआत।"
        },
        {
          name: "मेहंदी एवं संगीत",
          date: "२७ नवंबर २०२६",
           logo: "/mehandii.jpg",
          mantra: "|| सुहागं रक्तं वर्णम ||",
          time: "अपराह्न ०४:०० बजे से",
          venue: "रॉयल कोर्टयार्ड",
          image: "/mehandi.jpg",
          desc: "प्यार से सजी मेहंदी की सुंदर डिज़ाइनें, और उसके बाद खुले आसमान के नीचे संगीत, लोकनृत्य और उत्सव की एक सुरमयी शाम।"
        },
        {
          name: "शुभ विवाह",
          date: "11 दिसंबर 2026",
          logo: "wwedding.jpg",
          mantra: "|| सप्तपदीं मिलनम् ||",
          time: "सायं ०७:०० बजे से",
          venue: "भव्य मंडप",
            image: "/weddingg.jpg",
          desc: "दो पवित्र आत्माओं का पावन मिलन। अग्नि को साक्षी मानकर लिए जाने वाले सात फेरों और विवाह के पवित्र संकल्पों के साक्षी बनें।"
        },
        {
          name: "आशीर्वाद समारोह (रिसेप्शन)",
          date: "२९ नवंबर २०२६",
           mantra: "|| अभिनन्दनं महोत्सवः ||",
          logo: "/couplee.jpg",
          time: "रात्रि ०८:०० बजे",
          venue: "पैलेस बैंक्वेट्स",
          image: "/reception.jpg",
          desc: "नवविवाहित जोड़े के रूप में हमारी नई यात्रा की शुरुआत पर परिवार और स्नेहियों के साथ रात्रिभोज और मंगलकामनाओं का उत्सव।"
        }
      ]
    },

    // Countdown
    countdown: {
      title: "शुभ विवाह की प्रतीक्षा",
      days: "दिन",
      hours: "घंटे",
      minutes: "मिनट",
      seconds: "सेकंड"
    },

    // Gallery
    gallery: {
      title: "मधुर यादें",
      subtitle: "उम्र भर संजोने योग्य पल"
    },

    // Venue
    venue: {
      title: "उत्सव स्थल",
      subtitle: "विवाह स्थल की जानकारी",
      name: "अमृतम बाग रिसॉर्ट",
      address: "फेरनियों का गुढ़ा, बड़ी, मिराज पाइप फैक्ट्री के आगे, उदयपुर, राजस्थान – 313011",
      directions: "मार्गदर्शन प्राप्त करें"
    },

    // Footer
    footer: {
      thankYou: "हम आपके आगमन की हर्षपूर्वक प्रतीक्षा कर रहे हैं। कृपया पधारकर इस शुभ अवसर को अपनी उपस्थिति एवं आशीर्वाद से गौरवान्वित करें।",
      madeWith: "हर्ष और श्रेया के लिए प्रेम पूर्वक निर्मित।",
      copyright: "© २०२६ हर्ष और श्रेया सर्वाधिकार सुरक्षित।"
    }
  }
};
