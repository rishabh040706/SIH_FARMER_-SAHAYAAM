import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                // App Title
                appTitle: "Farm App",
                
                // Navigation
                signIn: "Sign In",
                signUp: "Sign Up",
                getStarted: "Get Started",
                
                // Landing Page
                smartFarming: "Smart Farming",
                simplified: "Simplified",
                landingDescription: "Connect with fellow farmers, track your crops, and grow your agricultural business with modern tools designed for the farming community.",
                joinCommunity: "Join the Community",
                
                // Homepage
                search: "Search...",
                cropRecommendation: "Crop Recommendation",
                diseaseDetection: "Disease Detection",
                market: "Market",
                weatherForecast: "Weather Forecast",
                forum: "Community Forum",
                tutorials: "Learning Center",
                
                // Login
                welcomeBack: "Welcome Back",
                enterPhone: "Enter your phone number to continue",
                enterOTP: "Enter verification code",
                phoneNumber: "Phone Number",
                changePhoneNumber: "Change phone number",
                codeSent: "Code sent",
                resendOTP: "Resend OTP",
                dontHaveAccount: "Don't have an account?",
                
                // Signup
                joinFarmApp: "Join Farm App",
                createAccount: "Create your account to get started",
                name: "Name",
                enterName: "Enter your full name",
                
                // 404 Page
                pageNotFound: "Oops! Page not found",
                returnHome: "Return to Home",
                
                // Features
                connectFarmers: "Connect with Farmers",
                connectDescription: "Join a vibrant community of farmers sharing knowledge and experiences.",
                trackCrops: "Track Your Crops",
                trackDescription: "Monitor your crop health, growth stages, and harvest predictions with smart analytics.",
                marketAccess: "Market Access",
                marketDescription: "Get real-time market prices and connect directly with buyers for better profits.",
                
                // Crop Bot
                cropBot: {
                    title: "Crop Recommendation Assistant",
                    subtitle: "Your AI-powered farming advisor",
                    welcomeMessage: "Hello! I'm your crop recommendation assistant. I can help you choose the best crops for your farm based on soil type, climate, season, and market conditions. What would you like to know?",
                    inputPlaceholder: "Ask me about crops, soil, weather, or farming techniques...",
                    placeholderResponse: "Based on your query, I can provide some general guidance. For clay soil, consider crops like rice, wheat, sugarcane, or cotton. For sandy soil, try groundnuts, pulses, or vegetables. Always consider your local climate and current market demand when selecting crops.",
                    suggestedQuestions: "Try asking:",
                    question1: "What crops grow best in clay soil?",
                    question2: "Which vegetables are profitable this season?",
                    question3: "How do I improve my soil quality?",
                    disclaimer: "AI recommendations should be verified with local agricultural experts"
                },
                
                // Market Bot
                marketBot: {
                    title: "Market Analysis Assistant",
                    subtitle: "Your AI-powered market advisor",
                    welcomeMessage: "Hello! I'm your market analysis assistant. I can help you with crop pricing, market trends, demand forecasting, and finding the best buyers for your produce. What would you like to know about the market?",
                    inputPlaceholder: "Ask about prices, market trends, demand, or buyers...",
                    placeholderResponse: "Current market prices are stable: Wheat ₹2,000-2,200/quintal, Rice ₹1,800-2,000/quintal, Cotton ₹5,500-6,000/quintal. Prices vary by region and quality. Check local mandis for exact rates and consider storage for better prices.",
                    suggestedQuestions: "Try asking:",
                    question1: "What are current tomato prices in my area?",
                    question2: "Which crops have the highest demand this month?",
                    question3: "When is the best time to sell my harvest?",
                    disclaimer: "Market data should be verified with local traders and marketplaces"
                },
                
                // Disease Detection Bot
                diseaseBot: {
                    title: "Disease Detection Assistant",
                    subtitle: "Your AI-powered plant health advisor",
                    welcomeMessage: "Hello! I'm your disease detection assistant. I can help you identify plant diseases, suggest treatments, and provide prevention strategies. You can describe symptoms or upload photos for analysis. How can I help with your crop health?",
                    inputPlaceholder: "Describe symptoms or ask about plant diseases...",
                    placeholderResponse: "Common plant diseases include fungal infections (leaf spots, wilting), bacterial spots, and viral diseases. For yellow spots on tomatoes, it could be early blight or nutrient deficiency. Maintain proper drainage, crop rotation, and timely treatment with appropriate fungicides.",
                    suggestedQuestions: "Try asking:",
                    question1: "My tomato leaves have yellow spots, what could it be?",
                    question2: "How can I prevent fungal diseases in my crops?",
                    question3: "What are the signs of pest infestation?",
                    disclaimer: "Disease diagnosis should be confirmed by agricultural experts or veterinarians"
                },
                
                // Permissions
                permissions: {
                    title: "App Permissions",
                    allow: "Allow",
                    skip: "Skip",
                    location: {
                        title: "Location Access",
                        description: "We need location access to provide weather updates and local market information."
                    },
                    camera: {
                        title: "Camera Access",
                        description: "Camera access helps you capture and analyze crop diseases and conditions."
                    },
                    notifications: {
                        title: "Notifications",
                        description: "Stay updated with weather alerts, market prices, and community discussions."
                    }
                }
            }
        },
        ml: {
            translation: {
                // App Title
                appTitle: "ഫാം ആപ്പ്",
                
                // Navigation
                signIn: "സൈൻ ഇൻ",
                signUp: "സൈൻ അപ്പ്",
                getStarted: "ആരംഭിക്കുക",
                
                // Landing Page
                smartFarming: "സ്മാർട്ട് കൃഷി",
                simplified: "ലളിതമാക്കിയത്",
                landingDescription: "സഹ കർഷകരുമായി ബന്ധപ്പെടുക, നിങ്ങളുടെ വിളകൾ ട്രാക്ക് ചെയ്യുക, കൃഷി സമൂഹത്തിനായി രൂപകൽപ്പന ചെയ്ത ആധുനിക ഉപകരണങ്ങൾ ഉപയോഗിച്ച് നിങ്ങളുടെ കാർഷിക ബിസിനസ്സ് വളർത്തുക.",
                joinCommunity: "സമൂഹത്തിൽ ചേരുക",
                
                // Homepage
                search: "തിരയുക...",
                cropRecommendation: "വിള ശുപാർശ",
                diseaseDetection: "രോഗ നിർണയം",
                market: "മാർക്കറ്റ്",
                weatherForecast: "കാലാവസ്ഥ പ്രവചനം",
                forum: "കമ്മ്യൂണിറ്റി ഫോറം",
                tutorials: "പഠന കേന്ദ്രം",
                
                // Login
                welcomeBack: "തിരികെ സ്വാഗതം",
                enterPhone: "തുടരാൻ നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക",
                enterOTP: "വെരിഫിക്കേഷൻ കോഡ് നൽകുക",
                phoneNumber: "ഫോൺ നമ്പർ",
                changePhoneNumber: "ഫോൺ നമ്പർ മാറ്റുക",
                codeSent: "കോഡ് അയച്ചത്",
                resendOTP: "വീണ്ടും OTP അയയ്ക്കുക",
                dontHaveAccount: "അക്കൗണ്ട് ഇല്ലേ?",
                
                // Signup
                joinFarmApp: "ഫാം ആപ്പിൽ ചേരുക",
                createAccount: "ആരംഭിക്കുന്നതിനായി നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക",
                name: "പേര്",
                enterName: "നിങ്ങളുടെ പൂർണ്ണ നാമം നൽകുക",
                
                // 404 Page
                pageNotFound: "ക്ഷമിക്കണം! പേജ് കണ്ടെത്തിയില്ല",
                returnHome: "ഹോമിലേക്ക് മടങ്ങുക",
                
                // Features
                connectFarmers: "കർഷകരുമായി ബന്ധപ്പെടുക",
                connectDescription: "അറിവും അനുഭവങ്ങളും പങ്കിടുന്ന കർഷകരുടെ ചടുലമായ സമൂഹത്തിൽ ചേരുക.",
                trackCrops: "നിങ്ങളുടെ വിളകൾ ട്രാക്ക് ചെയ്യുക",
                trackDescription: "സ്മാർട്ട് അനലിറ്റിക്‌സ് ഉപയോഗിച്ച് നിങ്ങളുടെ വിള ആരോഗ്യം, വളർച്ചാ ഘട്ടങ്ങൾ, വിളവെടുപ്പ് പ്രവചനങ്ങൾ എന്നിവ നിരീക്ഷിക്കുക.",
                marketAccess: "മാർക്കറ്റ് ആക്‌സസ്",
                marketDescription: "മികച്ച ലാഭത്തിനായി തൽസമയ മാർക്കറ്റ് വിലകൾ നേടുകയും വാങ്ങുന്നവരുമായി നേരിട്ട് ബന്ധപ്പെടുകയും ചെയ്യുക.",
                
                // Crop Bot
                cropBot: {
                    title: "വിള ശുപാർശ സഹായി",
                    subtitle: "നിങ്ങളുടെ AI-പവേർഡ് കൃഷി ഉപദേശകൻ",
                    welcomeMessage: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ വിള ശുപാർശ സഹായിയാണ്. മണ്ണിന്റെ തരം, കാലാവസ്ഥ, സീസൺ, മാർക്കറ്റ് സാഹചര്യങ്ങൾ എന്നിവയെ അടിസ്ഥാനമാക്കി നിങ്ങളുടെ കൃഷിക്ക് ഏറ്റവും അനുയോജ്യമായ വിളകൾ തിരഞ്ഞെടുക്കാൻ എനിക്ക് സഹായിക്കാം. നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?",
                    inputPlaceholder: "വിളകൾ, മണ്ണ്, കാലാവസ്ഥ, അല്ലെങ്കിൽ കൃഷി സാങ്കേതികതകളെക്കുറിച്ച് ചോദിക്കുക...",
                    placeholderResponse: "നിങ്ങളുടെ ചോദ്യത്തിന് നന്ദി! AI ഇന്റഗ്രേഷൻ ഉടൻ വരുന്നു. നിങ്ങളുടെ പ്രത്യേക സാഹചര്യങ്ങൾ, പ്രാദേശിക കാലാവസ്ഥാ പാറ്റേണുകൾ, മാർക്കറ്റ് ട്രെന്റുകൾ എന്നിവയെ അടിസ്ഥാനമാക്കി വ്യക്തിഗത വിള ശുപാർശകൾ നൽകാൻ എനിക്ക് കഴിയും.",
                    suggestedQuestions: "ചോദിച്ച് നോക്കൂ:",
                    question1: "കളിമണ്ണിൽ ഏതു വിളകളാണ് നന്നായി വളരുന്നത്?",
                    question2: "ഈ സീസണിൽ ഏതു പച്ചക്കറികളാണ് ലാഭകരം?",
                    question3: "എന്റെ മണ്ണിന്റെ ഗുണനിലവാരം എങ്ങനെ മെച്ചപ്പെടുത്താം?",
                    disclaimer: "AI ശുപാർശകൾ പ്രാദേശിക കാർഷിക വിദഗ്ധരുമായി പരിശോധിക്കേണ്ടതാണ്"
                },
                
                // Market Bot
                marketBot: {
                    title: "മാർക്കറ്റ് വിശകലന സഹായി",
                    subtitle: "നിങ്ങളുടെ AI-പവേർഡ് മാർക്കറ്റ് ഉപദേശകൻ",
                    welcomeMessage: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ മാർക്കറ്റ് വിശകലന സഹായിയാണ്. വിള വിലനിർണ്ണയം, മാർക്കറ്റ് ട്രെന്റുകൾ, ഡിമാൻഡ് പ്രവചനം, നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾക്ക് മികച്ച വാങ്ങുന്നവരെ കണ്ടെത്തൽ എന്നിവയിൽ എനിക്ക് സഹായിക്കാം. മാർക്കറ്റിനെക്കുറിച്ച് നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?",
                    inputPlaceholder: "വിലകൾ, മാർക്കറ്റ് ട്രെന്റുകൾ, ഡിമാൻഡ് അല്ലെങ്കിൽ വാങ്ങുന്നവരെക്കുറിച്ച് ചോദിക്കുക...",
                    placeholderResponse: "നിങ്ങളുടെ മാർക്കറ്റ് ചോദ്യത്തിന് നന്ദി! AI ഇന്റഗ്രേഷൻ ഉടൻ വരുന്നു. തത്സമയ മാർക്കറ്റ് വിലകൾ, ഡിമാൻഡ് വിശകലനം, സീസണൽ ട്രെന്റുകൾ നൽകാനും നിങ്ങളുടെ പ്രദേശത്തെ സാധ്യതയുള്ള വാങ്ങുന്നവരുമായി ബന്ധപ്പെടാനും എനിക്ക് കഴിയും.",
                    suggestedQuestions: "ചോദിച്ച് നോക്കൂ:",
                    question1: "എന്റെ പ്രദേശത്തെ നിലവിലെ തക്കാളി വിലയെന്താണ്?",
                    question2: "ഈ മാസം ഏറ്റവും കൂടുതൽ ഡിമാൻഡുള്ള വിളകൾ ഏവയാണ്?",
                    question3: "എന്റെ വിളവെടുപ്പ് വിൽക്കാൻ ഏറ്റവും നല്ല സമയം എപ്പോഴാണ്?",
                    disclaimer: "മാർക്കറ്റ് ഡാറ്റ പ്രാദേശിക വ്യാപാരികളും മാർക്കറ്റ്‌പ്ലേസുകളുമായി പരിശോധിക്കേണ്ടതാണ്"
                },
                
                // Disease Detection Bot
                diseaseBot: {
                    title: "രോഗ നിർണ്ണയ സഹായി",
                    subtitle: "നിങ്ങളുടെ AI-പവേർഡ് സസ്യാരോഗ്യ ഉപദേശകൻ",
                    welcomeMessage: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ രോഗ നിർണ്ണയ സഹായിയാണ്. സസ്യരോഗങ്ങൾ തിരിച്ചറിയാനും ചികിത്സ നിർദ്ദേശിക്കാനും പ്രതിരോധ തന്ത്രങ്ങൾ നൽകാനും എനിക്ക് സഹായിക്കാം. വിശകലനത്തിനായി നിങ്ങൾക്ക് ലക്ഷണങ്ങൾ വിവരിക്കാനോ ഫോട്ടോകൾ അപ്‌ലോഡ് ചെയ്യാനോ കഴിയും. നിങ്ങളുടെ വിള ആരോഗ്യത്തിൽ എനിക്ക് എങ്ങനെ സഹായിക്കാം?",
                    inputPlaceholder: "ലക്ഷണങ്ങൾ വിവരിക്കുക അല്ലെങ്കിൽ സസ്യരോഗങ്ങളെക്കുറിച്ച് ചോദിക്കുക...",
                    placeholderResponse: "നിങ്ങളുടെ സസ്യാരോഗ്യ ചോദ്യത്തിന് നന്ദി! AI ഇന്റഗ്രേഷൻ ഉടൻ വരുന്നു. രോഗബാധിതമായ സസ്യങ്ങളുടെ ഫോട്ടോകൾ വിശകലനം ചെയ്യാനും രോഗങ്ങളും കീടങ്ങളും തിരിച്ചറിയാനും ജൈവികവും രാസവുമായ ചികിത്സകൾ നിർദ്ദേശിക്കാനും പ്രതിരോധ തന്ത്രങ്ങൾ നൽകാനും എനിക്ക് കഴിയും.",
                    suggestedQuestions: "ചോദിച്ച് നോക്കൂ:",
                    question1: "എന്റെ തക്കാളി ഇലകളിൽ മഞ്ഞ പാടുകളുണ്ട്, ഇത് എന്താകാം?",
                    question2: "എന്റെ വിളകളിൽ ഫംഗൽ രോഗങ്ങൾ എങ്ങനെ തടയാം?",
                    question3: "കീടബാധയുടെ ലക്ഷണങ്ങൾ എവയാണ്?",
                    disclaimer: "രോഗനിർണ്ണയം കാർഷിക വിദഗ്ധരോ മൃഗഡോക്ടർമാരോ സ്ഥിരീകരിക്കേണ്ടതാണ്"
                },
                
                // Permissions
                permissions: {
                    title: "ആപ്പ് അനുമതികൾ",
                    allow: "അനുവദിക്കുക",
                    skip: "ഒഴിവാക്കുക",
                    location: {
                        title: "ലൊക്കേഷൻ ആക്‌സസ്",
                        description: "കാലാവസ്ഥാ അപ്‌ഡേറ്റുകളും പ്രാദേശിക മാർക്കറ്റ് വിവരങ്ങളും നൽകാൻ ഞങ്ങൾക്ക് ലൊക്കേഷൻ ആക്‌സസ് ആവശ്യമാണ്."
                    },
                    camera: {
                        title: "ക്യാമറ ആക്‌സസ്",
                        description: "വിള രോഗങ്ങളും അവസ്ഥകളും ക്യാപ്‌ചർ ചെയ്യാനും വിശകലനം ചെയ്യാനും ക്യാമറ ആക്‌സസ് സഹായിക്കുന്നു."
                    },
                    notifications: {
                        title: "അറിയിപ്പുകൾ",
                        description: "കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, മാർക്കറ്റ് വിലകൾ, കമ്മ്യൂണിറ്റി ചർച്ചകൾ എന്നിവയിൽ അപ്‌ഡേറ്റായി തുടരുക."
                    }
                }
            }
        }
    }
});

export default i18n;