"use client";

import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   ICONS (unchanged)
   ───────────────────────────────────────────── */
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const ICONS = {
  tooth:
    "M12 5.5c-1.8-1.6-4-2-5.5-1C4.5 5.8 4 9 5 12c.8 2.4 1 4 1.3 6 .2 1.4.6 2.5 1.7 2.5 1.3 0 1.5-1.6 1.8-3.2.2-1.3.5-2.3 2.2-2.3s2 1 2.2 2.3c.3 1.6.5 3.2 1.8 3.2 1.1 0 1.5-1.1 1.7-2.5.3-2 .5-3.6 1.3-6 1-3 .5-6.2-1.5-7.5-1.5-1-3.7-.6-5.5 1z",
  sparkle: "M12 3l1.7 4.6L18.3 9l-4.6 1.7L12 15l-1.7-4.3L5.7 9l4.6-1.4L12 3z",
  crown: "M3 8l4.2 3L12 5l4.8 6L21 8l-2 11H5L3 8z",
  braces: "M4 7v10M20 7v10M4 12h16M9 9v6M15 9v6",
  clock: "M12 7v5l3.2 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  pin: "M12 21.5s7-5.6 7-11.2A7 7 0 005 10.3c0 5.6 7 11.2 7 11.2z M12 10.5a2 2 0 100-4 2 2 0 000 4z",
  phone:
    "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z",
  calendar:
    "M8 2.5v3M16 2.5v3M3.5 9.5h17M5.5 4.5h13a2 2 0 012 2v12a2 2 0 01-2 2h-13a2 2 0 01-2-2v-12a2 2 0 012-2z",
  check: "M20 6.5L9.2 17.3 4 12.1",
  award: "M12 15a6 6 0 100-12 6 6 0 000 12zM8.2 13.9L7 22l5-3 5 3-1.2-8.1",
  shield: "M12 2.5l8 3.5v6c0 5-3.4 8.9-8 10-4.6-1.1-8-5-8-10V6l8-3.5z",
  chevron: "M6 9.5l6 6 6-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  star: "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5z",
  quote: "M7 7h4v4c0 3.3-1.8 5.5-5 6.5M13 7h4v4c0 3.3-1.8 5.5-5 6.5",
};

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────────────
   REUSABLE BACKGROUND PATTERNS
   ───────────────────────────────────────────── */

// Subtle medical cross pattern (CSS-only, no image needed)
const CrossPattern = ({ className = "", opacity = 0.04 }) => (
  <div
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 12h4v6h6v4h-6v6h-4v-6h-6v-4h6v-6z' fill='%230f766e' fill-opacity='1'/%3E%3C/svg%3E")`,
      backgroundSize: "40px 40px",
    }}
  />
);

