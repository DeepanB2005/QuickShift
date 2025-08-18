// src/i18n/translations.js

export const translations = {
  en: {
    // Common
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      success: "Success!",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      accept: "Accept",
      reject: "Reject",
      confirm: "Confirm",
      book_now: "Book Now",
      view_details: "View Details",
      available: "Available",
      unavailable: "Unavailable",
      online: "Online",
      offline: "Offline",
      per_hour: "/hour",
      years_exp: "Years Exp.",
      jobs: "Jobs",
      rating: "Rating",
      reviews: "Reviews",
      service: "Service",
      services: "Services",
      all_services: "All Services",
      city: "City",
      enter_city: "Enter city",
      min_rating: "Minimum Rating",
      any_rating: "Any Rating",
      max_hourly_rate: "Max Hourly Rate",
      availability: "Availability",
      any_time: "Any Time",
      available_now: "Available Now",
      today: "Today",
      this_week: "This Week",
      sort_by: "Sort By",
      price_low_high: "Price: Low to High",
      price_high_low: "Price: High to Low",
      experience: "Experience",
      workers_found: "workers found",
      clear_all: "Clear All",
      clear_filters: "Clear Filters",
      filters: "Filters",
      customer: "Customer",
      worker: "Worker",
      date: "Date",
      time: "Time",
      duration: "Duration",
      price: "Price",
      description: "Description",
      address: "Address",
      years: "years",
      and: "and"
    },

    // Home Page
    home: {
      welcome: "Welcome",
      login: "Login",
      get_started: "Get Started",
      dashboard: "Dashboard",
      go_to_dashboard: "Go to Dashboard",
      explore_services: "Explore Services",
      nav: {
        services: "Services",
        features: "Features",
        about: "About",
        get_started: "Get Started",
        login: "Login",
        dashboard: "Dashboard"
      },
      hero: {
        title: "QuickShift: Connect with Blue Collar Workers",
        subtitle: "Find trusted workers for your needs. Post jobs, filter by location & service, and manage requests easily."
      },
      services: {
        title: "Our Services",
        home_repairs: "Home Repairs",
        installation: "Installation",
        maintenance: "Maintenance",
        emergency: "Emergency",
        home_repairs_desc: "Plumbing, electrical, carpentry",
        installation_desc: "Appliances, fixtures, equipment",
        maintenance_desc: "Regular upkeep and cleaning",
        emergency_desc: "24/7 urgent repair services"
      },
      features: {
        title: "Why Choose QuickShift",
        skilled_workers: "Skilled Workers",
        skilled_workers_desc: "Vetted professionals at your service",
        secure_platform: "Secure Platform",
        secure_platform_desc: "Safe payments and verified users",
        easy_payments: "Easy Payments",
        easy_payments_desc: "Integrated payment gateway",
        location_based: "Location Based",
        location_based_desc: "Find workers in your area"
      },
      stats: {
        active_workers: "Active Workers",
        jobs_completed: "Jobs Completed",
        avg_rating: "Average Rating",
        support: "Support"
      },
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of satisfied customers who trust QuickShift for all their service needs",
        start_journey: "Start Your Journey",
        learn_more: "Learn More"
      },
      footer: {
        privacy: "Privacy",
        terms: "Terms",
        support: "Support",
        copyright: "© 2025 QuickShift. Empowering blue collar connections."
      }
    },

    // Login Page
    login: {
      welcome_back: "Welcome Back",
      title: "Sign In to Your Account",
      subtitle: "Welcome back! Please sign in to your account",
      email: "Email Address",
      email_placeholder: "Enter your email",
      password: "Password",
      password_placeholder: "Enter your password",
      remember_me: "Remember me",
      forgot_password: "Forgot Password?",
      sign_in_button: "Sign In",
      signing_in: "Signing in...",
      continue_with_google: "Continue with Google",
      or_continue_with_email: "Or continue with email",
      dont_have_account: "Don't have an account?",
      sign_up_link: "Sign up here",
      quick_access: "Quick Access",
      join_as_customer: "Join as Customer",
      join_as_worker: "Join as Worker",
      terms_text: "By signing in, you agree to our",
      terms_link: "Terms of Service",
      privacy_link: "Privacy Policy",
      error: "Login failed. Please try again.",
      oauth_failed: "OAuth login failed. Please try again."
    },

    // Register Page
    register: {
      title: "Create Your Account",
      subtitle: "Join thousands of happy customers and workers",
      sign_in_link: "Sign in here",
      role: "I want to",
      customer: "Find Workers",
      customer_desc: "Book services",
      worker: "Offer Services",
      worker_desc: "Earn money",
      name: "Full Name",
      name_placeholder: "Enter your full name",
      email: "Email Address",
      email_placeholder: "Enter your email",
      phone: "Phone Number",
      phone_placeholder: "Enter your phone number",
      city: "City",
      city_placeholder: "Enter your city",
      state: "State",
      state_placeholder: "Enter your state",
      password: "Password",
      password_placeholder: "Create a password",
      confirm_password: "Confirm Password",
      confirm_password_placeholder: "Confirm your password",
      terms_agreement: "I agree to the",
      terms_link: "Terms of Service",
      privacy_link: "Privacy Policy",
      create_account_button: "Create Account",
      creating_account: "Creating account...",
      footer_text: "© 2024 QuickShift. All rights reserved.",
      error: "Registration failed. Please try again.",
      errors: {
        name_required: "Name is required",
        name_min_length: "Name must be at least 2 characters",
        email_required: "Email is required",
        email_invalid: "Please enter a valid email",
        phone_required: "Phone number is required",
        phone_invalid: "Please enter a valid phone number",
        password_required: "Password is required",
        password_min_length: "Password must be at least 6 characters",
        passwords_dont_match: "Passwords don't match"
      }
    },

    // Dashboard
    dashboard: {
      welcome: "Welcome back",
      overview: "Overview",
      my_bookings: "My Bookings",
      find_workers: "Find Workers",
      profile_settings: "Profile Settings",
      homeBtn: "Home",
      stats: {
        active_bookings: "Active Bookings",
        completed_bookings: "Completed Jobs",
        total_spent: "Total Spent",
        favorite_workers: "Favorite Workers"
      },
      recent_bookings: "Recent Bookings",
      no_bookings: "No bookings yet",
      book_service: "Book a Service",
      popular_services: "Popular Services"
    },

    // Worker Dashboard
    worker: {
      dashboard: {
        welcome: "Welcome back, {{name}}",
        no_services: "No services added",
        availability: "Availability",
        online: "Online",
        offline: "Offline",
        edit_profile: "Edit Profile",
        tabs: {
          overview: "Overview",
          bookings: "Bookings",
          earnings: "Earnings",
          profile: "Profile"
        },
        pending_requests: "Pending Requests",
        active_jobs: "Active Jobs",
        completed_jobs: "Completed Jobs",
        total_earnings: "Total Earnings",
        recent_bookings: "Recent Bookings",
        all_bookings: "All Bookings",
        no_bookings: "No bookings yet",
        start_job: "Start Job",
        complete_job: "Complete Job",
        earnings_overview: "Earnings Overview",
        total_earned: "Total Earned",
        avg_per_job: "Average Per Job",
        hourly_rate: "Hourly Rate",
        profile_overview: "Profile Overview"
      },
      profile: {
        experience: "Experience (Years)"
      }
    },

    // Services
    services: {
      find_workers: "Find Skilled Workers",
      hero_subtitle: "Browse through thousands of verified professionals ready to help",
      available_workers: "Available Workers",
      no_workers_found: "No workers found",
      try_different_filters: "Try adjusting your search filters",
      responds_in: "Responds in",
      plumbing: "Plumbing",
      electrical: "Electrical Work",
      carpentry: "Carpentry",
      cleaning: "House Cleaning",
      moving: "Moving & Packing",
      painting: "Painting",
      gardening: "Gardening",
      ac_repair: "AC Repair",
      tv_installation: "TV Installation",
      appliance_repair: "Appliance Repair",
      handyman: "Handyman Services",
      pest_control: "Pest Control",
      deep_cleaning: "Deep Cleaning",
      home_maintenance: "Home Maintenance"
    },

    // Booking
    booking: {
      status: {
        pending: "Pending",
        accepted: "Accepted",
        "in-progress": "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
        rejected: "Rejected"
      }
    },

    // Dashboard Sidebar & Sections
    sidebar: {
      profile: "Profile",
      addPost: "Add Post",
      myPosts: "My Posts",
      joinRequests: "Join Requests",
      jobPosts: "Job Posts",
      myBookings: "My Bookings",
      requests: "Requests"
    },
    
    sections: {
      profile: "Profile",
      addPost: "Add Post",
      myPosts: "My Posts",
      joinRequests: "Join Requests",
      jobPosts: "Job Posts",
      myBookings: "My Bookings",
      requests: "Requests"
    },
    jobPosts:
    {
      title: "JOB POSTS"
    },

    profile: {
      name: "Name",
      email: "Email",
      role: "Role",
      age: "Age",
      location: "Location",
      phone: "Phone",
      skills: "Skills",
      experience: "Experience",
      wageRange: "Wage Range",
      wageMin: "Minimum Wage",
      wageMax: "Maximum Wage",
      availability: "Availability",
      description: "Description",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel"
    },
    addPost: {
      title: "Post a Job",
      jobName: "Job Name",
      description: "Description",
      location: "Location",
      duration: "Duration",
      date: "Date",
      wageMin: "Wage Min",
      wageMax: "Wage Max",
      requirements: "Requirements",
      submit: "Post Job",
      success: "Job posted successfully!"
    },
    myPosts: {
      title: "My Posts",
      noPosts: "No jobs posted yet.",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      updated: "Job updated.",
      deleted: "Job deleted.",
      confirmDelete: "Delete this job?"
    },
    joinRequests: {
      title: "Join Requests",
      noRequests: "No join requests yet.",
      apply: "Apply",
      message: "Message (optional)",
      send: "Send",
      cancel: "Cancel",
      applied: "Request sent!",
      status: "Status",
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected",
      accept: "Accept",
      reject: "Reject"
    },
    myBookings: {
      title: "My Bookings",
      noBookings: "No bookings yet.",
      requestMessage: "Your Message",
      status: "Status"
    },
    requests: {
      title: "My Requests",
      noRequests: "No requests sent yet.",
      status: "Status"
    },
    auth: {
      homeBtn: "Home",
      switchToRegister: "Don't have an account? Register",
      switchToLogin: "Already have an account? Login"
    }
  },

  // Hindi Translations
  hi: {
    common: {
      loading: "लोड हो रहा है...",
      error: "कुछ गलत हुआ",
      success: "सफल!",
      save: "सहेजें",
      cancel: "रद्द करें",
      delete: "मिटाएं",
      edit: "संपादित करें",
      view: "देखें",
      accept: "स्वीकार करें",
      reject: "अस्वीकार करें",
      confirm: "पुष्टि करें",
      book_now: "अभी बुक करें",
      view_details: "विवरण देखें",
      available: "उपलब्ध",
      unavailable: "अनुपलब्ध",
      online: "ऑनलाइन",
      offline: "ऑफलाइन",
      per_hour: "/घंटा",
      years_exp: "साल का अनुभव",
      jobs: "काम",
      rating: "रेटिंग",
      reviews: "समीक्षाएं",
      service: "सेवा",
      services: "सेवाएं",
      all_services: "सभी सेवाएं",
      city: "शहर",
      enter_city: "शहर दर्ज करें",
      min_rating: "न्यूनतम रेटिंग",
      any_rating: "कोई भी रेटिंग",
      max_hourly_rate: "अधिकतम प्रति घंटा दर",
      availability: "उपलब्धता",
      any_time: "कोई भी समय",
      available_now: "अभी उपलब्ध",
      today: "आज",
      this_week: "इस सप्ताह",
      sort_by: "के अनुसार छांटें",
      price_low_high: "कीमत: कम से ज्यादा",
      price_high_low: "कीमत: ज्यादा से कम",
      experience: "अनुभव",
      workers_found: "कामगार मिले",
      clear_all: "सभी साफ़ करें",
      clear_filters: "फ़िल्टर साफ़ करें",
      filters: "फ़िल्टर",
      customer: "ग्राहक",
      worker: "कामगार",
      date: "तारीख",
      time: "समय",
      duration: "अवधि",
      price: "कीमत",
      description: "विवरण",
      address: "पता",
      years: "साल",
      and: "और"
    },
    jobPosts:
    {
      title: "नौकरी पोस्ट्स"
    },

    // Home Page
    home: {
      welcome: "स्वागत है",
      login: "लॉगिन",
      get_started: "शुरू करें",
      dashboard: "डैशबोर्ड",
      go_to_dashboard: "डैशबोर्ड पर जाएं",
      explore_services: "सेवाएं देखें",
      nav: {
        services: "सेवाएं",
        features: "विशेषताएँ",
        about: "हमारे बारे में",
        get_started: "शुरू करें",
        login: "लॉगिन",
        dashboard: "डैशबोर्ड"
      },
      hero: {
        title: "QuickShift: ब्लू कॉलर वर्कर्स से जुड़ें",
        subtitle: "अपनी ज़रूरत के लिए भरोसेमंद कामगार खोजें। जॉब पोस्ट करें, स्थान और सेवा के अनुसार फ़िल्टर करें, और अनुरोध आसानी से प्रबंधित करें।"
      },
      services: {
        title: "हमारी सेवाएं",
        home_repairs: "घर की मरम्मत",
        installation: "स्थापना",
        maintenance: "रखरखाव",
        emergency: "आपातकालीन",
        home_repairs_desc: "प्लंबिंग, इलेक्ट्रिकल, बढ़ईगीरी",
        installation_desc: "उपकरण, फिटिंग, मशीनरी",
        maintenance_desc: "नियमित सफाई और देखभाल",
        emergency_desc: "24/7 आपातकालीन मरम्मत सेवाएं"
      },
      features: {
        title: "QuickShift क्यों चुनें",
        skilled_workers: "कुशल कामगार",
        skilled_workers_desc: "आपकी सेवा में प्रमाणित पेशेवर",
        secure_platform: "सुरक्षित प्लेटफार्म",
        secure_platform_desc: "सुरक्षित भुगतान और सत्यापित उपयोगकर्ता",
        easy_payments: "आसान भुगतान",
        easy_payments_desc: "एकीकृत भुगतान गेटवे",
        location_based: "स्थान आधारित",
        location_based_desc: "अपने क्षेत्र में कामगार खोजें"
      },
      stats: {
        active_workers: "सक्रिय कामगार",
        jobs_completed: "पूर्ण कार्य",
        avg_rating: "औसत रेटिंग",
        support: "सहायता"
      },
      cta: {
        title: "शुरू करने के लिए तैयार हैं?",
        subtitle: "हजारों संतुष्ट ग्राहक QuickShift पर भरोसा करते हैं",
        start_journey: "अपनी यात्रा शुरू करें",
        learn_more: "और जानें"
      },
      nav: {
        services: "सेवाएं",
        features: "विशेषताएँ",
        about: "हमारे बारे में",
        get_started: "शुरू करें",
        login: "लॉगिन",
        dashboard: "डैशबोर्ड"
      },
      footer: {
        privacy: "गोपनीयता",
        terms: "शर्तें",
        support: "सहायता",
        copyright: "© 2025 QuickShift. ब्लू कॉलर कनेक्शन को सशक्त बनाना।"
      }
    },

    // Login Page
    login: {
      welcome_back: "वापस स्वागत है",
      title: "अपने खाते में साइन इन करें",
      subtitle: "वापस स्वागत है! कृपया अपने खाते में साइन इन करें",
      email: "ईमेल पता",
      email_placeholder: "अपना ईमेल दर्ज करें",
      password: "पासवर्ड",
      password_placeholder: "अपना पासवर्ड दर्ज करें",
      remember_me: "मुझे याद रखें",
      forgot_password: "पासवर्ड भूल गए?",
      sign_in_button: "साइन इन करें",
      signing_in: "साइन इन हो रहा है...",
      continue_with_google: "Google के साथ जारी रखें",
      or_continue_with_email: "या ईमेल के साथ जारी रखें",
      dont_have_account: "खाता नहीं है?",
      sign_up_link: "यहाँ साइन अप करें",
      quick_access: "त्वरित पहुंच",
      join_as_customer: "ग्राहक के रूप में जुड़ें",
      join_as_worker: "कामगार के रूप में जुड़ें",
      terms_text: "साइन इन करके, आप हमारी",
      terms_link: "सेवा की शर्तों",
      privacy_link: "गोपनीयता नीति",
      error: "लॉगिन असफल। कृपया पुनः प्रयास करें।",
      oauth_failed: "OAuth लॉगिन असफल। कृपया पुनः प्रयास करें।"
    },

    // Register Page
    register: {
      title: "अपना खाता बनाएं",
      subtitle: "हजारों खुश ग्राहकों और कामगारों में शामिल हों",
      sign_in_link: "यहाँ साइन इन करें",
      role: "मैं चाहता हूँ",
      customer: "कामगार खोजना",
      customer_desc: "सेवा बुक करना",
      worker: "सेवा देना",
      worker_desc: "पैसे कमाना",
      name: "पूरा नाम",
      name_placeholder: "अपना पूरा नाम दर्ज करें",
      email: "ईमेल पता",
      email_placeholder: "अपना ईमेल दर्ज करें",
      phone: "फोन नंबर",
      phone_placeholder: "अपना फोन नंबर दर्ज करें",
      city: "शहर",
      city_placeholder: "अपना शहर दर्ज करें",
      state: "राज्य",
      state_placeholder: "अपना राज्य दर्ज करें",
      password: "पासवर्ड",
      password_placeholder: "पासवर्ड बनाएं",
      confirm_password: "पासवर्ड की पुष्टि करें",
      confirm_password_placeholder: "अपने पासवर्ड की पुष्टि करें",
      terms_agreement: "मैं सहमत हूँ",
      terms_link: "सेवा की शर्तों",
      privacy_link: "गोपनीयता नीति",
      create_account_button: "खाता बनाएं",
      creating_account: "खाता बनाया जा रहा है...",
      footer_text: "© 2024 QuickShift. सभी अधिकार सुरक्षित।",
      error: "पंजीकरण असफल। कृपया पुनः प्रयास करें।",
      errors: {
        name_required: "नाम आवश्यक है",
        name_min_length: "नाम कम से कम 2 अक्षरों का होना चाहिए",
        email_required: "ईमेल आवश्यक है",
        email_invalid: "कृपया वैध ईमेल दर्ज करें",
        phone_required: "फोन नंबर आवश्यक है",
        phone_invalid: "कृपया वैध फोन नंबर दर्ज करें",
        password_required: "पासवर्ड आवश्यक है",
        password_min_length: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
        passwords_dont_match: "पासवर्ड मेल नहीं खाते"
      }
    },

    // Dashboard
    dashboard: {
      welcome: "वापस स्वागत है",
      overview: "सारांश",
      my_bookings: "मेरी बुकिंग",
      find_workers: "कामगार खोजें",
      profile_settings: "प्रोफ़ाइल सेटिंग्स",
      stats: {
        active_bookings: "सक्रिय बुकिंग",
        completed_bookings: "पूर्ण कार्य",
        total_spent: "कुल खर्च",
        favorite_workers: "पसंदीदा कामगार"
      },
      recent_bookings: "हाल की बुकिंग",
      no_bookings: "अभी तक कोई बुकिंग नहीं",
      book_service: "सेवा बुक करें",
      popular_services: "लोकप्रिय सेवाएं"
    },

    worker: {
      dashboard: {
        welcome: "वापस स्वागत है, {{name}}",
        no_services: "कोई सेवा नहीं जोड़ी गई",
        availability: "उपलब्धता",
        online: "ऑनलाइन",
        offline: "ऑफलाइन",
        edit_profile: "प्रोफ़ाइल संपादित करें",
        tabs: {
          overview: "सारांश",
          bookings: "बुकिंग",
          earnings: "कमाई",
          profile: "प्रोफ़ाइल"
        },
        pending_requests: "लंबित अनुरोध",
        active_jobs: "सक्रिय कार्य",
        completed_jobs: "मुद्रित कार्य",
        total_earnings: "कुल कमाई",
        recent_bookings: "सामान्य बुकिंग",
        all_bookings: "सभी बुकिंग",
        no_bookings: "अभी तक कोई बुकिंग नहीं",
        start_job: "कार्य शुरू करें",
        complete_job: "कार्य पूरा करें",
        earnings_overview: "कमाई का सारांश",
        total_earned: "कुल कमाई",
        avg_per_job: "प्रति कार्य औसत",
        hourly_rate: "प्रति घंटा दर",
        profile_overview: "प्रोफ़ाइल सारांश"
      },
      profile: {
        experience: "अनुभव (वर्ष)"
      }
    },

    services: {
      find_workers: "कुशल कामगार खोजें",
      hero_subtitle: "हजारों सत्यापित पेशेवरों में से चुनें जो मदद के लिए तैयार हैं",
      available_workers: "उपलब्ध कामगार",
      no_workers_found: "कोई कामगार नहीं मिला",
      try_different_filters: "अपने खोज फ़िल्टर को समायोजित करने का प्रयास करें",
      responds_in: "जवाब देता है",
      plumbing: "प्लंबिंग",
      electrical: "इलेक्ट्रिकल काम",
      carpentry: "बढ़ईगीरी",
      cleaning: "घर की सफाई",
      moving: "स्थानांतरण और पैकिंग",
      painting: "पेंटिंग",
      gardening: "बागवानी",
      ac_repair: "AC मरम्मत",
      tv_installation: "TV स्थापना",
      appliance_repair: "उपकरण मरम्मत",
      handyman: "हैंडीमैन सेवाएं",
      pest_control: "कीट नियंत्रण",
      deep_cleaning: "गहरी सफाई",
      home_maintenance: "घर का रखरखाव"
    },

    booking: {
      status: {
        pending: "लंबित",
        accepted: "स्वीकृत",
        "in-progress": "प्रगति में",
        completed: "पूर्ण",
        cancelled: "रद्द",
        rejected: "अस्वीकृत"
      }
    },

    // Dashboard Sidebar & Sections
    sidebar: {
      profile: "प्रोफ़ाइल",
      addPost: "पोस्ट जोड़ें",
      myPosts: "मेरी पोस्ट्स",
      joinRequests: "जॉइन अनुरोध",
      jobPosts: "नौकरी पोस्ट्स",
      myBookings: "मेरी बुकिंग",
      requests: "अनुरोध"
    },
    sections: {
      profile: "प्रोफ़ाइल",
      addPost: "पोस्ट जोड़ें",
      myPosts: "मेरी पोस्ट्स",
      joinRequests: "जॉइन अनुरोध",
      jobPosts: "नौकरी पोस्ट्स",
      myBookings: "मेरी बुकिंग",
      requests: "अनुरोध"
    },
    profile: {
      name: "नाम",
      email: "ईमेल",
      role: "भूमिका",
      age: "आयु",
      location: "स्थान",
      phone: "फोन",
      skills: "कौशल",
      experience: "अनुभव",
      wageRange: "वेतन सीमा",
      wageMin: "न्यूनतम वेतन",
      wageMax: "अधिकतम वेतन",
      availability: "उपलब्धता",
      description: "विवरण",
      edit: "संपादित करें",
      save: "सहेजें",
      cancel: "रद्द करें"
    },
    addPost: {
      title: "नौकरी पोस्ट करें",
      jobName: "नौकरी का नाम",
      description: "विवरण",
      location: "स्थान",
      duration: "अवधि",
      date: "तारीख",
      wageMin: "वेतन न्यूनतम",
      wageMax: "वेतन अधिकतम",
      requirements: "आवश्यकताएँ",
      submit: "नौकरी पोस्ट करें",
      success: "नौकरी सफलतापूर्वक पोस्ट की गई!"
    },
    myPosts: {
      title: "मेरी पोस्ट्स",
      noPosts: "कोई जॉब पोस्ट नहीं की गई है।",
      edit: "संपादित करें",
      delete: "हटाएं",
      save: "सहेजें",
      cancel: "रद्द करें",
      updated: "जॉब अपडेट की गई।",
      deleted: "जॉब हटा दी गई।",
      confirmDelete: "क्या आप इस जॉब को हटाना चाहते हैं?"
    },
    joinRequests: {
      title: "जॉइन अनुरोध",
      noRequests: "कोई अनुरोध नहीं है।",
      apply: "आवेदन करें",
      message: "संदेश (वैकल्पिक)",
      send: "भेजें",
      cancel: "रद्द करें",
      applied: "अनुरोध भेजा गया!",
      status: "स्थिति",
      pending: "लंबित",
      accepted: "स्वीकृत",
      rejected: "अस्वीकृत",
      accept: "स्वीकृत करें",
      reject: "निराकरण करें"
    },
    myBookings: {
      title: "मेरी बुकिंग",
      noBookings: "अभी तक कोई बुकिंग नहीं",
      requestMessage: "आपका संदेश",
      status: "स्थिति"
    },
    requests: {
      title: "My Requests",
      noRequests: "No requests sent yet.",
      status: "Status"
    },
    auth: {
      homeBtn: "होम",
      switchToRegister: "खाता नहीं है? रजिस्टर करें",
      switchToLogin: "पहले से खाता है? लॉगिन करें"
    }
  },

  // Tamil Translations
  ta: {
    common: {
      loading: "ஏற்றுகிறது...",
      error: "ஏதோ தவறு நடந்தது",
      success: "வெற்றி!",
      save: "சேமிக்கவும்",
      cancel: "ரத்து செய்யவும்",
      delete: "நீக்கவும்",
      edit: "திருத்தவும்",
      view: "பார்க்கவும்",
      accept: "ஏற்கவும்",
      reject: "நிராகரிக்கவும்",
      confirm: "உறுதிப்படுத்தவும்",
      book_now: "இப்போது புக் செய்யவும்",
      view_details: "விவரங்களை பார்க்கவும்",
      available: "கிடைக்கிறது",
      unavailable: "கிடைக்கவில்லை",
      online: "ஆன்லைன்",
      offline: "ஆஃப்லைன்",
      per_hour: "/மணிநேரம்",
      years_exp: "வருட அனுபவம்",
      jobs: "வேலைகள்",
      rating: "மதிப்பீடு",
      reviews: "விமர்சனங்கள்",
      service: "சேவை",
      services: "சேவைகள்",
      all_services: "அனைத்து சேவைகள்",
      city: "நகரம்",
      enter_city: "நகரத்தை உள்ளிடவும்",
      min_rating: "குறைந்தபட்ச மதிப்பீடு",
      any_rating: "எந்த மதிப்பீடும்",
      max_hourly_rate: "அதிகபட்ச மணிநேர கட்டணம்",
      availability: "இருப்பு",
      any_time: "எந்த நேரமும்",
      available_now: "இப்போது கிடைக்கிறது",
      today: "இன்று",
      this_week: "இந்த வாரம்",
      sort_by: "இதன் அடிப்படையில் வரிசைப்படுத்தவும்",
      price_low_high: "விலை: குறைவு முதல் அதிகம்",
      price_high_low: "விலை: அதிகம் முதல் குறைவு",
      experience: "அனுபவம்",
      workers_found: "தொழிலாளர்கள் கிடைத்தனர்",
      clear_all: "அனைத்தையும் அழிக்கவும்",
      clear_filters: "வடிகட்டிகளை அழிக்கவும்",
      filters: "வடிகட்டிகள்",
      customer: "வாடிக்கையாளர்",
      worker: "தொழிலாளர்",
      date: "தேதி",
      time: "நேரம்",
      duration: "கால அளவு",
      price: "விலை",
      description: "விளக்கம்",
      address: "முகவரி",
      years: "வருடங்கள்",
      and: "மற்றும்"
    },

    // Home Page
    home: {
      welcome: "வரவேற்கிறோம்",
      login: "உள்நுழைவு",
      get_started: "தொடங்கவும்",
      dashboard: "டாஷ்போர்டு",
      go_to_dashboard: "டாஷ்போர்டுக்கு செல்லவும்",
      explore_services: "சேவைகளை ஆராயவும்",
      nav: {
        services: "சேவைகள்",
        features: "சிறப்பம்சங்கள்",
        about: "எங்களைப் பற்றி",
        get_started: "தொடங்கவும்",
        login: "உள்நுழைவு",
        dashboard: "டாஷ்போர்டு"
      },
      hero: {
        title: "QuickShift: ப்ளூ காலர் தொழிலாளர்களுடன் இணைக",
        subtitle: "உங்கள் தேவைக்கு நம்பகமான தொழிலாளர்களை கண்டறியுங்கள். வேலை பதிவிடுங்கள், இடம் மற்றும் சேவையை அடிப்படையாகக் கொண்டு வடிகட்டுங்கள், கோரிக்கைகளை எளிதாக நிர்வகிக்கவும்."
      },
      services: {
        title: "எங்கள் சேவைகள்",
        home_repairs: "வீட்டு பழுது",
        installation: "நிறுவல்",
        maintenance: "பராமரிப்பு",
        emergency: "அவசர சேவை",
        home_repairs_desc: "பிளம்பிங், மின் வேலை, தச்சு வேலை",
        installation_desc: "சாதனங்கள், பொருட்கள், உபகரணங்கள்",
        maintenance_desc: "வழக்கமான பராமரிப்பு மற்றும் சுத்தம்",
        emergency_desc: "24/7 அவசர பழுது சேவைகள்"
      },
      features: {
        title: "QuickShift ஏன் தேர்வு?",
        skilled_workers: "திறமையான தொழிலாளர்கள்",
        skilled_workers_desc: "உங்கள் சேவைக்கு சரிபார்க்கப்பட்ட நிபுணர்கள்",
        secure_platform: "பாதுகாப்பான பிளாட்ஃபார்ம்",
        secure_platform_desc: "பாதுகாப்பான பணப்பரிவர்த்தனை மற்றும் சரிபார்க்கப்பட்ட பயனர்கள்",
        easy_payments: "எளிய பணப்பரிவர்த்தனை",
        easy_payments_desc: "ஒருங்கிணைந்த பணப்பரிவர்த்தனை வாயில்",
        location_based: "இடம் அடிப்படையிலான",
        location_based_desc: "உங்கள் பகுதியில் தொழிலாளர்களை கண்டறியுங்கள்"
      },
      stats: {
        active_workers: "செயலில் உள்ள தொழிலாளர்கள்",
        jobs_completed: "முடிக்கப்பட்ட வேலைகள்",
        avg_rating: "சராசரி மதிப்பீடு",
        support: "உதவி"
      },
      cta: {
        title: "தொடங்க தயாரா?",
        subtitle: "ஆயிரக்கணக்கான மகிழ்ச்சியான வாடிக்கையாளர்கள் QuickShift-ஐ நம்புகிறார்கள்",
        start_journey: "உங்கள் பயணத்தை தொடங்குங்கள்",
        learn_more: "மேலும் அறிய"
      },
      nav: {
        services: "சேவைகள்",
        features: "சிறப்பம்சங்கள்",
        about: "எங்களைப் பற்றி",
        get_started: "தொடங்கவும்",
        login: "உள்நுழைவு",
        dashboard: "டாஷ்போர்டு"
      },
      footer: {
        privacy: "தனியுரிமை",
        terms: "விதிமுறைகள்",
        support: "உதவி",
        copyright: "© 2025 QuickShift. ப்ளூ காலர் இணைப்பை வலுப்படுத்துகிறது."
      }
    },

    // Login Page
    login: {
      welcome_back: "மீண்டும் வரவேற்கிறோம்",
      title: "உங்கள் கணக்கில் உள்நுழையவும்",
      subtitle: "மீண்டும் வரவேற்கிறோம்! தயவுசெய்து உங்கள் கணக்கில் உள்நுழையவும்",
      email: "மின்னஞ்சல் முகவரி",
      email_placeholder: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
      password: "கடவுச்சொல்",
      password_placeholder: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
      remember_me: "என்னை நினைவில் கொள்ளுங்கள்",
      forgot_password: "கடவுச்சொல் மறந்துவிட்டதா?",
      sign_in_button: "உள்நுழையவும்",
      signing_in: "உள்நுழைகிறது...",
      continue_with_google: "Google உடன் தொடரவும்",
      or_continue_with_email: "அல்லது மின்னஞ்சலுடன் தொடரவும்",
      dont_have_account: "கணக்கு இல்லையா?",
      sign_up_link: "இங்கே பதிவு செய்யவும்",
      quick_access: "விரைவு அணுகல்",
      join_as_customer: "வாடிக்கையாளராக சேரவும்",
      join_as_worker: "தொழிலாளராக சேரவும்",
      terms_text: "உள்நுழைவதன் மூலம், நீங்கள் எங்கள்",
      terms_link: "சேவை விதிமுறைகளை",
      privacy_link: "தனியுரிமை கொள்கையை",
      error: "உள்நுழைவு தோல்வியடைந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      oauth_failed: "OAuth உள்நுழைவு தோல்வியடைந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
    },

    register: {
      title: "உங்கள் கணக்கை உருவாக்கவும்",
      subtitle: "ஆயிரக்கணக்கான மகிழ்ச்சியான வாடிக்கையாளர்கள் மற்றும் தொழிலாளர்களுடன் சேருங்கள்",
      sign_in_link: "இங்கே உள்நுழையவும்",
      role: "நான் விரும்புகிறேன்",
      customer: "தொழிலாளர்களை தேடுதல்",
      customer_desc: "சேவை புக் செய்தல்",
      worker: "சேவை வழங்குதல்",
      worker_desc: "பணம் சம்பாதித்தல்",
      name: "முழு பெயர்",
      name_placeholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
      email: "மின்னஞ்சல் முகவரி",
      email_placeholder: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
      phone: "தொலைபேசி எண்",
      phone_placeholder: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",
      city: "நகரம்",
      city_placeholder: "உங்கள் நகரத்தை உள்ளிடவும்",
      state: "மாநிலம்",
      state_placeholder: "உங்கள் மாநிலத்தை உள்ளிடவும்",
      password: "கடவுச்சொல்",
      password_placeholder: "கடவுச்சொல் உருவாக்கவும்",
      confirm_password: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
      confirm_password_placeholder: "உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்",
      terms_agreement: "நான் ஒப்புக்கொள்கிறேன்",
      terms_link: "சேவை விதிமுறைகள்",
      privacy_link: "தனியுரிமை கொள்கை",
      create_account_button: "கணக்கை உருவாக்கவும்",
      creating_account: "கணக்கு உருவாக்கப்படுகிறது...",
      footer_text: "© 2024 QuickShift. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.",
      error: "பதிவு தோல்வியடைந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
      errors: {
        name_required: "பெயர் தேவைப்படுகிறது",
        name_min_length: "பெயர் குறைந்தது 2 எழுத்துக்களாக இருக்க வேண்டும்",
        email_required: "மின்னஞ்சல் தேவைப்படுகிறது",
        email_invalid: "தயவுசெய்து செல்லுபடியாகும் மின்னஞ்சலை உள்ளிடவும்",
        phone_required: "தொலைபேசி எண் தேவைப்படுகிறது",
        phone_invalid: "தயவுசெய்து செல்லுபடியாகும் தொலைபேசி எண்ணை உள்ளிடவும்",
        password_required: "கடவுச்சொல் தேவைப்படுகிறது",
        password_min_length: "கடவுச்சொல் குறைந்தது 6 எழுத்துக்களாக இருக்க வேண்டும்",
        passwords_dont_match: "கடவுச்சொற்கள் பொருந்தவில்லை"
      }
    },jobPosts:
    {
      title: "வேலை பதிவுகள்"
    },

    dashboard: {
      welcome: "மீண்டும் வரவேற்கிறோம்",
      overview: "மேலோட்டம்",
      my_bookings: "எனது புக்கிங்குகள்",
      find_workers: "தொழிலாளர்களை தேடவும்",
      profile_settings: "சுயவிவர அமைப்புகள்",
      stats: {
        active_bookings: "செயலில் உள்ள புக்கிங்குகள்",
        completed_bookings: "முடிக்கப்பட்ட வேலைகள்",
        total_spent: "மொத்த செலவு",
        favorite_workers: "விருப்பமான தொழிலாளர்கள்"
      },
      recent_bookings: "சமீபத்திய புக்கிங்குகள்",
      no_bookings: "இன்னும் புக்கிங் இல்லை",
      book_service: "சேவையை புக் செய்யவும்",
      popular_services: "பிரபலமான சேவைகள்"
    },

    worker: {
      dashboard: {
        welcome: "மீண்டும் வரவேற்கிறோம், {{name}}",
        no_services: "சேவைகள் எதுவும் சேர்க்கப்படவில்லை",
        availability: "இருப்பு",
        online: "ஆன்லைன்",
        offline: "ஆஃப்லைன்",
        edit_profile: "சுயவிவரத்தை திருத்தவும்",
        tabs: {
          overview: "மேலோட்டம்",
          bookings: "புக்கிங்குகள்",
          earnings: "வருமானம்",
          profile: "சுயவிவரம்"
        },
        pending_requests: "நிலுவையில் உள்ள கோரிக்கைகள்",
        active_jobs: "செயலில் உள்ள வேலைகள்",
        completed_jobs: "முடிக்கப்பட்ட வேலைகள்",
        total_earnings: "மொத்த வருமானம்",
        recent_bookings: "சமீபத்திய புக்கிங்குகள்",
        all_bookings: "அனைத்து புக்கிங்குகள்",
        no_bookings: "இன்னும் புக்கிங் இல்லை",
        start_job: "வேலையைத் தொடங்கவும்",
        complete_job: "வேலையை முடிக்கவும்",
        earnings_overview: "வருமான மேலோட்டம்",
        total_earned: "மொத்த சம்பாதிப்பு",
        avg_per_job: "ஒரு வேலைக்கு சராசரி",
        hourly_rate: "மணிநேர கட்டணம்",
        profile_overview: "சுயவிவர மேலோட்டம்"
      },
      profile: {
        experience: "அனுபவம் (வருடங்கள்)"
      }
    },

    services: {
      find_workers: "திறமையான தொழிலாளர்களை தேடவும்",
      hero_subtitle: "உதவ தயாராக இருக்கும் ஆயிரக்கணக்கான சரிபார்க்கப்பட்ட நிபுணர்களை உலாவவும்",
      available_workers: "கிடைக்கும் தொழிலாளர்கள்",
      no_workers_found: "தொழிலாளர்கள் யாரும் கிடைக்கவில்லை",
      try_different_filters: "உங்கள் தேடல் வடிகட்டிகளை சரிசெய்ய முயற்சிக்கவும்",
      responds_in: "பதிலளிக்கும் நெருப்பு",
      plumbing: "பிளம்பிங்",
      electrical: "மின் வேலை",
      carpentry: "தச்சு வேலை",
      cleaning: "வீட்டு சுத்தம்",
      moving: "இடமாற்றம் மற்றும் பேக்கிங்",
      painting: "பெயிண்டிங்",
      gardening: "தோட்டக்கலை",
      ac_repair: "ஏசி பழுது",
      tv_installation: "டிவி நிறுவல்",
      appliance_repair: "உபகரண பழுது",
      handyman: "கைவினை சேவைகள்",
      pest_control: "பூச்சி கட்டுப்பாடு",
      deep_cleaning: "ஆழமான சுத்தம்",
      home_maintenance: "வீட்டு பராமரிப்பு"
    },

    booking: {
      status: {
        pending: "நிலுவையில்",
        accepted: "ஏற்றுக்கொள்ளப்பட்டது",
        "in-progress": "நடப்பில்",
        completed: "முடிக்கப்பட்டது",
        cancelled: "ரத்து செய்யப்பட்டது",
        rejected: "நிராகரிக்கப்பட்டது"
      }
    },

    // Dashboard Sidebar & Sections
    sidebar: {
      profile: "சுயவிவரம்",
      addPost: "பதிவைச் சேர்க்கவும்",
      myPosts: "எனது பதிவுகள்",
      joinRequests: "சேர்க்கும் கோரிக்கைகள்",
      jobPosts: "வேலை பதிவுகள்",
      myBookings: "எனது புக்கிங்குகள்",
      requests: "கோரிக்கைகள்"
    },
    sections: {
      profile: "சுயவிவரம்",
      addPost: "பதிவைச் சேர்க்கவும்",
      myPosts: "எனது பதிவுகள்",
      joinRequests: "சேர்க்கும் கோரிக்கைகள்",
      jobPosts: "வேலை பதிவுகள்",
      myBookings: "எனது புக்கிங்குகள்",
      requests: "கோரிக்கைகள்"
    },
    profile: {
      name: "பெயர்",
      email: "மின்னஞ்சல்",
      role: "பங்கு",
      age: "வயது",
      location: "இடம்",
      phone: "தொலைபேசி",
      skills: "திறன்கள்",
      experience: "அனுபவம்",
      wageRange: "சம்பள வரம்பு",
      wageMin: "குறைந்தபட்ச சம்பளம்",
      wageMax: "அதிகபட்ச சம்பளம்",
      availability: "இருப்பு",
      description: "விளக்கம்",
      edit: "திருத்தவும்",
      save: "சேமிக்கவும்",
      cancel: "ரத்து செய்யவும்"
    },
    addPost: {
      title: "வேலை பதிவிடவும்",
      jobName: "வேலை பெயர்",
      description: "விளக்கம்",
      location: "இடம்",
      duration: "கால அளவு",
      date: "தேதி",
      wageMin: "குறைந்தபட்ச சம்பளம்",
      wageMax: "அதிகபட்ச சம்பளம்",
      requirements: "தேவைகள்",
      submit: "வேலை பதிவிடவும்",
      success: "வேலை வெற்றிகரமாக பதிவிடப்பட்டது!"
    },
    myPosts: {
      title: "எனது பதிவுகள்",
      noPosts: "வேலை பதிவுகள் இல்லை.",
      edit: "திருத்தவும்",
      delete: "நீக்கவும்",
      save: "சேமிக்கவும்",
      cancel: "ரத்து செய்யவும்",
      updated: "வேலை புதுப்பிக்கப்பட்டது.",
      deleted: "வேலை நீக்கப்பட்டது.",
      confirmDelete: "இந்த வேலை பதிவை நீக்க விரும்புகிறீர்களா?"
    },
    joinRequests: {
      title: "சேர்க்கும் கோரிக்கைகள்",
      noRequests: "கோரிக்கைகள் இல்லை.",
      apply: "விண்ணப்பிக்கவும்",
      message: "செய்தி (விரும்பினால்)",
      send: "அனுப்பவும்",
      cancel: "ரத்து செய்யவும்",
      applied: "கோரிக்கை அனுப்பப்பட்டது!",
      status: "நிலை",
      pending: "நிலுவையில்",
      accepted: "ஏற்கப்பட்டது",
      rejected: "நிராகரிக்கப்பட்டது",
      accept: "ஏற்கவும்",
      reject: "நிராகரிக்கவும்"
    },
    myBookings: {
      title: "எனது புக்கிங்குகள்",
      noBookings: "இன்னும் புக்கிங் இல்லை",
      requestMessage: "உங்கள் செய்தி",
      status: "நிலை"
    },
    requests: {
      title: "My Requests",
      noRequests: "No requests sent yet.",
      status: "Status"
    },
    auth: {
      homeBtn: "முகப்பு",
      switchToRegister: "கணக்கு இல்லையா? பதிவு செய்யவும்",
      switchToLogin: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்"
    }
  }
};