
export const translations = {
  en: {
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
}
;