// Subtle halftone dot pattern
const DotPattern = ({ className = "", opacity = 0.05 }) => (
  <div
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={{
      opacity,
      backgroundImage: "radial-gradient(circle, #0f766e 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

// Large faded tooth watermark
const ToothWatermark = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
    className={`pointer-events-none absolute text-teal-600/5 ${className}`}
    aria-hidden="true"
  >
    <path d={ICONS.tooth} />
  </svg>
);

/* ─────────────────────────────────────────────
   SCROLL REVEAL
   ───────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export default function DoctorPortfolio() {
  const [lang, setLang] = useState("bn");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    preferredDate: "",
    slot: "",
    chamberIndex: 0,
    problem: "",
  });

  const content = {
    bn: {
      drName: "ডাঃ মোহাঃ আরিফুর রহমান",
      degrees: "BDS (DU), PGT (Oral & Maxillofacial Surgery), FCPS (F-1)",
      specialty: "দন্ত বিশেষজ্ঞ ও ওরাল সার্জন",
      bmdc: "BMDC Reg: A-12345",
      available: "সিরিয়াল চালু আছে",
      nav: {
        services: "চিকিৎসা",
        chambers: "চেম্বার",
        about: "পরিচিতি",
        reviews: "মতামত",
        faq: "জিজ্ঞাসা",
        book: "বুকিং",
      },
      heroLead: "আপনার সুস্থ ও আত্মবিশ্বাসী হাসির",
      heroAccent: "বিশ্বস্ত ঠিকানা",
      heroSub:
        "আধুনিক রোটারি প্রযুক্তি ও সম্পূর্ণ জীবাণুমুক্ত পরিবেশে যন্ত্রণাহীন ডেন্টাল চিকিৎসা — প্রথম দিন থেকেই স্বচ্ছ পরামর্শ ও ন্যায্য মূল্য।",
      btnBook: "অ্যাপয়েন্টমেন্ট নিন",
      btnCall: "জরুরি কল",
      stats: [
        { value: "১২+", label: "বছরের অভিজ্ঞতা" },
        { value: "৮,০০০+", label: "সন্তুষ্ট রোগী" },
        { value: "৪.৯", label: "গড় রেটিং" },
      ],
      servicesTitle: "প্রধান চিকিৎসাসমূহ",
      servicesSub:
        "সর্বাধুনিক যন্ত্রপাতি ও আন্তর্জাতিক প্রোটোকল অনুসরণ করে প্রতিটি চিকিৎসা পরিচালিত হয়।",
      services: [
        {
          icon: "tooth",
          title: "রুট ক্যানেল ট্রিটমেন্ট",
          desc: "রোটারি মেশিনে ব্যথামুক্ত উপায়ে এক বা দুই সিটিংয়ে দাঁত সংরক্ষণ।",
        },
        {
          icon: "sparkle",
          title: "স্কেলিং ও পলিশিং",
          desc: "দাঁতের পাথর ও দাগ দূর করে মাড়ির সুস্থতা ফিরিয়ে আনা।",
        },
        {
          icon: "crown",
          title: "কসমেটিক ফিলিং ও ক্রাউন",
          desc: "দাঁতের স্বাভাবিক রঙ বজায় রেখে ফিলিং ও জিরকোনিয়া ক্যাপ।",
        },
        {
          icon: "braces",
          title: "ব্রেসেস ও এলাইনার",
          desc: "আঁকাবাঁকা দাঁত সোজা করার আধুনিক অর্থোডন্টিক সমাধান।",
        },
      ],
      aboutTitle: "ডাক্তার সম্পর্কে",
      aboutText:
        "ডাঃ মোহাঃ আরিফুর রহমান ঢাকা বিশ্ববিদ্যালয় থেকে BDS সম্পন্ন করে ওরাল ও ম্যাক্সিলোফেসিয়াল সার্জারিতে postgraduate প্রশিক্ষণ নিয়েছেন। তিনি বিশ্বাস করেন — সঠিক রোগ নির্ণয় ও রোগীকে যথাযথ ব্যাখ্যা দেওয়াই সফল চিকিৎসার অর্ধেক।",
      aboutPoints: [
        "BDS — ঢাকা বিশ্ববিদ্যালয়",
        "PGT — ওরাল ও ম্যাক্সিলোফেসিয়াল সার্জারি",
        "FCPS পার্ট-১ সম্পন্ন",
        "বাংলাদেশ ডেন্টাল সোসাইটির সদস্য",
        "১২ বছরের ক্লিনিক্যাল অভিজ্ঞতা",
      ],
      chambersTitle: "চেম্বার ও সময়সূচী",
      chambersSub:
        "অ্যাপয়েন্টমেন্ট ছাড়াও সরাসরি চেম্বারে এসে সিরিয়াল নিতে পারবেন।",
      getDirection: "লোকেশন দেখুন",
      chambers: [
        {
          name: "পপুলার ডায়াগনস্টিক সেন্টার, বাড্ডা",
          address: "প্রগতি স্বরনী, বাড্ডা, ঢাকা",
          time: "শনিবার – বুধবার · বিকাল ৫:০০ – রাত ৯:০০",
          phone: "+8801711000000",
        },
        {
          name: "সিটি ডেন্টাল ক্লিনিক, ধানমন্ডি",
          address: "রোড ৭, ধানমন্ডি, ঢাকা",
          time: "বৃহস্পতি ও শুক্রবার · বিকাল ৪:০০ – রাত ৮:০০",
          phone: "+8801811000000",
        },
      ],
      reviewsTitle: "রোগীদের মতামত",
      reviewsSub: "Google ও Facebook থেকে সংগৃহীত প্রকৃত রিভিউ।",
      reviews: [
        {
          name: "তানভীর হোসেন",
          area: "বাড্ডা, ঢাকা",
          text: "রুট ক্যানেল করতে গিয়েছিলাম, একটুও ব্যথা লাগেনি। ডাক্তার সবকিছু খুব সুন্দরভাবে বুঝিয়ে বলেছেন।",
        },
        {
          name: "নুসরাত জাহান",
          area: "ধানমন্ডি, ঢাকা",
          text: "ব্রেসেসের জন্য ১ বছর ধরে তাঁর কাছে আছি। ফলাফল আশানুরূপ হয়েছে, ক্লিনিকও খুব পরিষ্কার।",
        },
        {
          name: "মাহবুব আলম",
          area: "মিরপুর, ঢাকা",
          text: "সময়মতো সিরিয়াল পাওয়া যায়, বাড়তি টাকা চাওয়া হয় না। অত্যন্ত আন্তরিক ব্যবহার।",
        },
      ],
      faqTitle: "সাধারণ জিজ্ঞাসা",
      faqs: [
        {
          q: "অ্যাপয়েন্টমেন্ট ছাড়া কি আসা যাবে?",
          a: "যাওয়া যায়, তবে অপেক্ষা করতে হতে পারে। আগে থেকে বুক করলে নির্দিষ্ট সময়ে সিরিয়াল পাবেন।",
        },
        {
          q: "রুট ক্যানেলে কত সময় লাগে?",
          a: "সাধারণত ১–২ সিটিং, প্রতিটি ৪৫–৬০ মিনিট। দাঁতের অবস্থা অনুযায়ী এটি ভিন্ন হতে পারে।",
        },
        {
          q: "চিকিৎসার খরচ কেমন?",
          a: "প্রথম পরামর্শ ও পরীক্ষা-নিরীক্ষার পর সঠিক খরচ জানিয়ে দেওয়া হয়। কোনো লুকানো চার্জ নেই।",
        },
        {
          q: "বাচ্চাদের চিকিৎসা করা হয়?",
          a: "হ্যাঁ, ৬ বছর বয়সী বাচ্চাদের থেকেও চিকিৎসা গ্রহণ করা হয়।",
        },
      ],
      bookingTitle: "অনলাইন অ্যাপয়েন্টমেন্ট",
      bookingSub: "ফর্মটি পূরণ করে WhatsApp-এ পাঠান — আমরা দ্রুত নিশ্চিত করব।",
      form: {
        name: "রোগীর নাম",
        namePh: "যেমন: তানভীর হোসেন",
        phone: "মোবাইল নম্বর",
        phonePh: "01700000000",
        date: "পছন্দের তারিখ",
        slot: "পছন্দের সময়",
        slotOptions: [
          "সন্ধ্যা ৫:০০ – ৬:০০",
          "সন্ধ্যা ৬:০০ – ৭:০০",
          "সন্ধ্যা ৭:০০ – ৮:০০",
          "রাত ৮:০০ – ৯:০০",
        ],
        chamber: "চেম্বার নির্বাচন করুন",
        problem: "সমস্যার বিবরণ (ঐচ্ছিক)",
        problemPh: "যেমন: উপরের বাঁ দিকের দাঁতে ব্যথা",
        submit: "WhatsApp-এ বুকিং পাঠান",
        sending: "পাঠানো হচ্ছে…",
        success:
          "ধন্যবাদ! WhatsApp উইন্ডোতে আপনার অনুরোধ প্রস্তুত হয়েছে — শুধু Send চাপুন।",
        errName: "অনুগ্রহ করে রোগীর নাম লিখুন।",
        errPhone: "সঠিক মোবাইল নম্বর দিন।",
        errDate: "তারিখ নির্বাচন করুন।",
        secureNote:
          "🔒 আপনার তথ্য শুধুমাত্র অ্যাপয়েন্টমেন্টের জন্য ব্যবহৃত হয়।",
      },
      emergencyTitle: "জরুরি ডেন্টাল সমস্যা?",
      emergencyText:
        "তীব্র ব্যথা, দাঁত ভাঙা বা রক্তক্ষরণে সঙ্গে সঙ্গে কল করুন।",
      footerNote:
        "এই ওয়েবসাইটের তথ্য সাধারণ পরামর্শের জন্য; চিকিৎসার জন্য সরাসরি পরামর্শ নিন।",
      rights: "সর্বস্বত্ব সংরক্ষিত।",
    },
    en: {
      drName: "Dr. Md. Arifur Rahman",
      degrees: "BDS (DU), PGT (Oral & Maxillofacial Surgery), FCPS (F-1)",
      specialty: "Dental Specialist & Oral Surgeon",
      bmdc: "BMDC Reg: A-12345",
      available: "Now accepting appointments",
      nav: {
        services: "Treatments",
        chambers: "Chambers",
        about: "About",
        reviews: "Reviews",
        faq: "FAQ",
        book: "Book",
      },
      heroLead: "Trusted Care for Your Healthy &",
      heroAccent: "Confident Smile",
      heroSub:
        "Pain-free dental treatment with modern rotary technology and fully sterilised equipment — transparent advice and fair pricing from day one.",
      btnBook: "Book Appointment",
      btnCall: "Emergency Call",
      stats: [
        { value: "12+", label: "Years Experience" },
        { value: "8,000+", label: "Happy Patients" },
        { value: "4.9", label: "Average Rating" },
      ],
      servicesTitle: "Specialized Treatments",
      servicesSub:
        "Every procedure follows international protocols using the latest equipment.",
      services: [
        {
          icon: "tooth",
          title: "Root Canal Treatment",
          desc: "Painless single or multi-sitting tooth preservation with rotary endodontics.",
        },
        {
          icon: "sparkle",
          title: "Scaling & Polishing",
          desc: "Deep removal of tartar and stains to restore healthy gums.",
        },
        {
          icon: "crown",
          title: "Cosmetic Filling & Crowns",
          desc: "Tooth-coloured aesthetic fillings and durable zirconia caps.",
        },
        {
          icon: "braces",
          title: "Braces & Clear Aligners",
          desc: "Modern orthodontic solutions to straighten crooked teeth.",
        },
      ],
      aboutTitle: "About the Doctor",
      aboutText:
        "Dr. Md. Arifur Rahman completed his BDS from the University of Dhaka and received postgraduate training in Oral & Maxillofacial Surgery. He believes accurate diagnosis and clear patient communication are half of successful treatment.",
      aboutPoints: [
        "BDS — University of Dhaka",
        "PGT — Oral & Maxillofacial Surgery",
        "FCPS Part-1 completed",
        "Member, Bangladesh Dental Society",
        "12 years of clinical experience",
      ],
      chambersTitle: "Chambers & Schedule",
      chambersSub:
        "Walk-ins are welcome, but booking ahead guarantees your slot.",
      getDirection: "Get Directions",
      chambers: [
        {
          name: "Popular Diagnostic Center, Badda",
          address: "Pragati Sarani, Badda, Dhaka",
          time: "Sat – Wed · 5:00 PM – 9:00 PM",
          phone: "+8801711000000",
        },
        {
          name: "City Dental Clinic, Dhanmondi",
          address: "Road 7, Dhanmondi, Dhaka",
          time: "Thu & Fri · 4:00 PM – 8:00 PM",
          phone: "+8801811000000",
        },
      ],
      reviewsTitle: "Patient Reviews",
      reviewsSub: "Verified reviews collected from Google and Facebook.",
      reviews: [
        {
          name: "Tanvir Hossain",
          area: "Badda, Dhaka",
          text: "Had a root canal done — zero pain. The doctor explained every step clearly before starting.",
        },
        {
          name: "Nusrat Jahan",
          area: "Dhanmondi, Dhaka",
          text: "Been under his care for braces for a year. Great results and a very clean clinic.",
        },
        {
          name: "Mahbub Alam",
          area: "Mirpur, Dhaka",
          text: "Slots are on time and there are no hidden charges. Extremely courteous behaviour.",
        },
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "Can I visit without an appointment?",
          a: "Yes, but you may need to wait. Booking ahead guarantees your preferred slot.",
        },
        {
          q: "How long does a root canal take?",
          a: "Usually 1–2 sittings of 45–60 minutes each, depending on the condition of the tooth.",
        },
        {
          q: "What are the treatment costs?",
          a: "The exact cost is shared after the first consultation and X-ray. There are no hidden charges.",
        },
        {
          q: "Do you treat children?",
          a: "Yes, we treat children from 6 years of age onwards.",
        },
      ],
      bookingTitle: "Book an Appointment",
      bookingSub:
        "Fill in the form and send it via WhatsApp — we will confirm shortly.",
      form: {
        name: "Patient Name",
        namePh: "e.g. Tanvir Hossain",
        phone: "Mobile Number",
        phonePh: "01700000000",
        date: "Preferred Date",
        slot: "Preferred Time",
        slotOptions: [
          "5:00 PM – 6:00 PM",
          "6:00 PM – 7:00 PM",
          "7:00 PM – 8:00 PM",
          "8:00 PM – 9:00 PM",
        ],
        chamber: "Select Chamber",
        problem: "Describe Your Problem (optional)",
        problemPh: "e.g. Toothache on upper left molar",
        submit: "Send Booking via WhatsApp",
        sending: "Sending…",
        success:
          "Thank you! Your request is ready in WhatsApp — just press Send.",
        errName: "Please enter the patient name.",
        errPhone: "Please enter a valid mobile number.",
        errDate: "Please select a date.",
        secureNote: "🔒 Your information is used only for this appointment.",
      },
      emergencyTitle: "Dental Emergency?",
      emergencyText:
        "For severe pain, a broken tooth or bleeding, call immediately.",
      footerNote:
        "Information on this site is for general guidance; always consult in person for treatment.",
      rights: "All rights reserved.",
    },
  };

  const t = content[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const todayISO = new Date().toISOString().slice(0, 10);

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const errs = {};
    if (!form.patientName.trim()) errs.patientName = t.form.errName;
    if ((form.phone || "").replace(/\D/g, "").length < 10)
      errs.phone = t.form.errPhone;
    if (!form.preferredDate) errs.preferredDate = t.form.errDate;

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("sending");
    const chamberName = t.chambers[form.chamberIndex]?.name ?? "";

    const lines = [
      `*${lang === "bn" ? "নতুন অ্যাপয়েন্টমেন্ট" : "New Appointment Request"}*`,
      "",
      `*${t.form.name}:* ${form.patientName}`,
      `*${t.form.phone}:* ${form.phone}`,
      `*${t.form.chamber}:* ${chamberName}`,
      `*${t.form.date}:* ${form.preferredDate}`,
    ];
    if (form.slot) lines.push(`*${t.form.slot}:* ${form.slot}`);
    if (form.problem.trim()) lines.push(`*${t.form.problem}:* ${form.problem}`);

    window.open(
      `https://wa.me/8801711000000?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setTimeout(() => setStatus("done"), 600);
  };

  const fontStack =
    lang === "bn"
      ? "'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif"
      : "'Inter', system-ui, -apple-system, sans-serif";

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition " +
    "placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

  return (
    <div
      style={{ fontFamily: fontStack }}
      className="min-h-screen bg-white text-slate-700 antialiased selection:bg-teal-600/20"
    >
      {/* ═══════════ HEADER ═══════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 text-left"
          >
            {/* LOGO IMAGE — replace with clinic logo */}
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold transition-colors ${
                scrolled
                  ? "bg-teal-700 text-white"
                  : "bg-white/15 text-white ring-1 ring-white/30"
              }`}
            >
              AR
            </span>
            <span className="leading-tight">
              <span
                className={`block text-[13px] font-bold transition-colors sm:text-sm ${scrolled ? "text-slate-900" : "text-white"}`}
              >
                {t.drName}
              </span>
              <span
                className={`block text-[10px] font-medium transition-colors ${scrolled ? "text-teal-700" : "text-teal-200"}`}
              >
                {t.bmdc}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {["services", "chambers", "about", "reviews", "faq"].map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className={`rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
                  scrolled
                    ? "text-slate-600 hover:bg-slate-100 hover:text-teal-700"
                    : "text-teal-50/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t.nav[key]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              aria-label="Switch language"
              className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                scrolled
                  ? "border border-slate-200 text-slate-600 hover:border-teal-600 hover:text-teal-700"
                  : "border border-white/25 text-white hover:bg-white/10"
              }`}
            >
              {lang === "bn" ? "EN" : "বাং"}
            </button>

            <button
              onClick={() => scrollTo("booking")}
              className="hidden rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 sm:block"
            >
              {t.btnBook}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`grid h-9 w-9 place-items-center rounded-lg transition lg:hidden ${
                scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Icon
                path={menuOpen ? ICONS.close : ICONS.menu}
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden border-t border-slate-200 bg-white transition-[max-height] duration-300 lg:hidden ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="mx-auto grid max-w-6xl gap-1 px-5 py-4">
            {["services", "chambers", "about", "reviews", "faq", "booking"].map(
              (key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-teal-700"
                >
                  {key === "booking" ? t.nav.book : t.nav[key]}
                </button>
              ),
            )}
          </nav>
        </div>
      </header>

      {/* ═══════════ HERO — full-bleed clinic image + overlay ═══════════ */}
      <section className="relative overflow-hidden bg-slate-900 pb-20 pt-28 sm:pt-32">
        {/* BACKGROUND IMAGE — replace src with a real clinic interior photo */}
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          aria-hidden="true"
        />
        {/* Teal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 via-slate-900/95 to-emerald-950/90" />
        {/* Cross pattern layer */}
        <CrossPattern opacity={0.03} />
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-teal-600/25 blur-[120px]" />
          <div className="absolute -right-24 top-24 h-[24rem] w-[24rem] rounded-full bg-emerald-500/15 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {t.available}
            </span>

            <h1 className="mt-6 text-[2rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
              {t.heroLead}{" "}
              <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                {t.heroAccent}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {t.heroSub}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-teal-200">
              <span>{t.specialty}</span>
              <span className="text-slate-600">•</span>
              <span className="font-medium text-slate-400">{t.degrees}</span>
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("booking")}
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-900 shadow-xl shadow-emerald-500/25 transition hover:bg-emerald-400"
              >
                <Icon path={ICONS.calendar} className="h-4 w-4" />
                {t.btnBook}
                <Icon
                  path={ICONS.arrow}
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <a
                href="tel:+8801711000000"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                <Icon path={ICONS.phone} className="h-4 w-4" />
                {t.btnCall}
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {t.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-extrabold text-white sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={150} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal-500/30 to-emerald-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-800/60 shadow-2xl backdrop-blur">
                {/* DOCTOR PORTRAIT — replace with real photo */}
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                  alt={t.drName}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:-left-8">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon path={ICONS.award} className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] font-bold text-slate-900">
                    BMDC Verified
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    {t.bmdc}
                  </span>
                </span>
              </div>

              <div className="absolute -right-3 top-8 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xl sm:flex">
                <Icon
                  path={ICONS.star}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
                <span className="text-[13px] font-bold text-slate-900">
                  4.9
                </span>
                <span className="text-[11px] text-slate-500">/ 5.0</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ TRUST STRIP — halftone dot pattern ═══════════ */}
      <section className="relative border-b border-slate-200 bg-white">
        <DotPattern opacity={0.04} />
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 divide-slate-200 px-5 sm:px-6 md:grid-cols-4 md:divide-x">
          {[
            {
              icon: "shield",
              label: lang === "bn" ? "১০০% স্টেরিলাইজড" : "100% Sterilised",
            },
            {
              icon: "tooth",
              label:
                lang === "bn" ? "ব্যথামুক্ত চিকিৎসা" : "Painless Treatment",
            },
            {
              icon: "clock",
              label: lang === "bn" ? "সময়মতো সিরিয়াল" : "On-Time Slots",
            },
            {
              icon: "check",
              label:
                lang === "bn" ? "স্বচ্ছ মূল্য তালিকা" : "Transparent Pricing",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2.5 px-4 py-5"
            >
              <Icon
                path={ICONS[item.icon]}
                className="h-4 w-4 shrink-0 text-teal-600"
              />
              <span className="text-[12px] font-semibold text-slate-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ SERVICES — light teal wash + tooth watermark ═══════════ */}
      <section
        id="services"
        className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-white px-5 py-20 sm:px-6 sm:py-24"
      >
        <ToothWatermark className="-right-24 -top-12 h-96 w-96 rotate-12" />
        <ToothWatermark className="-bottom-16 -left-20 h-72 w-72 -rotate-12" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
                {lang === "bn" ? "আমাদের সেবা" : "Our Services"}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-[2rem]">
                {t.servicesTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {t.servicesSub}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.map((srv, idx) => (
              <Reveal key={srv.title} delay={idx * 80}>
                <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/5">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-700 ring-1 ring-teal-100 transition-colors group-hover:from-teal-600 group-hover:to-emerald-600 group-hover:text-white group-hover:ring-teal-600">
                    <Icon path={ICONS[srv.icon]} className="h-6 w-6" />
                  </span>
                  <h3 className="text-[15px] font-bold leading-snug text-slate-900">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                    {srv.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT — paper texture + clinic image accent ═══════════ */}
      <section
        id="about"
        className="relative scroll-mt-24 overflow-hidden bg-white px-5 py-20 sm:px-6 sm:py-24"
      >
        {/* Subtle paper-like noise texture via SVG */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
              {lang === "bn" ? "পরিচিতি" : "Profile"}
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {t.aboutTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {t.aboutText}
            </p>

            <ul className="mt-7 space-y-3">
              {t.aboutPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700">
                    <Icon path={ICONS.check} className="h-3 w-3" />
                  </span>
                  <span className="text-[13px] font-medium text-slate-700">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: "award",
                  value: "12+",
                  label:
                    lang === "bn"
                      ? "বছরের ক্লিনিক্যাল অভিজ্ঞতা"
                      : "Years of clinical practice",
                },
                {
                  icon: "shield",
                  value: "100%",
                  label:
                    lang === "bn"
                      ? "স্টেরিলাইজড যন্ত্রপাতি"
                      : "Sterilised instruments",
                },
                {
                  icon: "clock",
                  value: "24/7",
                  label:
                    lang === "bn"
                      ? "জরুরি পরামর্শ সেবা"
                      : "Emergency consultation",
                },
                {
                  icon: "tooth",
                  value: "8,000+",
                  label:
                    lang === "bn"
                      ? "সফল চিকিৎসা সম্পন্ন"
                      : "Successful procedures",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-teal-200 hover:bg-white hover:shadow-lg"
                >
                  <Icon
                    path={ICONS[card.icon]}
                    className="h-5 w-5 text-teal-600"
                  />
                  <p className="mt-4 text-2xl font-extrabold text-slate-900">
                    {card.value}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-slate-500">
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CHAMBERS — soft gradient + blurred clinic hallway ═══════════ */}
      <section
        id="chambers"
        className="relative scroll-mt-24 overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      >
        {/* Blurred clinic hallway background */}
        <img
          src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.06] blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/80 via-white/95 to-teal-50/80" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
                {lang === "bn" ? "লোকেশন" : "Locations"}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-[2rem]">
                {t.chambersTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {t.chambersSub}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {t.chambers.map((ch, idx) => (
              <Reveal key={ch.name} delay={idx * 100}>
                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-xl hover:shadow-slate-900/5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-bold leading-snug text-slate-900">
                      {ch.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      {lang === "bn" ? "চালু" : "Open"}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px]">
                    <p className="flex items-start gap-2.5 text-slate-600">
                      <Icon
                        path={ICONS.pin}
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                      />
                      {ch.address}
                    </p>
                    <p className="flex items-start gap-2.5 text-slate-600">
                      <Icon
                        path={ICONS.clock}
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                      />
                      <span>{ch.time}</span>
                    </p>
                    <p className="flex items-start gap-2.5 text-slate-600">
                      <Icon
                        path={ICONS.phone}
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                      />
                      <a
                        href={`tel:${ch.phone}`}
                        className="font-semibold hover:text-teal-700"
                      >
                        {ch.phone}
                      </a>
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2.5 border-t border-slate-100 pt-5">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ch.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <Icon path={ICONS.pin} className="h-3.5 w-3.5" />
                      {t.getDirection}
                    </a>
                    <button
                      onClick={() => {
                        setForm((f) => ({ ...f, chamberIndex: idx }));
                        scrollTo("booking");
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
                    >
                      <Icon path={ICONS.calendar} className="h-3.5 w-3.5" />
                      {t.nav.book}
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS — soft blue-teal gradient + quote watermark ═══════════ */}
      <section
        id="reviews"
        className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/40 to-slate-50 px-5 py-20 sm:px-6 sm:py-24"
      >
        <Icon
          path={ICONS.quote}
          className="pointer-events-none absolute -left-8 top-16 h-48 w-48 text-teal-600/[0.03]"
        />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
                {lang === "bn" ? "রোগীদের কথা" : "Testimonials"}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-[2rem]">
                {t.reviewsTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {t.reviewsSub}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.reviews.map((r, idx) => (
              <Reveal key={r.name} delay={idx * 90}>
                <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon path={ICONS.quote} className="h-5 w-5 text-teal-300" />
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        path={ICONS.star}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[13px] leading-relaxed text-slate-600">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                    {/* PATIENT AVATAR — optional real photo */}
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-[12px] font-bold text-white">
                      {r.name.trim().charAt(0)}
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[13px] font-bold text-slate-900">
                        {r.name}
                      </span>
                      <span className="block text-[11px] text-slate-500">
                        {r.area}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ — clean white + subtle grid lines ═══════════ */}
      <section
        id="faq"
        className="relative scroll-mt-24 bg-white px-5 py-20 sm:px-6 sm:py-24"
      >
        {/* Grid lines background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f766e 1px, transparent 1px), linear-gradient(to bottom, #0f766e 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
                {lang === "bn" ? "জিজ্ঞাসা" : "Support"}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-[2rem]">
                {t.faqTitle}
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {t.faqs.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <Reveal key={item.q} delay={idx * 60}>
                  <div
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                      open ? "border-teal-300 shadow-sm" : "border-slate-200"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? -1 : idx)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[13.5px] font-bold text-slate-900">
                        {item.q}
                      </span>
                      <Icon
                        path={ICONS.chevron}
                        className={`h-4 w-4 shrink-0 text-teal-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden px-5 pb-5 text-[13px] leading-relaxed text-slate-600">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ BOOKING — deep teal gradient + clinic chair background ═══════════ */}
      <section
        id="booking"
        className="relative scroll-mt-24 overflow-hidden px-5 py-20 sm:px-6 sm:py-24"
      >
        {/* Background clinic image — soft focus dental chair */}
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/95 via-slate-900/95 to-emerald-950/95" />
        <CrossPattern opacity={0.02} />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-teal-400">
                {lang === "bn" ? "অ্যাপয়েন্টমেন্ট" : "Appointment"}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {t.bookingTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {t.bookingSub}
              </p>

              <div className="mt-8 space-y-3">
                {t.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-3.5"
                  >
                    <span className="text-[12px] text-slate-400">
                      {s.label}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
                <h3 className="flex items-center gap-2 text-[13px] font-bold text-amber-200">
                  <Icon path={ICONS.phone} className="h-4 w-4" />
                  {t.emergencyTitle}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-slate-400">
                  {t.emergencyText}
                </p>
                <a
                  href="tel:+8801711000000"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-amber-300"
                >
                  +8801711000000
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
                {status === "done" && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5">
                    <Icon
                      path={ICONS.check}
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    />
                    <p className="text-[12.5px] font-medium leading-relaxed text-emerald-800">
                      {t.form.success}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="patientName"
                      className="mb-1.5 block text-[12px] font-bold text-slate-700"
                    >
                      {t.form.name} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="patientName"
                      type="text"
                      value={form.patientName}
                      onChange={setField("patientName")}
                      placeholder={t.form.namePh}
                      aria-invalid={!!errors.patientName}
                      className={`${inputBase} ${errors.patientName ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10" : "border-slate-300"}`}
                    />
                    {errors.patientName && (
                      <p className="mt-1.5 text-[11.5px] font-medium text-rose-600">
                        {errors.patientName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-[12px] font-bold text-slate-700"
                      >
                        {t.form.phone} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={setField("phone")}
                        placeholder={t.form.phonePh}
                        aria-invalid={!!errors.phone}
                        className={`${inputBase} ${errors.phone ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10" : "border-slate-300"}`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-[11.5px] font-medium text-rose-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="date"
                        className="mb-1.5 block text-[12px] font-bold text-slate-700"
                      >
                        {t.form.date} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="date"
                        type="date"
                        min={todayISO}
                        value={form.preferredDate}
                        onChange={setField("preferredDate")}
                        aria-invalid={!!errors.preferredDate}
                        className={`${inputBase} ${errors.preferredDate ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10" : "border-slate-300"}`}
                      />
                      {errors.preferredDate && (
                        <p className="mt-1.5 text-[11.5px] font-medium text-rose-600">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="chamber"
                        className="mb-1.5 block text-[12px] font-bold text-slate-700"
                      >
                        {t.form.chamber}
                      </label>
                      <select
                        id="chamber"
                        value={form.chamberIndex}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            chamberIndex: Number(e.target.value),
                          }))
                        }
                        className={`${inputBase} border-slate-300`}
                      >
                        {t.chambers.map((c, i) => (
                          <option key={c.name} value={i}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="slot"
                        className="mb-1.5 block text-[12px] font-bold text-slate-700"
                      >
                        {t.form.slot}
                      </label>
                      <select
                        id="slot"
                        value={form.slot}
                        onChange={setField("slot")}
                        className={`${inputBase} border-slate-300`}
                      >
                        <option value="">—</option>
                        {t.form.slotOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="problem"
                      className="mb-1.5 block text-[12px] font-bold text-slate-700"
                    >
                      {t.form.problem}
                    </label>
                    <textarea
                      id="problem"
                      rows={3}
                      value={form.problem}
                      onChange={setField("problem")}
                      placeholder={t.form.problemPh}
                      className={`${inputBase} resize-none border-slate-300`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {status === "sending" ? t.form.sending : t.form.submit}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    {t.form.secureNote}
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER — deep slate + cross pattern ═══════════ */}
      <footer className="relative border-t border-white/5 bg-slate-900 px-5 pb-28 pt-14 sm:px-6 md:pb-14">
        <CrossPattern opacity={0.03} />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-700 text-sm font-extrabold text-white">
                  AR
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-white">
                    {t.drName}
                  </span>
                  <span className="block text-[11px] text-teal-400">
                    {t.specialty}
                  </span>
                </span>
              </div>
              <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
                {t.degrees}
              </p>
              <p className="mt-2 text-[12px] font-medium text-slate-400">
                {t.bmdc}
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {lang === "bn" ? "দ্রুত লিংক" : "Quick Links"}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {["services", "chambers", "about", "faq", "booking"].map(
                  (key) => (
                    <li key={key}>
                      <button
                        onClick={() => scrollTo(key)}
                        className="text-[12.5px] text-slate-400 transition hover:text-teal-400"
                      >
                        {key === "booking" ? t.nav.book : t.nav[key]}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {lang === "bn" ? "যোগাযোগ" : "Contact"}
              </h4>
              <ul className="mt-4 space-y-3">
                {t.chambers.map((c) => (
                  <li
                    key={c.name}
                    className="text-[12.5px] leading-relaxed text-slate-400"
                  >
                    <span className="block font-semibold text-slate-300">
                      {c.name}
                    </span>
                    <a
                      href={`tel:${c.phone}`}
                      className="transition hover:text-teal-400"
                    >
                      {c.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-6">
            <p className="text-[11px] leading-relaxed text-slate-500">
              {t.footerNote}
            </p>
            <p className="mt-3 text-[11px] text-slate-600">
              © {new Date().getFullYear()} {t.drName}. {t.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════════ FLOATING WHATSAPP ═══════════ */}
      <a
        href="https://wa.me/8801711000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-105 md:grid"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {/* ═══════════ MOBILE ACTION BAR ═══════════ */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-lg md:hidden">
        <div className="grid grid-cols-3 divide-x divide-slate-200">
          <a
            href="tel:+8801711000000"
            className="flex flex-col items-center gap-1 py-2.5 text-slate-600 active:bg-slate-50"
          >
            <Icon path={ICONS.phone} className="h-4 w-4" />
            <span className="text-[10px] font-bold">
              {lang === "bn" ? "কল" : "Call"}
            </span>
          </a>
          <a
            href="https://wa.me/8801711000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-2.5 text-emerald-600 active:bg-slate-50"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="text-[10px] font-bold">WhatsApp</span>
          </a>
          <button
            onClick={() => scrollTo("booking")}
            className="flex flex-col items-center gap-1 py-2.5 text-teal-700 active:bg-slate-50"
          >
            <Icon path={ICONS.calendar} className="h-4 w-4" />
            <span className="text-[10px] font-bold">
              {lang === "bn" ? "বুকিং" : "Book"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
